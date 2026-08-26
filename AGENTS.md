# AGENTS.md — aimemory 项目约定（AI 助手 / 协作者必读）

这是 Patrick（孙子宸）的个人知识库 + AI 学习项目。

- 仓库：`github.com/1sunzichen/aimemory`
- 站点：`memory.oldphoto.site`（VitePress + Cloudflare Pages，`git push` 后自动部署，无需手动部署步骤）
- AI 助手接口：`functions/api/chat.js`（Cloudflare Pages Functions，与站点同域 `/api/chat`）

---

## 学习记录同步约定（重要，每次操作本项目都要遵守）

学习笔记统一放在 `docs/ai-learning-notes/`，一篇笔记一个 `.md`，文件名用英文短横线（如 `react-agent-handwritten.md`）。

学习代码统一放在 `learning-code/`，**按主题分**（如 `learning-code/agent/react-agent/`），每个主题一个目录，含代码 + README + `.env.example`。

1. **上传学习记录** = 把新写的笔记/代码 `git add` + `commit` + `push` 到 GitHub。Pages 会自动部署到站点。
2. **更新项目 / 加载学习记录** = 操作本项目前先 `git pull`，把 GitHub 上最新的学习笔记和代码同步下来，再开始改。
3. **每新增一篇笔记，必须同步更新 `docs/ai-learning-notes/index.md` 的目录表**（加一行，含简介）。
4. 笔记风格：中文、讲「原理 + 通俗类比」、结尾加「相关笔记」交叉链接。

### 代码目录的 .env / .venv 约定

- 每个代码目录自带 `.gitignore`：`.env`（含 API key）和 `.venv` **一律不入库、不提交**。
- 换机器后跑代码：`git pull` 拿到代码 → `python3 -m venv .venv` → `pip install -r requirements.txt` → `cp .env.example .env` 填 key → `python xxx.py`（用 Python 自带 venv，Mac/WSL 通用，不依赖 uv）。

---

## 常用命令

```bash
cd /home/anyverse/aimemory
git pull                                    # 先同步学习记录（笔记 + 代码）
# ... 写笔记 / 代码、更新 index.md ...
git add docs/ learning-code/
git commit -m "docs: add <主题> note"
git push
```
