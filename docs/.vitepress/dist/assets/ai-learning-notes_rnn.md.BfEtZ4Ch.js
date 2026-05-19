import{_ as n,o as s,c as p,ai as e}from"./chunks/framework.CgfAAQZ5.js";const d=JSON.parse('{"title":"RNN 循环神经网络","description":"","frontmatter":{},"headers":[],"relativePath":"ai-learning-notes/rnn.md","filePath":"ai-learning-notes/rnn.md","lastUpdated":1778661613000}'),t={name:"ai-learning-notes/rnn.md"};function l(o,a,i,c,r,u){return s(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="rnn-循环神经网络" tabindex="-1">RNN 循环神经网络 <a class="header-anchor" href="#rnn-循环神经网络" aria-label="Permalink to &quot;RNN 循环神经网络&quot;">​</a></h1><h2 id="普通神经网络的问题" tabindex="-1">普通神经网络的问题 <a class="header-anchor" href="#普通神经网络的问题" aria-label="Permalink to &quot;普通神经网络的问题&quot;">​</a></h2><p>普通神经网络处理序列数据时，每个词独立处理，没有记忆，没有上下文：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>输入                神经网络              输出</span></span>
<span class="line"><span>&quot;我&quot;   ──────────▶ [ 黑盒 ] ──────────▶ ?</span></span>
<span class="line"><span>&quot;爱&quot;   ──────────▶ [ 黑盒 ] ──────────▶ ?</span></span>
<span class="line"><span>&quot;吃&quot;   ──────────▶ [ 黑盒 ] ──────────▶ ?</span></span>
<span class="line"><span>&quot;饭&quot;   ──────────▶ [ 黑盒 ] ──────────▶ ?</span></span>
<span class="line"><span></span></span>
<span class="line"><span>网络不知道&quot;吃&quot;前面是&quot;爱&quot;</span></span></code></pre></div><h2 id="rnn-的解法-加一个-记忆" tabindex="-1">RNN 的解法：加一个&quot;记忆&quot; <a class="header-anchor" href="#rnn-的解法-加一个-记忆" aria-label="Permalink to &quot;RNN 的解法：加一个&quot;记忆&quot;&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>           ┌─────────────────────────────────┐</span></span>
<span class="line"><span>           │          隐藏状态 h（记忆）        │</span></span>
<span class="line"><span>           └──┬──────────┬──────────┬────────┘</span></span>
<span class="line"><span>              │          │          │</span></span>
<span class="line"><span>              ▼          ▼          ▼</span></span>
<span class="line"><span>时间步:       t=1        t=2        t=3</span></span>
<span class="line"><span>输入:        &quot;我&quot;       &quot;爱&quot;       &quot;吃&quot;</span></span>
<span class="line"><span>              │          │          │</span></span>
<span class="line"><span>              ▼          ▼          ▼</span></span>
<span class="line"><span>           ┌─────┐    ┌─────┐    ┌─────┐</span></span>
<span class="line"><span>           │ RNN │───▶│ RNN │───▶│ RNN │───▶ 输出</span></span>
<span class="line"><span>           └─────┘    └─────┘    └─────┘</span></span>
<span class="line"><span>              h1  ──▶    h2  ──▶    h3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>h1 = f(&quot;我&quot;)</span></span>
<span class="line"><span>h2 = f(&quot;爱&quot; + h1)        ← h2 记住了&quot;我爱&quot;</span></span>
<span class="line"><span>h3 = f(&quot;吃&quot; + h2)        ← h3 记住了&quot;我爱吃&quot;</span></span></code></pre></div><p>每一步的输出，都会作为下一步的输入之一，<strong>状态在时间上流动</strong>。</p><p>同一个 RNN 单元在时间轴上反复使用（权重共享），不是三个不同的网络。</p><h2 id="rnn-的问题-梯度消失" tabindex="-1">RNN 的问题：梯度消失 <a class="header-anchor" href="#rnn-的问题-梯度消失" aria-label="Permalink to &quot;RNN 的问题：梯度消失&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&quot;我昨天在北京的一家很有名的餐厅里 .... 吃了 [?]&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>到&quot;吃了&quot;这里，早期的&quot;餐厅&quot;信息经过太多步骤后逐渐稀释消失。</span></span>
<span class="line"><span>这就是梯度消失问题。</span></span></code></pre></div><h2 id="rnn-家族" tabindex="-1">RNN 家族 <a class="header-anchor" href="#rnn-家族" aria-label="Permalink to &quot;RNN 家族&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>RNN</span></span>
<span class="line"><span> ├── LSTM（Long Short-Term Memory）</span></span>
<span class="line"><span> │     加了&quot;遗忘门&quot;和&quot;记忆门&quot;，能选择性记住/忘记</span></span>
<span class="line"><span> │     解决了长距离依赖问题</span></span>
<span class="line"><span> │</span></span>
<span class="line"><span> └── GRU（Gated Recurrent Unit）</span></span>
<span class="line"><span>       LSTM 的简化版，更轻量</span></span></code></pre></div><h2 id="现在还用吗" tabindex="-1">现在还用吗？ <a class="header-anchor" href="#现在还用吗" aria-label="Permalink to &quot;现在还用吗？&quot;">​</a></h2><p>2017 年前 RNN/LSTM 是 NLP 主流。Transformer 出现后，因为能一次看全部词、彻底解决长距离依赖，逐渐取代了 RNN。</p><p>现在的 GPT、Claude 都是 Transformer，不是 RNN。但理解 RNN 是理解 Transformer 注意力机制的基础。</p>`,15)])])}const q=n(t,[["render",l]]);export{d as __pageData,q as default};
