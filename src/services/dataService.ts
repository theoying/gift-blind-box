import { BlindBox, Gift, UserBlindBox, UserGift, LeaderboardUser, ShareRecord } from '@/types';

// 模拟数据
export const blindBoxes: BlindBox[] = [
  {
    id: 'box-a-1',
    name: 'A系列盲盒',
    series: 'A',
    price: 10,
    description: '基础盲盒，有机会获得稀有礼物',
    image: '🎁',
    rarity: 'common'
  },
  {
    id: 'box-b-1',
    name: 'B系列盲盒',
    series: 'B',
    price: 20,
    description: '高级盲盒，更高概率获得稀有礼物',
    image: '🎁',
    rarity: 'rare'
  }
];

export const gifts: Gift[] = [
  // A系列礼物
  {
    id: 'gift-a-1',
    name: '普通贴纸',
    description: '可爱的Telegram贴纸',
    image: '😊',
    rarity: 'common',
    series: 'A',
    value: 5
  },
  {
    id: 'gift-a-2',
    name: '稀有表情',
    description: '独特的表情包',
    image: '😎',
    rarity: 'rare',
    series: 'A',
    value: 15
  },
  {
    id: 'gift-a-3',
    name: '史诗动画',
    description: '精美的动画效果',
    image: '✨',
    rarity: 'epic',
    series: 'A',
    value: 30
  },
  {
    id: 'gift-a-4',
    name: '传说主题',
    description: '限量版主题皮肤',
    image: '👑',
    rarity: 'legendary',
    series: 'A',
    value: 100
  },
  // B系列礼物
  {
    id: 'gift-b-1',
    name: '高级贴纸',
    description: '精美的Telegram贴纸',
    image: '🎨',
    rarity: 'common',
    series: 'B',
    value: 10
  },
  {
    id: 'gift-b-2',
    name: '稀有动画',
    description: '独特的动画效果',
    image: '🌟',
    rarity: 'rare',
    series: 'B',
    value: 25
  },
  {
    id: 'gift-b-3',
    name: '史诗主题',
    description: '精美的主题皮肤',
    image: '💎',
    rarity: 'epic',
    series: 'B',
    value: 50
  },
  {
    id: 'gift-b-4',
    name: '传说特效',
    description: '限量版特效',
    image: '🔥',
    rarity: 'legendary',
    series: 'B',
    value: 200
  }
];

// 本地存储键
const STORAGE_KEYS = {
  USER_BLIND_BOXES: 'user_blind_boxes',
  USER_GIFTS: 'user_gifts',
  SHARE_RECORDS: 'share_records',
  USER_STARS: 'user_stars'
};

// 数据服务类
export class DataService {
  // 获取用户星币
  static getUserStars(): number {
    const stars = localStorage.getItem(STORAGE_KEYS.USER_STARS);
    return stars ? parseInt(stars) : 100; // 默认100星币
  }

  // 更新用户星币
  static updateUserStars(stars: number): void {
    localStorage.setItem(STORAGE_KEYS.USER_STARS, stars.toString());
  }

  // 获取用户盲盒
  static getUserBlindBoxes(): UserBlindBox[] {
    const data = localStorage.getItem(STORAGE_KEYS.USER_BLIND_BOXES);
    return data ? JSON.parse(data) : [];
  }

  // 添加用户盲盒
  static addUserBlindBox(blindBox: Omit<UserBlindBox, 'id'>): UserBlindBox {
    const userBlindBoxes = this.getUserBlindBoxes();
    const newBlindBox: UserBlindBox = {
      ...blindBox,
      id: `user-box-${Date.now()}`
    };
    userBlindBoxes.push(newBlindBox);
    localStorage.setItem(STORAGE_KEYS.USER_BLIND_BOXES, JSON.stringify(userBlindBoxes));
    return newBlindBox;
  }

  // 开启盲盒
  static openBlindBox(boxId: string): Gift {
    const userBlindBoxes = this.getUserBlindBoxes();
    const box = userBlindBoxes.find(b => b.id === boxId);
    if (!box || box.isOpened) {
      throw new Error('盲盒不存在或已开启');
    }

    // 根据盲盒系列选择礼物
    const boxTemplate = blindBoxes.find(b => b.id === box.blindBoxId);
    const series = boxTemplate?.series || 'A';
    const seriesGifts = gifts.filter(g => g.series === series);
    
    // 随机选择礼物（根据稀有度加权）
    const weights = {
      common: 0.6,
      rare: 0.25,
      epic: 0.1,
      legendary: 0.05
    };

    const random = Math.random();
    let selectedRarity: keyof typeof weights;
    if (random < weights.legendary) {
      selectedRarity = 'legendary';
    } else if (random < weights.legendary + weights.epic) {
      selectedRarity = 'epic';
    } else if (random < weights.legendary + weights.epic + weights.rare) {
      selectedRarity = 'rare';
    } else {
      selectedRarity = 'common';
    }

    const availableGifts = seriesGifts.filter(g => g.rarity === selectedRarity);
    const selectedGift = availableGifts[Math.floor(Math.random() * availableGifts.length)];

    // 更新盲盒状态
    box.isOpened = true;
    box.openedAt = new Date();
    box.giftId = selectedGift.id;
    localStorage.setItem(STORAGE_KEYS.USER_BLIND_BOXES, JSON.stringify(userBlindBoxes));

    // 添加礼物到用户礼物列表
    this.addUserGift({
      giftId: selectedGift.id,
      userId: box.userId,
      obtainedAt: new Date(),
      source: 'opened'
    });

    return selectedGift;
  }

  // 获取用户礼物
  static getUserGifts(): UserGift[] {
    const data = localStorage.getItem(STORAGE_KEYS.USER_GIFTS);
    return data ? JSON.parse(data) : [];
  }

  // 添加用户礼物
  static addUserGift(gift: Omit<UserGift, 'id'>): UserGift {
    const userGifts = this.getUserGifts();
    const newGift: UserGift = {
      ...gift,
      id: `user-gift-${Date.now()}`
    };
    userGifts.push(newGift);
    localStorage.setItem(STORAGE_KEYS.USER_GIFTS, JSON.stringify(userGifts));
    return newGift;
  }

  // 购买盲盒
  static purchaseBlindBox(blindBoxId: string, userId: string): UserBlindBox {
    const blindBox = blindBoxes.find(b => b.id === blindBoxId);
    if (!blindBox) {
      throw new Error('盲盒不存在');
    }

    const currentStars = this.getUserStars();
    if (currentStars < blindBox.price) {
      throw new Error('星币不足');
    }

    // 扣除星币
    this.updateUserStars(currentStars - blindBox.price);

    // 添加盲盒到用户列表
    return this.addUserBlindBox({
      blindBoxId,
      userId,
      isOpened: false,
      createdAt: new Date()
    });
  }

  // 获取排行榜数据
  static getLeaderboard(_series: 'A' | 'B'): LeaderboardUser[] {
    // 模拟排行榜数据
    return [
      {
        userId: 'user1',
        username: '玩家1',
        totalOpened: 15,
        totalValue: 500,
        rareGifts: 8
      },
      {
        userId: 'user2',
        username: '玩家2',
        totalOpened: 12,
        totalValue: 450,
        rareGifts: 6
      },
      {
        userId: 'user3',
        username: '玩家3',
        totalOpened: 10,
        totalValue: 380,
        rareGifts: 5
      }
    ];
  }

  // 获取分享记录
  static getShareRecords(userId: string): ShareRecord[] {
    const data = localStorage.getItem(STORAGE_KEYS.SHARE_RECORDS);
    const allRecords: ShareRecord[] = data ? JSON.parse(data) : [];
    return allRecords.filter(r => r.userId === userId);
  }

  // 添加分享记录
  static addShareRecord(record: Omit<ShareRecord, 'id'>): ShareRecord {
    const records = this.getShareRecords(record.userId);
    const newRecord: ShareRecord = {
      ...record,
      id: `share-${Date.now()}`
    };
    records.push(newRecord);
    localStorage.setItem(STORAGE_KEYS.SHARE_RECORDS, JSON.stringify(records));
    return newRecord;
  }
} 