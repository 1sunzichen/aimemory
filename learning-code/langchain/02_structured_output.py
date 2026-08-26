"""示例 2：结构化输出 —— 让 LLM 返回符合 schema 的 Pydantic 对象，而不是一段自由文本

核心概念：用 Pydantic 定义「输出格式」，用 PydanticOutputParser 把 JSON 解析成对象。
这是做「可靠、可编程」LLM 应用的关键：拿到的是字段，不是字符串。

运行：python 02_structured_output.py
"""

import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field, SecretStr
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import PydanticOutputParser

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


# 1. 用 Pydantic 定义想要的结构
class MovieReview(BaseModel):
    title: str = Field(description="电影名")
    rating: int = Field(description="评分，1-5 的整数")
    summary: str = Field(description="一句话影评")
    genre: str = Field(description="电影类型")


def demo():
    # 2. 注意：参数名是 pydantic_object，不是 output_object
    parser = PydanticOutputParser(pydantic_object=MovieReview)

    # 3. 把「输出格式说明」注入提示词，模型才会照着 schema 吐 JSON
    prompt = ChatPromptTemplate.from_template(
        "你是影评人。针对电影《{movie}》写一条影评。\n"
        "只输出 JSON，不要其他内容。\n"
        "{format_instructions}"
    )

    chain = prompt | llm | parser

    # 4. 拿到的直接是 MovieReview 对象，可以 .title .rating 访问字段
    result = chain.invoke(
        {
            "movie": "流浪地球",
            "format_instructions": parser.get_format_instructions(),
        }
    )

    print("返回类型：", type(result).__name__)
    print("电影名：", result.title)
    print("评分：", result.rating)
    print("类型：", result.genre)
    print("影评：", result.summary)


if __name__ == "__main__":
    demo()
