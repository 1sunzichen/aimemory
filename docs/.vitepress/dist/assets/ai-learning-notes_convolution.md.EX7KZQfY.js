import{_ as n,o as s,c as t,ai as e}from"./chunks/framework.CgfAAQZ5.js";const u=JSON.parse('{"title":"卷积（Convolution）","description":"","frontmatter":{},"headers":[],"relativePath":"ai-learning-notes/convolution.md","filePath":"ai-learning-notes/convolution.md","lastUpdated":1779177473000}'),p={name:"ai-learning-notes/convolution.md"};function l(i,a,o,c,d,r){return s(),t("div",null,[...a[0]||(a[0]=[e(`<h1 id="卷积-convolution" tabindex="-1">卷积（Convolution） <a class="header-anchor" href="#卷积-convolution" aria-label="Permalink to &quot;卷积（Convolution）&quot;">​</a></h1><h2 id="是什么" tabindex="-1">是什么 <a class="header-anchor" href="#是什么" aria-label="Permalink to &quot;是什么&quot;">​</a></h2><p>卷积就是把一个「滤镜」在数据上滑动，每一步做一次加权求和。</p><h2 id="直观理解" tabindex="-1">直观理解 <a class="header-anchor" href="#直观理解" aria-label="Permalink to &quot;直观理解&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>原始信号:  [3, 7, 2, 5, 8, 1, 6]</span></span>
<span class="line"><span>卷积核:    [⅓, ⅓, ⅓]  （3 天平均窗口）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>滑过去 →</span></span>
<span class="line"><span>位置0: (3×⅓ + 7×⅓ + 2×⅓) = 4.0</span></span>
<span class="line"><span>位置1: (7×⅓ + 2×⅓ + 5×⅓) = 4.67</span></span>
<span class="line"><span>位置2: (2×⅓ + 5×⅓ + 8×⅓) = 5.0</span></span>
<span class="line"><span>位置3: (5×⅓ + 8×⅓ + 1×⅓) = 4.67</span></span>
<span class="line"><span>位置4: (8×⅓ + 1×⅓ + 6×⅓) = 5.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>结果: [4.0, 4.67, 5.0, 4.67, 5.0]  ← 平滑后的曲线</span></span></code></pre></div><h2 id="数学定义" tabindex="-1">数学定义 <a class="header-anchor" href="#数学定义" aria-label="Permalink to &quot;数学定义&quot;">​</a></h2><p>(f ∗ g)(t) = ∫ f(τ) · g(t-τ) dτ</p><p>把 g 翻过来，在 f 上滑动，每步算重叠部分的积分。</p><h2 id="在图像处理-cnn-里" tabindex="-1">在图像处理（CNN）里 <a class="header-anchor" href="#在图像处理-cnn-里" aria-label="Permalink to &quot;在图像处理（CNN）里&quot;">​</a></h2><p>拿一张图片，用小矩阵（卷积核）在上面滑动：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>图片（5×5）:              卷积核（检测竖边）:</span></span>
<span class="line"><span>┌─────────────────┐      ┌──────────┐</span></span>
<span class="line"><span>│ 10 10 10  0  0 │      │  1  0 -1 │</span></span>
<span class="line"><span>│ 10 10 10  0  0 │  ∗   │  1  0 -1 │</span></span>
<span class="line"><span>│ 10 10 10  0  0 │      │  1  0 -1 │</span></span>
<span class="line"><span>└─────────────────┘      └──────────┘</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在明暗交界处（10 → 0），卷积输出值很大 → 检测到了竖边</span></span></code></pre></div><p>不同的卷积核能检测不同特征：竖边、横边、模糊、锐化……</p><h2 id="一句话" tabindex="-1">一句话 <a class="header-anchor" href="#一句话" aria-label="Permalink to &quot;一句话&quot;">​</a></h2><p>卷积 = 拿一个滤镜在数据上滑动，每步加权求和。</p><table tabindex="0"><thead><tr><th>领域</th><th>滤镜是什么</th></tr></thead><tbody><tr><td>信号处理</td><td>平滑窗口</td></tr><tr><td>图像处理</td><td>边缘检测器</td></tr><tr><td>CNN</td><td>网络自己学出来的特征提取器</td></tr></tbody></table>`,15)])])}const b=n(p,[["render",l]]);export{u as __pageData,b as default};
