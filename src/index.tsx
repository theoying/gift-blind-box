// Include Telegram UI styles first to allow our code override the package CSS.
import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams, isTMA } from '@telegram-apps/sdk-react';

import { Root } from '@/components/Root.tsx';
import { init } from '@/init.ts';

import './index.css';

// Mock the environment in case, we are outside Telegram.
import './mockEnv.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

async function initializeApp() {
  try {
    // 检查是否在Telegram环境中
    const isTelegramEnv = await isTMA('complete');
    
    if (isTelegramEnv) {
      // 在Telegram环境中运行
      const launchParams = retrieveLaunchParams();
      const { tgWebAppPlatform: platform } = launchParams;
      const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug')
        || import.meta.env.DEV;

      // Configure all application dependencies.
      await init({
        debug,
        eruda: debug && ['ios', 'android'].includes(platform),
        mockForMacOS: platform === 'macos',
      });
    } else {
      // 在非Telegram环境中运行，使用模拟环境
      console.log('🌐 在非Telegram环境中运行，使用模拟环境');
      await init({
        debug: true,
        eruda: false,
        mockForMacOS: false,
      });
    }

    // 渲染应用
    root.render(
      <StrictMode>
        <Root/>
      </StrictMode>,
    );
  } catch (error) {
    console.error('应用初始化失败:', error);
    // 如果初始化失败，仍然尝试渲染应用
    root.render(
      <StrictMode>
        <Root/>
      </StrictMode>,
    );
  }
}

// 启动应用
initializeApp();
