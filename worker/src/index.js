/**
 * Cloudflare Worker — DeepSeek API proxy for aimemory AI assistant.
 *
 * Security layers:
 *   1. API key AES-256-GCM encrypted + PBKDF2 salted (password in Worker Secret)
 *   2. Referer check — only from memory.oldphoto.site
 *   3. Per-IP rate limiting — 20 req/min
 */

// ── Decrypt the API key at cold start ──────────────────────────────
async function decryptKey(encryptedPayload, saltHex, password) {
  const salt = hexToBytes(saltHex);
  const [ivHex, authTagHex, ciphertextHex] = encryptedPayload.split(':');

  // Derive key from password + salt using PBKDF2
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  // Combine IV + auth tag + ciphertext
  const iv = hexToBytes(ivHex);
  const authTag = hexToBytes(authTagHex);
  const ciphertext = hexToBytes(ciphertextHex);
  const combined = new Uint8Array(iv.length + ciphertext.length + authTag.length);
  combined.set(iv, 0);
  combined.set(ciphertext, iv.length);
  combined.set(authTag, iv.length + ciphertext.length);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv, additionalData: new Uint8Array(0), tagLength: 128 },
    derivedKey,
    combined
  );

  return new TextDecoder().decode(decrypted);
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

// ── Rate limiter ───────────────────────────────────────────────────
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const window = 60_000;
  const maxRequests = 20;

  let entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > window) {
    entry = { start: now, count: 0 };
    rateLimitMap.set(ip, entry);
  }
  entry.count++;
  return entry.count > maxRequests;
}

// ── Allowed origins ────────────────────────────────────────────────
const ALLOWED_ORIGINS = [
  'https://memory.oldphoto.site',
  'https://aimemory.pages.dev',
  'https://aimemory-ai.3023493319.workers.dev',
  'http://localhost:5173',
  'http://localhost:4173',
];

function getAllowedOrigin(request) {
  const origin = request.headers.get('Origin');
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  return null;
}

// ── System prompt ──────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are an AI study assistant embedded in a personal AI learning notes website.
Your job is to help readers understand machine learning and AI concepts.

Rules:
- Answer in the same language as the user's question.
- Be concise and beginner-friendly. Use simple analogies.
- If the user selected text, explain that specific concept in context.
- Keep responses under 500 words unless asked for more detail.
- Use Markdown formatting.`;

// ── Main handler ───────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      const origin = getAllowedOrigin(request);
      if (!origin) return new Response(null, { status: 403 });
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/api/chat') {
      return new Response('Not found', { status: 404 });
    }

    // ── Origin check ───────────────────────────────────────────
    const origin = getAllowedOrigin(request);
    if (!origin) {
      return new Response(JSON.stringify({ error: 'Access denied' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Rate limit ─────────────────────────────────────────────
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin },
      });
    }

    try {
      const body = await request.json();
      const { messages, pageTitle } = body;

      if (!messages || !Array.isArray(messages) || messages.length === 0) {
        return new Response(JSON.stringify({ error: 'No messages provided' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin },
        });
      }

      // Decrypt API key (cached in global scope after first request)
      if (!globalThis.__cachedKey) {
        globalThis.__cachedKey = await decryptKey(
          env.ENCRYPTED_KEY,
          env.KEY_SALT,
          env.KEY_PASSWORD
        );
      }

      const recentMessages = messages.slice(-20);
      const fullMessages = [{ role: 'system', content: SYSTEM_PROMPT }];
      if (pageTitle) {
        fullMessages.push({
          role: 'system',
          content: `The user is reading: "${pageTitle}". Use this for context.`,
        });
      }
      fullMessages.push(...recentMessages);

      const dsResp = await fetch(env.DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${globalThis.__cachedKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: fullMessages,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      const dsData = await dsResp.json();

      if (!dsResp.ok) {
        console.error('DeepSeek error:', JSON.stringify(dsData).substring(0, 200));
        return new Response(JSON.stringify({ error: 'AI service error' }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin },
        });
      }

      const reply = dsData.choices?.[0]?.message?.content || '';
      return new Response(JSON.stringify({ reply }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Internal error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin },
      });
    }
  },
};
