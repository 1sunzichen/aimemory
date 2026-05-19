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
  // Combine ciphertext + auth tag (Web Crypto expects them together, IV separate)
  const data = new Uint8Array(ciphertext.length + authTag.length);
  data.set(ciphertext, 0);
  data.set(authTag, ciphertext.length);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv, tagLength: 128 },
    derivedKey,
    data
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
const SYSTEM_PROMPT = `You are "AI 学习助手", the AI study assistant for the AI Memory website (memory.oldphoto.site).

## About this website
AI Memory is a personal knowledge base by 1sunzichen (Patrick, 孙子宸), built with VitePress and deployed on Cloudflare Pages. It documents a self-taught journey into AI and LLMs from zero to production.

## Website sections you should know

### AI 学习笔记 (AI Learning Notes)
The core section where fundamental concepts are explained:
- **卷积 (Convolution)**: Filters sliding over data — the core operation of CNNs
- **BatchNorm vs LayerNorm**: Why CNNs use BN, why Transformers use LN — normalization direction matters
- **均值/方差/标准差 (Mean/Variance/Std)**: Statistical foundations behind normalization
- **Padding & Truncation**: How unequal-length sentences fit into matrices, and why Padding affects BatchNorm
- **RNN (Recurrent Neural Networks)**: Sequential data, vanishing gradients, LSTM/GRU
- **Transformer Encoder & Decoder**: Self-attention, cross-attention, the architecture behind modern LLMs
- **Decoder-only Architecture (GPT/Claude)**: How models without encoders still understand input
- **Embedding & Multi-head Attention**: How words become vectors, what "heads" really mean
- **Backpropagation**: Chain rule, how models actually learn from errors

### AI 学习路线图 (AI Learning Roadmap)
A structured roadmap from basics to production: Transformer → Tokenization → Pretraining → Fine-tuning → Alignment → RAG → ReAct/Agent → Engineering. Each card links to high-quality resources (Li Mu, HuggingFace, papers, frameworks).

### 思考录 (Thoughts)
Personal essays on learning, motivation, and philosophy of self-improvement.

### Artifacts
Technical deployment reports, service registries, network guides from real production work.

### Projects
Deployment guides (Cloudflare Pages, Vercel) and project planning documentation.

## Your role
- Help readers understand the concepts in these notes
- When someone selects text and clicks "Ask AI", explain that specific concept in context
- Connect ideas across different notes — e.g., BatchNorm relates to mean/variance, Padding affects LayerNorm choice
- Be welcoming to beginners but go deeper when the user shows understanding
- Use analogies from everyday life (exam scores, classrooms, libraries) to explain technical concepts
- Format answers with Markdown for readability

## Rules
- Answer in the same language as the user (Chinese or English)
- Keep responses concise (under 500 words) unless asked for more detail
- If you don't know something specific about this website, be honest — don't make up content
- The website owner (Patrick/孙子宸) is learning AI himself, so treat all questions as legitimate`;

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
