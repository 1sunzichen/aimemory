<template>
  <div class="quiz-wrap">
    <h1 class="quiz-title">🧠 AI 基础自测</h1>
    <p class="subtitle">覆盖：向量 · Attention · Softmax · 求导 · 梯度下降 · 基础概念</p>
    <div class="score-bar">
      得分：<span class="score-num">{{ score }}</span> / {{ selected.length }}
      <a v-if="wrongCount > 0" href="/ai-quiz/wrong/" class="wrong-badge">📕 错题本 {{ wrongCount }} 题</a>
    </div>

    <div v-if="finished" class="result-area">
      <div :class="['result-msg', resultCls]">{{ resultEmoji }} {{ score }}/{{ selected.length }}（{{ resultPct }}%）· {{ resultText }}</div>
      <button class="retake" @click="retake">🔄 重新出题</button>
      <a class="got-it" href="/ai-foundation-plain">📖 去「最简地基」补基础</a>
    </div>

    <div class="q-block" v-for="(q, i) in selected" :key="q.id" :class="states[i]">
      <div class="q-num">第 {{ i + 1 }} 题</div>
      <div class="q-text">{{ q.q }}</div>
      <div class="options">
        <div v-for="(opt, j) in q.opts" :key="j" :class="['opt', optClass(i, j)]" @click="select(i, j)">
          {{ String.fromCharCode(65 + j) }}. {{ opt }}
        </div>
      </div>
      <div v-if="feedbacks[i]" :class="['feedback', feedbacks[i].cls]">{{ feedbacks[i].text }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { questions, shuffle } from './questions.js'
import { addToWrong, markCorrect, getWrongCount } from './quizStore.js'

const QUIZ_SIZE = 25
const selected = ref([])
const score = ref(0)
const answered = ref(0)
const states = ref([])
const chosen = ref([])
const feedbacks = ref([])
const wrongCount = ref(0)

onMounted(() => {
  wrongCount.value = getWrongCount()
  init()
})

function init() {
  selected.value = shuffle(questions).slice(0, QUIZ_SIZE)
  states.value = selected.value.map(() => '')
  chosen.value = selected.value.map(() => -1)
  feedbacks.value = selected.value.map(() => null)
}

const finished = computed(() => answered.value === selected.value.length && selected.value.length > 0)
const resultPct = computed(() => selected.value.length ? Math.round(score.value / selected.value.length * 100) : 0)
const resultCls = computed(() => resultPct.value >= 85 ? 'great' : resultPct.value >= 60 ? 'good' : 'try-again')
const resultEmoji = computed(() => resultPct.value >= 85 ? '🎉' : resultPct.value >= 60 ? '👍' : '💪')
const resultText = computed(() => {
  if (resultPct.value >= 85) return '太强了！你对这些概念的掌握已经非常扎实。继续做项目吧！'
  if (resultPct.value >= 60) return '不错！基础概念已经建立。回看错题的解释，重点补那几个。'
  return '别灰心，这些概念本身就是研究生课程的内容。建议先看「最简地基」页面，再刷错题本。'
})

function optClass(i, j) {
  if (chosen.value[i] === -1) return ''
  const q = selected.value[i]
  if (j === q.ans) return 'correct-answer disabled'
  if (j === chosen.value[i]) return 'wrong-answer disabled'
  return 'disabled'
}

function select(i, j) {
  if (chosen.value[i] !== -1) return
  chosen.value[i] = j
  answered.value++
  const q = selected.value[i]
  if (j === q.ans) {
    score.value++
    states.value[i] = 'correct'
    const graduated = markCorrect(q.id)
    const extra = graduated ? ' ✨ 已从错题本移除！' : ''
    feedbacks.value[i] = { cls: 'correct-fb', text: '✅ 正确！' + q.explain + extra }
  } else {
    states.value[i] = 'wrong'
    addToWrong(q.id)
    feedbacks.value[i] = { cls: 'wrong-fb', text: '❌ 正确答案是 ' + String.fromCharCode(65 + q.ans) + '。' + q.explain + ' 已加入错题本。' }
  }
  wrongCount.value = getWrongCount()
}

function retake() {
  score.value = 0
  answered.value = 0
  wrongCount.value = getWrongCount()
  init()
  window.scrollTo(0, 0)
}
</script>

<style scoped>
.quiz-wrap { max-width: 720px; margin: 0 auto; padding: 40px 20px; }
.quiz-title { text-align: center; font-size: 28px; margin-bottom: 8px; background: linear-gradient(135deg, #22d3ee, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { text-align: center; color: #64748b; font-size: 13px; margin-bottom: 8px; }
.score-bar { text-align: center; margin-bottom: 32px; font-size: 14px; color: #94a3b8; display: flex; align-items: center; justify-content: center; gap: 12px; flex-wrap: wrap; }
.score-num { color: #fbbf24; font-weight: 700; font-size: 18px; }
.wrong-badge { background: rgba(251,113,133,0.12); border: 1px solid rgba(251,113,133,0.3); color: #fb7185; border-radius: 6px; padding: 3px 10px; font-size: 12px; text-decoration: none; font-weight: 600; }
.wrong-badge:hover { background: rgba(251,113,133,0.2); }
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
