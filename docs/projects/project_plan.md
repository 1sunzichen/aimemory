# aimemory 项目化方案

目标：
把当前桌面上的 `aimemory` 文件夹升级成一个可以长期维护、可本地预览、可部署到 Vercel / Cloudflare Pages / 国内静态站点的平台型项目。

---

## 1. 推荐目标形态

建议把它做成：
- 一个纯静态知识库网站
- Markdown 驱动
- 支持全文搜索
- 支持目录导航
- 支持本地文档持续沉淀
- 后续可加“导入脚本”，自动把新总结写进站点目录

这样有几个好处：
1. 最容易部署
2. 最适合 Vercel / Cloudflare Pages
3. 国内部署也容易兼容
4. 不依赖后端数据库就能先跑起来

---

## 2. 最推荐技术选型

### 方案 A：VitePress（首推）

适合你现在这个场景，原因：
- 原生支持 Markdown 知识库
- 自动左侧导航、搜索、目录
- 文档站体验好
- 可直接部署到 Vercel / Cloudflare Pages
- 结构简单，后期维护成本低

推荐目录结构：

```text
aimemory/
  docs/
    index.md
    artifacts/
      artifacts_summary_dedup.md
      clash_proxy_modes_guide.md
      deployment_report.md
      network_explained.md
      service_registry.md
    memory/
      hermes_memory_snapshot.md
    projects/
    deploy/
  scripts/
    import_artifacts.py
    build_index.py
  package.json
  vite.config.ts 或 docs/.vitepress/config.mts
  README.md
```

### 方案 B：Docusaurus

优点：
- 功能更丰富
- 更像正式文档平台

缺点：
- 更重
- 配置更复杂
- 对你当前这个“先快速项目化”的目标有点过度

### 方案 C：Next.js / Astro 自定义站点

优点：
- 自由度高
- 可做成内容站 / 个人知识站

缺点：
- 开发成本更高
- 对当前阶段不是最省力路径

结论：
当前最推荐 `VitePress`。

---

## 3. 部署平台建议

### 3.1 Vercel
优点：
- 部署最省心
- 连接 GitHub 后自动发布
- 预览环境方便

缺点：
- 国内访问不稳定
- 如果只给国内同事看，体验可能一般

### 3.2 Cloudflare Pages
优点：
- 静态站部署很稳
- 全球加速
- 配合域名和缓存很方便

缺点：
- 国内访问同样不一定最佳
- 某些网络环境下可达性不如国内平台稳定

### 3.3 国内平台
可选思路：
- 腾讯云静态网站托管
- 阿里云 OSS + CDN
- 七牛云
- 宝塔 + Nginx 静态站

优点：
- 国内访问更稳定
- 自定义域名更方便结合备案

缺点：
- 配置步骤可能比 Vercel 略多

### 推荐部署策略

建议分两阶段：

阶段 1：
- 用 Vercel 或 Cloudflare Pages 先把项目跑起来
- 目的是快速得到一个可访问版本

阶段 2：
- 如果以后主要给国内访问，再迁到国内静态托管
- 或同一份代码同时部署两份：
  - 海外版：Vercel / Cloudflare
  - 国内版：阿里云 OSS / 腾讯云静态托管

---

## 4. 这个项目建议包含什么

### 第一层：文档内容
- artifacts 原始文档
- artifacts 去重总结
- Hermes memory 摘要
- 后续项目部署文档
- 网络问题排查文档
- CI/CD 经验总结

### 第二层：导航与索引
- 首页
- 按主题分类
  - artifacts
  - memory
  - deploy
  - networking
  - projects
- 每个主题下有概览页

### 第三层：自动化脚本
后面建议加：
- 自动把某个目录里的 md 导入到 docs 目录
- 自动生成索引页
- 自动去重/归类

---

## 5. 你这个项目最适合的演进路线

### Phase 1：先静态站化
目标：把当前 `aimemory` 变成可浏览网站

要做的事：
1. 初始化一个文档站项目
2. 把现有 md 文件迁移到 `docs/` 下
3. 配置首页、侧边栏、导航
4. 本地运行预览
5. 推到 Git 仓库
6. 接 Vercel / Cloudflare Pages

### Phase 2：结构化
目标：从“堆文件”变成“知识库”

要做的事：
1. 按主题归档
2. 做索引页
3. 做标签页/分类页
4. 统一文件命名规范

### Phase 3：自动沉淀
目标：以后新内容自动汇总进项目

要做的事：
1. 写导入脚本
2. 自动复制新 md 到 docs 对应目录
3. 自动更新 README / index
4. 后续可接 Git 自动提交

---

## 6. 我建议的最终目录结构

```text
aimemory/
  docs/
    index.md
    artifacts/
      index.md
      artifacts_summary_dedup.md
      clash_proxy_modes_guide.md
      deployment_report.md
      network_explained.md
      service_registry.md
    memory/
      index.md
      hermes_memory_snapshot.md
    deploy/
      index.md
    networking/
      index.md
    projects/
      index.md
  scripts/
    import_external_docs.py
    refresh_indexes.py
  .gitignore
  package.json
  README.md
```

---

## 7. 本地与线上发布方式

### 本地开发
```bash
npm install
npm run docs:dev
```

### 构建
```bash
npm run docs:build
```

### Vercel
- Framework Preset: VitePress / Other
- Build Command: `npm run docs:build`
- Output Directory: `docs/.vitepress/dist`

### Cloudflare Pages
- Build Command: `npm run docs:build`
- Build output directory: `docs/.vitepress/dist`

### 国内静态托管
- 上传 `docs/.vitepress/dist` 目录内容即可

---

## 8. 现在最合理的下一步

我建议你下一步就做这个：

1. 我把 `Desktop/aimemory` 直接改造成一个 VitePress 项目
2. 保留你现有 md 文件
3. 自动生成首页和目录
4. 你本地预览确认效果
5. 再决定部署到：
   - Vercel
   - Cloudflare Pages
   - 国内平台

---

## 9. 当前结论

如果你的目标是：
“把当前这些总结、记忆、部署文档，变成一个长期可访问、可扩展、可部署的网站项目”

最合适的方案是：
- 先把 `aimemory` 做成 `VitePress` 文档站
- 先部署到 Vercel 或 Cloudflare Pages 验证
- 后续再按国内访问需求迁移到国内域名/静态托管
