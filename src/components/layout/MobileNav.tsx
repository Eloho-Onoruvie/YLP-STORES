import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Compass, Bookmark, Library, User } from 'lucide-react';
import { useBookmarkStore } from '../../store/useBookmarkStore';

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const bookmarkCount = useBookmarkStore((s) => s.bookmarkedIds.length);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Explore', path: '/books', icon: Compass },
    { label: 'Bookmarks', path: '/bookmarks', icon: Bookmark, badge: bookmarkCount },
    { label: 'My Library', path: '/my-books', icon: Library },
    { label: 'Profile', path: '/profile', icon: User }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 px-2 py-2">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
                active
                  ? 'text-amber-600 dark:text-amber-400 font-semibold scale-105'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-amber-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
