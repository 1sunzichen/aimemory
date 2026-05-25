---
layout: page
---

# 🎯 30 天 AI Agent 工程师冲刺计划

> 每天 4 小时 · 高二基础可上手 · 目标：能独立开发 RAG + Agent + 微调 · 对标 20K+ AI 工程师

<p style="color:#94a3b8; font-size:13px; margin-bottom:32px;">
核心原则：每天只学一个概念，立刻写代码验证。不读论文，不看公式，不动手等于白学。
</p>

## 📅 Week 1 · LLM 入门 + Prompt Engineering

| 天 | 主题 | 做什么 | 产出 |
|----|------|--------|------|
| 1 | 调通 API | 注册 DeepSeek/OpenAI，Python 发第一个请求，打印回复 | `hello_llm.py` |
| 2 | 对话循环 | 写一个命令行聊天程序，能连续对话 | `chat.py` |
| 3 | Prompt 基础 | 同一个问题用 4 种 prompt（零样本/少样本/CoT/角色），对比输出 | `prompt_lab.py` + 对比笔记 |
| 4 | System Prompt | 给模型设定人设（"你是一个毒舌代码审查员"），玩一晚上 | `system_prompt.py` |
| 5 | Function Calling | 让 LLM 调用你的 Python 函数，做一个能查天气/算数学的工具 | `function_call.py` |
| 6 | 结构化输出 | 让 LLM 返回 JSON，解析后用代码处理 | `structured_output.py` |
| 7 | 周项目 | 做一个"命令行 AI 助手"：能聊天 + 能调工具 + 返回 JSON | `week1_assistant.py` |

**这周需要装的：**
```
pip install openai  # 或者 pip install anthropic
```

---

## 📅 Week 2 · RAG 检索增强生成

| 天 | 主题 | 做什么 | 产出 |
|----|------|--------|------|
| 8 | Embedding | 用 `sentence-transformers` 把 10 句话变成向量，比较相似度 | `embedding_demo.py` |
| 9 | 向量数据库 | 安装 Chroma，把 20 篇文档存进去，做相似度搜索 | `chroma_demo.py` |
| 10 | 切块策略 | 同一篇长文，试 3 种切法（固定/重叠/按段落），对比检索效果 | `chunking_lab.py` |
| 11 | RAG 串联 | Embed → Retrieve → Prompt → Generate，完整跑通 | `rag_pipeline.py` |
| 12 | RAG 优化 | 加 Query Rewrite（模糊问题改写），对比命中率提升 | `query_rewrite.py` |
| 13 | RAG UI | 用 Streamlit 或 Gradio 给 RAG 加个网页界面 | `rag_ui.py` |
| 14 | 周项目 | 做一个"个人知识库"：喂你的笔记/文档，随时提问 | `my_knowledge_base/` |

**这周需要装的：**
```
pip install chromadb sentence-transformers streamlit
```

---

## 📅 Week 3 · AI Agent 开发

| 天 | 主题 | 做什么 | 产出 |
|----|------|--------|------|
| 15 | ReAct 原理 | 读懂 Thought → Action → Observation 循环，看 2 个示例 | 笔记 |
| 16 | ReAct 手写 | 纯 Python 实现 ReAct Agent（search + calculator 两个工具） | `react_agent.py` |
| 17 | 多工具 Agent | 加到 4 个工具（搜索/计算/天气/日期），Agent 自动选 | `multi_tool_agent.py` |
| 18 | LangChain Agent | 用 LangChain 的 create_react_agent 重写，对比代码量 | `langchain_agent.py` |
| 19 | 记忆系统 | 给 Agent 加短期记忆（对话历史）+ 长期记忆（存文件/数据库） | `agent_memory.py` |
| 20 | AutoGPT 风格 | 让 Agent 自己拆任务、自己执行、自己检查结果 | `auto_agent.py` |
| 21 | 周项目 | 做一个能联网搜索 + 总结 + 存笔记的 Agent | `research_agent/` |

**这周需要装的：**
```
pip install langchain langchain-community tavily-python
```

---

## 📅 Week 4 · 微调 + 工程化 + 求职

| 天 | 主题 | 做什么 | 产出 |
|----|------|--------|------|
| 22 | LoRA 概念 | 理解"不训练全量参数，只训练一小撮"，不碰公式 | 笔记 |
| 23 | 准备数据 | 用上周的 Agent 自动生成 100 条训练数据（JSONL） | `training_data.jsonl` |
| 24 | 微调实战 | Colab 免费 GPU，Qwen2.5-0.5B + LoRA，跑通 3 个 epoch | Colab notebook |
| 25 | 模型评估 | 微调前后各跑 20 个 case，对比输出质量 | `eval_results.md` |
| 26 | 部署上线 | 把 RAG + Agent 部署到 HuggingFace Spaces 或 Railway | 公网可访问的链接 |
| 27 | 写简历项目 | 把 4 周做的 4 个项目写成简历 bullet point | `resume_projects.md` |
| 28 | 面试准备 | 准备 10 个常见面试题的回答（Agent 原理/RAG 流程/微调经验） | `interview_qa.md` |
| 29 | 刷题 | 在 Boss 直聘/拉勾投 5 份 AI Agent 岗位，看反馈 | 投递记录 |
| 30 | 复盘 + 下一步 | 整理作品集 GitHub，写一篇技术博客总结 | `portfolio.md` |

**这周需要装的：**
```
# Colab 上跑（不需要本地 GPU）
!pip install transformers peft datasets accelerate bitsandbytes
```

---

## 🗺️ 4 周能力地图

```
Week1: LLM API → Prompt → Function Call
          ↓
Week2: Embedding → Chroma → RAG Pipeline
          ↓
Week3: ReAct → Multi-Tool → Auto Agent
          ↓
Week4: LoRA → 部署 → 简历 → 投递
```

---

## ⚡ 每天 4 小时怎么分配

```
前 30 分钟：看一个概念（B站/博客，中文即可）
中间 2 小时：写代码（必须跑通，不跑通不算完）
后 1 小时：调试 + 理解刚才跑通的代码
最后 30 分钟：写 200 字笔记（今天做了什么，踩了什么坑）
```

---

## 🧰 你需要装的东西（一次性）

```bash
pip install openai chromadb sentence-transformers streamlit langchain langchain-community
```

不需要 GPU。不需要 Docker。不需要配环境。Python 3.9+ 即可。

---

## ❌ 这 30 天不学的东西

- Transformer 论文原文
- 反向传播数学推导
- PyTorch/TensorFlow 底层
- 从零训练模型
- RNN/LSTM/CNN
- 高等数学

以上都是**入行后才补的**，不是入门门槛。先上车，再补票。
