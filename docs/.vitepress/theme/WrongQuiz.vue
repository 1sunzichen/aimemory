<template>
  <div class="wq-wrap">
    <h1 class="wq-title">📕 错题本</h1>

    <div v-if="!loaded" class="wq-empty">加载中...</div>

    <div v-else-if="poolQuestions.length === 0" class="wq-empty">
      <div class="empty-icon">🎉</div>
      <div class="empty-text">错题本是空的！</div>
      <div class="empty-sub">去做一轮自测，答错的题会自动收录进来。</div>
      <a href="/ai-quiz/" class="go-quiz">去自测</a>
    </div>

    <template v-else>
      <p class="wq-sub">答对同一道题连续 <strong>5 次</strong>即可移出错题本</p>
      <div class="score-bar">
        剩余 <span class="count-num">{{ poolQuestions.length }}</span> 题 ·
        本轮得分 <span class="score-num">{{ score }}</span> / {{ answered }}
      </div>

      <div v-if="allGraduated" class="all-done">
        🎉 本轮全部答对！继续做可以稳固掌握。
        <button class="retake" @click="reload">再来一轮</button>
      </div>

      <div class="q-block" v-for="(q, i) in poolQuestions" :key="q.id" :class="states[i]">
        <div class="q-header">
          <span class="q-num">错题 {{ i + 1 }}</span>
          <span class="progress-dots">
            <span v-for="n in 5" :key="n" :class="['dot', n <= consecutives[i] ? 'filled' : '']"></span>
            <span class="progress-label">{{ consecutives[i] }}/5</span>
          </span>
        </div>
        <div class="q-text">{{ q.q }}</div>
        <div class="options">
          <div v-for="(opt, j) in q.opts" :key="j" :class="['opt', optClass(i, j)]" @click="select(i, j)">
            {{ String.fromCharCode(65 + j) }}. {{ opt }}
          </div>
        </div>
        <div v-if="feedbacks[i]" :class="['feedback', feedbacks[i].cls]">{{ feedbacks[i].text }}</div>
        <div v-if="graduated[i]" class="graduated-badge">✨ 已掌握，下次不再出现</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { questions } from './questions.js'
import { getWrongIds, getConsecutiveCorrect, addToWrong, markCorrect, getWrongCount } from './quizStore.js'

const loaded = ref(false)
const poolQuestions = ref([])
const states = ref([])
const chosen = ref([])
const feedbacks = ref([])
const graduated = ref([])
const consecutives = ref([])
const score = ref(0)
const answered = ref(0)

onMounted(() => {
  load()
  loaded.value = true
})

function load() {
  const ids = getWrongIds()
  const qMap = Object.fromEntries(questions.map(q => [q.id, q]))
  poolQuestions.value = ids.map(id => qMap[id]).filter(Boolean)
  states.value = poolQuestions.value.map(() => '')
  chosen.value = poolQuestions.value.map(() => -1)
  feedbacks.value = poolQuestions.value.map(() => null)
  graduated.value = poolQuestions.value.map(() => false)
  consecutives.value = poolQuestions.value.map(q => getConsecutiveCorrect(q.id))
}

function reload() {
  score.value = 0
  answered.value = 0
  load()
  window.scrollTo(0, 0)
}

const allGraduated = computed(() =>
  poolQuestions.value.length > 0 && poolQuestions.value.every((_, i) => chosen.value[i] !== -1)
)

function optClass(i, j) {
  if (chosen.value[i] === -1) return ''
  const q = poolQuestions.value[i]
  if (j === q.ans) return 'correct-answer disabled'
  if (j === chosen.value[i]) return 'wrong-answer disabled'
  return 'disabled'
}

function select(i, j) {
  if (chosen.value[i] !== -1) return
  chosen.value[i] = j
  answered.value++
  const q = poolQuestions.value[i]
  if (j === q.ans) {
    score.value++
    states.value[i] = 'correct'
    const isGraduated = markCorrect(q.id)
    consecutives.value[i] = isGraduated ? 5 : consecutives.value[i] + 1
    if (isGraduated) {
      graduated.value[i] = true
      feedbacks.value[i] = { cls: 'correct-fb', text: '✅ 正确！连续答对 5 次，已从错题本移除！' + q.explain }
    } else {
      feedbacks.value[i] = { cls: 'correct-fb', text: `✅ 正确！已连续答对 ${consecutives.value[i]} 次。${q.explain}` }
    }
  } else {
    states.value[i] = 'wrong'
    addToWrong(q.id)
    consecutives.value[i] = 0
    feedbacks.value[i] = { cls: 'wrong-fb', text: '❌ 正确答案是 ' + String.fromCharCode(65 + q.ans) + '。连续答对次数重置。' + q.explain }
  }
}
</script>

<style scoped>
.wq-wrap { max-width: 720px; margin: 0 auto; padding: 40px 20px; }
.wq-title { text-align: center; font-size: 28px; margin-bottom: 8px; background: linear-gradient(135deg, #fb7185, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.wq-sub { text-align: center; color: #64748b; font-size: 13px; margin-bottom: 8px; }
.score-bar { text-align: center; margin-bottom: 32px; font-size: 14px; color: #94a3b8; }
.count-num { color: #fb7185; font-weight: 700; font-size: 18px; }
.score-num { color: #fbbf24; font-weight: 700; font-size: 18px; }
.wq-empty { text-align: center; padding: 80px 20px; color: #64748b; }
.empty-icon { font-size: 48px; margin-bottom: 12px; }
.empty-text { font-size: 20px; font-weight: 700; color: #e2e8f0; margin-bottom: 8px; }
.empty-sub { font-size: 13px; margin-bottom: 24px; }
.go-quiz { display: inline-block; padding: 10px 28px; border-radius: 8px; border: 1px solid #22d3ee; background: rgba(34,211,238,0.1); color: #22d3ee; text-decoration: none; font-weight: 600; }
.all-done { text-align: center; padding: 16px; border-radius: 10px; background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #34d399; margin-bottom: 24px; font-weight: 600; }
.q-block { background: rgba(30,41,59,0.6); border: 1px solid #334155; border-radius: 12px; padding: 20px 24px; margin-bottom: 16px; transition: all .2s; }
.q-block.correct { border-color: #34d399; background: rgba(52,211,153,0.06); }
.q-block.wrong { border-color: #fb7185; background: rgba(251,113,133,0.06); }
.q-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.q-num { font-size: 12px; color: #64748b; }
.progress-dots { display: flex; align-items: center; gap: 4px; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: #334155; }
.dot.filled { background: #34d399; }
.progress-label { font-size: 11px; color: #64748b; margin-left: 4px; }
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
.graduated-badge { margin-top: 8px; font-size: 11px; color: #a78bfa; text-align: right; }
.retake { display: inline-block; margin-top: 12px; padding: 8px 24px; border-radius: 8px; border: 1px solid #34d399; background: rgba(52,211,153,0.1); color: #34d399; font-size: 13px; cursor: pointer; font-weight: 600; }
</style>
