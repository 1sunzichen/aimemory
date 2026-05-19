<template>
  <div class="ai-assistant">
    <button class="ai-toggle" :class="{ active: isOpen, bouncing: showHint }" @click="toggle" title="AI 学习助手">
      <span v-if="!isOpen">🤖</span>
      <span v-else>✕</span>
    </button>

    <!-- Idle hint toast -->
    <div v-if="showHint && !isOpen" class="ai-hint" @click="toggle">
      💡 有看不懂的概念？<span class="ai-hint-cta">问 AI 助手</span>
      <button class="ai-hint-close" @click.stop="dismissHint">✕</button>
    </div>

    <!-- Text selection popup -->
    <div v-if="showPopup" class="ai-popup" :style="{ top: popupY + 'px', left: popupX + 'px' }">
      <button @click="askSelection">💬 让 AI 解释</button>
    </div>

    <!-- Chat panel -->
    <div v-if="isOpen" class="ai-panel">
      <div class="ai-header">
        <span>🤖 AI 学习助手</span>
        <div class="ai-header-actions">
          <a class="ai-fork-btn" href="https://github.com/1sunzichen/aimemory/fork" target="_blank" title="Fork 本项目">⭐ Fork</a>
          <button class="ai-clear" @click="clearChat" title="清空对话">🗑</button>
        </div>
      </div>
      <div class="ai-messages" ref="msgEl">
        <div v-if="msgs.length === 0" class="ai-welcome">
          <p>👋 选中文字点「让 AI 解释」<br>或直接下面打字提问</p>
        </div>
        <div v-for="(m, i) in msgs" :key="i" class="ai-msg" :class="m.role">
          <div class="ai-role">{{ m.role === 'user' ? '你' : '🤖' }}</div>
          <div class="ai-content" v-html="md(m.content)"></div>
        </div>
        <div v-if="loading" class="ai-msg assistant">
          <div class="ai-role">🤖</div><div class="ai-content ai-dots">思考中<span>.</span><span>.</span><span>.</span></div>
        </div>
      </div>
      <div class="ai-input">
        <textarea v-model="input" @keydown="onKeydown" placeholder="问 AI..." rows="2" :disabled="loading" ref="inputEl"></textarea>
        <button @click="send" :disabled="!input.trim() || loading">→</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useData } from 'vitepress'

const { page, frontmatter } = useData()

const API = 'https://aimemory-ai.3023493319.workers.dev/api/chat'

const isOpen = ref(false)
const msgs = ref([])
const loading = ref(false)
const input = ref('')
const selected = ref('')
const showPopup = ref(false)
const popupX = ref(0)
const popupY = ref(0)
const msgEl = ref(null)
const inputEl = ref(null)
const showHint = ref(false)
let idleTimer = null
let hintDismissed = false

// ── localStorage per page ──────────────────────────────────────────
function storageKey() {
  return 'ai-' + (page.value?.relativePath || 'global')
}
function load() {
  try { const r = localStorage.getItem(storageKey()); if (r) msgs.value = JSON.parse(r) } catch {}
}
function save() {
  try { localStorage.setItem(storageKey(), JSON.stringify(msgs.value.slice(-60))) } catch {}
}

// ── Simple markdown render ─────────────────────────────────────────
function md(text) {
  return text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>')
}

// ── API call ───────────────────────────────────────────────────────
async function callApi(userMessages) {
  const resp = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: userMessages,
      pageTitle: frontmatter.value?.title || page.value?.title || '',
    }),
  })
  const data = await resp.json()
  if (!resp.ok) throw new Error(data.error || 'Request failed')
  return data.reply
}

// ── Actions ────────────────────────────────────────────────────────
function onKeydown(e) {
  // Only send on Enter, skip if IME is composing (e.g. Chinese input method)
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
    e.preventDefault()
    send()
  }
}

function toggle() {
  isOpen.value = !isOpen.value
  showHint.value = false
  if (isOpen.value) nextTick(() => inputEl.value?.focus())
}

async function send() {
  const text = input.value.trim()
  if (!text || loading.value) return
  // Capture and clear immediately to prevent IME double-send
  const msg = text
  input.value = ''
  msgs.value.push({ role: 'user', content: msg })
  loading.value = true
  save(); scrollDown()
  try {
    const reply = await callApi(msgs.value)
    msgs.value.push({ role: 'assistant', content: reply })
    save(); scrollDown()
  } catch (e) {
    msgs.value.push({ role: 'assistant', content: '⚠️ ' + e.message })
  }
  loading.value = false
}

async function askSelection() {
  showPopup.value = false
  const text = selected.value
  if (!text) return
  isOpen.value = true
  showHint.value = false
  msgs.value.push({ role: 'user', content: `请解释这段话：\n\n> ${text}` })
  loading.value = true
  save(); await nextTick(); scrollDown()
  try {
    const reply = await callApi(msgs.value)
    msgs.value.push({ role: 'assistant', content: reply })
    save(); scrollDown()
  } catch (e) {
    msgs.value.push({ role: 'assistant', content: '⚠️ ' + e.message })
  }
  loading.value = false
}

function clearChat() { msgs.value = []; save() }
function dismissHint() { showHint.value = false; hintDismissed = true }

function scrollDown() {
  nextTick(() => { const el = msgEl.value; if (el) el.scrollTop = el.scrollHeight })
}

// ── Idle detection ─────────────────────────────────────────────────
function resetIdleTimer() {
  clearTimeout(idleTimer)
  if (hintDismissed || isOpen.value) return
  idleTimer = setTimeout(() => {
    showHint.value = true
  }, 45_000) // 45 seconds
}

function onActivity() { resetIdleTimer() }

// ── Text selection ─────────────────────────────────────────────────
function onMouseUp() {
  setTimeout(() => {
    const sel = window.getSelection()
    const text = sel?.toString().trim()
    if (text && text.length > 5) {
      selected.value = text
      const range = sel.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      popupX.value = Math.min(rect.right, window.innerWidth - 160) + window.scrollX
      popupY.value = rect.bottom + window.scrollY + 8
      showPopup.value = true
    } else {
      showPopup.value = false
    }
  }, 10)
}

function onClickOutside(e) {
  if (!e.target.closest('.ai-popup')) showPopup.value = false
}

onMounted(() => {
  load()
  document.addEventListener('mouseup', onMouseUp)
  document.addEventListener('click', onClickOutside)
  document.addEventListener('mousemove', onActivity)
  document.addEventListener('scroll', onActivity)
  document.addEventListener('keydown', onActivity)
  resetIdleTimer()
})

onUnmounted(() => {
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('mousemove', onActivity)
  document.removeEventListener('scroll', onActivity)
  document.removeEventListener('keydown', onActivity)
  clearTimeout(idleTimer)
})

watch(() => page.value?.relativePath, () => { load(); hintDismissed = false; resetIdleTimer() })
</script>

<style scoped>
.ai-assistant { position: fixed; z-index: 9999; font-family: system-ui, sans-serif; }

.ai-toggle {
  position: fixed; bottom: 24px; right: 24px;
  width: 52px; height: 52px; border-radius: 50%;
  background: #1a1a2e; color: #fff; border: none;
  font-size: 22px; cursor: pointer; box-shadow: 0 4px 16px rgba(0,0,0,.3);
  transition: .2s; display: flex; align-items: center; justify-content: center;
}
.ai-toggle:hover { transform: scale(1.08); }
.ai-toggle.active { background: #e74c3c; }
.ai-toggle.bouncing {
  animation: bounce 0.6s ease-in-out 3;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Idle hint */
.ai-hint {
  position: fixed; bottom: 88px; right: 24px;
  background: #1a1a2e; color: #fff; padding: 10px 16px;
  border-radius: 12px; font-size: 14px; cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,.3);
  display: flex; align-items: center; gap: 6px;
  animation: fadeInUp .3s ease;
  max-width: calc(100vw - 60px);
}
.ai-hint-cta {
  color: #4a9eff; font-weight: 600; text-decoration: underline;
  text-underline-offset: 2px;
}
.ai-hint-close {
  background: none; border: none; color: rgba(255,255,255,.4);
  cursor: pointer; font-size: 14px; padding: 0 0 0 6px; margin-left: 4px;
}
.ai-hint-close:hover { color: #fff; }
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Selection popup */
.ai-popup {
  position: absolute;
  background: #1a1a2e; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.3);
  padding: 4px; z-index: 10000;
}
.ai-popup button {
  background: none; border: none; color: #fff; padding: 8px 16px;
  border-radius: 6px; cursor: pointer; font-size: 14px; white-space: nowrap;
}
.ai-popup button:hover { background: rgba(255,255,255,.1); }

/* Panel */
.ai-panel {
  position: fixed; bottom: 88px; right: 24px;
  width: 400px; max-width: calc(100vw - 48px); height: 560px; max-height: calc(100vh - 140px);
  background: #fff; border-radius: 14px; box-shadow: 0 8px 32px rgba(0,0,0,.15);
  display: flex; flex-direction: column; overflow: hidden;
}
@media (prefers-color-scheme: dark) { .ai-panel { background: #1e1e2e; } }

.ai-header {
  padding: 14px 18px; font-weight: 600; font-size: 15px;
  border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;
}
@media (prefers-color-scheme: dark) { .ai-header { border-color: #333; color: #eee; } }
.ai-header-actions { display: flex; align-items: center; gap: 8px; }
.ai-fork-btn {
  font-size: 12px; color: #f0c040; text-decoration: none;
  background: rgba(240,192,64,.12); padding: 4px 10px;
  border-radius: 6px; font-weight: 600; transition: .15s;
}
.ai-fork-btn:hover { background: rgba(240,192,64,.25); }
.ai-clear { background: none; border: none; cursor: pointer; font-size: 16px; opacity: .5; }
.ai-clear:hover { opacity: 1; }

.ai-messages {
  flex: 1; overflow-y: auto; padding: 16px;
  display: flex; flex-direction: column; gap: 14px;
}
.ai-welcome { text-align: center; color: #999; font-size: 14px; padding: 30px 10px; line-height: 1.8; }

.ai-msg { display: flex; gap: 8px; font-size: 14px; line-height: 1.6; }
.ai-msg.user { flex-direction: row-reverse; }
.ai-role { flex-shrink: 0; width: 28px; text-align: center; }
.ai-msg.user .ai-content {
  background: #4a9eff; color: #fff; border-radius: 14px 4px 14px 14px;
}
.ai-msg.assistant .ai-content {
  background: #f0f0f5; border-radius: 4px 14px 14px 14px;
}
@media (prefers-color-scheme: dark) {
  .ai-msg.assistant .ai-content { background: #2a2a3e; color: #ddd; }
}
.ai-content { padding: 10px 14px; max-width: 85%; word-break: break-word; }
.ai-content :deep(code) { background: rgba(0,0,0,.08); padding: 2px 6px; border-radius: 4px; font-size: 13px; }
.ai-content :deep(pre) { background: rgba(0,0,0,.06); padding: 10px; border-radius: 8px; overflow-x: auto; margin: 6px 0; }
.ai-content :deep(pre code) { background: none; padding: 0; }

.ai-dots span { animation: dot 1.4s infinite; opacity: 0; }
.ai-dots span:nth-child(2) { animation-delay: .2s; }
.ai-dots span:nth-child(3) { animation-delay: .4s; }
@keyframes dot { 0%,60% { opacity: 0; } 30% { opacity: 1; } }

.ai-input {
  padding: 12px 16px; border-top: 1px solid #eee; display: flex; gap: 8px; align-items: flex-end;
}
@media (prefers-color-scheme: dark) { .ai-input { border-color: #333; } }
.ai-input textarea {
  flex: 1; border: 1px solid #ddd; border-radius: 10px; padding: 10px 14px;
  font-size: 14px; resize: none; outline: none; background: #fafafa; font-family: inherit;
}
@media (prefers-color-scheme: dark) { .ai-input textarea { background: #2a2a3e; border-color: #444; color: #eee; } }
.ai-input textarea:focus { border-color: #4a9eff; }
.ai-input button {
  width: 40px; height: 40px; border-radius: 50%; border: none;
  background: #4a9eff; color: #fff; font-size: 18px; cursor: pointer; flex-shrink: 0;
}
.ai-input button:disabled { opacity: .4; cursor: default; }
</style>
