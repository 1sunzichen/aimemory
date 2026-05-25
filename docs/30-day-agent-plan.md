---
layout: page
---

<style>
.sprint-wrap { max-width: 900px; margin: 0 auto; }
.sprint-wrap h1 { text-align: center; font-size: 28px; margin-bottom: 4px; background: linear-gradient(135deg, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.sprint-sub { text-align: center; color: #64748b; font-size: 13px; margin-bottom: 32px; }
.week { margin-bottom: 28px; }
.week h2 { font-size: 18px; font-weight: 700; margin-bottom: 4px; display: flex; align-items: center; gap: 8px; }
.week-desc { color: #64748b; font-size: 12px; margin-bottom: 14px; }
.day-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 8px; }
.day-card { background: rgba(30,41,59,0.5); border: 1px solid #334155; border-radius: 8px; padding: 10px 12px; font-size: 12px; transition: all .15s; }
.day-card:hover { transform: translateY(-1px); }
.day-num { font-size: 11px; font-weight: 800; margin-bottom: 4px; padding: 1px 6px; border-radius: 4px; display: inline-block; }
.day-topic { font-size: 12px; font-weight: 600; margin-bottom: 3px; }
.day-what { color: #94a3b8; font-size: 10px; line-height: 1.5; }
.day-out { margin-top: 6px; font-size: 10px; padding-top: 6px; border-top: 1px solid #1e293b; }
.pip-box { background: rgba(0,0,0,0.3); border: 1px solid #1e293b; border-radius: 6px; padding: 8px 12px; margin-top: 12px; font-size: 11px; font-family: 'Menlo', monospace; color: #a5f3fc; }
/* Week colors */
.w1 .day-num { background: rgba(34,211,238,0.15); color: #22d3ee; }
.w1 .day-card { border-left: 2px solid #22d3ee; }
.w1 h2 { color: #22d3ee; }
.w2 .day-num { background: rgba(52,211,153,0.15); color: #34d399; }
.w2 .day-card { border-left: 2px solid #34d399; }
.w2 h2 { color: #34d399; }
.w3 .day-num { background: rgba(167,139,250,0.15); color: #a78bfa; }
.w3 .day-card { border-left: 2px solid #a78bfa; }
.w3 h2 { color: #a78bfa; }
.w4 .day-num { background: rgba(251,146,60,0.15); color: #fb923c; }
.w4 .day-card { border-left: 2px solid #fb923c; }
.w4 h2 { color: #fb923c; }
.roadmap-box { background: rgba(30,41,59,0.4); border: 1px solid #334155; border-radius: 10px; padding: 20px 24px; margin: 32px 0; }
.roadmap-box h3 { font-size: 14px; color: #e2e8f0; margin-bottom: 12px; }
.roadmap-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.roadmap-step { padding: 8px 14px; border-radius: 6px; font-size: 12px; font-weight: 600; text-align: center; min-width: 100px; }
.roadmap-arrow { color: #475569; font-size: 18px; display: flex; align-items: center; }
.rs1 { background: rgba(34,211,238,0.1); color: #22d3ee; border: 1px solid rgba(34,211,238,0.2); }
.rs2 { background: rgba(52,211,153,0.1); color: #34d399; border: 1px solid rgba(52,211,153,0.2); }
.rs3 { background: rgba(167,139,250,0.1); color: #a78bfa; border: 1px solid rgba(167,139,250,0.2); }
.rs4 { background: rgba(251,146,60,0.1); color: #fb923c; border: 1px solid rgba(251,146,60,0.2); }
.tip-box { background: rgba(251,191,36,0.04); border: 1px solid rgba(251,191,36,0.2); border-radius: 10px; padding: 16px 20px; margin: 24px 0; }
.tip-box h3 { color: #fbbf24; font-size: 14px; margin-bottom: 8px; }
.tip-box p, .tip-box li { font-size: 12px; color: #94a3b8; line-height: 1.8; }
.dont-box { background: rgba(251,113,133,0.04); border: 1px solid rgba(251,113,133,0.2); border-radius: 10px; padding: 16px 20px; margin: 24px 0; }
.dont-box h3 { color: #fb7185; font-size: 14px; margin-bottom: 8px; }
.dont-box li { font-size: 12px; color: #94a3b8; line-height: 1.8; }
@media (max-width: 640px) {
  .day-grid { grid-template-columns: 1fr 1fr; }
  .roadmap-row { flex-direction: column; align-items: center; }
  .roadmap-arrow { display: none; }
}
</style>

<div class="sprint-wrap">

<h1>🎯 30 天 AI Agent 工程师冲刺</h1>
<p class="sprint-sub">每天 4 小时 · 高二基础可上手 · 不读论文 · 不推公式 · 只写代码</p>

<!-- Week 1 -->
<div class="week w1">
<h2><span style="font-size:24px;">①</span> Week 1 · LLM 入门 + Prompt</h2>
<div class="week-desc">目标：能调 API、会写 Prompt、让 LLM 调用你的函数</div>
<div class="day-grid">
  <div class="day-card"><div class="day-num">Day 1</div><div class="day-topic">调通 API</div><div class="day-what">注册 DeepSeek，发第一个请求</div><div class="day-out" style="color:#22d3ee;">hello_llm.py</div></div>
  <div class="day-card"><div class="day-num">Day 2</div><div class="day-topic">对话循环</div><div class="day-what">命令行聊天，连续对话</div><div class="day-out" style="color:#22d3ee;">chat.py</div></div>
  <div class="day-card"><div class="day-num">Day 3</div><div class="day-topic">Prompt 实验</div><div class="day-what">4 种策略对比：零样本/少样本/CoT/角色</div><div class="day-out" style="color:#22d3ee;">对比笔记</div></div>
  <div class="day-card"><div class="day-num">Day 4</div><div class="day-topic">System Prompt</div><div class="day-what">给模型设人设，玩一晚上</div><div class="day-out" style="color:#22d3ee;">system_prompt.py</div></div>
  <div class="day-card"><div class="day-num">Day 5</div><div class="day-topic">函数调用</div><div class="day-what">让 LLM 调你的 Python 函数</div><div class="day-out" style="color:#22d3ee;">function_call.py</div></div>
  <div class="day-card"><div class="day-num">Day 6</div><div class="day-topic">结构化输出</div><div class="day-what">返回 JSON，代码解析</div><div class="day-out" style="color:#22d3ee;">structured_output.py</div></div>
  <div class="day-card"><div class="day-num">Day 7</div><div class="day-topic">🎯 周项目</div><div class="day-what">命令行 AI 助手：聊天 + 调工具</div><div class="day-out" style="color:#22d3ee;">week1_assistant.py</div></div>
</div>
<div class="pip-box">pip install openai</div>
</div>

<!-- Week 2 -->
<div class="week w2">
<h2><span style="font-size:24px;">②</span> Week 2 · RAG 检索增强生成</h2>
<div class="week-desc">目标：从零搭一个知识库问答系统，给文档加 AI 搜索</div>
<div class="day-grid">
  <div class="day-card"><div class="day-num">Day 8</div><div class="day-topic">Embedding</div><div class="day-what">把句子变向量，比相似度</div><div class="day-out" style="color:#34d399;">embedding_demo.py</div></div>
  <div class="day-card"><div class="day-num">Day 9</div><div class="day-topic">向量数据库</div><div class="day-what">Chroma 存 20 篇文档，搜</div><div class="day-out" style="color:#34d399;">chroma_demo.py</div></div>
  <div class="day-card"><div class="day-num">Day 10</div><div class="day-topic">切块策略</div><div class="day-what">固定/重叠/语义，3 种对比</div><div class="day-out" style="color:#34d399;">chunking_lab.py</div></div>
  <div class="day-card"><div class="day-num">Day 11</div><div class="day-topic">RAG 串联</div><div class="day-what">Embed→搜→Prompt→生成</div><div class="day-out" style="color:#34d399;">rag_pipeline.py</div></div>
  <div class="day-card"><div class="day-num">Day 12</div><div class="day-topic">Query Rewrite</div><div class="day-what">模糊问题改写，提命中率</div><div class="day-out" style="color:#34d399;">query_rewrite.py</div></div>
  <div class="day-card"><div class="day-num">Day 13</div><div class="day-topic">RAG UI</div><div class="day-what">Streamlit 加网页界面</div><div class="day-out" style="color:#34d399;">rag_ui.py</div></div>
  <div class="day-card"><div class="day-num">Day 14</div><div class="day-topic">🎯 周项目</div><div class="day-what">个人知识库：喂笔记，提问</div><div class="day-out" style="color:#34d399;">my_knowledge_base/</div></div>
</div>
<div class="pip-box">pip install chromadb sentence-transformers streamlit</div>
</div>

<!-- Week 3 -->
<div class="week w3">
<h2><span style="font-size:24px;">③</span> Week 3 · AI Agent 开发</h2>
<div class="week-desc">目标：手写 Agent、多工具协作、让 AI 自己规划任务</div>
<div class="day-grid">
  <div class="day-card"><div class="day-num">Day 15</div><div class="day-topic">ReAct 原理</div><div class="day-what">Thought→Action→Observation</div><div class="day-out" style="color:#a78bfa;">笔记</div></div>
  <div class="day-card"><div class="day-num">Day 16</div><div class="day-topic">手写 ReAct</div><div class="day-what">纯 Python，search+calculator</div><div class="day-out" style="color:#a78bfa;">react_agent.py</div></div>
  <div class="day-card"><div class="day-num">Day 17</div><div class="day-topic">多工具 Agent</div><div class="day-what">搜索/计算/天气/日期自动选</div><div class="day-out" style="color:#a78bfa;">multi_tool_agent.py</div></div>
  <div class="day-card"><div class="day-num">Day 18</div><div class="day-topic">LangChain版</div><div class="day-what">框架重写，对比代码量</div><div class="day-out" style="color:#a78bfa;">langchain_agent.py</div></div>
  <div class="day-card"><div class="day-num">Day 19</div><div class="day-topic">记忆系统</div><div class="day-what">短期记忆+长期记忆</div><div class="day-out" style="color:#a78bfa;">agent_memory.py</div></div>
  <div class="day-card"><div class="day-num">Day 20</div><div class="day-topic">AutoGPT 风格</div><div class="day-what">自己拆任务、执行、检查</div><div class="day-out" style="color:#a78bfa;">auto_agent.py</div></div>
  <div class="day-card"><div class="day-num">Day 21</div><div class="day-topic">🎯 周项目</div><div class="day-what">联网搜索+总结+存笔记 Agent</div><div class="day-out" style="color:#a78bfa;">research_agent/</div></div>
</div>
<div class="pip-box">pip install langchain langchain-community tavily-python</div>
</div>

<!-- Week 4 -->
<div class="week w4">
<h2><span style="font-size:24px;">④</span> Week 4 · 微调 + 部署 + 求职</h2>
<div class="week-desc">目标：微调自己的模型、部署上线、投简历面试</div>
<div class="day-grid">
  <div class="day-card"><div class="day-num">Day 22</div><div class="day-topic">LoRA 概念</div><div class="day-what">只训一小撮参数，不碰公式</div><div class="day-out" style="color:#fb923c;">笔记</div></div>
  <div class="day-card"><div class="day-num">Day 23</div><div class="day-topic">准备数据</div><div class="day-what">Agent 自动生成 100 条 JSONL</div><div class="day-out" style="color:#fb923c;">training_data.jsonl</div></div>
  <div class="day-card"><div class="day-num">Day 24</div><div class="day-topic">微调实战</div><div class="day-what">Colab GPU，Qwen+LoRA，3 epoch</div><div class="day-out" style="color:#fb923c;">Colab notebook</div></div>
  <div class="day-card"><div class="day-num">Day 25</div><div class="day-topic">模型评估</div><div class="day-what">微调前后 20 个 case 对比</div><div class="day-out" style="color:#fb923c;">eval_results.md</div></div>
  <div class="day-card"><div class="day-num">Day 26</div><div class="day-topic">部署上线</div><div class="day-what">HuggingFace Spaces 或 Railway</div><div class="day-out" style="color:#fb923c;">公网链接</div></div>
  <div class="day-card"><div class="day-num">Day 27</div><div class="day-topic">写简历</div><div class="day-what">4 个项目写成 bullet point</div><div class="day-out" style="color:#fb923c;">resume_projects.md</div></div>
  <div class="day-card"><div class="day-num">Day 28</div><div class="day-topic">面试准备</div><div class="day-what">10 个常见题自问自答</div><div class="day-out" style="color:#fb923c;">interview_qa.md</div></div>
  <div class="day-card"><div class="day-num">Day 29</div><div class="day-topic">投简历</div><div class="day-what">Boss/拉勾投 5 份 AI Agent 岗</div><div class="day-out" style="color:#fb923c;">投递记录</div></div>
  <div class="day-card"><div class="day-num">Day 30</div><div class="day-topic">🎯 复盘</div><div class="day-what">整理 GitHub 作品集+写博客</div><div class="day-out" style="color:#fb923c;">portfolio.md</div></div>
</div>
<div class="pip-box"># Colab 上跑（不需要本地 GPU）<br>!pip install transformers peft datasets accelerate bitsandbytes</div>
</div>

<!-- Roadmap -->
<div class="roadmap-box">
<h3>🗺️ 4 周能力地图</h3>
<div class="roadmap-row">
  <div class="roadmap-step rs1">LLM API<br>Prompt<br>Function Call</div>
  <div class="roadmap-arrow">→</div>
  <div class="roadmap-step rs2">Embedding<br>Chroma<br>RAG 系统</div>
  <div class="roadmap-arrow">→</div>
  <div class="roadmap-step rs3">ReAct<br>Multi-Tool<br>Auto Agent</div>
  <div class="roadmap-arrow">→</div>
  <div class="roadmap-step rs4">LoRA<br>部署<br>简历投递</div>
</div>
</div>

<!-- Tips -->
<div class="tip-box">
<h3>⚡ 每天 4 小时怎么分</h3>
<p>
<span style="color:#fbbf24;">前 30 分钟</span> · 看一个概念（B站/博客，中文即可）<br>
<span style="color:#fbbf24;">中间 2 小时</span> · 写代码，必须跑通<br>
<span style="color:#fbbf24;">后 1 小时</span> · 调试 + 理解代码<br>
<span style="color:#fbbf24;">最后 30 分</span> · 写 200 字笔记
</p>
</div>

<div class="pip-box" style="margin-bottom:24px;">
<b>一次性装完所有依赖：</b><br>
pip install openai chromadb sentence-transformers streamlit langchain langchain-community<br>
<span style="color:#94a3b8;">不需要 GPU · 不需要 Docker · Python 3.9+ 即可</span>
</div>

<div class="dont-box">
<h3>❌ 这 30 天不学的东西</h3>
<ul>
<li>Transformer 论文原文</li>
<li>反向传播数学推导</li>
<li>PyTorch/TensorFlow 底层</li>
<li>从零训练模型、RNN/LSTM/CNN</li>
<li>高等数学</li>
</ul>
<p style="margin-top:8px; color:#64748b;">以上入行后再补。先上车，再补票。</p>
</div>

</div>
