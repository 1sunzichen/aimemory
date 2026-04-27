# 部署前检查清单

项目目录：`/Users/wujie22qx/Desktop/aimemory`
推荐域名：`memory.oldphoto.site`
推荐平台：Cloudflare Pages

## 当前已完成

- 已初始化为 VitePress 项目
- 本地 `npm install` 成功
- 本地 `npm run docs:build` 成功
- 已创建 `about` 页面与首页导航
- 已初始化本地 Git 仓库

## Cloudflare Pages 构建参数

- Build command: `npm run docs:build`
- Output directory: `docs/.vitepress/dist`
- Install command: `npm install`
- Node version: `24`（仓库内 `.node-version` 已写入）

## 当前阻塞项

要真正发布到线上，还需要你提供或完成以下任一项：

1. GitHub 仓库
   - 当前本地仓库还没有远程仓库
   - 本机 `gh` 已安装，但未登录

2. Cloudflare 账号登录
   - 若走 Pages，需要 Cloudflare 账号和项目创建权限

## 最短上线路径（推荐）

1. `gh auth login`
2. 创建 GitHub 仓库并推送代码
3. 在 Cloudflare Pages 中连接该仓库
4. 添加自定义域名 `memory.oldphoto.site`

## 备用路径

如果你暂时不想连 GitHub，也可以：
- 手动构建：`npm run docs:build`
- 把 `docs/.vitepress/dist` 上传到任意静态站点托管平台
