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
<!-- Phase 0 exercises -->
  <details class="exercise-block p0-ex">
    <summary>Practice Phase 0: Math Prep (3 exercises)</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">Ex 0-1</div><div class="ex-content"><strong>Hand-calculate Self-Attention</strong><p>Given 3 words with 2D vectors. Calculate the 3x3 attention score matrix, apply softmax per row, and compute weighted V outputs. Verify with NumPy.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 0-2</div><div class="ex-content"><strong>Implement Gradient Descent with NumPy</strong><p>Minimize f(x,y)=x^2+2xy+3y^2. Start at (3,2), lr=0.1, 20 iterations. Print (x,y,f) each step.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 0-3</div><div class="ex-content"><strong>Implement Softmax + Cross-Entropy</strong><p>Given logits=[2.0,1.0,0.1] with correct index 0. Implement softmax and cross-entropy loss in NumPy.</p></div></div>
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
<!-- Phase 1 exercises -->
  <details class="exercise-block p1-ex">
    <summary>Practice Phase 1: Foundations (4 exercises)</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">Ex 1-1</div><div class="ex-content"><strong>Implement Scaled Dot-Product Attention from scratch</strong><p>Use only numpy. Support multi-head with shape (batch,heads,seq,d_k). Test that attention weights sum to 1 per row.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 1-2</div><div class="ex-content"><strong>Compare three tokenizers</strong><p>Load BPE (GPT-2), WordPiece (BERT), SentencePiece (LLaMA) via HuggingFace. Tokenize the same Chinese-English text. Compare token count and quality.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 1-3</div><div class="ex-content"><strong>Read Transformer paper, write 500-word summary</strong><p>Focus on Section 3. Explain Self-Attention, Multi-Head, Positional Encoding. Answer: why scale by sqrt(d_k)?</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 1-4</div><div class="ex-content"><strong>Prompt Engineering comparison</strong><p>Pick one task. Test zero-shot, few-shot (3 examples), Chain-of-Thought, and role-playing prompts. Compare quality in 300 words.</p></div></div>
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
<!-- Phase 2 exercises -->
  <details class="exercise-block p2-ex">
    <summary>Practice Phase 2: LLM Core (4 exercises)</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">Ex 2-1</div><div class="ex-content"><strong>LoRA fine-tuning (Colab free GPU)</strong><p>Use Qwen2.5-0.5B + HuggingFace PEFT. Prepare 50 JSONL training examples. Fine-tune with LoRA (r=8, alpha=16), 3 epochs. Compare outputs before/after.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 2-2</div><div class="ex-content"><strong>Implement DPO Loss</strong><p>Code the DPO loss function from scratch. Given chosen/rejected log probabilities, verify that higher chosen probability yields lower loss.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 2-3</div><div class="ex-content"><strong>In-Context Learning experiment</strong><p>Same task across 0/1/3/5-shot + CoT. Tabulate accuracy. Plot shot count vs. performance.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 2-4</div><div class="ex-content"><strong>Context window boundary test</strong><p>Place answer at 10%/50%/90% of a long document. Test at 4K/8K/16K/32K context lengths. Plot the Lost in the Middle curve.</p></div></div>
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
<!-- Phase 3 exercises -->
  <details class="exercise-block p3-ex">
    <summary>Practice Phase 3: RAG (5 exercises)</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">Ex 3-1</div><div class="ex-content"><strong>Build RAG pipeline from scratch</strong><p>Chroma + sentence-transformers + LLM API. Index 20 documents. Implement embed, retrieve top-5, generate. Test with 10 questions. Bonus: Gradio UI.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 3-2</div><div class="ex-content"><strong>Chunking strategy comparison</strong><p>Compare Fixed-size (0 overlap), Fixed-size (128 overlap), and Semantic Chunking. Measure top-3 hit rate on 10 questions.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 3-3</div><div class="ex-content"><strong>Implement Hybrid Search</strong><p>BM25 + vector search with RRF fusion. Compare pure vector vs. pure BM25 vs. hybrid top-5 accuracy.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 3-4</div><div class="ex-content"><strong>Query Rewrite for better retrieval</strong><p>Write an LLM prompt to rewrite vague queries. Test 10 colloquial questions. Compare top-3 hit rate before/after. Bonus: implement HyDE.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 3-5</div><div class="ex-content"><strong>Evaluate RAG with RAGAS</strong><p>Install ragas. Generate 20 Q&A pairs from your RAG system. Evaluate Faithfulness, Answer Relevancy, Context Precision, Context Recall.</p></div></div>
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
<!-- Phase 4 exercises -->
  <details class="exercise-block p4-ex">
    <summary>Practice Phase 4: ReAct and Agent (4 exercises)</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">Ex 4-1</div><div class="ex-content"><strong>Implement ReAct loop from scratch</strong><p>Pure Python (no LangChain). Define search + calculator tools. Implement Thought, Action, Observation loop. Test multi-step tasks.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 4-2</div><div class="ex-content"><strong>Function Calling calculator agent</strong><p>Use OpenAI/Claude Function Calling API. Define add/subtract/multiply/divide tools with JSON Schema. Handle errors like division by zero.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 4-3</div><div class="ex-content"><strong>Multi-tool orchestration agent</strong><p>Three tools: web_search, calculator, get_weather. Agent auto-selects tool order. Add FINAL_ANSWER termination. Test multi-step reasoning.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 4-4</div><div class="ex-content"><strong>LangChain Agent vs. native comparison</strong><p>Same task: find CEO, search CEO age. Implement with LangChain create_react_agent and native Python + OpenAI API. Compare LOC, control, debuggability.</p></div></div>
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
<!-- Phase 5 exercises -->
  <details class="exercise-block p5-ex">
    <summary>Practice Phase 5: Engineering (4 exercises)</summary>
    <div class="ex-body">
      <div class="ex-item"><div class="ex-num">Ex 5-1</div><div class="ex-content"><strong>Quantize and compare models</strong><p>Use llama.cpp to quantize Qwen2.5-7B to Q4_K_M, Q5_K_M, Q8_0. Compare model size, load time, and output quality (human score 1-5).</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 5-2</div><div class="ex-content"><strong>Deploy vLLM and benchmark</strong><p>Start vLLM server with Qwen2.5-7B. Benchmark QPS and latency at concurrency 1/4/8/16/32. Test with and without prefix caching.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 5-3</div><div class="ex-content"><strong>Write an evaluation script</strong><p>Create 20-question eval set (JSON). Use GPT-4 as LLM-as-Judge. Compute average score, std dev, per-category scores. Compare 2 models.</p></div></div>
      <div class="ex-item"><div class="ex-num">Ex 5-4</div><div class="ex-content"><strong>Prompt Caching cost analysis</strong><p>Construct 4000-token system prompt + 2000-token user prompt. Call OpenAI/Anthropic APIs. Track cached_tokens. Calculate daily savings for 1000 calls.</p></div></div>
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
