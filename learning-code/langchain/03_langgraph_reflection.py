"""示例 3：LangGraph 反思循环 —— 感受 LangChain（直线）和 LangGraph（循环图）的区别

LangChain 是单向流水线；LangGraph 是「图 + 状态」，支持循环、分支、回溯。
这个例子：写作 -> 反思挑毛病 -> 不满意就重写，最多 2 轮，满意才结束。

运行：python 03_langgraph_reflection.py
"""

import os
from typing import TypedDict
from dotenv import load_dotenv
from pydantic import SecretStr
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END

load_dotenv()

_api_key = os.getenv("DEEPSEEK_API_KEY")
if not _api_key:
    raise SystemExit("未找到 DEEPSEEK_API_KEY，请 cp .env.example .env 并填入 key")

llm = ChatOpenAI(
    model=os.getenv("DEEPSEEK_MODEL", "deepseek-chat"),
    base_url=os.getenv("DEEPSEEK_BASE_URL", "https://api.deepseek.com"),
    api_key=SecretStr(_api_key),
    temperature=0.7,
)


# 1. 定义「状态」：图上所有节点共享的数据结构
class State(TypedDict):
    topic: str
    draft: str
    reflection: str
    iteration: int


# 2. 定义节点：每个节点是一个函数，接收 state、返回 state 的更新
def write(state: State) -> dict:
    msg = llm.invoke(f"围绕「{state['topic']}」写一段 50 字以内的简介，直接输出正文。").content
    return {"draft": msg, "iteration": state["iteration"] + 1}


def reflect(state: State) -> dict:
    msg = llm.invoke(
        f"作为严格编辑，挑出下面这段文字的一个最大问题，只输出问题本身：\n{state['draft']}"
    ).content
    return {"reflection": msg}


def rewrite(state: State) -> dict:
    msg = llm.invoke(
        f"根据这条意见修改文字，直接输出修改后的正文：\n原文：{state['draft']}\n意见：{state['reflection']}"
    ).content
    return {"draft": msg}


# 3. 条件边：根据 state 决定下一步走哪
def should_continue(state: State) -> str:
    # 最多改 2 轮就收手，否则可能无限循环
    if state["iteration"] >= 2:
        return "end"
    return "rewrite"


# 4. 建图：加节点、连边、设入口
graph = StateGraph(State)
graph.add_node("write", write)
graph.add_node("reflect", reflect)
graph.add_node("rewrite", rewrite)
graph.set_entry_point("write")
graph.add_edge("write", "reflect")
graph.add_conditional_edges("reflect", should_continue, {"rewrite": "rewrite", "end": END})
graph.add_edge("rewrite", "reflect")  # 重写后回到反思，形成循环
app = graph.compile()


def demo():
    result = app.invoke({"topic": "RAG 检索增强生成", "draft": "", "reflection": "", "iteration": 0})
    print("最终迭代次数：", result["iteration"])
    print("\n最终稿：\n", result["draft"])


if __name__ == "__main__":
    demo()
