# Padding 与 Truncation

NLP 里不同句子长度不一样，但矩阵每行必须一样长。解决办法：

## 切（Truncation）

太长的砍掉尾部。

```
设定最大长度 = 4

「今天 天气 真 好 啊」 → 「今天 天气 真 好」
                            「啊」被丢弃
```

## 补 0（Padding）

太短的在后面填 [PAD] token。

```
设定最大长度 = 5

「我 爱 中国」 → 「我 爱 中国 [PAD] [PAD]」
```

[PAD] token 在 attention 计算里会被 mask 掉（注意力分数设为 -∞，softmax 后权重 = 0），不影响实际内容的计算。

## 和归一化的关系

补 0 之后如果直接用 **BatchNorm**，大量的 0 值会拉低这批数据的均值和方差，导致统计量不准。

**LayerNorm** 不受影响——每个样本独立算，自己的 [PAD] 只影响自己的均值方差，不干扰别人。

这也是 Transformer 选择 LayerNorm 的原因之一：NLP 数据天然不等长，Padding 大量存在。
