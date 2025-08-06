# 项目设置说明

## 🎯 项目概述

这是一个基于Telegram Mini Apps的礼物盲盒应用，使用React + TypeScript + Vite构建。

## 📁 项目结构

```
gift-blind-box/
├── src/                    # 源代码目录
│   ├── components/         # 组件
│   │   ├── BottomNavigation/  # 底部导航
│   │   ├── LoadingSpinner.tsx # 加载组件
│   │   ├── ErrorMessage.tsx   # 错误组件
│   │   └── Page.tsx        # 页面容器
│   ├── pages/             # 页面
│   │   ├── HomePage/      # 主页
│   │   ├── LeaderboardPage/ # 排行榜页
│   │   └── SharePage/     # 分享页
│   ├── services/          # 服务
│   │   └── dataService.ts # 数据服务
│   ├── types/             # 类型定义
│   │   └── index.ts       # 类型接口
│   ├── navigation/        # 路由配置
│   │   └── routes.tsx     # 路由定义
│   └── index.tsx          # 入口文件
├── public/                # 静态资源
├── dist/                  # 构建输出
├── node_modules/          # 依赖包
├── package.json           # 项目配置
├── vite.config.ts         # Vite配置
├── tailwind.config.js     # TailwindCSS配置
├── tsconfig.json          # TypeScript配置
├── start.sh              # 启动脚本
└── README.md             # 项目说明
```

## 🚀 快速开始

### 方法1: 使用启动脚本（推荐）

```bash
# 在项目根目录下运行
./start.sh
```

### 方法2: 手动启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 构建生产版本
npm run build
```

## 🔧 开发环境

### 系统要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 开发工具
- VS Code（推荐）
- Chrome DevTools
- React Developer Tools

### 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 代码检查并自动修复
npm run lint:fix

# 预览构建结果
npm run preview
```

## 📱 功能特性

### 核心功能
1. **盲盒购买** - A系列(10星币)和B系列(20星币)盲盒
2. **盲盒开启** - 随机获得不同稀有度的礼物
3. **排行榜** - A系列和B系列排行榜
4. **分享功能** - 邀请好友获得奖励

### 礼物稀有度
- 🟢 普通 (60%) - 基础礼物
- 🔵 稀有 (25%) - 独特礼物  
- 🟣 史诗 (10%) - 精美礼物
- 🟡 传说 (5%) - 限量礼物

## 🎨 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **构建工具**: Vite
- **UI组件库**: @telegram-apps/telegram-ui
- **样式框架**: TailwindCSS
- **路由管理**: React Router
- **状态管理**: React Hooks

## 🔍 开发调试

### 本地开发
1. 启动开发服务器：`npm run dev`
2. 访问：http://localhost:5173
3. 使用浏览器开发者工具调试

### Telegram环境测试
1. 构建项目：`npm run build`
2. 部署到Web服务器
3. 在Telegram Bot中配置WebApp URL
4. 在Telegram客户端中测试

## 📊 数据存储

应用使用localStorage存储以下数据：
- 用户星币余额
- 用户盲盒列表
- 用户礼物收藏
- 分享记录

## 🚨 注意事项

1. **开发环境**: 当前使用模拟数据，生产环境需要连接真实后端
2. **Telegram API**: 需要在Telegram环境中测试WebApp功能
3. **分享功能**: 需要配置真实的Bot和WebApp URL
4. **数据安全**: 生产环境需要实现用户认证和数据验证

## 🔄 更新日志

### v1.0.0 (2024-08-06)
- ✅ 完成基础功能开发
- ✅ 实现盲盒购买和开启
- ✅ 实现排行榜系统
- ✅ 实现分享功能
- ✅ 集成Telegram UI组件
- ✅ 添加TailwindCSS样式

## 📞 技术支持

如有问题，请查看：
1. [README.md](./README.md) - 详细项目说明
2. [demo.md](./demo.md) - 功能演示文档
3. [Telegram Mini Apps文档](https://docs.telegram-mini-apps.com/)

## �� 许可证

MIT License 