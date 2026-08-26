# 手写 ReAct Agent：程序驱动的循环

> 30 天冲刺 Day 16。不用框架，纯 Python 把 ReAct 跑通 —— 代码在 `~/react-agent-learning/react_agent.py`（uv 项目，VSCode 里 F5 调试）。

---

## 核心认知（一句话）

**LLM 不是一口气给答案，而是「想一步 → 调工具 → 看结果 → 再想」，循环到能回答为止。**

关键点：这个循环是【程序】在跑，不是 LLM 自己跑。LLM 只负责两件事——「思考」和「点名要用哪个工具」，真正的工具执行由 Python 代码完成。

这就和上一篇 Function Calling 笔记形成对照：

| | 手写 ReAct（本篇） | Function Calling（上一篇） |
|---|---|---|
| 怎么让 LLM 说清要调哪个工具 | 用正则硬匹配 `Action: search[...]` | 用 `tool_calls` 结构化传参（JSON） |
| 定位 | 教学版，看懂循环本质 | 生产级，框架底层机制 |
| 谁执行工具 | 都是程序，不是 LLM | 都是程序，不是 LLM |

一句话：**手写版帮你「看透循环」，Function Calling 是「正式版」，本质是同一件事。**

---

## 四块拼图

| 拼图 | 在代码里的位置 | 作用 |
|---|---|---|
| 工具白名单 | `search()` / `calculator()` | LLM 能点的两个工具，由程序执行 |
| System Prompt | `SYSTEM_PROMPT` | 教 LLM 按 Thought / Action 格式输出 |
| 主循环 | `react_agent()` 里的 `for step` | 程序驱动，反复调用 LLM |
| 解析 + 喂回 | `re.search()` + `messages.append()` | 提取 Action → 执行工具 → 把 Observation 塞回 |

---

## 主循环（最核心的一段）

```python
def react_agent(question, max_steps=8):
    messages = [{"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": question}]

    for step in range(1, max_steps + 1):
        resp = client.chat.completions.create(model=MODEL, messages=messages, temperature=0)
        text = resp.choices[0].message.content.strip()
        messages.append({"role": "assistant", "content": text})

        # ① 有 Final Answer 就收工
        if m := re.search(r"Final Answer[:：]\s*(.*)", text, re.S):
            return m.group(1).strip()

        # ② 有 Action 就执行工具
        m = re.search(r"Action[:：]\s*(search|calculator)\s*[\[【(（](.*?)[\]】)）]", text, re.S)
        if not m:
            observation = "【系统提示】没识别到合法 Action，请严格按格式输出"
        else:
            tool, arg = m.group(1), m.group(2).strip()
            observation = search(arg) if tool == "search" else calculator(arg)   # 程序执行

        # ③ Observation 喂回，进入下一轮
        messages.append({"role": "user", "content": f"Observation: {observation}"})
    return "（达到最大步数仍未得出最终答案）"
```

读这段代码，重点体会三件事：

1. **`for step` 是程序在推进循环**，每一轮都把 `messages` 交给 LLM、拿回输出、再喂回。LLM 永远只在「回答一次」这个维度上工作。
2. **Observation 是程序拼的字符串**，用 `role="user"` 喂回。LLM 看到它就像看到新消息，接着往下想。
3. **结束条件靠正则判断**（`Final Answer`），而不是靠 LLM 自己「说停」。程序才是循环的主人。

---

## 为什么用 ast 白名单，而不是 eval

计算器 `calculator()` 不能直接 `eval(expr)`——因为表达式来自 LLM，本质是不可信的「用户输入」，可能注入 `__import__('os').system('rm -rf /')` 这类恶意代码。

所以代码里写了 `safe_eval()`：

```python
_ALLOWED_OPS = {ast.Add: operator.add, ast.Sub: operator.sub, ast.Mult: operator.mul,
                ast.Div: operator.truediv, ast.Pow: operator.pow, ast.Mod: operator.mod,
                ast.USub: operator.neg, ast.UAdd: operator.pos}

def safe_eval(expr):
    tree = ast.parse(expr, mode="eval")   # 先把字符串解析成语法树
    def _eval(node):
        if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
            return node.value
        if isinstance(node, ast.BinOp) and type(node.op) in _ALLOWED_OPS:
            return _ALLOWED_OPS[type(node.op)](_eval(node.left), _eval(node.right))
        ...
        raise ValueError(f"不支持的表达式：{ast.dump(node)}")
    return _eval(tree)
```

思路：**先把表达式解析成 AST（语法树），再逐节点检查——只放行数字和四则运算节点，遇到任何没在白名单里的节点就抛异常。** 这样 LLM 就算写出恶意代码，也走不到执行那一步。

（这就是「白名单」的安全哲学：默认拒绝，只放行明确允许的，而不是默认允许、试图拦截危险的。）

---

## 和你的项目有什么关系

三个测试题全是「先 search 查事实 → 再 calculator 算数」的多步推理：

- 苹果公司到 2026 年成立多少年了？→ search 查成立年份 → calculator 算 2026-1976
- 珠穆朗玛峰比埃菲尔铁塔高多少米？→ search 查两个高度 → calculator 做减法
- 长江比黄河长多少公里？→ 同上

跑起来后重点观察：**LLM 每一步的 Thought 是怎么变化的**——它先意识到「得查数据」，再意识到「得算一下」，最后才敢下结论。这就是 ReAct 的价值：让模型一步步「暴露推理过程」，而不是黑箱瞎猜。

---

## 相关笔记

- [ReAct 循环：Thought → Action → Observation](./react-thought-action-observation)
- [Function Calling 工具调用](./function-calling)
- [MCP 协议](./mcp-protocol)
