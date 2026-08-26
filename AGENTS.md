# AGENTS.md — aimemory 项目约定（AI 助手 / 协作者必读）

这是 Patrick（孙子宸）的个人知识库 + AI 学习项目。

- 仓库：`github.com/1sunzichen/aimemory`
- 站点：`memory.oldphoto.site`（VitePress + Cloudflare Pages，`git push` 后自动部署，无需手动部署步骤）
- AI 助手接口：`functions/api/chat.js`（Cloudflare Pages Functions，与站点同域 `/api/chat`）

---

## 学习记录同步约定（重要，每次操作本项目都要遵守）

学习笔记统一放在 `docs/ai-learning-notes/`，一篇笔记一个 `.md`，文件名用英文短横线（如 `react-agent-handwritten.md`）。

1. **上传学习记录** = 把新写的笔记 `git add` + `commit` + `push` 到 GitHub。Pages 会自动部署到站点。
2. **更新项目 / 加载学习记录** = 操作本项目前先 `git pull`，把 GitHub 上最新的学习笔记同步下来，再开始改。
3. **每新增一篇笔记，必须同步更新 `docs/ai-learning-notes/index.md` 的目录表**（加一行，含简介）。
4. 笔记风格：中文、讲「原理 + 通俗类比」、结尾加「相关笔记」交叉链接。

学习代码（如 `react_agent.py`）不在本项目里，放在独立的 `~/react-agent-learning`、`~/langchain-learning` 等项目，本项目只沉淀「笔记/文档」。

---

## 常用命令

```bash
cd /home/anyverse/aimemory
git pull                                    # 先同步学习记录
# ... 写笔记、更新 index.md ...
git add docs/ai-learning-notes/
git commit -m "docs: add <主题> note"
git push
```
