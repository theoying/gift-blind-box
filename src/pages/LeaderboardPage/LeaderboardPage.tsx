import { useState, useEffect } from 'react';
import { Section, Cell, List, Badge, Button } from '@telegram-apps/telegram-ui';
import type { FC } from 'react';

import { Page } from '@/components/Page.tsx';
import { DataService } from '@/services/dataService';
import { LeaderboardUser } from '@/types';

export const LeaderboardPage: FC = () => {
  const [selectedSeries, setSelectedSeries] = useState<'A' | 'B'>('A');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    loadLeaderboard();
  }, [selectedSeries]);

  const loadLeaderboard = () => {
    const data = DataService.getLeaderboard(selectedSeries);
    setLeaderboardData(data);
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}`;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500';
      case 2: return 'bg-gray-400';
      case 3: return 'bg-orange-500';
      default: return 'bg-gray-200';
    }
  };

  return (
    <Page>
      {/* 系列选择 */}
      <div className="p-4 bg-white border-b">
        <div className="flex gap-2">
          <Button
            size="s"
            onClick={() => setSelectedSeries('A')}
            className={selectedSeries === 'A' ? 'bg-blue-500 text-white' : ''}
          >
            A系列排行榜
          </Button>
          <Button
            size="s"
            onClick={() => setSelectedSeries('B')}
            className={selectedSeries === 'B' ? 'bg-blue-500 text-white' : ''}
          >
            B系列排行榜
          </Button>
        </div>
      </div>

      <List>
        <Section header={`${selectedSeries}系列排行榜`}>
          {leaderboardData.map((user, index) => (
            <Cell
              key={user.userId}
              before={
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${getRankColor(index + 1)}`}>
                  {getRankIcon(index + 1)}
                </div>
              }
              subtitle={
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>开启: {user.totalOpened}</span>
                  <span>价值: {user.totalValue}</span>
                  <span>稀有: {user.rareGifts}</span>
                </div>
              }
            >
              <div className="flex items-center gap-2">
                {user.username}
                {index < 3 && (
                  <Badge type="dot" className={getRankColor(index + 1)}>
                    第{index + 1}名
                  </Badge>
                )}
              </div>
            </Cell>
          ))}
        </Section>

        <Section header="排行榜规则" footer="每周更新一次">
          <Cell subtitle="根据开启盲盒数量、获得礼物总价值、稀有礼物数量综合排名">
            排名规则
          </Cell>
          <Cell subtitle="前3名将获得额外奖励">
            奖励机制
          </Cell>
        </Section>
      </List>
    </Page>
  );
}; 