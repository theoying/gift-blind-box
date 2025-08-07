#!/bin/bash

# 礼物盲盒项目启动脚本

echo "🎁 礼物盲盒 Telegram Mini App"
echo "================================"

# 检查Node.js是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到Node.js，请先安装Node.js"
    exit 1
fi

# 检查npm是否安装
if ! command -v npm &> /dev/null; then
    echo "❌ 错误: 未找到npm，请先安装npm"
    exit 1
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
fi

# 检查是否要使用HTTPS
USE_HTTPS=false
if [[ "$1" == "--https" || "$1" == "-s" ]]; then
    USE_HTTPS=true
fi

# 启动开发服务器
echo "🚀 启动开发服务器..."
if [ "$USE_HTTPS" = true ]; then
    echo "🔒 使用HTTPS模式"
    echo "📍 访问地址: https://localhost:5173"
    echo "🔗 网络地址: https://$(hostname -I | awk '{print $1}'):5173"
    echo "⚠️  注意: 首次访问可能需要接受SSL证书"
else
    echo "📍 访问地址: http://localhost:5173"
    echo "🔗 网络地址: http://$(hostname -I | awk '{print $1}'):5173"
    echo "💡 提示: 使用 --https 参数启动HTTPS模式"
fi
echo ""
echo "按 Ctrl+C 停止服务器"
echo "================================"

if [ "$USE_HTTPS" = true ]; then
    npm run dev:https
else
    npm run dev
fi 