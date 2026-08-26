# 手写 ReAct Agent

> 30 天 AI Agent 冲刺 · Day 16「手写 ReAct」—— 不用框架，纯 Python 实现 Thought → Action → Observation 循环。

## 这是什么

给 LLM 挂两个工具（`search` 搜索 + `calculator` 计算器），让它在「想一步 → 调工具 → 看结果 → 再想」的循环里完成多步推理，而不是一口气瞎猜答案。

串起三篇学习笔记：
- ReAct 循环（Thought → Action → Observation）
- Function Calling（工具调用机制）
- MCP 协议（工具生态标准）

## 目录结构

```
react-agent/
├── react_agent.py        # 核心代码（工具 + System Prompt + ReAct 主循环 + 测试）
├── pyproject.toml        # uv 项目定义（依赖 openai / python-dotenv / debugpy）
├── .env                  # 你的 DeepSeek key（已填好，勿提交 —— 已被 .gitignore 忽略）
├── .env.example          # key 模板（可提交）
├── .gitignore
├── README.md
└── .vscode/
    ├── settings.json     # 指定 Python 解释器为 .venv/bin/python
    └── launch.json       # F5 调试配置（debugpy）
```

## 快速开始（⚠️ 本项目在 Linux/WSL 环境，不是 Windows）

代码和虚拟环境都装在 **WSL（Ubuntu 24.04）的文件系统里**，Linux 路径是：

```
/home/anyverse/aimemory/learning-code/agent/react-agent/
```

对应的 Windows 资源管理器访问路径是：

```
\\wsl.localhost\Ubuntu\home\anyverse\aimemory\learning-code\agent\react-agent
```

### 第 0 步：配置 .env（新机器 / 首次运行必做）

`.env`（含 API key）不入库。换机器或首次 `git pull` 后没有 `.env`，先复制模板并填 key：

```bash
cd ~/aimemory/learning-code/agent/react-agent
cp .env.example .env
# 编辑 .env，把 DEEPSEEK_API_KEY=sk-xxxx 换成你的真实 key
```

### 第 1 步：确保 VSCode 装了 WSL 扩展

在 Windows 的 VSCode 里装扩展 **「WSL」(Remote - WSL)**（作者 Microsoft，扩展 ID `ms-vscode-remote.remote-wsl`）。

装好后，WSL 终端里会自动出现 `code` 命令。

### 第 2 步：打开项目（任选一种）

方式 A（推荐）：在 WSL 终端里
```bash
cd ~/aimemory/learning-code/agent/react-agent
code .
```

方式 B：VSCode 左下角绿色图标 →「连接到 WSL」→ File → Open Folder → 输入
```
/home/anyverse/aimemory/learning-code/agent/react-agent
```

方式 C：Windows 资源管理器地址栏输入 `\\wsl.localhost\Ubuntu\home\anyverse\aimemory\learning-code\agent\react-agent`

打开成功后，**VSCode 左下角会显示「WSL: Ubuntu」**，说明你已经在 Linux 环境里了。

### 第 3 步：选择 Python 解释器

打开 `react_agent.py`，VSCode 右下角若弹出「选择解释器」，选：

```
./.venv/bin/python
```

（这是 Linux 的 Python 3.12，`settings.json` 已帮你预设，通常会自动识别。）

### 运行

在 VSCode 集成终端里（快捷键 `` Ctrl+` ``）：
```bash
uv run python react_agent.py
```

（首次运行前先 `uv sync` 装依赖、建 `.venv`。）

### 调试（打断点，F5）

1. 在 `react_agent.py` 里某一行左侧点击打断点（红点）
   - 建议断在 `react_agent()` 里的 `resp = client.chat.completions.create(...)` 那一行
2. 按 `F5`，选「Python: 调试 react_agent.py」
3. 单步执行 `F10` / 进入函数 `F11` / 看变量（左侧「变量」面板看 `text`、`messages`、`observation`）

## 核心概念（结合代码看）

| 概念 | 在代码里的位置 |
|------|--------------|
| 工具白名单 | `search()` / `calculator()` 两个函数 |
| System Prompt 教格式 | `SYSTEM_PROMPT` 常量 |
| 程序驱动循环 | `react_agent()` 里的 `for step in ...` |
| 解析 LLM 输出 | `re.search(...)` 提取 Action / Final Answer |
| 工具结果喂回 | `messages.append({"role":"user","content":f"Observation: ..."})` |
| 安全求值 | `safe_eval()` 用 ast 白名单，防 LLM 注入 |

三个测试题都是「先 search 查事实 → 再 calculator 算数」的多步推理，观察 LLM 每步的 Thought 是怎么变化的。

## 下一步（Day 17）

多工具 Agent：再加「天气」「日期」等工具，让 Agent 自己判断该调哪个，而不是靠正则硬匹配。
