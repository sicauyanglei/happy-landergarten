# 快乐乐园 - 儿童综合游戏实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 GDevelop 中实现一个面向3-5岁儿童的游乐园式综合游戏，包含7个独立小游戏，采用渐进难度系统。

**Architecture:** 采用 GDevelop 场景式架构，主场景为游乐园地图，各小游戏为独立场景，通过全局事件协调难度等级和进度数据。

**Tech Stack:** GDevelop 5.x, HTML5 导出, LocalStorage 存储

---

## 文件结构

```
E:/babygame/
├── happy-landergarten.gdproj          # GDevelop项目文件
├── docs/
│   └── superpowers/
│       ├── specs/                      # 设计文档
│       └── plans/                      # 实施计划
├── assets/                             # 资源目录
│   ├── sprites/                        # 精灵图
│   │   ├── characters/                # 角色（小狐狸、小熊、小兔子）
│   │   ├── buildings/                 # 建筑物
│   │   ├── items/                     # 游戏物品
│   │   └── ui/                        # UI元素（按钮、星星等）
│   ├── sounds/                        # 音效
│   │   ├── sfx/                       # 特效音
│   │   └── bgm/                       # 背景音乐
│   └── fonts/                         # 字体
└── scenes/                            # GDevelop场景
    ├── mainMenu/                       # 主菜单
    ├── playground/                     # 游乐园地图
    ├── colorGame/                      # 颜色对对碰
    ├── shapeGame/                      # 形状小能手
    ├── numberGame/                     # 数字跳跳跳
    ├── puzzleGame/                     # 快乐拼图
    ├── musicGame/                      # 小小音乐家
    ├── drawGame/                       # 涂鸦魔法师
    └── animalGame/                     # 动物朋友
```

---

## 任务列表

### Task 1: GDevelop 项目初始化

**Files:**
- Create: `happy-landergarten.gdproj` (项目配置文件)
- Create: `assets/` 目录结构
- Create: `scenes/` 目录结构

- [ ] **Step 1: 创建 GDevelop 项目配置**

创建 `happy-landergarten.gdproj` JSON配置文件：

```json
{
  "firstScene": "playground",
  "windowWidth": 1280,
  "windowHeight": 720,
  "name": "快乐乐园",
  "author": "Happy Landergarten Team",
  "version": "1.0.0",
  "properties": {
    "adaptToScreenSize": true,
    "antialiasing": true,
    "hd": true,
    "immersive": false,
    "minWidth": 800,
    "minHeight": 600,
    "orientation": "landscape",
    "preserveOrientation": false,
    "title": "快乐乐园 - 儿童综合游戏"
  }
}
```

- [ ] **Step 2: 创建资源目录结构**

```
assets/
├── sprites/characters/ (小狐狸.png, 小熊.png, 小兔子.png)
├── sprites/buildings/ (城堡.png, 小彩屋.png, 积木屋.png, 数字塔.png, 拼图屋.png, 音乐厅.png, 画室.png, 动物园.png)
├── sprites/items/ (颜色物品/, 形状/, 数字/, 拼图块/, 乐器/, 画笔/, 动物/)
├── sprites/ui/ (星星.png, 奖章.png, 按钮.png, 进度条.png)
├── sounds/sfx/ (click.ogg, correct.ogg, wrong.ogg, levelup.ogg, transition.ogg)
└── sounds/bgm/ (bgm_main.ogg, bgm_game.ogg)
```

- [ ] **Step 3: 创建占位符资源说明文件**

Create: `assets/README.md` - 列出需要的所有资源及规格

---

### Task 2: 游乐园地图场景 (playground)

**Files:**
- Create: `scenes/playground/scene.json` (场景配置)
- Create: `scenes/playground/events.json` (全局事件)

- [ ] **Step 1: 创建场景基础对象**

在 playground 场景中创建:
- 背景层: 彩虹草地、云朵、树木
- 导航层: 7个建筑入口（可点击区域）
- UI层: 顶部显示当前难度/获得星星数、返回按钮

布局（参考设计文档的地图结构）:
```
         [彩色城堡-主界面]
              │
    ┌─────────┼─────────┐
    │         │         │
[颜色区]   [形状区]   [数字区]
  小彩屋     积木屋     数字塔
    │         │         │
[拼图区]   [音乐区]   [涂鸦区]
  拼图屋     音乐厅     画室
    │
[动物区]
  动物园
```

- [ ] **Step 2: 实现建筑点击导航**

为每个建筑创建点击事件:
```
当 [建筑] 被点击 → 播放 click.ogg → 切换到对应游戏场景
```

- [ ] **Step 3: 实现难度显示系统**

创建全局变量:
- `global.currentDifficulty` (初始值: 1)
- `global.totalStars` (初始值: 0)

在 UI 层显示: 星星图标 × 总数 + 当前难度等级

- [ ] **Step 4: 创建返回导航**

每个游戏场景的"返回"按钮 → 返回 playground 场景

---

### Task 3: 颜色对对碰 (colorGame)

**Files:**
- Create: `scenes/colorGame/scene.json`
- Create: `scenes/colorGame/events.json`
- Create: `scenes/colorGame/behavior.js`

- [ ] **Step 1: 创建颜色题目显示区**

- 中央显示区: 展示彩色物品图片（如红色的苹果）
- 底部选择区: 显示3-6个颜色选项按钮

- [ ] **Step 2: 实现题目生成逻辑**

```
函数 GenerateQuestion(difficulty):
  if difficulty == 1:
    选项数 = 3
    物品池 = 简单物品
  else if difficulty == 2:
    选项数 = 4
  else:
    选项数 = 6
    物品池 = 复杂物品

  正确答案 = 随机选择物品池中的物品
  干扰项 = 随机选择正确答案以外的颜色
```

- [ ] **Step 3: 实现答案判定**

```
当 [颜色按钮] 被点击:
  if 点击的是正确答案:
    播放 correct.ogg
    显示星星喷射动画
    global.totalStars += 1
    连续答对计数 += 1
    if 连续答对计数 >= 2:
      global.currentDifficulty += 1
      连续答对计数 = 0
    延迟 1秒 → 生成新题目
  else:
    播放 wrong.ogg
    显示温柔鼓励文字
    global.currentDifficulty = max(1, global.currentDifficulty - 1)
    连续答对计数 = 0
    延迟 1秒 → 生成新题目
```

- [ ] **Step 4: 实现退出返回**

"返回"按钮 → 切换到 playground 场景

---

### Task 4: 形状小能手 (shapeGame)

**Files:**
- Create: `scenes/shapeGame/scene.json`
- Create: `scenes/shapeGame/events.json`

- [ ] **Step 1: 创建形状显示区**

- 题目区: 显示目标形状（如大黄色圆形）
- 选择区: 底部显示多个形状选项

- [ ] **Step 2: 实现题目生成逻辑**

```
L1: 圆形、方形、三角形 (3选1)
L2: 增加菱形、椭圆形 (4选1) + 放入轮廓
L3: 5个形状 + 需要旋转匹配
```

- [ ] **Step 3: 实现旋转机制（L3）**

当 L3 时，显示旋转后的形状，玩家需要选择正确方向放置

- [ ] **Step 4: 复用颜色游戏的反馈系统**

使用相同的反馈逻辑（星星、难度调整）

---

### Task 5: 数字跳跳跳 (numberGame)

**Files:**
- Create: `scenes/numberGame/scene.json`
- Create: `scenes/numberGame/events.json`

- [ ] **Step 1: 创建数字显示**

- L1: 显示1-3个物品，下方显示数字选项
- L2: 显示1-5个物品，按顺序点击
- L3: 显示1-10个物品，综合题目

- [ ] **Step 2: 实现数数逻辑**

```
函数 CountAndSelect(difficulty):
  显示物品数量 = 难度对应数量
  选项 = 正确答案 ± 随机干扰项
  玩家需要选出正确数字
```

- [ ] **Step 3: 实现顺序点击模式（L2+）**

显示打乱顺序的数字（如 3, 1, 5, 2, 4）
玩家需要按 1, 2, 3, 4, 5 顺序点击

---

### Task 6: 快乐拼图 (puzzleGame)

**Files:**
- Create: `scenes/puzzleGame/scene.json`
- Create: `scenes/puzzleGame/events.json`

- [ ] **Step 1: 创建拼图网格**

- L1: 2x2 网格（4块）
- L2: 3x2 网格（6块）
- L3: 3x3 网格（9块）

- [ ] **Step 2: 实现滑块机制**

```
每块可以点击滑动到相邻空格:
  if 点击的块有相邻空格:
    动画移动到空格位置
    交换两格位置
```

- [ ] **Step 3: 实现胜利判定**

```
每次移动后检查:
  if 所有块都在正确位置:
    播放庆祝动画
    global.totalStars += 难度等级
    生成新题目
```

---

### Task 7: 小小音乐家 (musicGame)

**Files:**
- Create: `scenes/musicGame/scene.json`
- Create: `scenes/musicGame/events.json`

- [ ] **Step 1: 创建乐器选择界面**

- L1: 单一乐器（钢琴键盘/小鼓/木鱼）
- L2: 3种乐器切换
- L3: 完整乐队（钢琴、鼓、吉他、小提琴）

- [ ] **Step 2: 实现点击演奏**

```
当 [乐器] 被点击:
  播放对应音符/音效
  显示音符动画
```

- [ ] **Step 3: 实现节奏游戏模式（L2+）**

显示下落音符，玩家需要在正确时间点击对应乐器

---

### Task 8: 涂鸦魔法师 (drawGame)

**Files:**
- Create: `scenes/drawGame/scene.json`
- Create: `scenes/drawGame/events.json`

- [ ] **Step 1: 创建画布和调色板**

- 画布区域: 白色画布
- 调色板: 6-10种颜色选择
- 工具栏: 画笔、橡皮擦、清除按钮

- [ ] **Step 2: 实现绘画机制**

```
当 [画笔] 工具选中:
  跟随手指/鼠标绘制
  使用当前选中颜色

当 [橡皮擦] 工具选中:
  跟随手指/鼠标擦除
```

- [ ] **Step 3: 实现填色模式（L1-L2）**

显示黑白线稿图（如苹果、小鱼）
玩家点击不同区域选择颜色填充

- [ ] **Step 4: 实现自由绘画模式（L3）**

完全空白的画布，自由创作

---

### Task 9: 动物朋友 (animalGame)

**Files:**
- Create: `scenes/animalGame/scene.json`
- Create: `scenes/animalGame/events.json`

- [ ] **Step 1: 创建动物显示**

- 动物池: 狗、猫、牛、鸡、鸭、猪、马、羊
- L1: 显示4个动物选项
- L3: 显示6个动物

- [ ] **Step 2: 实现声音题目**

```
播放动物叫声
玩家从选项中选择对应动物
```

- [ ] **Step 3: 实现影子匹配（L2+）**

显示动物影子，玩家匹配正确的动物

---

### Task 10: 难度与进度系统

**Files:**
- Create: `scenes/shared/globalVariables.json` (全局变量配置)
- Modify: 所有游戏场景 events.json

- [ ] **Step 1: 定义全局变量**

```
global.currentDifficulty = 1
global.totalStars = 0
global.consecutiveCorrect = 0
global.gameProgress = {
  colorGame: 1,
  shapeGame: 1,
  numberGame: 1,
  puzzleGame: 1,
  musicGame: 1,
  drawGame: 1,
  animalGame: 1
}
```

- [ ] **Step 2: 实现难度升级逻辑**

```
每当答对:
  global.consecutiveCorrect += 1
  if global.consecutiveCorrect >= 2:
    if global.currentDifficulty < 3:
      global.currentDifficulty += 1
    global.consecutiveCorrect = 0
    播放 levelup.ogg
    显示难度提升动画
```

- [ ] **Step 3: 实现难度降级逻辑**

```
每当答错:
  global.currentDifficulty = max(1, global.currentDifficulty - 1)
  global.consecutiveCorrect = 0
  显示温柔鼓励（"没关系，再试试！"）
```

---

### Task 11: 进度保存系统

**Files:**
- Create: `scenes/shared/saveSystem.js`

- [ ] **Step 1: 实现 LocalStorage 保存**

```javascript
// 保存进度
function SaveProgress() {
  const data = {
    totalStars: global.totalStars,
    gameProgress: global.gameProgress,
    lastPlayed: new Date().toISOString()
  };
  localStorage.setItem('happyLandergarten_save', JSON.stringify(data));
}

// 加载进度
function LoadProgress() {
  const saved = localStorage.getItem('happyLandergarten_save');
  if (saved) {
    const data = JSON.parse(saved);
    global.totalStars = data.totalStars;
    global.gameProgress = data.gameProgress;
  }
}
```

- [ ] **Step 2: 在适当时机保存**

- 每次答对加分后自动保存
- 返回主场景时保存
- 每30秒自动保存一次

---

### Task 12: 音效与反馈系统

**Files:**
- Create: `scenes/shared/audioManager.js`
- Modify: 所有游戏场景

- [ ] **Step 1: 创建音效管理**

```javascript
const AudioManager = {
  bgmPlaying: false,

  playBGM(name) {
    if (!this.bgmPlaying) {
      const audio = new Audio('assets/sounds/bgm/' + name + '.ogg');
      audio.loop = true;
      audio.volume = 0.5;
      audio.play();
      this.bgmPlaying = true;
    }
  },

  playSFX(name) {
    const audio = new Audio('assets/sounds/sfx/' + name + '.ogg');
    audio.volume = 0.7;
    audio.play();
  },

  stopBGM() {
    this.bgmPlaying = false;
  }
};
```

- [ ] **Step 2: 统一反馈音效调用**

在所有场景中使用:
- `AudioManager.playSFX('correct')` - 答对
- `AudioManager.playSFX('wrong')` - 答错
- `AudioManager.playSFX('levelup')` - 升级
- `AudioManager.playSFX('click')` - 点击

---

### Task 13: 资源准备与集成

**Files:**
- Create: `assets/sprites/` 所有精灵图
- Create: `assets/sounds/` 所有音效
- Create: `assets/fonts/` 字体文件

- [ ] **Step 1: 角色精灵（64x64 基础尺寸）**
- 小狐狸: 橙黄色，圆耳朵，微笑
- 小熊: 棕色，圆耳朵，围兜
- 小兔子: 白色，长耳朵，胡萝卜

- [ ] **Step 2: 建筑物精灵（128x128）**
- 每个建筑独特外观，颜色与游戏主题匹配

- [ ] **Step 3: UI 元素**
- 星星: 5种颜色，金色边框
- 按钮: 圆角矩形，悬停放大效果
- 奖章: 圆形，金银铜色

- [ ] **Step 4: 音效文件（建议来源）**
- 使用 Audacity 或 bfxr 生成 8-bit 风格音效
- 或使用 freesound.org 授权音效

---

### Task 14: 测试与发布

**Files:**
- Modify: `happy-landergarten.gdproj` (发布配置)

- [ ] **Step 1: 浏览器测试**

测试清单:
- [ ] Chrome 最新版
- [ ] Firefox 最新版
- [ ] Safari 最新版
- [ ] Edge 最新版
- [ ] iOS Safari
- [ ] Android Chrome

- [ ] **Step 2: 响应式布局测试**

在不同分辨率下测试:
- 1920x1080 (桌面)
- 1280x720 (平板)
- 800x600 (最小支持)

- [ ] **Step 3: 性能优化**

- 检查 sprite 数量，确保 < 100 个活跃对象
- 优化音效加载（预加载 vs 流式）
- 检查内存泄漏

- [ ] **Step 4: 发布准备**

- 压缩资源文件
- 生成 HTML5 导出包
- 创建 index.html 入口
- 配置域名/部署

---

## 实施顺序

1. **Task 1** - 项目初始化
2. **Task 2** - 游乐园地图（主场景）
3. **Task 3** - 颜色对对碰
4. **Task 4** - 形状小能手
5. **Task 5** - 数字跳跳跳
6. **Task 6** - 快乐拼图
7. **Task 7** - 小小音乐家
8. **Task 8** - 涂鸦魔法师
9. **Task 9** - 动物朋友
10. **Task 10** - 难度与进度系统
11. **Task 11** - 进度保存系统
12. **Task 12** - 音效与反馈系统
13. **Task 13** - 资源准备与集成
14. **Task 14** - 测试与发布

---

## 资源清单

| 资源类型 | 数量 | 规格 |
|----------|------|------|
| 角色精灵 | 3 | 64x64 PNG |
| 建筑物背景 | 8 | 256x256 PNG |
| 颜色物品 | 20+ | 64x64 PNG |
| 形状图片 | 10+ | 64x64 PNG |
| 数字图片 | 10 | 64x64 PNG |
| 动物图片 | 8+ | 128x128 PNG |
| 乐器图片 | 6+ | 128x128 PNG |
| UI 元素 | 20+ | 多种尺寸 |
| 背景音乐 | 2 | OGG 格式 |
| 音效 | 10+ | OGG 格式 |
