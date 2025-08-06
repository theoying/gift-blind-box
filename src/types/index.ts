// 盲盒类型
export interface BlindBox {
  id: string;
  name: string;
  series: 'A' | 'B';
  price: number; // 价格（星币）
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// 礼物类型
export interface Gift {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  series: 'A' | 'B';
  value: number; // 价值（星币）
}

// 用户盲盒
export interface UserBlindBox {
  id: string;
  blindBoxId: string;
  userId: string;
  isOpened: boolean;
  openedAt?: Date;
  giftId?: string;
  createdAt: Date;
}

// 用户礼物
export interface UserGift {
  id: string;
  giftId: string;
  userId: string;
  obtainedAt: Date;
  source: 'opened' | 'received' | 'purchased';
}

// 排行榜用户
export interface LeaderboardUser {
  userId: string;
  username: string;
  avatar?: string;
  totalOpened: number;
  totalValue: number;
  rareGifts: number;
}

// 分享记录
export interface ShareRecord {
  id: string;
  userId: string;
  type: 'invite' | 'upgrade';
  targetUserId?: string;
  completed: boolean;
  rewardClaimed: boolean;
  createdAt: Date;
} 