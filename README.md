# aimemory — AI Memory & Cross-Machine Sync

`aimemory` 是 Hermes Agent 的跨机器记忆中枢，承载：

- 🧠 **内部记忆导出** — `hermes_internal_memory.md`（Agent 的记忆数据库 + 用户偏好 + 会话历史）
- 📸 **记忆快照** — `hermes_memory_snapshot.md`（人工可读版）
- 📄 **外部 artifacts 文档**
- 📋 **项目方案与部署说明**

## 🔄 跨机器工作流

任何机器上首次使用：

```bash
git clone git@github.com:1sunzichen/aimemory.git
cd aimemory
```

然后对 Hermes 说：
> "读一下 aimemory 里的 internal memory"

Hermes 就会读取 `hermes_internal_memory.md`，恢复之前所有机器上的记忆和上下文。

---

## 📖 原说明

推荐域名：`memory.oldphoto.site`

### 本地开发

```bash
npm install
npm run docs:dev
```

## 构建

```bash
npm run docs:build
npm run docs:preview
```

## 目录

- `docs/`：站点内容
- `docs/.vitepress/`：站点配置
- `docs/artifacts/`：原始 artifacts 和总结
- `docs/memory/`：记忆快照
- `docs/projects/`：项目规划文档
