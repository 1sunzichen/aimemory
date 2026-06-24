# Electron：用 Web 技术构建桌面应用

> 记录于 2026-06-23，对话整理

---

## 核心思路

Electron = Chromium（渲染） + Node.js（系统能力） + 进程间通信（IPC）

用 HTML/CSS/JS 写桌面应用，能调用操作系统能力（文件系统、系统通知、托盘等）。

---

## 架构：主进程 vs 渲染进程

```
┌─────────────────────────────┐
│       主进程 (Main)          │
│  - 创建窗口                  │
│  - 系统菜单/托盘             │
│  - 文件系统访问              │
│  - 只有一个                  │
└──────────┬──────────────────┘
           │ IPC (ipcMain/ipcRenderer)
┌──────────▼──────────────────┐
│     渲染进程 (Renderer)      │
│  - HTML/CSS/JS 页面          │
│  - 不能直接访问 Node API     │
│  - 每个窗口一个              │
│  - 通过 preload 暴露 API     │
└─────────────────────────────┘
```

---

## 三个关键概念

### 1. 主进程 (main.js)

```javascript
const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800, height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,    // 渲染进程不能直接碰 Node
      nodeIntegration: false     // 安全：关闭 node 集成
    }
  })
  win.loadFile('index.html')
})
```

### 2. Preload 脚本（安全桥梁）

这是主进程和渲染进程之间的唯一通道。

```javascript
// preload.js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-version'),
  saveFile: (data) => ipcRenderer.invoke('save-file', data)
})
```

### 3. IPC 通信

```
渲染进程                    主进程
  │                          │
  ├── invoke('key', args) ──► ipcMain.handle('key', handler)
  │                          │
  │◄── return value ────────┤
```

---

## 项目结构模板

```
my-app/
├── package.json          # 入口 main.js，依赖 electron
├── main.js               # 主进程
├── preload.js            # 安全桥梁
├── index.html            # UI 入口
├── renderer.js           # 前端逻辑
├── styles.css            # 样式
└── assets/               # 图标等资源
```

---

## 常用 Node 能力（主进程中）

| 需求 | Node 模块 |
|------|----------|
| 读取文件 | `fs.readFileSync / fs.readFile` |
| 写入配置 | `fs.writeFileSync` |
| 系统路径 | `path.join`, `app.getPath('userData')` |
| 打开对话框 | `dialog.showOpenDialog()` |
| 系统通知 | `new Notification({...})` |
| 托盘图标 | `new Tray('/path/icon.png')` |

---

## 安全原则

1. `contextIsolation: true` → 渲染进程无法直接碰 Node
2. `nodeIntegration: false` → 关闭 `require()` 在页面中使用
3. 通过 `contextBridge` 只暴露需要的 API
4. 永远不要在 preload 里暴露 `ipcRenderer.send` 给不可信内容

---

## 为什么 Electron 适合 Hextech 推荐器

- **不需要服务器**：所有数据处理在本地完成
- **快速启动**：像普通桌面应用一样点击即开
- **UI 灵活**：HTML/CSS 可以做出漂亮的英雄选择界面
- **数据持久化**：通过 `fs` 保存用户的常用阵容和偏好
