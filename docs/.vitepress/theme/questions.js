export const questions = [
  // ===== Phase 0: 数学基础 =====
  { id:'p0_01', q:"向量 [3, 4] 和 [6, 8] 是什么关系？", opts:["完全相同","方向一致，长度不同","方向垂直","没关系"], ans:1, explain:"后一个恰好是前一个的 2 倍，方向相同，只差长度。点积会很大。", tags:['math','vector','phase0'] },
  { id:'p0_02', q:"向量 [1, 0] 和 [0, 1] 的点积是多少？", opts:["1","0","2","-1"], ans:1, explain:"1×0 + 0×1 = 0，说明两个向量垂直，没有共同方向。", tags:['math','vector','phase0'] },
  { id:'p0_03', q:"Softmax 处理完的数字，三个加起来等于几？", opts:["不一定","1","0","看输入而定"], ans:1, explain:"Softmax 输出就是概率分布，加起来一定 = 1（100%）。", tags:['math','softmax','phase0'] },
  { id:'p0_04', q:"Softmax 里为什么要用 e^x 而不是直接用 x？", opts:["因为好看","把负数变正，才能归一化","e 是论文作者生日","为了加速计算"], ans:1, explain:"直接用 x 会有负数，没法当概率。e^x 把所有数变正，再除以总和。", tags:['math','softmax','phase0'] },
  { id:'p0_05', q:"为什么选 e 而不是 10 或 2？主要是为了什么？", opts:["e 算起来最快速","e^x 求导 = e^x 本身最干净","Wikipedia 推荐","10^x 不合法"], ans:1, explain:"e 是唯一让 (e^x)' = e^x 的底数。训练时求导不需要多乘系数。", tags:['math','softmax','phase0'] },
  { id:'p0_06', q:"求导这个词，最接近的意思是什么？", opts:["求变化速度","求总和","求平均值","求最大值"], ans:0, explain:"求导 = 某一瞬间的变化有多快。y=x^2 在 x=3 时的变化速度是 6。", tags:['math','calculus','phase0'] },
  { id:'p0_07', q:"y = x^2 的导数是？", opts:["y' = x","y' = 2x","y' = x^2","y' = 2"], ans:1, explain:"公式：x^n 求导 = n·x^(n-1)。x^2 → 2x^1 = 2x。", tags:['math','calculus','phase0'] },
  { id:'p0_08', q:"常数（比如 100）求导等于多少？", opts:["100","1","0","不确定"], ans:2, explain:"常数不变，变化速度永远是 0。在图上就是一条水平线。", tags:['math','calculus','phase0'] },
  { id:'p0_09', q:"f(x,y) = x² + 2xy + 3y²，对 x 求偏导数 ∂f/∂x = ？", opts:["2x + 2y","2x + 6y","x² + 2y","2xy + 3y²"], ans:0, explain:"对 x 求导时 y 当常数。x²→2x，2xy→2y（把 2y 当系数），3y²→0（纯 y 项）。", tags:['math','calculus','phase0'] },
  { id:'p0_10', q:"偏导数跟普通导数最大的区别是？", opts:["偏导数更慢","偏导数有多个变量，求一个时把其他的当常数","偏导数不需要极限","偏导数结果更大"], ans:1, explain:"普通导数只有一个变量。偏导数是多变量函数，求其中一个时把其他变量暂时冻住。", tags:['math','calculus','phase0'] },
  { id:'p0_11', q:"梯度下降的核心步骤中，lr（learning rate）是干什么的？", opts:["决定爬山方向","决定每一步迈多大","决定什么时候停止","决定模型大小"], ans:1, explain:"lr = 步长。太大一步跨过谷底，太小走到天黑。0.1 是常用默认值。", tags:['math','training','phase0'] },
  { id:'p0_12', q:"梯度下降为什么叫'下降'？", opts:["x 和 y 的值一直在变小","损失函数的值一直在变小","学习率一直在降低","参数数量在减少"], ans:1, explain:"目标是让 f(x,y) 最小化。每一步 f 都比上一步小，所以叫下降。", tags:['math','training','phase0'] },
  { id:'p0_13', q:"如果 lr 设成 1，从 (3,2) 出发做梯度下降，会怎样？", opts:["直接到谷底","跨过谷底，来回震荡","不动","算出负数"], ans:1, explain:"lr 太大 = 步子太大。第一步迈出 10 单位，直接冲到对面坡上，然后在谷底两边来回跳。", tags:['math','training','phase0'] },
  { id:'p0_14', q:"欧拉数 e 大约等于多少？", opts:["3.14","1.41","2.72","0.69"], ans:2, explain:"e ≈ 2.71828。类比：π ≈ 3.14 是圆周率，e ≈ 2.72 是自然对数的底。", tags:['math','phase0'] },
  { id:'p0_15', q:"e 最直观的来历是什么？", opts:["随机猜的","从圆的周长算的","连续复利的极限","物理实验测的"], ans:2, explain:"存 1 元，年利率 100%，无限次复利 → 极限是 e。lim (1+1/n)^n = e。", tags:['math','phase0'] },

  // ===== Phase 1: 基础基石 =====
  { id:'p1_01', q:"AI 里的 Embedding 本质上是什么？", opts:["一张图片","把文字变成一串数字","一种数据库","一个文件格式"], ans:1, explain:"Embedding = 向量。把词、句子、图片都变成机器能比较的数字串。", tags:['llm','embedding','phase1'] },
  { id:'p1_02', q:"Self-Attention 中，Q 的角色是什么？", opts:["存储词的内容","提问：我应该关注谁","做归一化","控制训练速度"], ans:1, explain:"Q = Query = 查询 = 每个词向其他词发出的问题：谁跟我有关？", tags:['attention','transformer','phase1'] },
  { id:'p1_03', q:"Q·K^T 得到的是什么？", opts:["词的新向量","词和词之间的相关性打分表","概率分布","损失值"], ans:1, explain:"结果是一个 n×n 矩阵，每格是词 i 对词 j 的原始分数。", tags:['attention','transformer','phase1'] },
  { id:'p1_04', q:"V（Value）在 Attention 中拿来干什么？", opts:["算相似度","做归一化","作为每个词的实际内容，被加权求和","决定学习率"], ans:2, explain:"V = Value = 值 = 每个词携带的实际信息。用注意力权重加权 V，得到新表示。", tags:['attention','transformer','phase1'] },
  { id:'p1_05', q:"Q·K^T 公式里为什么要用转置 K^T？", opts:["为了让数值变大","为了让矩阵乘法维度对齐","为了归一化","为了求导方便"], ans:1, explain:"Q 形状 [n,d]，K 形状 [n,d]。Q×K 中间 d≠n 不能乘。K^T 把 K 翻成 [d,n]，中间就对上了。", tags:['attention','transformer','phase1'] },
  { id:'p1_06', q:"Self-Attention 完整流程的正确顺序是？", opts:["V → softmax → QK^T","QK^T → softmax → ×V","softmax → QK^T → V","QK^T → V → softmax"], ans:1, explain:"① Q·K^T 打分 ② softmax 变概率 ③ 用概率加权 V。记住：打分 → 归一化 → 取内容。", tags:['attention','transformer','phase1'] },
  { id:'p1_07', q:"Token 是什么意思？", opts:["一种加密货币","一个完整的句子","LLM 处理文本的最小单位","模型的文件格式"], ans:2, explain:"LLM 不认汉字，认 Token。'你好世界'可能被切成 ['你','好','世界'] 或 ['你好','世界']。", tags:['llm','tokenization','phase1'] },
  { id:'p1_08', q:"Attention 公式中为什么要除以 √d_k？", opts:["让结果更小更好看","防止点积过大导致 softmax 梯度消失","提高计算速度","归一化向量长度"], ans:1, explain:"d_k 越大，点积越大，softmax 会把大值推到 1、小值推到 0，梯度几乎为 0。除以 √d_k 让数值稳定。", tags:['attention','transformer','phase1'] },
  { id:'p1_09', q:"Multi-Head Attention（多头注意力）相比单头的优势是什么？", opts:["速度更快","能从不同角度同时关注不同位置的信息","参数更少","输出更长"], ans:1, explain:"多头 = 多个视角。一个头看语法关系，另一个头看语义关系，多头并行捕获更丰富的信息。", tags:['attention','transformer','phase1'] },
  { id:'p1_10', q:"Transformer 为什么需要位置编码（Positional Encoding）？", opts:["加快训练速度","Self-Attention 本身不知道词的顺序","让模型更小","防止过拟合"], ans:1, explain:"Self-Attention 是集合操作，打乱顺序结果不变。位置编码注入顺序信息，让模型知道词的位置。", tags:['transformer','phase1'] },

  // ===== Phase 2: LLM 核心能力 =====
  { id:'p2_01', q:"LoRA 微调跟全量微调的区别是？", opts:["LoRA 不用数据","LoRA 只训练一小部分参数，省显存","LoRA 练出来质量更高","LoRA 只能在 Colab 上用"], ans:1, explain:"全量微调要改全部参数（7B 模型要几百 GB 显存）。LoRA 只调一小撮，普通显卡就能跑。", tags:['finetuning','lora','phase2'] },
  { id:'p2_02', q:"RLHF 是什么？", opts:["一种数据格式","基于人类反馈的强化学习，让模型输出更符合人类偏好","一种分词方法","一种注意力机制"], ans:1, explain:"RLHF = Reinforcement Learning from Human Feedback。人类标注哪个回答更好，训练奖励模型，再用 PPO 优化 LLM。", tags:['alignment','phase2'] },
  { id:'p2_03', q:"DPO 相比 PPO 最大的优势是什么？", opts:["效果更好","不需要单独训练奖励模型，更简单稳定","速度更快","数据更少"], ans:1, explain:"PPO 需要奖励模型 + RL 循环，复杂不稳定。DPO 直接用偏好数据优化，去掉了奖励模型，训练更简单。", tags:['alignment','phase2'] },
  { id:'p2_04', q:"SFT（监督微调）的目的是什么？", opts:["让模型变小","让预训练模型学会遵从指令","让模型跑得更快","减少参数量"], ans:1, explain:"预训练模型只会续写文本，SFT 用指令-回答对训练，让模型学会按指令回答问题。", tags:['finetuning','phase2'] },
  { id:'p2_05', q:"交叉熵损失（Cross-Entropy Loss）在语言模型里衡量什么？", opts:["模型运行速度","预测的 token 概率分布和真实 token 之间的差距","模型大小","训练轮次"], ans:1, explain:"模型预测下一个 token 的概率，交叉熵衡量预测分布和真实答案的距离。越低说明预测越准。", tags:['training','phase2'] },

  // ===== Phase 3: RAG =====
  { id:'p3_01', q:"RAG 的核心思想是什么？", opts:["把模型训练得更大","先搜外部资料，再让 LLM 基于资料回答","用更快的内存","让 LLM 自己编答案"], ans:1, explain:"RAG = 检索增强生成。LLM 不知道的事，先帮它查资料，再把资料和问题一起给它。", tags:['rag','phase3'] },
  { id:'p3_02', q:"向量数据库中，两个向量的「余弦相似度」等于 1 意味着什么？", opts:["两个向量完全垂直","两个向量方向完全相同","两个向量长度相等","两个向量点积为 0"], ans:1, explain:"余弦相似度 = cosθ。θ=0° 时 cos=1，方向完全一致。RAG 用它找最相关的文档片段。", tags:['rag','embedding','phase3'] },
  { id:'p3_03', q:"RAG 中「切块（Chunking）」策略影响什么？", opts:["模型大小","检索到的内容是否完整和相关","训练速度","API 费用"], ans:1, explain:"切太小丢失上下文，切太大噪声多。好的切块策略决定检索质量，切不好 RAG 必差。", tags:['rag','phase3'] },
  { id:'p3_04', q:"LLM 产生「幻觉」（Hallucination）是指什么？", opts:["模型运行变慢","模型自信地生成不存在或错误的信息","模型拒绝回答","模型输出乱码"], ans:1, explain:"LLM 会编造听起来合理但实际不存在的信息。RAG 通过提供真实文档来缓解这个问题。", tags:['rag','llm','phase3'] },
  { id:'p3_05', q:"向量数据库的 top-k 检索是什么意思？", opts:["选最大的 k 个数","找和查询向量最相似的 k 个文档片段","前 k 个文档","k 次检索"], ans:1, explain:"把 query 变成向量，在向量库里找余弦相似度最高的 k 个文档片段，拼进 prompt 给 LLM。", tags:['rag','phase3'] },

  // ===== Phase 4: Agent =====
  { id:'p4_01', q:"AI Agent 跟普通聊天机器人最大的区别是？", opts:["Agent 回复更快","Agent 能自主调用工具完成任务","Agent 用的模型更大","Agent 有界面"], ans:1, explain:"Agent 有手有脑——LLM 做决策 + 调用工具执行。聊天机器人只能回答，不能做事。", tags:['agent','llm','phase4'] },
  { id:'p4_02', q:"ReAct 框架中，TAO 循环代表什么？", opts:["Train-Act-Output","Thought-Action-Observation","Test-Analyze-Output","Task-Assign-Output"], ans:1, explain:"Thought（思考要做什么）→ Action（调用工具）→ Observation（看结果）→ 循环直到完成任务。", tags:['agent','react','phase4'] },
  { id:'p4_03', q:"Function Calling 的作用是什么？", opts:["让模型跑得更快","让 LLM 能结构化地调用外部函数和工具","减少 token 用量","提高回答准确性"], ans:1, explain:"LLM 用 JSON 格式描述要调用哪个函数、参数是什么，程序解析后执行，结果再喂给 LLM。", tags:['agent','function-calling','phase4'] },
  { id:'p4_04', q:"Agent 为什么需要「记忆」？", opts:["提高计算速度","让 Agent 能跨对话记住用户信息和任务状态","减少 API 调用","让界面好看"], ans:1, explain:"LLM 本身无状态，每次调用独立。Agent 的记忆（短期/长期）让它能记住对话历史和执行进度。", tags:['agent','phase4'] },
  { id:'p4_05', q:"多 Agent 协作的核心思想是什么？", opts:["让一个 Agent 更强大","把复杂任务拆分给专门的 Agent 分工完成","减少 token 消耗","提高单次回答质量"], ans:1, explain:"一个 Agent 搞不定就分工——搜索 Agent + 写作 Agent + 检验 Agent 各司其职，协作完成复杂任务。", tags:['agent','phase4'] },

  // ===== Phase 5: 工程化 =====
  { id:'p5_01', q:"模型量化（Quantization）是什么意思？", opts:["增加模型参数","用更低精度（如 4-bit）表示模型权重，压缩大小","提高训练速度","增加模型层数"], ans:1, explain:"原来用 32-bit 或 16-bit 存权重，量化后用 4-bit 或 8-bit。模型变小，显存占用少，速度可能变快。", tags:['engineering','quantization','phase5'] },
  { id:'p5_02', q:"KV Cache 在推理时的作用是什么？", opts:["存储训练数据","缓存之前 token 的 Key/Value，避免重复计算","压缩模型权重","管理 GPU 内存"], ans:1, explain:"生成第 100 个 token 时，前 99 个 token 的 K、V 不需要重算。KV Cache 把它们存起来，大幅加速推理。", tags:['engineering','inference','phase5'] },
  { id:'p5_03', q:"Q4 量化和 Q8 量化相比，Q4 的主要缺点是什么？", opts:["速度更慢","精度损失更大","显存占用更大","不支持长文本"], ans:1, explain:"4-bit 用更少位数表示权重，压缩率更高但精度损失更大。Q8 精度更接近原始 float16。", tags:['engineering','quantization','phase5'] },
  { id:'p5_04', q:"vLLM 相比普通推理最大的优势是什么？", opts:["更少的显存","PagedAttention 大幅提升并发吞吐量","更好的回答质量","支持更多模型"], ans:1, explain:"vLLM 用 PagedAttention 动态管理 KV Cache，避免显存碎片，支持更多并发请求，吞吐量可提升数倍。", tags:['engineering','inference','phase5'] },
  { id:'p5_05', q:"评估 RAG 系统时，「Faithfulness」指标衡量什么？", opts:["回答是否流畅","回答是否忠实于检索到的上下文，没有幻觉","检索速度","文档覆盖率"], ans:1, explain:"Faithfulness（忠实度）= 模型回答有多少内容来自检索到的文档，而不是模型自己编造的。", tags:['engineering','evaluation','rag','phase5'] },
]

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function filterByTags(tags) {
  if (!tags || tags.length === 0) return questions
  return questions.filter(q => tags.some(t => q.tags.includes(t)))
}
