# Hermes Internal Memory (Agent's Knowledge Base)

> ⚡ **跨机器记忆同步协议** — 任何机器上的 Hermes Agent 读取此文件后，应遵循以下 SOP：
>
> 1. **启动时** — git pull aimemory 项目，读取此文件恢复上下文
> 2. **对话中** — 正常交互，记录新的记忆和用户信息
> 3. **对话结束前** — 将此文件更新为最新状态（记忆 + 用户偏好 + 会话摘要）
> 4. **推送** — git add/commit/push，让其他机器共享更新
>
> 每台机器既是记忆的消费者，也是生产者。
>
> 💡 **新机器入口**：用户说出 **"恢复记忆"** 即触发以上完整流程。

生成时间: 2026-05-09 10:58
上次更新机器: MacBook (10.17.17.x)

---

## 1. Memory (我的笔记)

- **触发词"恢复记忆"** — 用户说出这4个字，立即 git pull aimemory 项目，读取 `hermes_internal_memory.md` 恢复全部跨机器上下文。这是任何机器上第一次使用时的入口。
- Docker-executor deploy fixes: Aliyun mirror for Alpine/Debian, block-style rsync/env in YAML, build frontend in CI to avoid slow remote node builds, drop container_name for compose.
- In the `anyverse` project (`project/grid` branch): `realsense2_camera_msgs` is in `ros2_ws_4xx/src/d4xx` (not `l515`). If foxglove_bridge is missing topics/packages, uncomment them in `config/products/grid.json` and fix their `exclude_paths`. Target 10.17.1.23 uses port `8022` for SSH, while its `sshutils` backend runs on `18888`.
- For anyverseconfigadmin CI deployments using shell executors across isolated target hosts (e.g., from 10.17.0.22 to 10.17.1.23), ensure the `gitlab-runner` system user on the runner host has SSH key-based authentication properly authorized on the target host's target user (e.g., `wujie`).
- When editing nested-block config files (Nginx, JSON, etc.), NEVER use line-offset deletion (e.g., sed '+6d'). Always verify matching brackets with syntax checks (like `nginx -t`) before and after changes.
- PPUS Feishu bot (cli_a9c0f5ad977a1ccd): push-only bot, @mentions must use TEXT message type. DM to 许诺/李俊 fails → use group @oc_06573d34b1b756a52e095b3caa300adf. Cron schedule: daily 07:00 fetch pai (2-day, dedup), 10:00 check_tags (7 days), Monday 08:00 weekly report, 1st of month 08:30 monthly report. Web service at 10.17.8.42:19001.
- 放风小程序 (formerly 灯火 dengHuo): /Users/wujie22qx/dengHuo — Node.js/Express + MySQL Docker (10.17.8.42:30306, db: walle). Frontend miniprogram/, backend server/ (port 3001). Mini-program AppID: wx3a6b2d6cf0f3f48a. Brand "放风", dark green theme.
- **跨机器记忆同步协议**: 所有机器上，每次对话开始先 git pull aimemory 项目，读 hermes_internal_memory.md 恢复上下文，对话结束后更新此文件 + snapshot，最后 git push。每台机器既是消费者也是生产者。

## 2. User Profile (用户信息)

- User's name is Patrick (孙子宸).
- CI/CD deployment: remote docker compose builds without app registry, root-cause explanations expected. Safety first in shared envs — read-only inspection only; no fixes without authorization.
- Patrick's Feishu bot is push-only, no DM.
- User expects direct Feishu document links and sharing with 孙家奇 and AI群管理员.
- GitHub: 1sunzichen.
- memory.oldphoto.site = VitePress on Cloudflare Pages.
- AI study in ~/other/AI学习/.
- CRITICAL: read actual files first before proposing changes. Never delete files without explicit confirmation.

## 3. Past Session Summaries (跨会话历史)

*（每台机器在对话结束后，在此追加或更新最近的会话摘要）*

### 2026-05-09 — 建立跨机器记忆同步体系
- **背景**: aimemory 项目已 git 化，用作所有机器的共享记忆中枢
- **关键决策**: 约定触发词 **"恢复记忆"** — 用户说出即触发 pull → 读 internal_memory → 恢复全部上下文
- **每台机器 SOP**: pull → 读 internal_memory → 对话 → 更新 → push
- **新增文件**: `hermes_internal_memory.md`（结构化记忆导出，机器可读）
- **README 更新**: 加入跨机器工作流说明
- **目标**: 任意机器上输入"恢复记忆" → 恢复全部机器的所有上下文

---

*此文件由各机器轮流维护。任何机器读取后，应按 SOP 继续更新。*
