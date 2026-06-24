# Hextech ARAM Picker 项目拆解

> Electron 实战：从零到一构建海克斯推荐桌面应用

---

## 项目概览

一个用 Electron 构建的英雄联盟大乱斗海克斯强化推荐工具。输入双方 5 个英雄，自动分析阵容并推荐最优海克斯强化。

```
hextech-aram-picker/
├── package.json          # Electron 33
├── main.js               # 主进程：创建窗口
├── preload.js            # 安全桥梁
├── index.html            # UI
└── src/
    ├── styles.css        # 暗色主题
    ├── renderer.js       # 交互逻辑
    ├── analyzer.js       # 推荐引擎
    └── data/
        ├── champions.js  # 132 英雄
        └── augments.js   # 26 强化
```

---

## 推荐引擎原理

### 数据结构

每个英雄有 3 个属性：

```js
{ id: 'lux', name: '拉克丝', role: 'Mage', sub: 'Support', tier: 'A' }
```

每个海克斯强化有 6 维条件：

```js
{
  name: '巨人', tier: 'Prismatic',
  effect: '生命值 +350',
  condition: {
    team_lacks: ['Tank'],           // 缺前排 → +3分
    team_has: { Tank: [0, 1] },     // 0~1个坦克 → +2分
    synergy_with: ['Fighter'],       // 有战士 → +1分
    description: '队伍缺前排时补坦度'
  }
}
```

### 打分算法

```
基础分 1
+ 己方职业匹配 (0~2 per role)
+ 对方职业匹配 (0~2 per role)
+ 补缺加分   (0~3 per lack)
+ 协同加分   (0~1 per synergy)
+ 针对性加分 (0~2 per weakness)
= 最终得分

按棱彩 > 黄金 > 白银分层，每层取前 6
```

---

## 关键代码片段

### 主进程 — 创建窗口

```js
// main.js
const win = new BrowserWindow({
  width: 1100, height: 750,
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true,    // 隔离
    nodeIntegration: false     // 关闭 Node
  }
})
win.loadFile('index.html')
```

### 渲染进程 — 英雄搜索

```js
// 支持中文名、英文 ID、职业名模糊搜索
const filtered = CHAMPIONS.filter(c =>
  c.name.includes(query) ||
  c.id.includes(query) ||
  ROLE_NAMES[c.role].includes(query)
).slice(0, 8)
```

### 动态打分

```js
function scoreAugment(augment, myAnalysis, enemyAnalysis) {
  let score = 1
  // 己方匹配
  if (cond.team_has) { ... score += 2 }
  // 补缺加分
  if (cond.team_lacks) { ... score += 3 }
  // 对方针对性
  if (cond.enemy_weak_to) { ... score += 2 }
  return score
}
```

---

## 实战验证

**场景**：5 法师 (Lux, Xerath, Brand, Veigar, Ziggs) vs 3 坦 2 战 (Malphite, Ornn, Sejuani, Darius, Sett)

**引擎输出**：

| 层级 | 推荐 | 分数 | 理由 |
|------|------|------|------|
| 棱彩 | 巨人 | 6 | 缺前排补坦度 |
| 棱彩 | 终极革命 | 6 | 法核大招流 |
| 黄金 | 星界躯体 | 6 | 脆皮需血量 |
| 黄金 | 焦灼 | 5 | Poke 打肉 |
| 黄金 | 砍倒 | 5 | 对方坦度高 |

---

## 扩展方向

1. **持久化**：通过 `ipcMain.handle` + `fs` 保存用户常用阵容
2. **打包**：`npx electron-builder` → 输出 Windows/macOS 安装包
3. **数据更新**：接入 Riot API 实时获取英雄数据
4. **AI 增强**：用本地 LLM 直接分析阵容给推荐理由
