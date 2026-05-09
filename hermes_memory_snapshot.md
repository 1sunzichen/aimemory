# Hermes memory snapshot

说明：
这不是系统底层数据库导出，而是我当前会话中可见、正在使用的“记忆摘要”与“用户偏好摘要”的整理版，方便你在桌面外层文件夹直接查看。

生成时间：当前会话

---

## 1. 当前记忆摘要（memory）

1. 帮你起草和优化过一篇 Aquaflow 在北京新发地的周度公益行动小红书文案，建议采用“真实记录 / 轻公益纪实风”，避免过度宣传风。
2. 选过一组更适合作为封面和顺序的图片，建议叙事顺序为：出发 -> 路上 -> 遇见 -> 分发 -> 收尾。
3. 产出过可复用的小红书标题、封面标题和正文草稿，主题围绕给建筑工人发香蕉和瓶装水，并提到“就近采买、精准触达”。
4. 提醒过若干候选图片里有 “Photographer” 水印，建议换无水印原图或裁剪后再发。
5. 你的当前项目上下文之一是 `/Users/wujie22qx/FSD/anyverseconfigadmin`，涉及 FastAPI 后端、Nginx 前端和 MQTT 服务，运行在 Docker 化环境中。
6. 你之前遇到过 Mac arm64 与 CI amd64 的跨架构构建问题，最终通过在 x86_64 目标机原生构建并推送 GitLab runner deploy 镜像解决。
7. 你之前遇到过 Harbor 认证 / registry 问题，关键点是 insecure-registries 需要带端口，例如 `10.17.1.25:8001`，不能只写 IP 或域名。
8. 对 anyverseconfigadmin 的 Docker-executor 部署，之前总结过一些高频修复点：
   - Alpine apk 源切到 mirrors.aliyun.com
   - rsync / env 脚本用 block 风格避免 YAML quoting 问题
   - 前端在 CI 构建并把 `frontend/dist` 带到部署阶段，避免远端慢速 node build
   - Debian apt 源切 Aliyun，并裁剪不必要包
   - 删除固定 `container_name`，并清理历史容器名冲突
9. 我知道你说的"22 机器"不是当前这个会话所在的 macOS，而是一台单独的 Linux 机器。
10. aimemory 项目已 git 化，位于 `/Users/wujie22qx/Desktop/aimemory`。约定：每天首次对话前先 git pull，对话结束后更新 hermes_memory_snapshot.md，不定期 git add/commit/push。

---

## 2. 当前用户偏好摘要（user profile）

1. 对 anyverseconfigadmin，你倾向“目标机远程 docker compose 构建部署”，而不是依赖应用镜像仓库；并希望看到 CI / 部署失败的根因解释。
2. 你偏好使用 `docker compose` 做部署，而不是退回到单独的 `docker build/run`。如果 compose 失败，宁可明确失败，也不要偷偷改成别的部署方式。
3. 你希望敏感信息，比如 `SSHPASS`，放在 CI/CD variables 里，而不是硬编码进脚本。
4. 你希望 Feishu 文档创建后给直接链接，并按用户 ID / 群 ID 分享给指定对象。
5. 当你明确要求时，你接受我直接改仓库、提交 git 变更。
6. 你喜欢分步骤排查，并希望我主动做端到端验证，而不是只给一大坨命令。
7. 对 Aquaflow 网站记录类文案，你偏好温和自然版文风，也喜欢把近期行动记录和后续活动预告融合成一篇公众号风格文章。
8. 你很看重“可供团队复盘的 troubleshooting 文档”，希望任何成员都能从日志快速定位并解释部署问题。

---

## 3. 这份快照的用途建议

你可以把这份文件当作：
- 我当前已知背景的人工可读版
- 以后让我继续做 anyverse / 部署 / 文档类任务时的上下文参考
- 你自己检查“我记住了什么”的外部快照

---

## 4. 备注

1. 这份内容是摘要版，不是完整历史对话导出。
2. 它反映的是“我当前能看到并会用于帮助你的稳定信息”。
3. 如果你愿意，我后面还可以继续给你补两份：
   - `hermes_recent_work_summary.md`：按主题归纳最近做过的事
   - `hermes_preferences_short.md`：只保留最核心偏好，适合快速浏览
