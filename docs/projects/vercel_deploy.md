# Vercel 部署说明

目标域名：`memory.oldphoto.site`

## 一、前提

- 代码仓库已推送到 GitHub / GitLab
- 本地已验证：`npm run docs:build` 成功

## 二、Vercel 配置

1. 登录 Vercel
2. 点击 `Add New Project`
3. 导入该仓库
4. 配置如下：

```text
Framework Preset: Other
Build Command: npm run docs:build
Output Directory: docs/.vitepress/dist
Install Command: npm install
```

Node 版本建议 20+

## 三、自定义域名

部署成功后：
1. 进入项目设置 `Domains`
2. 添加 `memory.oldphoto.site`
3. 按提示配置 DNS 记录

## 四、验证项

- 首页可打开
- 搜索可用
- artifacts / memory / projects 页面正常
- logo 和 clean URLs 正常

## 五、适用场景

Vercel 更适合：
- 快速预览
- Git 驱动自动部署
- 海外访问优先

如果后续主要服务国内访问，建议再做一份 Cloudflare 或国内静态托管版本。
