import { useState, useEffect, useMemo } from 'react';
import { Section, Cell, Button, List, Badge, Avatar } from '@telegram-apps/telegram-ui';
import { initDataState as _initDataState, useSignal, isTMA } from '@telegram-apps/sdk-react';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { DataService, blindBoxes, gifts } from '@/services/dataService';
import { BlindBox, UserBlindBox, UserGift, Gift } from '@/types';

// 声明Telegram WebApp类型
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        showAlert?: (message: string) => void;
        showPopup?: (options: any) => void;
      };
    };
  }
}

export const HomePage: FC = () => {
  const [userStars, setUserStars] = useState(0);
  const [userBlindBoxes, setUserBlindBoxes] = useState<UserBlindBox[]>([]);
  const [userGifts, setUserGifts] = useState<UserGift[]>([]);
  const [openingBox, setOpeningBox] = useState<string | null>(null);
  const [openedGift, setOpenedGift] = useState<Gift | null>(null);
  const [isTelegramEnv, setIsTelegramEnv] = useState(false);

  const userId = 'current-user'; // 模拟用户ID

  // 获取Telegram用户信息
  const initDataState = useSignal(_initDataState);
  const telegramUser = useMemo(() => {
    return initDataState?.user;
  }, [initDataState]);

  useEffect(() => {
    checkTelegramEnvironment();
    loadUserData();

  }, []);

  const checkTelegramEnvironment = async () => {
    try {
      console.log('Telegram环境检测成功:', await isTMA('complete'));
      setIsTelegramEnv(true);
    } catch (error) {
      console.log('Telegram环境检测失败:', error);
      setIsTelegramEnv(false);
    }
  };

  const loadUserData = () => {
    setUserStars(DataService.getUserStars());
    setUserBlindBoxes(DataService.getUserBlindBoxes());
    setUserGifts(DataService.getUserGifts());
  };

  const handlePurchase = (blindBox: BlindBox) => {
    try {
      DataService.purchaseBlindBox(blindBox.id, userId);
      loadUserData();
      // 显示成功消息
      window.Telegram?.WebApp?.showAlert?.(`成功购买${blindBox.name}！`);
    } catch (error) {
      window.Telegram?.WebApp?.showAlert?.(error instanceof Error ? error.message : '购买失败');
    }
  };

  const handleOpenBox = async (userBox: UserBlindBox) => {
    if (openingBox) return;
    
    setOpeningBox(userBox.id);
    try {
      // 模拟开启动画
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const gift = DataService.openBlindBox(userBox.id);
      setOpenedGift(gift);
      loadUserData();
      
      // 显示礼物
      setTimeout(() => {
        setOpenedGift(null);
        setOpeningBox(null);
      }, 3000);
    } catch (error) {
      window.Telegram?.WebApp?.showAlert?.(error instanceof Error ? error.message : '开启失败');
      setOpeningBox(null);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-yellow-500';
      case 'epic': return 'bg-purple-500';
      case 'rare': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '传说';
      case 'epic': return '史诗';
      case 'rare': return '稀有';
      default: return '普通';
    }
  };

  // 获取用户显示名称
  const getUserDisplayName = () => {
    if (!telegramUser) return null;
    
    const { first_name, last_name, username } = telegramUser;
    // 优先显示完整的姓名（first_name + last_name）
    if (first_name && last_name) {
      return `${first_name} ${last_name}`;
    }
    // 其次显示first_name
    if (first_name) {
      return first_name;
    }
    // 最后显示username
    if (username) {
      return `@${username}`;
    }
    return null;
  };

  return (
    <Page back={false}>
      {/* 用户信息 */}
      <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-xl font-bold">礼物盲盒</h1>
              <p className="text-sm opacity-90">收集精美礼物</p>
            </div>
            {/* Telegram用户信息 */}
            {isTelegramEnv && telegramUser && (
              <div className="flex items-center gap-2 ml-4">
                <Avatar
                  width={28}
                  height={28}
                  src={telegramUser.photo_url}
                  alt={getUserDisplayName() || 'User'}
                />
                <div className="text-sm">
                  <div className="font-medium">{getUserDisplayName()}</div>
                </div>
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">⭐ {userStars}</div>
            <div className="text-xs opacity-90">星币</div>
          </div>
        </div>
      </div>

      {/* 盲盒购买 */}
      <List>
        <Section header="购买盲盒">
          {blindBoxes.map((box) => (
            <Cell
              key={box.id}
              before={<div className="text-3xl">{box.image}</div>}
              subtitle={box.description}
              after={
                <Button
                  size="s"
                  onClick={() => handlePurchase(box)}
                  disabled={userStars < box.price}
                >
                  {box.price} ⭐
                </Button>
              }
            >
              <div className="flex items-center gap-2">
                {box.name}
                <Badge type="dot" className={getRarityColor(box.rarity)}>
                  {getRarityText(box.rarity)}
                </Badge>
              </div>
            </Cell>
          ))}
        </Section>

        {/* 我的盲盒 */}
        <Section header="我的盲盒">
          {userBlindBoxes.length === 0 ? (
            <Cell subtitle="还没有盲盒，快去购买吧！">暂无盲盒</Cell>
          ) : (
            userBlindBoxes.map((userBox) => {
              const box = blindBoxes.find(b => b.id === userBox.blindBoxId);
              if (!box) return null;

              return (
                <Cell
                  key={userBox.id}
                  before={<div className="text-3xl">{box.image}</div>}
                  subtitle={userBox.isOpened ? '已开启' : '未开启'}
                  after={
                    !userBox.isOpened && (
                      <Button
                        size="s"
                        onClick={() => handleOpenBox(userBox)}
                        disabled={openingBox === userBox.id}
                      >
                        {openingBox === userBox.id ? '开启中...' : '开启'}
                      </Button>
                    )
                  }
                >
                  <div className="flex items-center gap-2">
                    {box.name}
                    {userBox.isOpened && userBox.giftId && (
                      <Badge type="dot" className="bg-green-500">
                        已获得
                      </Badge>
                    )}
                  </div>
                </Cell>
              );
            })
          )}
        </Section>

        {/* 我的礼物 */}
        <Section header="我的礼物">
          {userGifts.length === 0 ? (
            <Cell subtitle="还没有礼物，快去开启盲盒吧！">暂无礼物</Cell>
          ) : (
            userGifts.map((userGift) => {
              const gift = gifts.find(g => g.id === userGift.giftId);
              if (!gift) return null;

              return (
                <Cell
                  key={userGift.id}
                  before={<div className="text-3xl">{gift.image}</div>}
                  subtitle={`价值 ${gift.value} 星币`}
                >
                  <div className="flex items-center gap-2">
                    {gift.name}
                    <Badge type="dot" className={getRarityColor(gift.rarity)}>
                      {getRarityText(gift.rarity)}
                    </Badge>
                  </div>
                </Cell>
              );
            })
          )}
        </Section>
      </List>

      {/* 开启礼物弹窗 */}
      {openedGift && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 m-4 max-w-sm w-full text-center">
            <div className="text-6xl mb-4">{openedGift.image}</div>
            <h3 className="text-xl font-bold mb-2">{openedGift.name}</h3>
            <p className="text-gray-600 mb-4">{openedGift.description}</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge type="dot" className={getRarityColor(openedGift.rarity)}>
                {getRarityText(openedGift.rarity)}
              </Badge>
              <span className="text-sm text-gray-500">价值 {openedGift.value} 星币</span>
            </div>
            <Button onClick={() => setOpenedGift(null)}>
              太棒了！
            </Button>
          </div>
        </div>
      )}
    </Page>
  );
}; 