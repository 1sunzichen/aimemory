<template>
  <details class="math-tutorial" id="math-tutorial">
    <summary>📐 数学预科详细教程（点击展开 · 9周完整内容）</summary>
    <div class="mt-body">

      <div class="mt-section">
        <h3>第一门：线性代数（Week 1–4）</h3>
        <div class="mt-week">
          <h4>Week 1 — 向量基础</h4>
          <p><span class="hl">向量</span> = 一列有序数字。AI 里每个词、每张图都被表示成向量（Embedding）。</p>
          <pre>点积（Dot Product）:
a = [1,2,3]  b = [4,5,6]
a · b = 1×4 + 2×5 + 3×6 = 32
→ Attention 机制本质就是做点积，判断两个词的"相关度"

余弦相似度（RAG 向量数据库用这个找最相似文档）:
cos(θ) = (a · b) / (|a| × |b|)</pre>
          <p>练习：给定 q=[1,0,1]，k=[1,1,0]，计算点积和余弦相似度。</p>
        </div>
        <div class="mt-week">
          <h4>Week 2 — 矩阵乘法（最重要！）</h4>
          <pre>理解 Self-Attention：
Attention(Q,K,V) = softmax(QKᵀ / √d) × V
  1. QKᵀ   → 矩阵乘法，算"每对词的相关度分数"
  2. / √d   → 防止数值过大
  3. softmax → 分数变概率（概率之和=1）
  4. × V    → 用概率加权汇聚 V，得到最终表示</pre>
        </div>
        <div class="mt-week">
          <h4>Week 3 — 矩阵分解（理解 LoRA）</h4>
          <pre>原始更新：ΔW (4096×4096) → 16,777,216 参数
LoRA：   A (4096×8) × B (8×4096) → 只需 65,536 参数！节省 256 倍

原理：权重更新是"低秩"的——用小矩阵近似大矩阵，
      损失极少精度，训练速度和显存大幅下降。</pre>
        </div>
        <div class="mt-week">
          <h4>Week 4 — Python NumPy 实战</h4>
          <pre>import numpy as np
q = np.array([1, 0, 1])
k = np.array([1, 1, 0])
print(np.dot(q, k))          # → 1

Q = np.random.randn(4, 3)
K = np.random.randn(4, 3)
scores = Q @ K.T              # (4×4) attention分数矩阵</pre>
        </div>
      </div>

      <div class="mt-section">
        <h3>第二门：微积分 · 梯度下降（Week 5–7）</h3>
        <div class="mt-week">
          <h4>Week 5 — 梯度下降</h4>
          <p>AI 训练的核心：<span class="hl">找让损失函数最小的参数</span>，就像闭眼下山。</p>
          <pre>公式：θ_new = θ_old - lr × ∂L/∂θ

偏导数示例：
L(w₁, w₂) = w₁² + 2w₁w₂ + w₂²
∂L/∂w₁ = 2w₁ + 2w₂   (把 w₂ 当常数，对 w₁ 求导)</pre>
        </div>
        <div class="mt-week">
          <h4>Week 6 — 链式法则（反向传播的核心）</h4>
          <pre>链式法则：y = f(g(x))  →  dy/dx = f'(g(x)) × g'(x)

神经网络反向传播 = 链式法则的连续应用
（PyTorch autograd 自动计算，不需手算）</pre>
        </div>
        <div class="mt-week">
          <h4>Week 7 — AI 常用函数速查</h4>
          <table class="mt-table">
            <tr><th>函数</th><th>导数</th><th>AI 用途</th></tr>
            <tr><td>eˣ</td><td>eˣ</td><td>Softmax 分母</td></tr>
            <tr><td>ln(x)</td><td>1/x</td><td>交叉熵损失</td></tr>
            <tr><td>max(0,x)</td><td>0 或 1</td><td>ReLU 激活函数</td></tr>
            <tr><td>1/(1+e⁻ˣ)</td><td>σ(x)(1-σ(x))</td><td>Sigmoid 分类</td></tr>
          </table>
        </div>
      </div>

      <div class="mt-section">
        <h3>第三门：概率论与统计（Week 8–9）</h3>
        <div class="mt-week">
          <h4>Week 8 — Softmax 与交叉熵损失</h4>
          <pre>Softmax（把分数变概率）:
["你好"→3.2, "再见"→1.1, "谢谢"→2.8]
P("你好") = e^3.2 / (e^3.2 + e^1.1 + e^2.8) = 55.7%

交叉熵损失（预测越准 Loss 越小）:
P = [0.7, 0.2, 0.1]，正确答案是第一个
Loss = -log(0.7) = 0.357
若 P[0]=0.01，Loss = -log(0.01) = 4.6 ← 预测很差</pre>
        </div>
        <div class="mt-week">
          <h4>Week 9 — 期望与 KL 散度</h4>
          <pre>期望（加权平均）：E[X] = Σ x × P(x)
→ RLHF 的 Reward Model 估计"这个回答的期望质量"

KL 散度：KL(P||Q) = Σ P(x) × log(P(x)/Q(x))
→ DPO/RLHF 训练时防止模型偏离原始分布太远</pre>
        </div>
      </div>

      <div class="mt-section">
        <h3>9 周学习路线总览</h3>
        <div class="mt-roadmap">
          <span class="ms">高中数学基础</span><br>
          <span class="arrow">↓</span> <span class="ms">Week 1–2：向量 + 矩阵乘法</span> <span class="mn">← 最优先</span><br>
          <span class="arrow">↓</span> <span class="ms">Week 3：矩阵分解（LoRA 原理）</span><br>
          <span class="arrow">↓</span> <span class="ms">Week 4：Python NumPy 实战</span><br>
          <span class="arrow">↓</span> <span class="ms">Week 5–6：导数 + 梯度下降 + 链式法则</span><br>
          <span class="arrow">↓</span> <span class="ms">Week 7：常用函数导数速查</span><br>
          <span class="arrow">↓</span> <span class="ms">Week 8–9：Softmax + 交叉熵 + KL 散度</span><br>
          <span class="arrow">↓</span> <span class="mn">✅ 可以开始看 Phase 1 了！</span>
        </div>
      </div>

    </div>
  </details>
</template>

<style scoped>
.math-tutorial {
  margin: 40px 0;
  padding: 28px;
  background: rgba(251, 191, 36, 0.04);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 12px;
}
.math-tutorial > summary {
  font-size: 17px;
  font-weight: 600;
  color: #fbbf24;
  cursor: pointer;
  user-select: none;
  list-style: none;
  display: flex;
  align-items: center;
  gap: 8px;
}
.math-tutorial > summary::before { content: "▶"; font-size: 12px; transition: transform .2s; }
.math-tutorial[open] > summary::before { transform: rotate(90deg); }
.math-tutorial > summary::-webkit-details-marker { display: none; }
.mt-body { margin-top: 24px; }
.mt-section { margin-bottom: 28px; }
.mt-section h3 {
  font-size: 15px; font-weight: 600; color: #fbbf24;
  margin-bottom: 14px; padding-bottom: 6px;
  border-bottom: 1px solid rgba(251, 191, 36, 0.2);
}
.mt-week {
  margin-bottom: 14px;
  padding: 14px 16px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 8px;
  border: 1px solid #1e293b;
}
.mt-week h4 { font-size: 13px; font-weight: 600; color: #e2e8f0; margin-bottom: 8px; }
.mt-week p  { font-size: 12px; color: #94a3b8; line-height: 1.8; margin: 4px 0; }
.mt-week pre {
  font-size: 11px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 10px 12px;
  margin: 8px 0;
  color: #a5f3fc;
  overflow-x: auto;
  line-height: 1.7;
  font-family: 'Menlo', 'Courier New', monospace;
  white-space: pre;
}
.hl { color: #fbbf24; font-weight: 600; }
.mt-table { width: 100%; border-collapse: collapse; font-size: 12px; margin: 8px 0; }
.mt-table th { background: rgba(251,191,36,0.1); color: #fbbf24; padding: 6px 10px; text-align: left; border: 1px solid rgba(251,191,36,0.2); }
.mt-table td { padding: 6px 10px; border: 1px solid #1e293b; color: #94a3b8; }
.mt-roadmap {
  padding: 14px 16px;
  background: rgba(0,0,0,0.3);
  border-radius: 8px;
  border: 1px solid #1e293b;
  font-size: 12px;
  color: #64748b;
  line-height: 2.2;
}
.ms { color: #a5f3fc; }
.mn { color: #fbbf24; }
.arrow { color: #475569; }
</style>
