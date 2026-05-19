# BatchNorm 与 LayerNorm

## 都是归一化

两者都是把数据变成「均值 0、方差 1」的标准形态，让训练更稳定更快。

核心公式：归一化后 = (原始值 - 均值) / 标准差

## 一句话区分

| | BatchNorm | LayerNorm |
|---|---|---|
| 归一化方向 | 同一特征，跨样本 | 同一样本，跨特征 |
| 比喻 | 「张三的语文在全班排第几」 | 「张三的语文在自己各科里排第几」 |
| 依赖 batch | 是，batch 太小会不稳定 | 否，单个样本也行 |
| 训练/推理 | 不一致（推理用全局统计量） | 完全一致 |
| 适合 | CNN | Transformer、RNN |
| 不适合 | 序列模型、小 batch | CNN |

## 直观例子

```
        语文  数学  英语
张三    90    80    70
李四    60    95    85
王五    75    70    90
赵六    88    78    82

BatchNorm：竖着归一 → 语文列 4 个人一起算均值和方差
LayerNorm：横着归一 → 张三 3 门课自己算均值和方差
```

## 为什么 Transformer 用 LayerNorm

1. **推理时 token 逐个来**：自回归模型一次只出一个 token，凑不出一批做 BatchNorm
2. **Padding 不影响**：补 0 的 token 在 BatchNorm 里会拉低统计量，LayerNorm 每个样本独立算不受影响
3. **训练推理一致**：不需要像 BatchNorm 那样维护全局 running mean/var
