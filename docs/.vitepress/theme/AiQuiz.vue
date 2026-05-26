<template>
  <div class="quiz-wrap">
    <h1 class="quiz-title">🧠 AI 基础自测</h1>
    <p class="subtitle">覆盖：Attention · Softmax · 求导 · 梯度下降 · 基础概念</p>
    <div class="score-bar">得分：<span class="score-num">{{ score }}</span> / {{ questions.length }}</div>

    <div v-if="finished" class="result-area">
      <div :class="['result-msg', resultCls]">{{ resultEmoji }} {{ score }}/{{ questions.length }}（{{ resultPct }}%）· {{ resultText }}</div>
      <button class="retake" @click="retake">🔄 重新做题</button>
      <a class="got-it" href="/ai-foundation-plain">📖 去「最简地基」补基础</a>
    </div>

    <div class="q-block" v-for="(q, i) in questions" :key="i" :class="states[i]">
      <div class="q-num">第 {{ i + 1 }} 题</div>
      <div class="q-text">{{ q.q }}</div>
      <div class="options">
        <div
          v-for="(opt, j) in q.opts"
          :key="j"
          :class="['opt', optClass(i, j)]"
          @click="select(i, j)"
        >{{ String.fromCharCode(65 + j) }}. {{ opt }}</div>
      </div>
      <div v-if="feedbacks[i]" :class="['feedback', feedbacks[i].cls]">{{ feedbacks[i].text }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const questions = [
  { q: "向量 [3, 4] 和 [6, 8] 是什么关系？", opts: ["完全相同", "方向一致，长度不同", "方向垂直", "没关系"], ans: 1, explain: "后一个恰好是前一个的 2 倍，方向相同，只差长度。点积会很大。" },
  { q: "AI 里的 Embedding 本质上是什么？", opts: ["一张图片", "把文字变成一串数字", "一种数据库", "一个文件格式"], ans: 1, explain: "Embedding = 向量。把词、句子、图片都变成机器能比较的数字串。" },
  { q: "向量 [1, 0] 和 [0, 1] 的点积是多少？", opts: ["1", "0", "2", "-1"], ans: 1, explain: "1×0 + 0×1 = 0，说明两个向量垂直，没有共同方向。" },
  { q: "Self-Attention 中，Q 的角色是什么？", opts: ["存储词的内容", "提问：我应该关注谁", "做归一化", "控制训练速度"], ans: 1, explain: "Q = Query = 查询 = 每个词向其他词发出的问题：谁跟我有关？" },
  { q: "Q·K^T 得到的是什么？", opts: ["词的新向量", "词和词之间的相关性打分表", "概率分布", "损失值"], ans: 1, explain: "结果是一个 n×n 矩阵，每格是词 i 对词 j 的原始分数。" },
  { q: "V（Value）在 Attention 中拿来干什么？", opts: ["算相似度", "做归一化", "作为每个词的实际内容，被加权求和", "决定学习率"], ans: 2, explain: "V = Value = 值 = 每个词携带的实际信息。用注意力权重加权 V，得到新表示。" },
  { q: "Q·K^T 公式里为什么要用转置 K^T？", opts: ["为了让数值变大", "为了让矩阵乘法维度对齐", "为了归一化", "为了求导方便"], ans: 1, explain: "Q 形状 [n,d]，K 形状 [n,d]。Q×K 中间 d≠n 不能乘。K^T 把 K 翻成 [d,n]，中间就对上了。" },
  { q: "Softmax 处理完的数字，三个加起来等于几？", opts: ["不一定", "1", "0", "看输入而定"], ans: 1, explain: "Softmax 输出就是概率分布，加起来一定 = 1（100%）。" },
  { q: "Softmax 里为什么要用 e^x 而不是直接用 x？", opts: ["因为好看", "把负数变正，才能归一化", "e 是论文作者生日", "为了加速计算"], ans: 1, explain: "直接用 x 会有负数，没法当概率。e^x 把所有数变正，再除以总和。" },
  { q: "为什么 e 而不是 10 或 2？主要是为了什么？", opts: ["e 算起来最快速", "e^x 求导 = e^x 本身最干净", "Wikipedia 推荐", "10^x 不合法"], ans: 1, explain: "e 是唯一让 (e^x)' = e^x 的底数。训练时求导不需要多乘系数。" },
  { q: "求导这个词，最接近的意思是什么？", opts: ["求变化速度", "求总和", "求平均值", "求最大值"], ans: 0, explain: "求导 = 某一瞬间的变化有多快。y=x^2 在 x=3 时的变化速度是 6。" },
  { q: "y = x^2 的导数是？", opts: ["y' = x", "y' = 2x", "y' = x^2", "y' = 2"], ans: 1, explain: "公式：x^n 求导 = n·x^(n-1)。x^2 → 2x^1 = 2x。" },
  { q: "常数（比如 100）求导等于多少？", opts: ["100", "1", "0", "不确定"], ans: 2, explain: "常数不变，变化速度永远是 0。在图上就是一条水平线。" },
  { q: "f(x,y) = x² + 2xy + 3y²，对 x 求偏导数 ∂f/∂x = ？", opts: ["2x + 2y", "2x + 6y", "x² + 2y", "2xy + 3y²"], ans: 0, explain: "对 x 求导时 y 当常数。x²→2x，2xy→2y（把 2y 当系数），3y²→0（纯 y 项）。" },
  { q: "偏导数跟普通导数最大的区别是？", opts: ["偏导数更慢", "偏导数有多个变量，求一个时把其他的当常数", "偏导数不需要极限", "偏导数结果更大"], ans: 1, explain: "普通导数只有一个变量。偏导数是多变量函数，求其中一个时把其他变量暂时冻住。" },
  { q: "梯度下降的核心步骤中，lr（learning rate）是干什么的？", opts: ["决定爬山方向", "决定每一步迈多大", "决定什么时候停止", "决定模型大小"], ans: 1, explain: "lr = 步长。太大一步跨过谷底，太小走到天黑。0.1 是常用默认值。" },
  { q: "梯度下降为什么叫'下降'？", opts: ["x 和 y 的值一直在变小", "损失函数的值一直在变小", "学习率一直在降低", "参数数量在减少"], ans: 1, explain: "目标是让 f(x,y) 最小化。每一步 f 都比上一步小，所以叫下降。" },
  { q: "如果 lr 设成 1，f(x,y)=x²+2xy+3y² 从 (3,2) 出发，会怎样？", opts: ["直接到谷底", "跨过谷底，来回震荡", "不动", "算出负数"], ans: 1, explain: "lr 太大 = 步子太大。第一步迈出 10 单位，直接冲到对面坡上，然后在谷底两边来回跳。" },
  { q: "欧拉数 e 大约等于多少？", opts: ["3.14", "1.41", "2.72", "0.69"], ans: 2, explain: "e ≈ 2.71828。类比：π ≈ 3.14 是圆周率，e ≈ 2.72 是自然对数的底。" },
  { q: "e 最直观的来历是什么？", opts: ["随机猜的", "从圆的周长算的", "连续复利的极限", "物理实验测的"], ans: 2, explain: "存 1 元，年利率 100%，无限次复利 → 极限是 e。lim (1+1/n)^n = e。" },
  { q: "Self-Attention 完整流程的正确顺序是？", opts: ["V → softmax → QK^T", "QK^T → softmax → ×V", "softmax → QK^T → V", "QK^T → V → softmax"], ans: 1, explain: "① Q·K^T 打分 ② softmax 变概率 ③ 用概率加权 V。记住：打分 → 归一化 → 取内容。" },
  { q: "AI Agent 跟普通聊天机器人最大的区别是？", opts: ["Agent 回复更快", "Agent 能自主调用工具完成任务", "Agent 用的模型更大", "Agent 有界面"], ans: 1, explain: "Agent 有手有脑——LLM 做决策 + 调用工具执行。聊天机器人只能回答，不能做事。" },
  { q: "RAG 的核心思想是什么？", opts: ["把模型训练得更大", "先搜外部资料，再让 LLM 基于资料回答", "用更快的内存", "让 LLM 自己编答案"], ans: 1, explain: "RAG = 检索增强生成。LLM 不知道的事，先帮它查资料，再把资料和问题一起给它。" },
  { q: "LoRA 微调跟全量微调的区别是？", opts: ["LoRA 不用数据", "LoRA 只训练一小部分参数，省显存", "LoRA 练出来质量更高", "LoRA 只能在 Colab 上用"], ans: 1, explain: "全量微调要改全部参数（7B 模型要几百 GB 显存）。LoRA 只调一小撮，普通显卡就能跑。" },
  { q: "Token 是什么意思？", opts: ["一种加密货币", "一个完整的句子", "LLM 处理文本的最小单位", "模型的文件格式"], ans: 2, explain: "LLM 不认汉字，认 Token。'你好世界'可能被切成 ['你','好','世界'] 或 ['你好','世界']。" },
]

const score = ref(0)
const answered = ref(0)
const states = ref(questions.map(() => ''))
const chosen = ref(questions.map(() => -1))
const feedbacks = ref(questions.map(() => null))
const finished = computed(() => answered.value === questions.length)
const resultPct = computed(() => Math.round(score.value / questions.length * 100))
const resultCls = computed(() => resultPct.value >= 85 ? 'great' : resultPct.value >= 60 ? 'good' : 'try-again')
const resultEmoji = computed(() => resultPct.value >= 85 ? '🎉' : resultPct.value >= 60 ? '👍' : '💪')
const resultText = computed(() => {
  if (resultPct.value >= 85) return '太强了！你对这些概念的掌握已经非常扎实。继续做项目吧！'
  if (resultPct.value >= 60) return '不错！基础概念已经建立。回看错题的解释，重点补那几个。'
  return '别灰心，这些概念本身就是研究生课程的内容。建议先看「最简地基」页面，再看错题。'
})

function optClass(i, j) {
  if (chosen.value[i] === -1) return ''
  const q = questions[i]
  if (j === q.ans) return 'correct-answer disabled'
  if (j === chosen.value[i]) return 'wrong-answer disabled'
  return 'disabled'
}

function select(i, j) {
  if (chosen.value[i] !== -1) return
  chosen.value[i] = j
  answered.value++
  const q = questions[i]
  if (j === q.ans) {
    score.value++
    states.value[i] = 'correct'
    feedbacks.value[i] = { cls: 'correct-fb', text: '✅ 正确！' + q.explain }
  } else {
    states.value[i] = 'wrong'
    feedbacks.value[i] = { cls: 'wrong-fb', text: '❌ 正确答案是 ' + String.fromCharCode(65 + q.ans) + '。' + q.explain }
  }
}

function retake() {
  score.value = 0
  answered.value = 0
  states.value = questions.map(() => '')
  chosen.value = questions.map(() => -1)
  feedbacks.value = questions.map(() => null)
  window.scrollTo(0, 0)
}
</script>

<style scoped>
.quiz-wrap { max-width: 720px; margin: 0 auto; padding: 40px 20px; }
.quiz-title { text-align: center; font-size: 28px; margin-bottom: 8px; background: linear-gradient(135deg, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { text-align: center; color: #64748b; font-size: 13px; margin-bottom: 8px; }
.score-bar { text-align: center; margin-bottom: 32px; font-size: 14px; color: #94a3b8; }
.score-num { color: #fbbf24; font-weight: 700; font-size: 18px; }
.q-block { background: rgba(30,41,59,0.6); border: 1px solid #334155; border-radius: 12px; padding: 20px 24px; margin-bottom: 16px; transition: all .2s; }
.q-block.correct { border-color: #34d399; background: rgba(52,211,153,0.06); }
.q-block.wrong { border-color: #fb7185; background: rgba(251,113,133,0.06); }
.q-num { font-size: 12px; color: #64748b; margin-bottom: 8px; }
.q-text { font-size: 15px; font-weight: 600; margin-bottom: 14px; line-height: 1.6; }
.options { display: flex; flex-direction: column; gap: 8px; }
.opt { padding: 10px 14px; border-radius: 8px; border: 1px solid #334155; cursor: pointer; font-size: 13px; transition: all .15s; color: #cbd5e1; }
.opt:hover:not(.disabled) { border-color: #22d3ee; background: rgba(34,211,238,0.08); }
.opt.correct-answer { border-color: #34d399; background: rgba(52,211,153,0.12); color: #34d399; }
.opt.wrong-answer { border-color: #fb7185; background: rgba(251,113,133,0.1); color: #fb7185; }
.opt.disabled { pointer-events: none; opacity: 0.7; }
.feedback { font-size: 12px; margin-top: 10px; padding: 8px 12px; border-radius: 6px; }
.correct-fb { background: rgba(52,211,153,0.1); color: #34d399; border: 1px solid rgba(52,211,153,0.2); }
.wrong-fb { background: rgba(251,113,133,0.1); color: #fb7185; border: 1px solid rgba(251,113,133,0.2); }
.result-area { margin-bottom: 24px; }
.result-msg { text-align: center; padding: 16px; border-radius: 10px; font-size: 15px; font-weight: 600; margin-bottom: 16px; }
.result-msg.great { background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #34d399; }
.result-msg.good { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); color: #fbbf24; }
.result-msg.try-again { background: rgba(251,113,133,0.1); border: 1px solid rgba(251,113,133,0.3); color: #fb7185; }
.retake { display: block; margin: 0 auto 12px; padding: 10px 32px; border-radius: 8px; border: 1px solid #fbbf24; background: rgba(251,191,36,0.1); color: #fbbf24; font-size: 14px; cursor: pointer; font-weight: 600; }
.retake:hover { background: rgba(251,191,36,0.2); }
.got-it { display: block; text-align: center; margin: 0 auto; padding: 6px 20px; border-radius: 6px; border: 1px solid #475569; color: #64748b; font-size: 12px; text-decoration: none; }
</style>
