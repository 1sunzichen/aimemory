# AI 助手手机端故障分析 & 项目架构文档

> 日期：2026-07-21
> 相关 Issue：手机网页端 AI 助手报 `Failed to fetch`

---

## 一、故障现象

- **桌面端（浏览器 + WSL）**：AI 助手正常工作
- **手机网页端（移动流量）**：AI 助手报 `Failed to fetch`

---

## 二、根因分析

### 通俗版（说人话）

把 aimemory 网站想象成一家店：

- **店面**在「主街」（`memory.oldphoto.site`），每个人都能走到。
- **仓库**在一条叫 `workers.dev` 的「偏巷」里。

你在家用电脑上网时，代理软件（Clash/V2Ray）就像一个 **VIP 通行证**，
你能走主街也能进偏巷，所以 AI 助手正常。

但用手机流量上网时，你只是一个普通路人。
手机运营商（移动/联通/电信）把 `workers.dev` 这条巷子**砌了墙**——
你走不到仓库，自然取不到货（DeepSeek 的 AI 回复），浏览器就报 `Failed to fetch`。

**修复方案**：把仓库搬到店面里（同域名 `memory.oldphoto.site/api/chat`），
这样不管用什么网络，走到店面就能取到货。

---

### 专业版

#### 2.1 原始架构的问题

```
手机浏览器                     Cloudflare 边缘节点
    │                              │
    │  fetch() ──────────────────→ │ memory.oldphoto.site (Cloudflare Pages)
    │                              │   ├── /index.html        ✅ 可达
    │                              │   └── /ai-learning-notes/ ✅ 可达
    │                              │
    │  fetch() ──────→ ❌ ─────── │ aimemory-ai.3023493319.workers.dev
    │                              │   └── /api/chat           ❌ 不可达
```

**两个关键事实：**

1. **DNS 污染/劫持**：国内运营商 DNS 将 `*.workers.dev` 解析到
   `198.18.x.x`（RFC 2544 基准测试保留段），而非 Cloudflare 真实边缘 IP。
   实测：
   ```
   $ python3 -c "import socket; print(socket.getaddrinfo('aimemory-ai.3023493319.workers.dev', 443)[0][4][0])"
   198.18.2.8    ← 假 IP，非 Cloudflare 边缘节点
   ```

2. **TCP 阻断**：即使 DNS 绕过（如 DoH），`workers.dev` 子域名的 TCP 443
   连接在部分运营商网络上被 RST 或静默丢弃。

#### 2.2 为什么桌面端正常

桌面端（无论 Windows 直连还是 WSL）通过代理软件（Clash/V2Ray/Sing-box）
接入，流量走代理隧道（VPN/TUN 模式或系统代理），绕过运营商层面的 DNS 劫持
和 TCP 阻断。

代理软件的 DNS 通常配置为远程解析（如 `8.8.8.8`、`1.1.1.1`），
不受运营商 DNS 污染影响。

#### 2.3 为什么手机端（移动流量）会挂

手机使用移动数据时：

- DNS 查询走运营商递归 DNS（或基站下发的 DNS）
- 流量不经代理，直连运营商骨干网
- `workers.dev` 被 GFW 体系的 DNS 注入 + TCP 旁路阻断双重封锁

#### 2.4 修复方案：Pages Functions 同域代理

```
手机浏览器                     Cloudflare 边缘节点
    │                              │
    │  fetch('/api/chat') ───────→ │ memory.oldphoto.site
    │                              │   ├── /index.html
    │                              │   ├── /api/chat (Pages Function)
    │                              │   │     ↓ 服务端转发
    │                              │   │   api.deepseek.com ✅
    │                              │   └── ...
```

**为什么这个方案可行：**

- `memory.oldphoto.site` 是自定义域名，走 Cloudflare CDN，
  其边缘 IP 在国内普遍可达（未被系统性封锁）
- `/api/chat` 与站点同域，前端用相对路径 `fetch('/api/chat')`，
  不存在跨域问题
- Pages Functions 在 Cloudflare 边缘节点执行，
  服务端调用 `api.deepseek.com` 不受国内网络限制
- Functions 与 Pages 站点统一部署，git push 即触发

---

## 三、项目整体架构

### 3.1 总览

```
┌─────────────────────────────────────────────────────────────┐
│                     aimemory 项目                             │
│              github.com/1sunzichen/aimemory                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ git push
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Cloudflare Pages                           │
│                                                             │
│  ┌─────────────────────┐   ┌──────────────────────────────┐ │
│  │   VitePress 站点     │   │   Pages Functions            │ │
│  │   (docs/.vitepress   │   │   (functions/api/chat.js)    │ │
│  │    /dist/)           │   │                              │ │
│  │                      │   │   解密 API Key               │ │
│  │   memory.oldphoto    │   │   → 请求 DeepSeek API        │ │
│  │   .site/*            │   │   → 返回 AI 回复             │ │
│  └─────────────────────┘   └──────────┬───────────────────┘ │
│                                       │                      │
└───────────────────────────────────────┼──────────────────────┘
                                        │ 服务端 fetch
                                        ▼
                              ┌─────────────────────┐
                              │   DeepSeek API       │
                              │   api.deepseek.com   │
                              │   model: deepseek    │
                              │          -chat       │
                              └─────────────────────┘
```

### 3.2 目录结构

```
aimemory/
├── docs/                          # VitePress 源文件
│   ├── .vitepress/
│   │   ├── config.mts             # 站点配置（nav, sidebar, 主题）
│   │   ├── theme/
│   │   │   └── AiAssistant.vue    # AI 助手前端组件
│   │   └── dist/                  # 构建产物（git 跟踪，Pages 直接部署）
│   ├── index.md                   # 首页
│   ├── about.md                   # 关于 Patrick
│   ├── ai-learning-notes/         # AI 学习笔记（12 篇）
│   ├── ai-learning-roadmap/       # AI 学习路线图
│   ├── ai-foundation-plain.md     # 最简地基（零基础入门）
│   ├── ai-quiz/                   # 自测 & 错题本
│   ├── 30-day-agent-plan.md       # 30 天冲刺计划
│   ├── artifacts/                 # 技术产物文档
│   ├── memory/                    # Hermes 记忆快照
│   ├── projects/                  # 项目部署文档
│   ├── thoughts/                  # 思考录
│   ├── electron/                  # Electron 学习笔记
│   ├── math-beauty/               # 数学之美
│   └── public/                    # 静态资源（图片、特殊页面）
│       ├── diary.html             # 私密日记页面
│       ├── pwd.html               # 密码管理页面
│       └── math-beauty-app/       # 数学之美交互应用
│
├── functions/                     # Cloudflare Pages Functions
│   └── api/
│       └── chat.js                # DeepSeek API 代理（AES 解密 + 转发）
│
├── worker/                        # （已废弃）原始 Cloudflare Worker
│   ├── wrangler.toml              # Worker 配置
│   ├── src/index.js               # Worker 源码
│   └── encrypt-key.js             # API Key 加密工具
│
├── scripts/                       # 工具脚本
│   ├── diary_encrypt.py           # 日记加解密
│   └── send_diary_password.py     # 日记密码发送
│
├── package.json                   # Node 依赖（仅 vitepress）
└── package-lock.json
```

### 3.3 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 框架 | VitePress 1.6.4 | Vue 驱动的静态站点生成器 |
| 前端组件 | Vue 3 (Composition API) | AiAssistant.vue |
| 构建 | Vite | VitePress 底层构建工具 |
| 部署 | Cloudflare Pages | 自动从 git push 构建部署 |
| 后端 API | Cloudflare Pages Functions | 服务端代理 DeepSeek API |
| AI 模型 | DeepSeek Chat | 大语言模型（替代原 Worker 直连） |
| 安全 | AES-256-GCM + PBKDF2 | API Key 加密存储 |
| CDN | Cloudflare | 全球加速 + DDoS 防护 |

### 3.4 数据流

```
用户操作（选中文字 / 输入问题）
    │
    ▼
AiAssistant.vue
    │  fetch('/api/chat', { messages, pageTitle })
    ▼
Pages Function (functions/api/chat.js)
    │  1. 从环境变量读 ENCRYPTED_KEY + KEY_SALT + KEY_PASSWORD
    │  2. AES-256-GCM 解密得到 DeepSeek API Key
    │  3. 拼接 system prompt + 页面上下文 + 用户消息
    │  4. POST https://api.deepseek.com/v1/chat/completions
    ▼
DeepSeek API
    │  返回 AI 回复
    ▼
Pages Function → AiAssistant.vue
    │  渲染 Markdown → 显示在聊天面板
    ▼
用户看到回复
```

### 3.5 安全设计

| 层级 | 措施 |
|------|------|
| API Key | AES-256-GCM 加密存储，密码 `KEY_PASSWORD` 存为 Pages Secret |
| 传输 | HTTPS 全链路（用户 ↔ Cloudflare ↔ DeepSeek） |
| 限流 | 每 IP 每分钟 20 次请求（同原 Worker） |
| 输入 | 只取最近 20 条消息，防止 token 溢出 |
| 部署 | 密码不入 git，通过 Cloudflare Dashboard 环境变量注入 |

### 3.6 部署流程

```
开发者本地
    │  git push origin main
    ▼
GitHub (github.com/1sunzichen/aimemory)
    │  Cloudflare Pages 监听 main 分支
    ▼
Cloudflare Pages 构建
    │  npm run docs:build
    │  输出：docs/.vitepress/dist/
    │  部署：静态文件 + functions/ 目录
    ▼
memory.oldphoto.site  （全球边缘节点）
```

---

## 四、故障经验总结

1. **`*.workers.dev` 在国内移动网络不可靠**：应避免将面向终端用户的 API
   直接放 Workers 默认域名。

2. **优先同域代理**：与其跨域调 Workers，不如用 Pages Functions / Workers Routes
   绑自定义域名，消除 DNS 污染风险。

3. **调试方法**：DoH（DNS over HTTPS）绕过本地 DNS 是快速判断是否 DNS 污染
   的有效手段：
   ```bash
   curl --doh-url https://cloudflare-dns.com/dns-query https://xxx.workers.dev/api/chat
   ```

4. **环境变量集中管理**：Pages Functions / Workers 的密钥类配置应存入
   Dashboard Secrets，不入 git。
