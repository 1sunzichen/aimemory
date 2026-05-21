#!/usr/bin/env python3
"""
写完日记后运行这个脚本，自动加密并更新 diary.html

用法：
  python3 scripts/diary_encrypt.py          # 交互式输入日记
  python3 scripts/diary_encrypt.py -f my_diary.txt  # 从文件读取
"""

import hashlib, os, base64, sys, re
from datetime import date

SECRET = os.getenv("DIARY_SECRET", "极染悟心")


def get_key(day=None):
    if day is None:
        day = date.today().strftime("%Y%m%d")
    return hashlib.sha256((SECRET + day).encode()).digest(), day


def encrypt(content: str):
    try:
        from cryptography.hazmat.primitives.ciphers.aead import AESGCM
    except ImportError:
        print("缺少依赖，请运行：pip install cryptography")
        sys.exit(1)

    key, day = get_key()
    nonce = os.urandom(12)
    ct = AESGCM(key).encrypt(nonce, content.encode("utf-8"), None)
    return base64.b64encode(nonce + ct).decode(), day


def update_html(encrypted: str):
    html_path = os.path.join(os.path.dirname(__file__), "../docs/public/diary.html")
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
    new_html = re.sub(r'const ENCRYPTED = "[^"]*"', f'const ENCRYPTED = "{encrypted}"', html)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_html)
    print("✅ diary.html 已更新")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("-f", "--file", help="日记文本文件路径")
    args = parser.parse_args()

    if args.file:
        with open(args.file, "r", encoding="utf-8") as f:
            content = f.read()
    else:
        print("输入日记内容（输入完按 Ctrl+D 结束）：\n")
        content = sys.stdin.read()

    if not content.strip():
        print("内容为空，退出")
        sys.exit(0)

    encrypted, day = encrypt(content)
    update_html(encrypted)

    pwd = hashlib.sha256((SECRET + day).encode()).hexdigest()[:6].upper()
    print(f"今日密码：{pwd}")
    print(f"访问地址：https://memory.oldphoto.site/diary.html")
