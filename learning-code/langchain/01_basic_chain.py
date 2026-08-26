"""示例 1：基础 LCEL 链 —— 理解 LangChain 的灵魂「管道符 |」

核心概念：一条链 = 把多个组件用 | 串起来，数据从左往右流。
    prompt | llm | StrOutputParser()

运行：python 01_basic_chain.py
"""

import os
from dotenv import load_dotenv
from pydantic import SecretStr
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

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


def demo():
    # 1. 定义模板：{concept} 是占位符，调用时传入
    prompt = ChatPromptTemplate.from_template(
        "用一句通俗的话，向一个高中生解释什么是：{concept}"
    )

    # 2. 用 | 串成链：prompt 把变量填进模板 -> llm 生成 -> parser 把输出转成纯字符串
    chain = prompt | llm | StrOutputParser()

    # 3. 同一个链，换入参就能复用
    for concept in ["梯度下降", "向量数据库", "注意力机制"]:
        print(f"\n>>> 解释：{concept}")
        print(chain.invoke({"concept": concept}))


if __name__ == "__main__":
    demo()
