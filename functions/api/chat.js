/**
 * Cloudflare Pages Function — DeepSeek API proxy for aimemory AI assistant.
 * 部署在 memory.oldphoto.site/api/chat，与站点同域名。
 *
 * 需要在 Cloudflare Pages Dashboard → Settings → Environment variables 设置:
 *   DEEPSEEK_KEY     (DeepSeek API key，值: sk-xxx)
 *   DEEPSEEK_API_URL (https://api.deepseek.com/v1/chat/completions)
 */

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

### AI 学习路线图 (AI Learning Roadmap) | 思考录 | Artifacts | Projects
More sections covering learning roadmaps, personal essays, and deployment docs.

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

  // CORS headers
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

    if (!env.DEEPSEEK_KEY) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
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

    const apiUrl = env.DEEPSEEK_API_URL || 'https://api.deepseek.com/v1/chat/completions';
    const dsResp = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.DEEPSEEK_KEY}`,
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
      console.error('DeepSeek error:', JSON.stringify(dsData).substring(0, 300));
      return new Response(JSON.stringify({
        error: 'AI service error',
        detail: dsData.error?.message || dsResp.status,
      }), {
        status: 502,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    const reply = dsData.choices?.[0]?.message?.content || '';
    return new Response(JSON.stringify({ reply }), {
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Pages Function error:', err.message);
    return new Response(JSON.stringify({
      error: 'Internal error',
      detail: err.message,
    }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
}
