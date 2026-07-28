# MCP（模型上下文协议）是什么？

> 原文：https://modelcontextprotocol.io  
> 翻译日期：2026-07-28

---

MCP（Model Context Protocol，模型上下文协议）是一个**开源标准**，用于将 AI 应用连接到外部系统。

有了 MCP，Claude、ChatGPT 等 AI 应用就能连接**数据源**（本地文件、数据库）、**工具**（搜索引擎、计算器）和**工作流**（专用提示词）——获得关键信息并执行任务。

**一句话类比：MCP 就是 AI 应用的 USB-C 接口。** USB-C 统一了电子设备的连接方式，MCP 统一了 AI 应用连接外部系统的方式。

---

## MCP 能做什么？

- Agent 可以访问你的 Google 日历和 Notion，成为更个性化的 AI 助手
- Claude Code 可以根据 Figma 设计稿生成完整网页应用
- 企业聊天机器人可以连接组织内多个数据库，让用户用对话分析数据
- AI 模型可以在 Blender 中创建 3D 设计，并通过 3D 打印机打印出来

---

## 为什么 MCP 很重要？

| 角色 | 收益 |
|---|---|
| **开发者** | 减少构建 AI 应用时连接外部系统的开发时间和复杂度 |
| **AI 应用/Agent** | 获得丰富的数据源、工具和应用生态，增强能力 |
| **最终用户** | AI 应用能访问你的数据，必要时代替你执行操作 |

---

## 广泛的生态支持

MCP 是一个开放协议，已被大量客户端和服务端支持：

| 类型 | 支持者 |
|---|---|
| AI 助手 | [Claude](https://claude.com/docs/connectors/building)、[ChatGPT](https://developers.openai.com/api/docs/mcp/) |
| 开发工具 | [VS Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)、[Cursor](https://cursor.com/docs/context/mcp)、[MCPJam](https://docs.mcpjam.com/getting-started) |

**一次构建，到处集成。**

---

## 开始构建

### 🔧 构建 Server
创建 MCP Server，暴露你的数据和工具。  
→ https://modelcontextprotocol.io/docs/develop/build-server

### 💻 构建 Client
开发连接 MCP Server 的应用程序。  
→ https://modelcontextprotocol.io/docs/develop/build-client

### 🧩 构建 MCP App
构建运行在 AI 客户端内部的交互式应用。  
→ https://modelcontextprotocol.io/extensions/apps/overview

---

## 进一步学习

📖 **理解核心概念**：学习 MCP 的架构和核心概念。  
→ https://modelcontextprotocol.io/docs/learn/architecture
