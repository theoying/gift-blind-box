import type { ComponentType, JSX } from 'react';

import { HomePage } from '@/pages/HomePage/HomePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage/LeaderboardPage';
import { SharePage } from '@/pages/SharePage/SharePage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', Component: HomePage },
  { path: '/leaderboard', Component: LeaderboardPage, title: '排行榜' },
  { path: '/share', Component: SharePage, title: '分享' },
];
