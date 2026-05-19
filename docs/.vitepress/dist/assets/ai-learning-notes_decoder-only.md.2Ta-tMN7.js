import{_ as n,o as s,c as e,ai as p}from"./chunks/framework.CgfAAQZ5.js";const h=JSON.parse('{"title":"GPT 与 Claude 的纯解码器架构","description":"","frontmatter":{},"headers":[],"relativePath":"ai-learning-notes/decoder-only.md","filePath":"ai-learning-notes/decoder-only.md","lastUpdated":1778661613000}'),l={name:"ai-learning-notes/decoder-only.md"};function t(i,a,o,c,d,r){return s(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="gpt-与-claude-的纯解码器架构" tabindex="-1">GPT 与 Claude 的纯解码器架构 <a class="header-anchor" href="#gpt-与-claude-的纯解码器架构" aria-label="Permalink to &quot;GPT 与 Claude 的纯解码器架构&quot;">​</a></h1><h2 id="核心认知" tabindex="-1">核心认知 <a class="header-anchor" href="#核心认知" aria-label="Permalink to &quot;核心认知&quot;">​</a></h2><p><strong>输入的提示词和输出的词，对解码器来说没有本质区别，都是&quot;上下文&quot;。</strong></p><h2 id="encoder-decoder-vs-纯-decoder" tabindex="-1">Encoder-Decoder vs 纯 Decoder <a class="header-anchor" href="#encoder-decoder-vs-纯-decoder" aria-label="Permalink to &quot;Encoder-Decoder vs 纯 Decoder&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Encoder-Decoder（翻译模型）：</span></span>
<span class="line"><span>  输入 和 输出 是两件独立的事</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  [我爱吃饭] ──Encoder──▶ 语义向量 ──Decoder──▶ [I love eating]</span></span>
<span class="line"><span>   双向注意力                                      单向注意力</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>纯 Decoder（GPT/Claude）：</span></span>
<span class="line"><span>  输入 和 输出 拼在一起，是一条连续的序列</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  [我爱吃饭  |  I love eating]</span></span>
<span class="line"><span>  ──────────────────────────▶</span></span>
<span class="line"><span>        全部用单向注意力处理</span></span></code></pre></div><h2 id="具体怎么跑" tabindex="-1">具体怎么跑 <a class="header-anchor" href="#具体怎么跑" aria-label="Permalink to &quot;具体怎么跑&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你输入：&quot;法国的首都是&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>模型看到的序列：</span></span>
<span class="line"><span>  法  国  的  首  都  是</span></span>
<span class="line"><span>  t1  t2  t3  t4  t5  t6</span></span>
<span class="line"><span></span></span>
<span class="line"><span>单向注意力（只看左边）：</span></span>
<span class="line"><span>  &quot;法&quot; → 只看自己</span></span>
<span class="line"><span>  &quot;国&quot; → 看 法、国</span></span>
<span class="line"><span>  &quot;是&quot; → 看 法、国、的、首、都、是  ← 整合了完整上下文</span></span>
<span class="line"><span>    │</span></span>
<span class="line"><span>    ▼</span></span>
<span class="line"><span>  预测下一个词 ──▶ &quot;巴&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>然后把 &quot;巴&quot; 加入序列，继续：</span></span>
<span class="line"><span>  法国的首都是巴 ──▶ &quot;黎&quot;</span></span>
<span class="line"><span>  法国的首都是巴黎 ──▶ &quot;&lt;结束&gt;&quot;</span></span></code></pre></div><h2 id="单向注意力为什么够用" tabindex="-1">单向注意力为什么够用 <a class="header-anchor" href="#单向注意力为什么够用" aria-label="Permalink to &quot;单向注意力为什么够用&quot;">​</a></h2><p>看起来&quot;我&quot;看不到&quot;饭&quot;是个缺陷，但：</p><ol><li><strong>最后一个词能看到前面所有词</strong>，已经整合了完整上下文，用它预测下一个词足够了</li><li>模型足够大时，单向注意力也能学到很强的语言理解能力</li><li>真正需要双向理解的任务（完形填空）用 BERT（纯 Encoder）更合适，GPT/Claude 更擅长生成</li></ol><h2 id="一张图看清本质" tabindex="-1">一张图看清本质 <a class="header-anchor" href="#一张图看清本质" aria-label="Permalink to &quot;一张图看清本质&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BERT（纯 Encoder）：              GPT/Claude（纯 Decoder）：</span></span>
<span class="line"><span>适合理解、分类                     适合生成、对话</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ┌──────────┐                  ┌──────────────────────┐</span></span>
<span class="line"><span>  │ 法国首都是│                  │ 法国首都是  │  巴黎    │</span></span>
<span class="line"><span>  │          │                  │            │          │</span></span>
<span class="line"><span>  │ 双向注意力│                  │ 单向注意力  │ 单向注意力│</span></span>
<span class="line"><span>  └──────────┘                  └──────────────────────┘</span></span>
<span class="line"><span>        │                                    │</span></span>
<span class="line"><span>        ▼                                    ▼</span></span>
<span class="line"><span>    输出向量                           下一个词的概率</span></span>
<span class="line"><span>   （用于分类）                        （用于生成）</span></span></code></pre></div><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>GPT/Claude 没有专门的编码器，而是把输入直接当成&quot;已生成的历史&quot;，用同一套单向注意力机制既理解输入、又生成输出，两件事在同一条流水线里完成。</p>`,14)])])}const q=n(l,[["render",t]]);export{h as __pageData,q as default};
