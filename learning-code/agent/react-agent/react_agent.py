"""手写 ReAct Agent —— 不用框架，纯 Python 实现 Thought → Action → Observation 循环

对应 30 天计划 Day 16「手写 ReAct」，把三篇笔记串起来落地：
  - ReAct 循环（Thought → Action → Observation）
  - Function Calling（工具调用机制）
  - MCP 协议

核心认知：LLM 不是一口气给答案，而是「想一步 → 调工具 → 看结果 → 再想」，
直到它能回答为止。整个过程由【程序】驱动，LLM 只负责思考和选工具。

运行方式：
  - VSCode 里按 F5 调试（会在这里打断点）
  - 或终端执行：uv run python react_agent.py
"""

import ast
import operator
import os
import re

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

_api_key = os.getenv("DEEPSEEK_API_KEY")
if not _api_key:
    raise SystemExit("未找到 DEEPSEEK_API_KEY，请检查 .env 文件")

client = OpenAI(
    api_key=_api_key,
    base_url=os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com"),
)
MODEL = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")


# ─────────────────────────────────────────────────────────────
# 1. 定义工具（纯 Python 函数，LLM 不能直接执行，只能「点名」让程序执行）
# ─────────────────────────────────────────────────────────────

# 内置「搜索」知识库。教学用模拟搜索引擎，真实项目换成 Tavily / SerpAPI / 向量检索。
KNOWLEDGE_BASE = {
    "苹果": "苹果公司（Apple）成立于 1976 年。",
    "微软": "微软公司（Microsoft）成立于 1975 年。",
    "埃菲尔铁塔": "埃菲尔铁塔高 330 米。",
    "珠穆朗玛峰": "珠穆朗玛峰海拔 8848.86 米，是世界最高峰。",
    "长江": "长江全长约 6300 公里。",
    "黄河": "黄河全长约 5464 公里。",
}


def search(query: str) -> str:
    """工具 1：搜索。命中知识库关键词就返回对应条目。"""
    for key, value in KNOWLEDGE_BASE.items():
        if key in query:
            return value
    return f"未找到与「{query}」相关的信息。"


# 工具 2：计算器。用 ast 白名单安全求值，禁止 eval 任意代码（防 LLM 注入删库命令）。
_ALLOWED_OPS = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.Pow: operator.pow,
    ast.Mod: operator.mod,
    ast.USub: operator.neg,
    ast.UAdd: operator.pos,
}


def safe_eval(expr: str):
    """只允许数字 + 四则运算 + 幂，其余一律拒绝。"""
    tree = ast.parse(expr, mode="eval")

    def _eval(node):
        if isinstance(node, ast.Expression):
            return _eval(node.body)
        if isinstance(node, ast.Constant) and isinstance(node.value, (int, float)):
            return node.value
        if isinstance(node, ast.BinOp) and type(node.op) in _ALLOWED_OPS:
            return _ALLOWED_OPS[type(node.op)](_eval(node.left), _eval(node.right))
        if isinstance(node, ast.UnaryOp) and type(node.op) in _ALLOWED_OPS:
            return _ALLOWED_OPS[type(node.op)](_eval(node.operand))
        raise ValueError(f"不支持的表达式：{ast.dump(node)}")

    return _eval(tree)


def calculator(expr: str) -> str:
    """工具 2：计算数学表达式，如 '2026 - 1976'。"""
    try:
        return str(safe_eval(expr))
    except Exception as e:
        return f"计算失败：{e}"


# ─────────────────────────────────────────────────────────────
# 2. System Prompt：教 LLM 按 ReAct 格式输出
# ─────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """你是一个会用工具解决问题的 AI Agent，遵循 ReAct（Thought → Action → Observation）循环。

你有两个工具：
1. search[查询内容] —— 在知识库中搜索信息（例：search[苹果公司成立于哪一年]）
2. calculator[数学表达式] —— 计算数学表达式（例：calculator[2026 - 1976]）

每一轮你必须严格按以下格式输出：

Thought: 你当前的想法和推理
Action: search[查询内容]  或  calculator[表达式]

当你能回答用户问题时，输出：

Thought: 你的结论
Final Answer: 最终答案

规则：
- 每轮只调用一个工具
- 拿到 Observation 后再决定下一步，不要臆造信息
- 需要事实就去 search，需要算数就去 calculator
"""


# ─────────────────────────────────────────────────────────────
# 3. 主循环：程序驱动 ReAct，LLM 只负责「想」和「选工具」
# ─────────────────────────────────────────────────────────────

def react_agent(question: str, max_steps: int = 8) -> str:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": question},
    ]

    for step in range(1, max_steps + 1):
        resp = client.chat.completions.create(
            model=MODEL, messages=messages, temperature=0
        )
        text = resp.choices[0].message.content.strip()
        print(f"\n┌─ 第 {step} 步 LLM 输出 ─────────────────────────")
        print(f"{text}")
        print("└───────────────────────────────────────────────")

        messages.append({"role": "assistant", "content": text})

        # ① 先看有没有 Final Answer（结束条件）
        m_final = re.search(r"Final Answer[:：]\s*(.*)", text, re.S)
        if m_final:
            return m_final.group(1).strip()

        # ② 再看有没有 Action（要调工具）
        m_action = re.search(
            r"Action[:：]\s*(search|calculator)\s*[\[【(（](.*?)[\]】)）]", text, re.S
        )
        if not m_action:
            observation = (
                "【系统提示】没识别到合法的 Action。请严格按格式："
                "Action: search[查询] 或 Action: calculator[表达式]，或 Final Answer: 答案"
            )
        else:
            tool, arg = m_action.group(1), m_action.group(2).strip()
            # 关键：这里【程序】执行工具，不是 LLM 执行（对比 Function Calling 笔记）
            if tool == "search":
                observation = search(arg)
            else:
                observation = calculator(arg)

        print(f"  Observation: {observation}")
        # ③ 工具结果喂回，进入下一轮
        messages.append({"role": "user", "content": f"Observation: {observation}"})

    return "（达到最大步数仍未得出最终答案）"


# ─────────────────────────────────────────────────────────────
# 4. 测试：三个都需要「search 查事实 + calculator 算数」的多步推理题
# ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    questions = [
        "苹果公司到 2026 年成立多少年了？",
        "珠穆朗玛峰比埃菲尔铁塔高多少米？",
        "长江比黄河长多少公里？",
    ]
    for q in questions:
        print("\n" + "=" * 60)
        print(f"❓ 问题：{q}")
        print("=" * 60)
        answer = react_agent(q)
        print(f"\n✅ 最终答案：{answer}")
