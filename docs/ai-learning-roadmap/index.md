---
layout: page
---

<div class="rw">
<div class="container">
  <h1>🧠 AI 大模型学习路线图</h1>
  <p class="subtitle">从基础到实战，系统化掌握 LLM / RAG / ReAct / Agent · 点击任意卡片直达学习资源</p>

  <!-- Phase 0: 数学预科 -->
  <div class="phase p0">
    <div class="phase-header">
      <div class="phase-num">0</div>
      <div class="phase-title">数学预科 · 高中生入门必读</div>
    </div>
    <div class="p0-banner">
      <strong>📌 适合人群：</strong>仅有高中数学基础，首次接触 AI · 建议先学完本章再进入 Phase 1<br>
      <strong>⏱ 预计周期：</strong>9 周 · 每天 1 小时 · 三门核心：线性代数 → 微积分（梯度）→ 概率论
    </div>
    <div class="rw-grid">
      <div class="rw-card" onclick="document.getElementById('math-tutorial').open=true;document.getElementById('math-tutorial').scrollIntoView({behavior:'smooth'})">
        <div class="card-label">线性代数（Week 1–4）</div>
        <div class="card-sub">向量 · 矩阵乘法 · 点积 · 余弦相似度 · 低秩分解（LoRA 原理）</div>
        <span class="rw-tag">⭐⭐⭐ 最重要</span>
      </div>
      <div class="rw-card" onclick="document.getElementById('math-tutorial').open=true;document.getElementById('math-tutorial').scrollIntoView({behavior:'smooth'})">
        <div class="card-label">微积分 · 梯度下降（Week 5–7）</div>
        <div class="card-sub">导数 · 偏导数 · 链式法则 · 梯度下降 · 反向传播直觉</div>
        <span class="rw-tag">⭐⭐⭐ 最重要</span>
      </div>
      <div class="rw-card" onclick="document.getElementById('math-tutorial').open=true;document.getElementById('math-tutorial').scrollIntoView({behavior:'smooth'})">
        <div class="card-label">概率论与统计（Week 8–9）</div>
        <div class="card-sub">Softmax · 交叉熵损失 · 期望 · KL 散度 · 贝叶斯直觉</div>
        <span class="rw-tag">⭐⭐ 重要</span>
      </div>
      <a class="rw-card" href="https://space.bilibili.com/88461692/channel/seriesdetail?sid=1528929" target="_blank">
        <div class="card-label">推荐：线性代数的本质 <span class="zh-badge">B站</span></div>
        <div class="card-sub">3Blue1Brown 动画版 · 中文字幕 · 16集每集10分钟 · 直觉优先无痛入门</div>
        <span class="rw-tag">免费</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://zh.d2l.ai/chapter_preliminaries/index.html" target="_blank">
        <div class="card-label">推荐：动手学深度学习 第2章 <span class="zh-badge">中文</span></div>
        <div class="card-sub">李沐著 · 数学 + Python 代码同步讲解 · 专为 AI 入门者设计</div>
        <span class="rw-tag">免费</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://www.khanacademy.org/math/linear-algebra" target="_blank">
        <div class="card-label">推荐：Khan Academy 线性代数</div>
        <div class="card-sub">全免费 · 从零开始 · 含练习题和即时反馈</div>
        <span class="rw-tag">免费</span>
        <span class="card-arrow">↗</span>
      </a>
    </div>
<!-- 📝 工位练习：Phase 0 -->
  <details class="exercise-block p0-ex">
    <summary>📝 工位练习 · 数学预科（3 项 · 纯手算 + 代码，不看视频）</summary>
    <div class="ex-body">
      <div class="ex-item">
        <div class="ex-num">练习 0-1</div>
        <div class="ex-content">
          <strong>手算 Self-Attention（草稿纸即可）</strong>
          <p>给定 3 个词，每词 2 维向量：q1=[1,0], k1=[1,1], v1=[2,0]；q2=[0,1], k2=[0,1], v2=[1,1]；q3=[1,1], k3=[1,0], v3=[0,2]。<br>① 算出 3x3 attention 分数矩阵（S[i][j] = qi·kj）<br>② 每行做 softmax 归一化<br>③ 用权重加权 V 得到输出向量<br>④ 用 NumPy 写代码验证手算结果</p>
        </div>
      </div>
      <div class="ex-item">
        <div class="ex-num">练习 0-2</div>
        <div class="ex-content">
          <strong>NumPy 实现梯度下降</strong>
          <p>对 f(x,y) = x^2 + 2xy + 3y^2 做梯度下降。<br>① 手算偏导数<br>② 从 (3, 2) 出发，lr=0.1，迭代 20 步，打印每步的 (x, y, f)<br>③ 观察 f 是否收敛到 0，若不收敛调整学习率重试</p>
        </div>
      </div>
      <div class="ex-item">
        <div class="ex-num">练习 0-3</div>
        <div class="ex-content">
          <strong>手写 Softmax + 交叉熵损失</strong>
          <p>logits = [2.0, 1.0, 0.1]，正确类别索引为 0。<br>① 用 NumPy 实现 softmax<br>② 用 NumPy 实现交叉熵：loss = -log(P[correct])<br>③ 改大/改小正确类别的 logit，观察 loss 变化</p>
        </div>
      </div>
    </div>
  </details>
  </div>

  <MathTutorial />


  <!-- Phase 1 -->
  <div class="phase p1">
    <div class="phase-header">
      <div class="phase-num">1</div>
      <div class="phase-title">基础基石</div>
    </div>
    <div class="phase-desc">理解 AI 大模型底层原理，夯实基本功</div>
    <div class="rw-grid">
      <a class="rw-card" href="https://www.bilibili.com/video/BV1pu411o7BE" target="_blank">
        <div class="card-label">Transformer 架构 <span class="zh-badge">中文</span></div>
        <div class="card-sub">李沐精读《Attention Is All You Need》· Self-Attention · Multi-Head · Positional Encoding · 逐行代码讲解</div>
        <span class="rw-tag">必读</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://huggingface.co/learn/nlp-course/zh-CN/chapter6/1" target="_blank">
        <div class="card-label">Tokenization <span class="zh-badge">中文</span></div>
        <div class="card-sub">HuggingFace 官方中文课程 · BPE · WordPiece · SentencePiece · 词表构建与分词策略</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://huggingface.co/learn/nlp-course/zh-CN/chapter1/1" target="_blank">
        <div class="card-label">预训练 (Pretraining) <span class="zh-badge">中文</span></div>
        <div class="card-sub">HuggingFace 官方中文课程 · Next Token Prediction · Causal LM · Masked LM · 训练目标与数据</div>
        <span class="rw-tag">GPT</span><span class="rw-tag">BERT</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://www.promptingguide.ai/zh" target="_blank">
        <div class="card-label">Prompt Engineering <span class="zh-badge">中文</span></div>
        <div class="card-sub">官方中文版完整指南 · Few-shot · Chain-of-Thought · Instruction Tuning · 提示词设计最佳实践</div>
        <span class="rw-tag">入门必备</span>
        <span class="card-arrow">↗</span>
      </a>
    </div>
<!-- 📝 工位练习：Phase 1 -->
  <details class="exercise-block p1-ex">
    <summary>📝 工位练习 · 基础基石（4 项 · 读论文 + 写代码）</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">练习 1-1</div><div class="ex-content"><strong>从零实现 Scaled Dot-Product Attention</strong><p>只 import numpy，不调深度学习框架。实现 attention(Q,K,V,mask=None)，支持多头。随机矩阵测试验证输出形状。自写测试验证 attention weights 每行和 = 1。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 1-2</div><div class="ex-content"><strong>对比三种 Tokenizer 的分词效果</strong><p>HuggingFace 加载 BPE(GPT-2)、WordPiece(BERT)、SentencePiece(LLaMA)。同一段中英混合文本分词，记录 token 数量和切分结果。写 200 字总结：哪种对中文最友好？</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 1-3</div><div class="ex-content"><strong>精读 Transformer 论文，写 500 字笔记</strong><p>读 Attention Is All You Need，重点 Section 3。用自己话解释 Self-Attention / Multi-Head / Positional Encoding。画 Encoder-Decoder 结构图。回答：为什么要除以 sqrt(d_k)？</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 1-4</div><div class="ex-content"><strong>Prompt Engineering 对比实验</strong><p>选一个任务（翻译/摘要/分类），设计 4 种 prompt：零样本、少样本(3例)、Chain-of-Thought、角色扮演。记录输出质量，写 300 字对比分析。</p></div></div>
    </div>
  </details>
  </div>

  <!-- Phase 2 -->
  <div class="phase p2">
    <div class="phase-header">
      <div class="phase-num">2</div>
      <div class="phase-title">LLM 核心能力</div>
    </div>
    <div class="phase-desc">掌握模型的训练、微调和对齐技术</div>
    <div class="rw-grid">
      <a class="rw-card" href="https://huggingface.co/docs/peft" target="_blank">
        <div class="card-label">微调 (Fine-tuning)</div>
        <div class="card-sub">HuggingFace PEFT 官方文档 · SFT · 全量微调 vs LoRA/QLoRA · Adapter 机制 · 代码即文档</div>
        <span class="rw-tag">LoRA</span><span class="rw-tag">QLoRA</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://arxiv.org/abs/2305.18290" target="_blank">
        <div class="card-label">人类对齐 (Alignment)</div>
        <div class="card-sub">DPO 原论文 · RLHF · PPO · DPO · Reward Model · 偏好学习 · 比 PPO 更简单高效</div>
        <span class="rw-tag">DPO</span><span class="rw-tag">RLHF</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://arxiv.org/abs/2005.14165" target="_blank">
        <div class="card-label">上下文学习 (ICL)</div>
        <div class="card-sub">GPT-3 原论文 · In-Context Learning · 少样本推理 · 涌现能力 · Scaling Law</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://arxiv.org/abs/2104.09864" target="_blank">
        <div class="card-label">长上下文 & 位置编码</div>
        <div class="card-sub">RoPE 原论文 · YaRN · ALiBi · 旋转位置编码原理 · 长文本窗口扩展</div>
        <span class="card-arrow">↗</span>
      </a>
    </div>
<!-- 📝 工位练习：Phase 2 -->
  <details class="exercise-block p2-ex">
    <summary>📝 工位练习 · LLM 核心能力（4 项 · 微调 + 实验）</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">练习 2-1</div><div class="ex-content"><strong>LoRA 微调实战（Colab 免费 GPU）</strong><p>Qwen2.5-0.5B + HuggingFace PEFT，自备 50 条 JSONL 数据。LoRA(r=8,alpha=16)，微调 3 epoch。对比微调前后 5 个 case 的输出。保存 adapter，学会 merge 和 push 到 Hub。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 2-2</div><div class="ex-content"><strong>手写 DPO 损失函数</strong><p>不调库，用 NumPy/PyTorch 实现 DPO Loss。理解公式，给定 chosen/rejected 的 log prob 计算损失。构造数据验证：chosen 越高于 rejected 则 loss 越小。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 2-3</div><div class="ex-content"><strong>In-Context Learning 系统性实验</strong><p>同一分类任务，控制变量：0-shot、1-shot、3-shot、5-shot、5-shot+CoT。表格记录准确率，画折线图看 shot 数与效果的关系。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 2-4</div><div class="ex-content"><strong>"Lost in the Middle" 上下文窗口测试</strong><p>把答案放在文档 10%/50%/90% 位置，用 4K/8K/16K/32K 上下文测试。画"答案位置 vs 准确率"曲线。你的模型在哪个位置最容易"忘记"？</p></div></div>
    </div>
  </details>
  </div>

  <!-- Phase 3 -->
  <div class="phase p3">
    <div class="phase-header">
      <div class="phase-num">3</div>
      <div class="phase-title">RAG 检索增强生成</div>
    </div>
    <div class="phase-desc">让模型拥有外部知识，解决幻觉和时效性问题</div>
    <div class="rw-grid">
      <a class="rw-card" href="https://huggingface.co/blog/mteb" target="_blank">
        <div class="card-label">Embedding 模型</div>
        <div class="card-sub">文本向量化 · Sentence-BERT · BGE（国产优秀模型）· Text Embedding 横向对比</div>
        <span class="rw-tag">基础</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://docs.trychroma.com/" target="_blank">
        <div class="card-label">向量数据库</div>
        <div class="card-sub">Chroma · Milvus · Qdrant · Pinecone · 相似度搜索 (ANN) · 入门用 Chroma 最省事</div>
        <span class="rw-tag">Milvus</span><span class="rw-tag">Chroma</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://python.langchain.com/docs/how_to/#text-splitters" target="_blank">
        <div class="card-label">切块策略</div>
        <div class="card-sub">Fixed-size · Semantic Chunking · Recursive · 重叠窗口 · 段落感知 · 切不好 RAG 必差</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://arxiv.org/abs/2005.11401" target="_blank">
        <div class="card-label">检索增强 Pipeline</div>
        <div class="card-sub">RAG 原论文 · Query Rewrite · HyDE · Reranking · Multi-Query · Fusion</div>
        <span class="rw-tag">高级</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://www.elastic.co/guide/en/elasticsearch/reference/current/knn-search.html" target="_blank">
        <div class="card-label">混合搜索</div>
        <div class="card-sub">Dense + Sparse (BM25) · 权重融合 · RRF 算法 · 生产环境必备</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://www.microsoft.com/en-us/research/project/graphrag/" target="_blank">
        <div class="card-label">Graph RAG</div>
        <div class="card-sub">微软 GraphRAG · 知识图谱 + RAG · 实体关系检索 · 适合复杂知识库场景</div>
        <span class="rw-tag">前沿</span>
        <span class="card-arrow">↗</span>
      </a>
    </div>
<!-- 📝 工位练习：Phase 3 -->
  <details class="exercise-block p3-ex">
    <summary>📝 工位练习 · RAG 检索增强生成（5 项 · 搭系统 + 对比实验）</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">练习 3-1</div><div class="ex-content"><strong>从零搭建 RAG Pipeline</strong><p>Chroma + sentence-transformers + 任意 LLM API。准备 20 篇文档建向量索引。实现 query,embed,top-5 retrieve,prompt,generate 全流程。10 个预设问题测试，加分：Gradio UI。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 3-2</div><div class="ex-content"><strong>切块策略对比实验</strong><p>同一批文档，三种切法：Fixed-size 512(overlap=0)、Fixed-size 512(overlap=128)、Semantic Chunking。统计 10 个问题的 top-3 命中率。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 3-3</div><div class="ex-content"><strong>实现混合搜索（Hybrid Search）</strong><p>BM25 + 向量检索双路召回。rank-bm25 + Chroma，RRF 合并排序。对比纯向量 vs 纯 BM25 vs 混合的 top-5 准确率。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 3-4</div><div class="ex-content"><strong>Query Rewrite 提升检索命中率</strong><p>口语化问题转精确查询。准备 10 个模糊问题，对比改写前后的 top-3 命中率。加分：实现 HyDE（先生成假设答案再检索）。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 3-5</div><div class="ex-content"><strong>用 RAGAS 评估 RAG 系统质量</strong><p>安装 ragas，用你的 RAG 系统生成 20 条问答。评估 Faithfulness / Answer Relevancy / Context Precision / Context Recall 四个指标。针对最差指标改进 pipeline。</p></div></div>
    </div>
  </details>
  </div>

  <!-- Phase 4 -->
  <div class="phase p4">
    <div class="phase-header">
      <div class="phase-num">4</div>
      <div class="phase-title">ReAct & Agent 智能体</div>
    </div>
    <div class="phase-desc">让模型能推理、能行动、能使用工具</div>
    <div class="rw-grid">
      <a class="rw-card" href="https://arxiv.org/abs/2210.03629" target="_blank">
        <div class="card-label">ReAct 范式</div>
        <div class="card-sub">Reasoning + Acting 协同 · Thought / Action / Observation 循环 · Agent 的底层逻辑</div>
        <span class="rw-tag">核心</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://platform.openai.com/docs/guides/function-calling" target="_blank">
        <div class="card-label">Function Calling</div>
        <div class="card-sub">Tool Definition · 参数绑定 · 结构化输出 · OpenAI / Claude 原生支持 · Agent 的手</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://python.langchain.com/docs/modules/agents/" target="_blank">
        <div class="card-label">Agent 框架</div>
        <div class="card-sub">LangChain · AutoGPT · CrewAI · 记忆 / 规划 / 执行 · 快速搭建原型首选</div>
        <span class="rw-tag">LangChain</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://arxiv.org/abs/2305.10601" target="_blank">
        <div class="card-label">任务分解</div>
        <div class="card-sub">Plan-and-Solve · Tree-of-Thought · 子任务拆分 · 递归规划 · 复杂任务的关键</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://docs.crewai.com/" target="_blank">
        <div class="card-label">多智能体协作</div>
        <div class="card-sub">CrewAI · 对话式 · 辩论式 · 角色分工 · 共识机制 · 一个 Agent 搞不定就分工</div>
        <span class="rw-tag">高级</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://github.com/e2b-dev/awesome-ai-agents" target="_blank">
        <div class="card-label">代码执行 Agent</div>
        <div class="card-sub">Code Interpreter · REPL 沙箱 · 自我调试 · 代码生成闭环 · 参考项目合集</div>
        <span class="card-arrow">↗</span>
      </a>
    </div>
<!-- 📝 工位练习：Phase 4 -->
  <details class="exercise-block p4-ex">
    <summary>📝 工位练习 · ReAct & Agent（4 项 · 从零实现智能体）</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">练习 4-1</div><div class="ex-content"><strong>从零实现 ReAct 循环</strong><p>纯 Python，不用 LangChain。定义 search + calculator 两个工具。实现 Thought-Action-Observation 循环。解析 LLM 输出，执行工具，结果喂回下一轮。测试多步推理。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 4-2</div><div class="ex-content"><strong>Function Calling 实现智能计算器</strong><p>OpenAI/Claude Function Calling API。定义加减乘除四个工具(JSON Schema)。测试"三加五乘以二"的自动拆解。处理除零等异常。对比 Function Calling vs ReAct 两种范式。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 4-3</div><div class="ex-content"><strong>多工具编排 Agent</strong><p>搜索+计算+天气，三个工具一个 Agent。Agent 自动选择工具顺序，无需人工指定。加 FINAL_ANSWER 终止条件防止死循环。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 4-4</div><div class="ex-content"><strong>LangChain Agent vs 原生实现对比</strong><p>同一任务双实现：查公司名，找 CEO，搜 CEO 年龄。LangChain 版 vs 原生 Python+OpenAI API。从代码行数、可控性、调试难度写对比。</p></div></div>
    </div>
  </details>
  </div>

  <!-- Phase 5 -->
  <div class="phase p5">
    <div class="phase-header">
      <div class="phase-num">5</div>
      <div class="phase-title">工程化与进阶</div>
    </div>
    <div class="phase-desc">性能优化、部署、多模态等生产级能力</div>
    <div class="rw-grid">
      <a class="rw-card" href="https://github.com/ggerganov/llama.cpp" target="_blank">
        <div class="card-label">模型量化</div>
        <div class="card-sub">GGUF · GPTQ · AWQ · Bitsandbytes · 精度-性能权衡 · 本地跑大模型必看</div>
        <span class="rw-tag">部署</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://github.com/vllm-project/vllm" target="_blank">
        <div class="card-label">推理优化</div>
        <div class="card-sub">KV Cache · Flash Attention · Paged Attention · vLLM · TensorRT-LLM · 吞吐量翻倍</div>
        <span class="rw-tag">vLLM</span>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://github.com/vllm-project/vllm" target="_blank">
        <div class="card-label">模型服务</div>
        <div class="card-sub">vLLM OpenAI 兼容 Server · Triton · BentoML · 并发处理 · 批处理优化</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://github.com/haotian-liu/LLaVA" target="_blank">
        <div class="card-label">多模态</div>
        <div class="card-sub">Vision-Language (LLaVA) · 图像理解 · 音频 · 视频理解 · 趋势所向</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://github.com/explodinggradients/ragas" target="_blank">
        <div class="card-label">安全与评估</div>
        <div class="card-sub">红队测试 · 幻觉检测 · RAGAS（RAG 自动评估框架）· 护栏 · 上线前必过</div>
        <span class="card-arrow">↗</span>
      </a>
      <a class="rw-card" href="https://platform.openai.com/docs/guides/prompt-caching" target="_blank">
        <div class="card-label">缓存与成本</div>
        <div class="card-sub">Prompt Caching · Speculative Decoding · 成本管控 · 延迟优化 · 省钱神器</div>
        <span class="card-arrow">↗</span>
      </a>
    </div>
<!-- 📝 工位练习：Phase 5 -->
  <details class="exercise-block p5-ex">
    <summary>📝 工位练习 · 工程化与进阶（4 项 · 部署 + 优化 + 评估）</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">练习 5-1</div><div class="ex-content"><strong>模型量化对比实验</strong><p>llama.cpp 把 Qwen2.5-7B 量化为 Q4_K_M/Q5_K_M/Q8_0。记录模型大小、加载耗时、输出质量(人工1-5打分)。写结论：精度与速度如何取舍？</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 5-2</div><div class="ex-content"><strong>vLLM 部署与压测</strong><p>启动 vLLM 服务加载 Qwen2.5-7B。并发 1/4/8/16/32，记录 QPS 和平均延迟。开启 vs 关闭 prefix caching 各跑一轮。画出"并发 vs QPS"曲线。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 5-3</div><div class="ex-content"><strong>手写模型评估脚本</strong><p>自建 20 题评估集(JSON: question + reference_answer)。用 GPT-4 做 LLM-as-Judge 打分。自动统计：平均分、标准差、按分类得分。对比 2 个模型在你自建集上的表现。</p></div></div>
      <div class="ex-item"><div class="ex-num">练习 5-4</div><div class="ex-content"><strong>Prompt Caching 成本收益分析</strong><p>4000 token 系统 prompt + 2000 token 用户 prompt。调 OpenAI/Anthropic API，记录 cached_tokens。算账：日均 1000 次调用能省多少钱？什么场景下收益最大？</p></div></div>
    </div>
  </details>
  </div>

  <!-- 资源推荐 -->
  <div class="resources">
    <h2>📚 推荐学习资源</h2>
    <div class="res-grid">
      <div class="res-item">
        <h3>🇨🇳 中文课程（质量最高）</h3>
        <p>
          • <a href="https://zh.d2l.ai/" target="_blank">李沐《动手学深度学习》</a> — 中文，配套视频+代码<br>
          • <a href="https://www.bilibili.com/video/BV1pu411o7BE" target="_blank">李沐 Transformer 精读</a> — B站，逐行读论文<br>
          • <a href="https://www.promptingguide.ai/zh" target="_blank">Prompt Engineering 中文指南</a> — 官方翻译版<br>
          • <a href="https://huggingface.co/learn/nlp-course/zh-CN" target="_blank">HuggingFace NLP 课程中文版</a> — 官方出品
        </p>
      </div>
      <div class="res-item">
        <h3>🌍 英文精品（B站有字幕搬运）</h3>
        <p>
          • <a href="https://karpathy.ai/zero-to-hero.html" target="_blank">Andrej Karpathy Zero to Hero</a> — 从零手写 GPT，B站有中文字幕<br>
          • <a href="https://www.deeplearning.ai/courses/" target="_blank">DeepLearning.AI LLM 专项课</a> — 吴恩达出品，B站有搬运<br>
          • <a href="https://huggingface.co/learn/nlp-course" target="_blank">HuggingFace NLP Course</a> — 英文原版，代码更完整
        </p>
      </div>
      <div class="res-item">
        <h3>⚒️ 实战框架 & 工具</h3>
        <p>
          • <a href="https://python.langchain.com/" target="_blank">LangChain</a> / <a href="https://www.llamaindex.ai/" target="_blank">LlamaIndex</a> — RAG & Agent 框架<br>
          • <a href="https://github.com/vllm-project/vllm" target="_blank">vLLM</a> — 高性能推理引擎<br>
          • <a href="https://huggingface.co/" target="_blank">HuggingFace</a> Transformers + PEFT — 训练微调<br>
          • <a href="https://docs.trychroma.com/" target="_blank">Chroma</a> / <a href="https://milvus.io/" target="_blank">Milvus</a> — 向量数据库<br>
          • <a href="https://github.com/unslothai/unsloth" target="_blank">Unsloth</a> / <a href="https://github.com/OpenAccess-AI-Collective/axolotl" target="_blank">Axolotl</a> — 高效微调
        </p>
      </div>
      <div class="res-item">
        <h3>🗺️ 我的建议（按顺序来）</h3>
        <p>
          • 先看李沐 Transformer 精读，理解注意力机制<br>
          • 跑通一个 RAG demo（Chroma + 开源模型）<br>
          • 再实现一个 ReAct Agent（LangChain 或原生）<br>
          • 最后尝试用 LoRA 微调一个模型<br>
          • 每一步：看中文课 → 读原文 → 动手写代码
        </p>
      </div>
    </div>
    <div class="legend">
      <div class="legend-item"><div class="legend-dot" style="background:#fbbf24"></div> 数学预科</div>
      <div class="legend-item"><div class="legend-dot" style="background:#22d3ee"></div> 基础</div>
      <div class="legend-item"><div class="legend-dot" style="background:#34d399"></div> LLM 核心</div>
      <div class="legend-item"><div class="legend-dot" style="background:#a78bfa"></div> RAG</div>
      <div class="legend-item"><div class="legend-dot" style="background:#fb923c"></div> ReAct & Agent</div>
      <div class="legend-item"><div class="legend-dot" style="background:#fb7185"></div> 工程与进阶</div>
    </div>
  </div>
</div>
</div>
