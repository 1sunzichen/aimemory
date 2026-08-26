# LangChain 框架主题代码

30 天计划之前的 LangChain 框架学习，3 个渐进示例。

| 文件 | 讲什么 |
|------|--------|
| `01_basic_chain.py` | LCEL 基础链：`prompt \| llm \| parser`，理解管道符 |
| `02_structured_output.py` | 结构化输出：用 Pydantic 定义 schema，拿到字段不是字符串 |
| `03_langgraph_reflection.py` | LangGraph 反思循环：图 + 状态，支持循环/分支/回溯 |

## 运行（venv，Mac/WSL 通用）

```bash
cd ~/aimemory/learning-code/langchain
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env        # 填入 DEEPSEEK_API_KEY
python 01_basic_chain.py
```

相关笔记见 `docs/ai-learning-notes/`。
