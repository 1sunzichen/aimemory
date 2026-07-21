/**
 * Cloudflare Pages Function — DeepSeek API proxy for aimemory AI assistant.
 * 部署在 memory.oldphoto.site/api/chat，与站点同域名，手机端不会被墙。
 *
 * 需要在 Cloudflare Pages Dashboard → Settings → Environment variables 设置:
 *   ENCRYPTED_KEY    (从 worker/wrangler.toml 抄过来)
 *   KEY_SALT         (从 worker/wrangler.toml 抄过来)
 *   KEY_PASSWORD     (Secret: patrick)
 *   DEEPSEEK_API_URL (https://api.deepseek.com/v1/chat/completions)
 */

// ── Decrypt the API key ───────────────────────────────────────────
async function decryptKey(encryptedPayload, saltHex, password) {
  const salt = hexToBytes(saltHex);
  const [ivHex, authTagHex, ciphertextHex] = encryptedPayload.split(':');

  const keyMaterial = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']
  );
  const derivedKey = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
  );

  const iv = hexToBytes(ivHex);
  const authTag = hexToBytes(authTagHex);
  const ciphertext = hexToBytes(ciphertextHex);
  const data = new Uint8Array(ciphertext.length + authTag.length);
  data.set(ciphertext, 0);
  data.set(authTag, ciphertext.length);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv, tagLength: 128 }, derivedKey, data
  );
  return new TextDecoder().decode(decrypted);
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2)
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  return bytes;
}

// ── Rate limiter ──────────────────────────────────────────────────
const rateLimitMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  let entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > 60_000) {
    entry = { start: now, count: 0 };
    rateLimitMap.set(ip, entry);
  }
  entry.count++;
  return entry.count > 20;
}

// ── System prompt ─────────────────────────────────────────────────
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
A structured roadmap from basics to production.

### 思考录 (Thoughts) | Artifacts | Projects
Personal essays, deployment reports, and project documentation.

## Your role
- Help readers understand the concepts in these notes
- When someone selects text and clicks "Ask AI", explain that specific concept in context
- Connect ideas across different notes
- Be welcoming to beginners but go deeper when the user shows understanding
- Use analogies from everyday life (exam scores, classrooms, libraries)
- Format answers with Markdown for readability

## Rules
- Answer in the same language as the user (Chinese or English)
- Keep responses concise (under 500 words) unless asked for more detail
- If you don't know something specific about this website, be honest — don't make up content`;

// ── Main handler ──────────────────────────────────────────────────
export async function onRequest(context) {
  const { request, env } = context;

  // CORS headers — 同域名下不需要严格 origin 检查，但保留 CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  if (request.method !== 'POST') {
    return new Response('Not found', { status: 404 });
  }

  // Rate limit
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ error: 'Too many requests' }), {
      status: 429,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { messages, pageTitle } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    // Decrypt API key (cached globally)
    if (!globalThis.__cachedKey) {
      globalThis.__cachedKey = await decryptKey(
        env.ENCRYPTED_KEY, env.KEY_SALT, env.KEY_PASSWORD
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
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    const reply = dsData.choices?.[0]?.message?.content || '';
    return new Response(JSON.stringify({ reply }), {
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
}
