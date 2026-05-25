# AI 学习笔记

和 Claude 对话过程中整理的 AI 核心概念笔记，配合路线图食用效果更佳。

## 目录

| 笔记 | 简介 |
|------|------|
| [RNN 循环神经网络](./rnn) | 什么是 RNN，为什么需要它，LSTM/GRU 是什么 |
| [Transformer 编码器与解码器](./transformer-encoder-decoder) | Encoder 和 Decoder 各自的职责，以及交叉注意力 |
| [GPT 与 Claude 的纯解码器架构](./decoder-only) | 没有编码器时，模型如何理解输入 |
| [Embedding 矩阵与多头注意力](./embedding-and-multihead) | 词是怎么变成向量的，多头的含义和子空间 |
| [反向传播：模型是怎么学习的](./backpropagation) | 误差如何从后往前传，链式法则，训练数据从哪来 |
| [卷积 Convolution](./convolution) | 滤镜在数据上滑动加权求和，CNN 的核心操作 |
| [BatchNorm 与 LayerNorm](./batchnorm-layernorm) | 两种归一化的区别，为什么 CNN 用 BN、Transformer 用 LN |
| [均值、方差、标准差](./mean-variance-std) | 统计学基础，归一化前的必要概念 |
| [Padding 与 Truncation](./padding-truncation) | 不等长句子怎么处理，补 0 对归一化的影响 |
| [注意力机制：Q/K/V、缩放与两种实现](./attention-qkv-and-scaling) | Q/K/V 是什么、为什么除以 √d_k、点积 vs 加型注意力、自回归 |
| [Softmax、欧拉数 e 与求导](./softmax-e-derivatives) | Softmax 公式详解、为什么用 e（不用 10）、求导的极限定义、e 从连续复利来 |
