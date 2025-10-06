
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, CategoryIcon, HistoryIcon, SettingsIcon } from '../constants';

const navItems = [
  { path: '/', label: 'ホーム', icon: HomeIcon },
  { path: '/categories', label: 'カテゴリ', icon: CategoryIcon },
  { path: '/history', label: '学習履歴', icon: HistoryIcon },
  { path: '/settings', label: '設定', icon: SettingsIcon },
];

const BottomNav: React.FC = () => {
  const activeLink = 'text-indigo-600';
  const inactiveLink = 'text-gray-500 hover:text-indigo-600';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] z-50">
      <div className="flex justify-around max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-full pt-2 pb-1 text-xs font-medium transition-colors duration-200 ${isActive ? activeLink : inactiveLink}`
            }
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
