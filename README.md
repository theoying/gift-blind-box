# 礼物盲盒 Telegram Mini App

一款基于Telegram Mini Apps的礼物盲盒应用，用户可以购买盲盒、开启礼物、参与排行榜和分享邀请好友。

## 功能特性

### 🎁 主页功能
- **盲盒购买**: 支持A系列和B系列盲盒购买
- **盲盒开启**: 开启盲盒获得随机礼物
- **我的盲盒**: 查看已购买的盲盒列表
- **我的礼物**: 查看已获得的礼物收藏

### 🏆 排行榜功能
- **A系列排行榜**: 显示A系列盲盒的玩家排名
- **B系列排行榜**: 显示B系列盲盒的玩家排名
- **排名规则**: 根据开启数量、礼物价值、稀有礼物数量综合排名

### 📤 分享功能
- **邀请好友**: 邀请2个好友获得B系列盲盒奖励
- **升级盲盒**: 分享给好友升级A系列盲盒为B系列
- **分享记录**: 查看分享进度和奖励领取状态

## 技术栈

- **React 18** - 前端框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **@telegram-apps/telegram-ui** - Telegram UI组件库
- **@telegram-apps/sdk-react** - Telegram SDK
- **TailwindCSS** - 样式框架
- **React Router** - 路由管理

## 项目结构

```
src/
├── components/          # 组件
│   ├── BottomNavigation/  # 底部导航
│   └── Page.tsx         # 页面容器
├── pages/              # 页面
│   ├── HomePage/       # 主页
│   ├── LeaderboardPage/ # 排行榜页
│   └── SharePage/      # 分享页
├── services/           # 服务
│   └── dataService.ts  # 数据服务
├── types/              # 类型定义
│   └── index.ts        # 类型接口
└── navigation/         # 路由配置
    └── routes.tsx      # 路由定义
```

## 开发指南

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码检查
```bash
npm run lint
```

## 部署指南

### GitHub Pages 自动部署

本项目配置了GitHub Actions自动部署到GitHub Pages。

#### 部署流程

1. **自动触发**: 推送到 `master` 或 `main` 分支时自动触发部署
2. **手动触发**: 在GitHub Actions页面手动触发部署
3. **构建步骤**:
   - 安装依赖 (`npm ci`)
   - 代码检查 (`npm run lint`)
   - 类型检查 (`npx tsc --noEmit`)
   - 构建项目 (`npm run build`)
   - 验证构建输出
   - 部署到GitHub Pages

#### 部署配置

- **构建输出目录**: `dist/`
- **部署分支**: `gh-pages` (自动创建)
- **访问地址**: `https://theoying.github.io/gift-blind-box/`

#### 部署状态

- ✅ 自动构建和部署
- ✅ 代码质量检查
- ✅ 类型安全检查
- ✅ 构建输出验证
- ✅ 部署状态通知

#### 故障排除

如果部署失败，请检查：

1. **构建错误**: 查看GitHub Actions日志中的构建步骤
2. **依赖问题**: 确保 `package.json` 中的依赖版本正确
3. **权限问题**: 确保仓库有GitHub Pages权限
4. **分支问题**: 确保推送到正确的分支 (`master` 或 `main`)

### 手动部署

如果需要手动部署到其他平台：

1. 构建项目: `npm run build`
2. 将 `dist/` 目录内容上传到Web服务器
3. 在Telegram Bot中配置WebApp URL
4. 设置Bot命令和菜单

## 游戏机制

### 盲盒系统
- **A系列盲盒**: 10星币，基础盲盒
- **B系列盲盒**: 20星币，高级盲盒，更高稀有度概率

### 礼物稀有度
- **普通 (60%)**: 基础礼物
- **稀有 (25%)**: 独特礼物
- **史诗 (10%)**: 精美礼物
- **传说 (5%)**: 限量礼物

### 分享奖励
- **邀请奖励**: 邀请2个好友获得B系列盲盒
- **升级奖励**: 分享给好友升级A系列为B系列

## 本地存储

应用使用localStorage存储以下数据:
- 用户星币余额
- 用户盲盒列表
- 用户礼物收藏
- 分享记录

## 注意事项

- 当前版本使用模拟数据，生产环境需要连接真实后端
- Telegram WebApp API需要在Telegram环境中测试
- 分享功能需要配置真实的Bot和WebApp URL

## 许可证

MIT License
