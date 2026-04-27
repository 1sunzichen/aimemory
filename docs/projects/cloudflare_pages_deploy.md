# Cloudflare Pages 部署说明

目标域名：`memory.oldphoto.site`

## 一、前提

- 代码仓库已推送到 GitHub / GitLab
- 项目根目录包含：
  - `package.json`
  - `docs/.vitepress/config.mts`
- 本地已验证：`npm run docs:build` 成功

## 二、Cloudflare Pages 配置

1. 登录 Cloudflare Dashboard
2. 进入 `Workers & Pages` -> `Create application` -> `Pages`
3. 连接你的 Git 仓库
4. 选择该项目仓库
5. 构建配置填写：

```text
Framework preset: None
Build command: npm run docs:build
Build output directory: docs/.vitepress/dist
Root directory: /
Node.js version: 20 或更高
```

## 三、自定义域名

部署成功后：
1. 进入该 Pages 项目
2. 打开 `Custom domains`
3. 添加 `memory.oldphoto.site`
4. 按提示在 DNS 中接入

如果 `oldphoto.site` 本身就在 Cloudflare 托管，通常可一键生效。

## 四、上线后验证

- 访问首页
- 验证左侧导航
- 搜索是否可用
- 打开：
  - `/artifacts/`
  - `/memory/`
  - `/projects/`

## 五、后续建议

- 打开 Cloudflare 的缓存与压缩
- 后续可继续加自定义 404 页面
- 如需国内更稳访问，可再同步部署到国内静态托管
