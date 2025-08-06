import { useState, useEffect } from 'react';
import { Section, Cell, List, Button, Badge } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { DataService } from '@/services/dataService';
import { ShareRecord } from '@/types';

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

export const SharePage: FC = () => {
  const [shareRecords, setShareRecords] = useState<ShareRecord[]>([]);
  const [inviteProgress, setInviteProgress] = useState(0);
  const [upgradeProgress, setUpgradeProgress] = useState(0);

  const userId = 'current-user';

  useEffect(() => {
    loadShareData();
  }, []);

  const loadShareData = () => {
    const records = DataService.getShareRecords(userId);
    setShareRecords(records);
    
    // 计算邀请进度
    const inviteRecords = records.filter(r => r.type === 'invite' && r.completed);
    setInviteProgress(inviteRecords.length);
    
    // 计算升级进度
    const upgradeRecords = records.filter(r => r.type === 'upgrade' && r.completed);
    setUpgradeProgress(upgradeRecords.length);
  };

  const handleShareInvite = () => {
    // 模拟分享邀请
    const shareText = `🎁 来玩礼物盲盒吧！\n\n邀请你加入我们的礼物盲盒游戏，一起收集精美礼物！\n\n点击链接加入：https://t.me/your_bot?start=invite_${userId}`;
    
    if (window.Telegram?.WebApp?.showPopup) {
      window.Telegram.WebApp.showPopup({
        title: '分享邀请',
        message: shareText,
        buttons: [
          { type: 'default', text: '分享给好友' },
          { type: 'cancel', text: '取消' }
        ]
      });
    } else {
      // 降级处理
      if (navigator.share) {
        navigator.share({
          title: '礼物盲盒邀请',
          text: shareText,
          url: `https://t.me/your_bot?start=invite_${userId}`
        });
      } else {
        // 复制到剪贴板
        navigator.clipboard.writeText(shareText);
        window.Telegram?.WebApp?.showAlert?.('邀请链接已复制到剪贴板！');
      }
    }
  };

  const handleShareUpgrade = () => {
    // 模拟分享升级
    const shareText = `🎁 帮我升级盲盒！\n\n我正在玩礼物盲盒，需要你的帮助来升级我的A系列盲盒！\n\n点击链接帮助：https://t.me/your_bot?start=upgrade_${userId}`;
    
    if (window.Telegram?.WebApp?.showPopup) {
      window.Telegram.WebApp.showPopup({
        title: '分享升级',
        message: shareText,
        buttons: [
          { type: 'default', text: '分享给好友' },
          { type: 'cancel', text: '取消' }
        ]
      });
    } else {
      // 降级处理
      if (navigator.share) {
        navigator.share({
          title: '礼物盲盒升级',
          text: shareText,
          url: `https://t.me/your_bot?start=upgrade_${userId}`
        });
      } else {
        // 复制到剪贴板
        navigator.clipboard.writeText(shareText);
        window.Telegram?.WebApp?.showAlert?.('升级链接已复制到剪贴板！');
      }
    }
  };

  const claimInviteReward = () => {
    if (inviteProgress >= 2) {
      // 添加B系列盲盒奖励
      DataService.addUserBlindBox({
        blindBoxId: 'box-b-1',
        userId,
        isOpened: false,
        createdAt: new Date()
      });
      
      // 标记奖励已领取
      const records = shareRecords.filter(r => r.type === 'invite');
      records.forEach(record => {
        record.rewardClaimed = true;
      });
      
      loadShareData();
      window.Telegram?.WebApp?.showAlert?.('恭喜获得B系列盲盒奖励！');
    }
  };

  const claimUpgradeReward = () => {
    if (upgradeProgress >= 1) {
      // 模拟升级A系列盲盒为B系列
      window.Telegram?.WebApp?.showAlert?.('A系列盲盒已升级为B系列！');
      
      // 标记奖励已领取
      const records = shareRecords.filter(r => r.type === 'upgrade');
      records.forEach(record => {
        record.rewardClaimed = true;
      });
      
      loadShareData();
    }
  };

  return (
    <Page>
      <List>
        {/* 邀请好友 */}
        <Section 
          header="邀请好友" 
          footer="邀请2个好友即可获得B系列盲盒奖励"
        >
          <Cell
            before={<div className="text-3xl">👥</div>}
            subtitle={`已邀请 ${inviteProgress}/2 个好友`}
            after={
              <Button
                size="s"
                onClick={handleShareInvite}
              >
                邀请好友
              </Button>
            }
          >
            <div className="flex items-center gap-2">
              邀请好友获得奖励
              {inviteProgress >= 2 && (
                <Badge type="dot" className="bg-green-500">
                  可领取
                </Badge>
              )}
            </div>
          </Cell>
          
          {inviteProgress >= 2 && (
            <Cell
              before={<div className="text-3xl">🎁</div>}
              subtitle="B系列盲盒 x1"
              after={
                <Button
                  size="s"
                  onClick={claimInviteReward}
                >
                  领取奖励
                </Button>
              }
            >
              邀请奖励
            </Cell>
          )}
        </Section>

        {/* 升级盲盒 */}
        <Section 
          header="升级盲盒" 
          footer="分享给1个好友即可升级A系列盲盒为B系列"
        >
          <Cell
            before={<div className="text-3xl">⬆️</div>}
            subtitle={`已分享 ${upgradeProgress}/1 次`}
            after={
              <Button
                size="s"
                onClick={handleShareUpgrade}
              >
                分享升级
              </Button>
            }
          >
            <div className="flex items-center gap-2">
              升级A系列盲盒
              {upgradeProgress >= 1 && (
                <Badge type="dot" className="bg-green-500">
                  可升级
                </Badge>
              )}
            </div>
          </Cell>
          
          {upgradeProgress >= 1 && (
            <Cell
              before={<div className="text-3xl">🎁</div>}
              subtitle="A系列 → B系列"
              after={
                <Button
                  size="s"
                  onClick={claimUpgradeReward}
                >
                  立即升级
                </Button>
              }
            >
              盲盒升级
            </Cell>
          )}
        </Section>

        {/* 分享记录 */}
        <Section header="分享记录">
          {shareRecords.length === 0 ? (
            <Cell subtitle="还没有分享记录">暂无记录</Cell>
          ) : (
            shareRecords.map((record) => (
              <Cell
                key={record.id}
                before={<div className="text-2xl">{record.type === 'invite' ? '👥' : '⬆️'}</div>}
                subtitle={new Date(record.createdAt).toLocaleDateString()}
              >
                <div className="flex items-center gap-2">
                  {record.type === 'invite' ? '邀请好友' : '升级盲盒'}
                  <Badge type="dot" className={record.completed ? 'bg-green-500' : 'bg-yellow-500'}>
                    {record.completed ? '已完成' : '进行中'}
                  </Badge>
                  {record.rewardClaimed && (
                    <Badge type="dot" className="bg-blue-500">
                      已领取
                    </Badge>
                  )}
                </div>
              </Cell>
            ))
          )}
        </Section>

        {/* 分享说明 */}
        <Section header="分享说明">
          <Cell subtitle="邀请好友：每邀请2个好友，你和好友都能获得盲盒奖励">
            邀请奖励
          </Cell>
          <Cell subtitle="升级盲盒：分享给好友，可以将A系列盲盒升级为B系列">
            升级机制
          </Cell>
          <Cell subtitle="所有分享都会记录，可以查看进度和领取奖励">
            记录查看
          </Cell>
        </Section>
      </List>
    </Page>
  );
}; 