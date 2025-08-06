import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { FC } from 'react';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  {
    path: '/',
    label: '主页',
    icon: '🏠'
  },
  {
    path: '/leaderboard',
    label: '排行榜',
    icon: '🏆'
  },
  {
    path: '/share',
    label: '分享',
    icon: '📤'
  }
];

export const BottomNavigation: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => handleTabClick(item.path)}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === item.path
                ? 'text-blue-500 bg-blue-50'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-xs font-medium">{item.label}</div>
          </button>
        ))}
      </div>
    </div>
  );
}; 