# Hermes Internal Memory (Agent's Knowledge Base)

> 这个文件是我（Hermes Agent）的内部记忆导出。
> 任何机器上 pull 这个 git 后，我读取此文件即可恢复上下文。
> 自动维护，无需手动编辑。

生成时间: 2026-05-09 10:58

---

## 1. Memory (我的笔记)

- Docker-executor deploy fixes: Aliyun mirror for Alpine/Debian, block-style rsync/env in YAML, build frontend in CI to avoid slow remote node builds, drop container_name for compose.
- In the `anyverse` project (`project/grid` branch): `realsense2_camera_msgs` is in `ros2_ws_4xx/src/d4xx` (not `l515`). If foxglove_bridge is missing topics/packages, uncomment them in `config/products/grid.json` and fix their `exclude_paths`. Target 10.17.1.23 uses port `8022` for SSH, while its `sshutils` backend runs on `18888`.
- For anyverseconfigadmin CI deployments using shell executors across isolated target hosts (e.g., from 10.17.0.22 to 10.17.1.23), ensure the `gitlab-runner` system user on the runner host has SSH key-based authentication properly authorized on the target host's target user (e.g., `wujie`).
- When editing nested-block config files (Nginx, JSON, etc.), NEVER use line-offset deletion (e.g., sed '+6d'). Always verify matching brackets with syntax checks (like `nginx -t`) before and after changes.
- PPUS Feishu bot (cli_a9c0f5ad977a1ccd): push-only bot, @mentions must use TEXT message type. DM to 许诺/李俊 fails → use group @oc_06573d34b1b756a52e095b3caa300adf. Cron schedule: daily 07:00 fetch pai (2-day, dedup), 10:00 check_tags (7 days), Monday 08:00 weekly report, 1st of month 08:30 monthly report. Web service at 10.17.8.42:19001.
- 放风小程序 (formerly 灯火 dengHuo): /Users/wujie22qx/dengHuo — Node.js/Express + MySQL Docker (10.17.8.42:30306, db: walle). Frontend miniprogram/, backend server/ (port 3001). Mini-program AppID: wx3a6b2d6cf0f3f48a. Brand "放风", dark green theme.
- 每天首次对话流程: 先 git pull `/Users/wujie22qx/Desktop/aimemory`，对话结束后更新 hermes_memory_snapshot.md，不定期 git push。

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

*（这里由我定期更新最近的会话摘要，方便跨机器恢复上下文）*

### 2026-05-09 — 建立 cross-machine 记忆同步约定
- 约定每天首次对话先 git pull aimemory 项目
- 对话结束后更新 snapshot 并 git push
- 建立了 `hermes_internal_memory.md` 作为跨机器记忆传输文件

---

*下次会话：在新机器上读取此文件即可恢复以上所有上下文。*
