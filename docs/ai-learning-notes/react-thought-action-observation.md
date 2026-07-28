# ReAct 循环：Thought → Action → Observation

> Agent 决策的核心循环。所有 AI Agent（Claude Code、Hermes、AutoGPT）底层都是这个模式。

---

## 三个步骤

```
Thought（思考）  →  "我要做什么？"
Action（行动）  →  调工具 / 查数据 / 执行代码
Observation（观察）→  看结果，决定下一步
                    ↓
              回到 Thought（循环直到完成）
```

---

## 实际例子：查 GPU 告警

```
用户："帮我把上周 GPU 超标记录汇总发给 Mike"

Thought:  我需要查上周的 GPU 数据
Action:   query_gpu_alerts(days=7)
Observation:  返回 5 条告警记录，最高 92%

Thought:  数据够了，生成报告
Action:   generate_report(data)
Observation:  报告生成完毕

Thought:  发给 Mike
Action:   send_email(to="mike@xxx.com", body=report)  ← 需要确认
Observation:  发送成功

Answer:  已汇总 5 条告警，报告已发送给 Mike
```

---

## ReAct 的 Python 伪代码

```python
while not done:
    # Thought: 让 LLM 思考下一步
    thought = llm("基于当前信息，下一步做什么？", context)

    # Action: 解析 LLM 的决定，执行对应工具
    if "查询" in thought:
        result = query_database()
    elif "发邮件" in thought:
        if need_confirm:
            wait_for_user()     # ← Human-in-the-loop
        result = send_email()
    elif "完成" in thought:
        break

    # Observation: 把结果记下来，喂回上下文
    context.append(result)
```

---

## 为什么要写成 Thought-Action-Observation 格式？

LLM 按这个格式输出，程序就能解析：

```
LLM 输出：
Thought: 我需要查数据库
Action: query_db
Action Input: {"query": "SELECT * FROM alerts WHERE days=7"}
Observation: [结果会自动填入]

下一轮：
Thought: 数据已拿到，生成报告
Action: generate_report
...
```

**格式化的目的是让代码能自动解析 LLM 的输出，决定下一步调哪个函数。**

---

## 三种 Agent 模式的 Thought-Action-Observation 对比

| 模式 | Thought 节奏 | 特点 |
|---|---|---|
| **ReAct** | 每一步都想 | 走一步看一步，灵活 |
| **Plan-and-Execute** | 先一次性想完所有步骤 | 有全局计划，效率高 |
| **Reflection** | 完成后多想一次 | "刚才哪里做错了？" |

---

## 和你的项目有什么关系

你的 `week1_assistant.py` 就是实现了这个循环：

```python
# 你项目里的代码：
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "你是助手，按 Thought/Action/Observation 格式回复"},
        {"role": "user", "content": task}
    ]
)
# → 解析 LLM 的 Thought/Action → 执行函数 → 填入 Observation → 循环
```

面试被问"Agent 怎么工作"，就说 Thought-Action-Observation 循环 + 画上面那个流程图。
