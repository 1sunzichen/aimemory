const WRONG_KEY = 'ai_quiz_wrong'

function isClient() {
  return typeof localStorage !== 'undefined'
}

export function getWrongPool() {
  if (!isClient()) return {}
  try { return JSON.parse(localStorage.getItem(WRONG_KEY) || '{}') } catch { return {} }
}

function saveWrongPool(pool) {
  if (!isClient()) return
  localStorage.setItem(WRONG_KEY, JSON.stringify(pool))
}

export function addToWrong(id) {
  const pool = getWrongPool()
  pool[id] = { consecutiveCorrect: 0 }
  saveWrongPool(pool)
}

// Returns true if the question was graduated (removed from pool after 5 consecutive)
export function markCorrect(id) {
  const pool = getWrongPool()
  if (pool[id] === undefined) return false
  pool[id].consecutiveCorrect = (pool[id].consecutiveCorrect || 0) + 1
  const graduated = pool[id].consecutiveCorrect >= 5
  if (graduated) delete pool[id]
  saveWrongPool(pool)
  return graduated
}

export function getWrongCount() {
  return Object.keys(getWrongPool()).length
}

export function getWrongIds() {
  return Object.keys(getWrongPool())
}

export function getConsecutiveCorrect(id) {
  return getWrongPool()[id]?.consecutiveCorrect || 0
}
