# AI 助手修复记录（2026-07-27）

## 故障现象

网页版 AI 助手无法使用，发送消息无响应/报错。

## 根因

两个后端路径同时失效：

### 路径一：Worker（ai.oldphoto.site/api/chat）→ 522

- `DEEPSEEK_KEY` secret 丢失，Worker 无法调用 DeepSeek API
- `ai.oldphoto.site` Worker custom domain 未在 Cloudflare Dashboard 正确绑定

### 路径二：Pages Function（memory.oldphoto.site/api/chat）→ 500

- 代码使用 AES-256-GCM 加密存储 API key
- 需要的环境变量（`ENCRYPTED_KEY`、`KEY_SALT`、`KEY_PASSWORD`）从未在 Pages Dashboard 设置
- 解密失败 → 通用 500 错误

## 修复方案

### 1. 简化 Pages Function，去掉加密层

`functions/api/chat.js` — 改为直接读取 `DEEPSEEK_KEY`（与 Worker 一致）：

```js
// 旧：AES 解密 → const key = await decryptKey(env.ENCRYPTED_KEY, ...)
// 新：直接读
if (!env.DEEPSEEK_KEY) {
  return new Response(JSON.stringify({ error: 'API key not configured' }), ...)
}
// ...
'Authorization': `Bearer ${env.DEEPSEEK_KEY}`
```

### 2. 设置环境变量

```bash
echo "sk-xxx" | npx wrangler pages secret put DEEPSEEK_KEY --project-name aimemory
```

### 3. 前端切换为同域路径

`docs/.vitepress/theme/AiAssistant.vue`：

```js
// 旧：跨域 Worker
const API = 'https://ai.oldphoto.site/api/chat'

// 新：同域 Pages Function
const API = '/api/chat'
```

### 4. 补充 Worker 的 DEEPSEEK_KEY

```bash
cd worker && npx wrangler secret put DEEPSEEK_KEY
```

## 修复后的架构

```
浏览器（手机/桌面）
    │
    │ GET /index.html, /api/chat
    ▼
memory.oldphoto.site （Cloudflare Pages）
    ├── /                     → VitePress 静态站点
    ├── /api/chat             → Pages Function
    │     ├── 读取 DEEPSEEK_KEY 环境变量
    │     ├── POST api.deepseek.com/v1/chat/completions
    │     └── 返回 AI 回复
    └── ...
```

优势：

- 单域名，无跨域问题
- 不依赖 `workers.dev`（手机流量不再被墙）
- 环境变量集中管理，一个 `DEEPSEEK_KEY` 即可
- 部署流程不变：`git push` → Pages 自动构建部署

## 经验教训

1. **环境变量不要丢**：Secret 变更应记录，Worker 和 Pages 两边都要同步
2. **不要过度设计安全层**：AES 加密增加了复杂度但没有实际安全收益——Cloudflare Secrets 本身就是加密存储的
3. **同域代理优于 Worker 自定义域名**：Pages Function 部署在同一域名下，天然解决 DNS 污染和 CORS 问题
4. **错误信息要有用**：原来的 `catch` 只返回 "Internal error"，排查时完全不知道哪里挂的。现在加了 `detail` 字段

## 相关文件

- `functions/api/chat.js` — Pages Function（修复后版本）
- `docs/.vitepress/theme/AiAssistant.vue` — 前端 AI 助手组件
- `worker/src/index.js` — Worker（兼容保留）
- `worker/wrangler.toml` — Worker 配置

## 提交

```
49354b9 fix: simplify Pages Function to use DEEPSEEK_KEY directly + use same-domain /api/chat
```
