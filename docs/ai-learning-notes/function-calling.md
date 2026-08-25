# Function Calling：让 LLM 结构化调用工具

> ReAct 的 Action 有两种实现：**写代码执行**（教学版）和**调用预定义工具**（生产级）。本笔记讲后者——Function Calling，所有生产级 agent 框架（LangChain、LangGraph）底层的工具调用机制。

---

## 两种 Action 的对比

| | 代码执行（1-1） | Function Calling（1-2） |
|---|---|---|
| Action 是什么 | LLM 写任意 Python 代码 | LLM 从白名单选工具 + 结构化传参 |
| 谁执行 | 程序 subprocess 跑代码 | 程序按工具名分发执行 |
| 安全性 | 危险（死循环/删文件） | 安全（白名单可控） |
| 生产级 | ❌ 玩具版 | ✅ 真家伙 |

核心区别：Function Calling 里，LLM 只能调用你给它的白名单工具，不能写任意代码。这就是"可控"。

---

## 三步机制

### 1. 定义工具白名单（tools）

每个工具 = 名字 + 描述 + 参数 schema：

```python
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "查询某城市的天气",   # 描述是给 LLM 看的"说明书"
            "parameters": {
                "type": "object",
                "properties": {"city": {"type": "string"}},
                "required": ["city"],
            },
        },
    },
]
```

### 2. 结构化调用

把白名单传给 LLM，LLM 输出 `tool_calls`（工具名 + JSON 参数），程序按 `name` 分发执行：

```python
resp = client.chat.completions.create(
    model="deepseek-chat", messages=messages, tools=TOOLS, temperature=0)
msg = resp.choices[0].message

if msg.tool_calls:          # LLM 决定调用工具
    for tc in msg.tool_calls:
        name = tc.function.name                # 工具名
        args = json.loads(tc.function.arguments)  # 参数（JSON 字符串转 dict）
        result = TOOL_FUNCS[name](**args)      # 程序执行，不是 LLM 执行
```

### 3. 结果喂回

执行结果用 `role="tool"` + `tool_call_id` 喂回，LLM 才能对上号：

```python
messages.append({"role": "tool", "tool_call_id": tc.id, "content": str(result)})
```

---

## tool_calls 对象结构

OpenAI 兼容的 tool_calls 对象（`ChatCompletionMessageToolCall`），属性就这几个：

| 属性 | 含义 |
|---|---|
| `tc.id` | 工具调用的唯一 ID（字符串） |
| `tc.type` | 类型，永远是 `"function"` |
| `tc.function.name` | 工具名 |
| `tc.function.arguments` | 参数（JSON 字符串，要用 `json.loads` 转 dict） |

记忆套路：**函数相关的都在 `tc.function` 下面（name、arguments），id 和 type 在 tc 顶层。**

遇到不知道有什么属性时，别背，直接打印调试：

```python
tc = msg.tool_calls[0]
print(tc)                     # 整个对象长啥样
print(tc.id)                  # 看 id
print(tc.function.name)       # 看工具名
print(tc.function.arguments)  # 看参数
```

---

## Python 语法：字典取值 + ** 解包

`TOOL_FUNCS[name](**args)` 是两段语法拼起来：

1. `TOOL_FUNCS[name]` —— 字典取值。`TOOL_FUNCS = {"get_weather": get_weather}`，用 name 当 key 取出函数对象。
2. `(**args)` —— 关键字参数解包。args 是字典 `{"city": "北京"}`，`**args` 把它炸开成关键字参数，等价于 `get_weather(city="北京")`。

合起来 = 根据 LLM 返回的工具名，动态调用对应函数。这是 agent 工具调用的核心机制。

`*` 和 `**` 一次分清（面试常问）：
- `*args` —— 解包列表/元组，变成位置参数
- `**kwargs` —— 解包字典，变成关键字参数

一句话：`*` 拆列表，`**` 拆字典。

---

## 相关笔记

- [ReAct 循环：Thought → Action → Observation](./react-thought-action-observation)
- [MCP 协议](./mcp-protocol)
