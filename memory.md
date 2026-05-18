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

- **触发词"恢复记忆"** — 用户说出这4个字，立即 git pull aimemory 项目，读取 `memory.md` 恢复全部跨机器上下文。这是任何机器上第一次使用时的入口。
- Docker-executor deploy fixes: Aliyun mirror for Alpine/Debian, block-style rsync/env in YAML, build frontend in CI to avoid slow remote node builds, drop container_name for compose.
- In the `anyverse` project (`project/grid` branch): `realsense2_camera_msgs` is in `ros2_ws_4xx/src/d4xx` (not `l515`). If foxglove_bridge is missing topics/packages, uncomment them in `config/products/grid.json` and fix their `exclude_paths`. Target 10.17.1.23 uses port `8022` for SSH, while its `sshutils` backend runs on `18888`.
- For anyverseconfigadmin CI deployments using shell executors across isolated target hosts (e.g., from 10.17.0.22 to 10.17.1.23), ensure the `gitlab-runner` system user on the runner host has SSH key-based authentication properly authorized on the target host's target user (e.g., `wujie`).
- When editing nested-block config files (Nginx, JSON, etc.), NEVER use line-offset deletion (e.g., sed '+6d'). Always verify matching brackets with syntax checks (like `nginx -t`) before and after changes.
- PPUS Feishu bot (cli_a9c0f5ad977a1ccd): push-only bot, @mentions must use TEXT message type. DM to 许诺/李俊 fails → use group @oc_06573d34b1b756a52e095b3caa300adf. Deployed to 10.17.0.22 (system crontab: 07:00 fetch/10:00 notify/Mon 08:00 weekly/1st monthly). 管理员王亚维(ou_2645c9dd...)已加入汇总接收人。发通知前必须先验证 PPUS_WEB_URL 链接可用。
- 放风小程序 (formerly 灯火 dengHuo): /Users/wujie22qx/dengHuo — Node.js/Express + MySQL Docker (10.17.8.42:30306, db: walle). Frontend miniprogram/, backend server/ (port 3001). Mini-program AppID: wx3a6b2d6cf0f3f48a. Brand "放风", dark green theme.
- **跨机器记忆同步协议**: 所有机器上，每次对话开始先 git pull aimemory 项目，读 memory.md 恢复上下文，对话结束后更新此文件 + snapshot，最后 git push。每台机器既是消费者也是生产者。

## 2. User Profile (用户信息)

- User's name is Patrick (孙子宸).
- CI/CD deployment: remote docker compose builds without app registry, root-cause explanations expected. Safety first in shared envs — read-only inspection only; no fixes without authorization.
- Patrick's Feishu bot is push-only, no DM.
- User expects direct Feishu document links and sharing with 孙家奇 and AI群管理员.
- GitHub: 1sunzichen.
- memory.oldphoto.site = VitePress on Cloudflare Pages.
- AI study in ~/other/AI学习/.
- CRITICAL: read actual files first before proposing changes. Never delete files without explicit confirmation.
- **对话规则**: 执行复杂任务前先说计划，等用户说"可以"再动手。已记入 memory 作为固定规则。

## 3. Past Session Summaries (跨会话历史)

*（每台机器在对话结束后，在此追加或更新最近的会话摘要）*

### 2026-05-09 — 建立跨机器记忆同步体系
- **背景**: aimemory 项目已 git 化，用作所有机器的共享记忆中枢
- **关键决策**: 约定触发词 **"恢复记忆"** — 用户说出即触发 pull → 读 internal_memory → 恢复全部上下文
- **每台机器 SOP**: pull → 读 memory.md → 对话 → 更新 → push
- **新增文件**: `memory.md`（原名 hermes_internal_memory.md）
- **README 更新**: 加入跨机器工作流说明
- **目标**: 任意机器上输入"恢复记忆" → 恢复全部机器的所有上下文

### 2026-05-18 — PPUS 报表新维度 + 31 机器部署 Part 1

- 报表新增 **项目维度**（DLC_项目_周/月/总汇总）和**部门维度**（DLC_部门_周/月/总汇总），共 27 张 Sheet
- 项目来自用户通过 `http://10.17.0.22:19001/tags/<pinyin>` 填写的 `project_tag` 字段
- 标签提醒**保持不变**：07:00 拉数据+发提醒，10:00 发提醒（之前误删后已还原）
- 删除了 `/etc/cron.d/issuego-deploy`（坏掉的 cron，不再需要）
- **10.17.17.31 Part 1 完成**：目录/脚本/venv/数据库/Web 服务已就绪（端口 19001）
- **Part 2 待做（2026-05-19）**：填 API Key → 验证 fetch_pai → 配置 crontab → systemd 自启
- 部署文档：`/home/wujie/FSD/ppus/docs/deploy.md`（22 和 31 的 crontab 都在里面）

### 2026-05-09 — PPUS 定时任务重建 + Web 服务自动启动 + 动态 IP
- PPUS Hermes 定时任务全部报错，删除旧任务并重建为直接 bash 调用
- 新增 `ppus-daily-fill-tag-remind` 每天 10:00 发填标签提醒给缺标签的人
- 重建 `ppus-daily-fetch-pai` 每天 07:00 拉取阿里云 PAI 数据
- 重建 `ppus-check-unknown-users` 每天 09:00 检查未登记用户
- `run.sh` 和 `daily_notify.sh` 集成 web_app.py 自动启动（保活检查，没跑就启动）
- 动态检测本机 LAN IP，自动拼 PPUS_WEB_URL，换机器/网络不用手动改
- 已部署到 10.17.0.22（sjqpc），web 服务运行中，系统 crontab 已设
- 管理员王亚维 (ou_2645c9dd6794ff083146a2b26e810728) 已加入汇总报表接收人

---

*此文件由各机器轮流维护。任何机器读取后，应按 SOP 继续更新。*
