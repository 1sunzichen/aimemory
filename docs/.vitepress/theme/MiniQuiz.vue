<template>
  <details class="mq-wrap">
    <summary class="mq-summary">
      📝 {{ title }} · {{ displayQuestions.length }} 题
      <span v-if="wrongCount > 0" class="mq-wrong-hint">· 错题已收录</span>
    </summary>
    <div class="mq-body">
      <div v-if="finished" class="mq-result" :class="resultCls">
        {{ resultEmoji }} {{ score }}/{{ displayQuestions.length }}（{{ resultPct }}%）· {{ resultText }}
        <button class="mq-retake" @click.stop="retake">🔄 重来</button>
      </div>
      <div class="mq-score">得分：<span class="mq-score-num">{{ score }}</span> / {{ displayQuestions.length }}</div>
      <div class="mq-q" v-for="(q, i) in displayQuestions" :key="q.id" :class="states[i]">
        <div class="mq-q-num">Q{{ i + 1 }}</div>
        <div class="mq-q-text">{{ q.q }}</div>
        <div class="mq-opts">
          <div v-for="(opt, j) in q.opts" :key="j" :class="['mq-opt', optClass(i, j)]" @click="select(i, j)">
            {{ String.fromCharCode(65 + j) }}. {{ opt }}
          </div>
        </div>
        <div v-if="feedbacks[i]" :class="['mq-fb', feedbacks[i].cls]">{{ feedbacks[i].text }}</div>
      </div>
    </div>
  </details>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { questions, shuffle, filterByTags } from './questions.js'
import { addToWrong, markCorrect, getWrongCount } from './quizStore.js'

const props = defineProps({
  tags: { type: Array, default: () => [] },
  count: { type: Number, default: 5 },
  title: { type: String, default: '阶段自测' },
})

const displayQuestions = ref([])
const states = ref([])
const chosen = ref([])
const feedbacks = ref([])
const score = ref(0)
const answered = ref(0)
const wrongCount = ref(0)

onMounted(() => {
  wrongCount.value = getWrongCount()
  init()
})

function init() {
  const pool = filterByTags(props.tags)
  displayQuestions.value = shuffle(pool).slice(0, props.count)
  states.value = displayQuestions.value.map(() => '')
  chosen.value = displayQuestions.value.map(() => -1)
  feedbacks.value = displayQuestions.value.map(() => null)
}

const finished = computed(() => answered.value === displayQuestions.value.length && displayQuestions.value.length > 0)
const resultPct = computed(() => displayQuestions.value.length ? Math.round(score.value / displayQuestions.value.length * 100) : 0)
const resultCls = computed(() => resultPct.value >= 80 ? 'great' : resultPct.value >= 60 ? 'good' : 'try-again')
const resultEmoji = computed(() => resultPct.value >= 80 ? '🎉' : resultPct.value >= 60 ? '👍' : '💪')
const resultText = computed(() => {
  if (resultPct.value >= 80) return '掌握得很好，继续！'
  if (resultPct.value >= 60) return '基本掌握，错题已收录到错题本。'
  return '建议先复习相关内容再做一遍。'
})

function optClass(i, j) {
  if (chosen.value[i] === -1) return ''
  const q = displayQuestions.value[i]
  if (j === q.ans) return 'correct-answer disabled'
  if (j === chosen.value[i]) return 'wrong-answer disabled'
  return 'disabled'
}

function select(i, j) {
  if (chosen.value[i] !== -1) return
  chosen.value[i] = j
  answered.value++
  const q = displayQuestions.value[i]
  if (j === q.ans) {
    score.value++
    states.value[i] = 'correct'
    const graduated = markCorrect(q.id)
    feedbacks.value[i] = { cls: 'correct-fb', text: '✅ ' + q.explain + (graduated ? ' ✨ 已从错题本移除！' : '') }
  } else {
    states.value[i] = 'wrong'
    addToWrong(q.id)
    feedbacks.value[i] = { cls: 'wrong-fb', text: '❌ 正确答案：' + String.fromCharCode(65 + q.ans) + '。' + q.explain + ' 已加入错题本。' }
  }
  wrongCount.value = getWrongCount()
}

function retake() {
  score.value = 0
  answered.value = 0
  init()
}
</script>

<style scoped>
.mq-wrap { border: 1px solid #334155; border-radius: 10px; margin: 16px 0; overflow: hidden; background: rgba(15,23,42,0.4); }
.mq-summary { padding: 12px 16px; cursor: pointer; font-size: 13px; font-weight: 600; color: #94a3b8; list-style: none; display: flex; align-items: center; gap: 8px; user-select: none; }
.mq-summary::-webkit-details-marker { display: none; }
.mq-summary::before { content: '▶'; font-size: 10px; transition: transform .2s; }
details[open] .mq-summary::before { transform: rotate(90deg); }
.mq-wrong-hint { color: #fb7185; font-size: 11px; }
.mq-body { padding: 16px; border-top: 1px solid #1e293b; }
.mq-score { font-size: 12px; color: #64748b; margin-bottom: 12px; text-align: right; }
.mq-score-num { color: #fbbf24; font-weight: 700; }
.mq-result { padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
.mq-result.great { background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.3); color: #34d399; }
.mq-result.good { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.3); color: #fbbf24; }
.mq-result.try-again { background: rgba(251,113,133,0.1); border: 1px solid rgba(251,113,133,0.3); color: #fb7185; }
.mq-retake { padding: 4px 14px; border-radius: 6px; border: 1px solid currentColor; background: transparent; color: inherit; font-size: 11px; cursor: pointer; }
.mq-q { background: rgba(30,41,59,0.5); border: 1px solid #1e293b; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; transition: all .2s; }
.mq-q.correct { border-color: #34d399; }
.mq-q.wrong { border-color: #fb7185; }
.mq-q-num { font-size: 11px; color: #475569; margin-bottom: 6px; }
.mq-q-text { font-size: 13px; font-weight: 600; margin-bottom: 10px; line-height: 1.5; color: #e2e8f0; }
.mq-opts { display: flex; flex-direction: column; gap: 6px; }
.mq-opt { padding: 7px 12px; border-radius: 6px; border: 1px solid #334155; cursor: pointer; font-size: 12px; color: #94a3b8; transition: all .15s; }
.mq-opt:hover:not(.disabled) { border-color: #22d3ee; background: rgba(34,211,238,0.08); }
.mq-opt.correct-answer { border-color: #34d399; background: rgba(52,211,153,0.1); color: #34d399; }
.mq-opt.wrong-answer { border-color: #fb7185; background: rgba(251,113,133,0.08); color: #fb7185; }
.mq-opt.disabled { pointer-events: none; opacity: 0.7; }
.mq-fb { font-size: 11px; margin-top: 8px; padding: 6px 10px; border-radius: 5px; line-height: 1.5; }
.correct-fb { background: rgba(52,211,153,0.08); color: #34d399; border: 1px solid rgba(52,211,153,0.15); }
.wrong-fb { background: rgba(251,113,133,0.08); color: #fb7185; border: 1px solid rgba(251,113,133,0.15); }
</style>
