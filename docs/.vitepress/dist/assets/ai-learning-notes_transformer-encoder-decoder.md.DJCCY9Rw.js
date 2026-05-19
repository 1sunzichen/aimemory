import{_ as s,o as n,c as p,ai as e}from"./chunks/framework.CgfAAQZ5.js";const u=JSON.parse('{"title":"Transformer 编码器与解码器","description":"","frontmatter":{},"headers":[],"relativePath":"ai-learning-notes/transformer-encoder-decoder.md","filePath":"ai-learning-notes/transformer-encoder-decoder.md","lastUpdated":1778661613000}'),t={name:"ai-learning-notes/transformer-encoder-decoder.md"};function l(i,a,o,c,r,d){return n(),p("div",null,[...a[0]||(a[0]=[e(`<h1 id="transformer-编码器与解码器" tabindex="-1">Transformer 编码器与解码器 <a class="header-anchor" href="#transformer-编码器与解码器" aria-label="Permalink to &quot;Transformer 编码器与解码器&quot;">​</a></h1><h2 id="整体结构" tabindex="-1">整体结构 <a class="header-anchor" href="#整体结构" aria-label="Permalink to &quot;整体结构&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>        输入句子                        输出句子</span></span>
<span class="line"><span>       &quot;我爱吃饭&quot;                      &quot;I love eating&quot;</span></span>
<span class="line"><span>           │                                 ▲</span></span>
<span class="line"><span>           ▼                                 │</span></span>
<span class="line"><span>    ┌─────────────┐                 ┌─────────────────┐</span></span>
<span class="line"><span>    │             │                 │                 │</span></span>
<span class="line"><span>    │   编码器     │────────────────▶│    解码器        │</span></span>
<span class="line"><span>    │  Encoder    │   语义向量       │   Decoder       │</span></span>
<span class="line"><span>    │             │                 │                 │</span></span>
<span class="line"><span>    └─────────────┘                 └─────────────────┘</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    负责&quot;理解&quot;输入                   负责&quot;生成&quot;输出</span></span></code></pre></div><h2 id="编码器-理解输入" tabindex="-1">编码器：理解输入 <a class="header-anchor" href="#编码器-理解输入" aria-label="Permalink to &quot;编码器：理解输入&quot;">​</a></h2><p>任务是把输入句子压缩成一个<strong>富含语义的向量表示</strong>。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>输入：  我    爱    吃    饭</span></span>
<span class="line"><span>        │     │     │     │</span></span>
<span class="line"><span>        ▼     ▼     ▼     ▼</span></span>
<span class="line"><span>      词嵌入（把词变成向量）</span></span>
<span class="line"><span>        │     │     │     │</span></span>
<span class="line"><span>        ▼     ▼     ▼     ▼</span></span>
<span class="line"><span>   ┌──────────────────────────┐</span></span>
<span class="line"><span>   │     自注意力机制           │  ← 每个词都去看其他所有词（双向）</span></span>
<span class="line"><span>   └──────────────────────────┘</span></span>
<span class="line"><span>        │     │     │     │</span></span>
<span class="line"><span>        ▼     ▼     ▼     ▼</span></span>
<span class="line"><span>       h我   h爱   h吃   h饭     ← 每个词的向量都包含了整句的上下文</span></span></code></pre></div><p>编码器输出的不是一个词，是<strong>每个位置的上下文向量</strong>。</p><h2 id="解码器-生成输出" tabindex="-1">解码器：生成输出 <a class="header-anchor" href="#解码器-生成输出" aria-label="Permalink to &quot;解码器：生成输出&quot;">​</a></h2><p>一个词一个词地生成翻译结果。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>已生成:  &lt;start&gt;   I    love</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼ 预测下一个词</span></span>
<span class="line"><span>                    ┌─────────────────────┐</span></span>
<span class="line"><span>                    │  masked 自注意力     │  ← 只能看已生成的词（单向）</span></span>
<span class="line"><span>                    └─────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>                    ┌─────────────────────┐</span></span>
<span class="line"><span>                    │  交叉注意力          │  ← 去问编码器：&quot;我的意思是啥？&quot;</span></span>
<span class="line"><span>                    │  cross-attention    │     读取 h我 h爱 h吃 h饭</span></span>
<span class="line"><span>                    └─────────────────────┘</span></span>
<span class="line"><span>                              │</span></span>
<span class="line"><span>                              ▼</span></span>
<span class="line"><span>                           &quot;eating&quot;</span></span></code></pre></div><h2 id="两者核心区别" tabindex="-1">两者核心区别 <a class="header-anchor" href="#两者核心区别" aria-label="Permalink to &quot;两者核心区别&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>编码器的自注意力：双向，可以看全句</span></span>
<span class="line"><span>  我 ←──────────▶ 饭</span></span>
<span class="line"><span>  每个词看所有词</span></span>
<span class="line"><span></span></span>
<span class="line"><span>解码器的自注意力：单向，只能看左边</span></span>
<span class="line"><span>  I ──▶ love ──▶ eating</span></span>
<span class="line"><span>  不能看未来（防止作弊）</span></span></code></pre></div><h2 id="交叉注意力-连接两者的桥梁" tabindex="-1">交叉注意力：连接两者的桥梁 <a class="header-anchor" href="#交叉注意力-连接两者的桥梁" aria-label="Permalink to &quot;交叉注意力：连接两者的桥梁&quot;">​</a></h2><p>解码器独有的一层，编码器没有：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>解码器生成 &quot;eating&quot; 时：</span></span>
<span class="line"><span>  Query 来自解码器（当前生成状态）</span></span>
<span class="line"><span>  Key/Value 来自编码器输出（h我 h爱 h吃 h饭）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  注意力权重：我:0.1  爱:0.1  吃:0.7  饭:0.1</span></span>
<span class="line"><span>                                  ↑</span></span>
<span class="line"><span>                             重点关注&quot;吃&quot;，所以生成 eating</span></span></code></pre></div><h2 id="不同任务用不同组合" tabindex="-1">不同任务用不同组合 <a class="header-anchor" href="#不同任务用不同组合" aria-label="Permalink to &quot;不同任务用不同组合&quot;">​</a></h2><table tabindex="0"><thead><tr><th>任务</th><th>用哪部分</th><th>例子</th></tr></thead><tbody><tr><td>翻译、摘要</td><td>编码器 + 解码器</td><td>原始 Transformer、T5</td></tr><tr><td>文本理解/分类</td><td>只用编码器</td><td>BERT</td></tr><tr><td>文本生成</td><td>只用解码器</td><td>GPT、Claude</td></tr></tbody></table>`,17)])])}const b=s(t,[["render",l]]);export{u as __pageData,b as default};
