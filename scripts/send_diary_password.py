#!/usr/bin/env python3
"""每天早上发送日记密码到飞书，由 cron 调用"""

import hashlib, os, sys
from datetime import date

sys.path.insert(0, "/Users/wujie22qx/FSD/ppus/scripts")
from feishu_bot import send_text

SECRET = os.getenv("DIARY_SECRET", "极染悟心")
MY_OPEN_ID = "ou_11ed1c8b1eb6933700be598d35f0c70e"


def get_password():
    today = date.today().strftime("%Y%m%d")
    return hashlib.sha256((SECRET + today).encode()).hexdigest()[:6].upper()


if __name__ == "__main__":
    pwd = get_password()
    today_str = date.today().strftime("%m月%d日")
    msg = f"📔 {today_str} 日记密码：{pwd}\nhttps://memory.oldphoto.site/diary.html"
    send_text("open_id", MY_OPEN_ID, msg)
    print(f"✅ 已发送，密码：{pwd}")
