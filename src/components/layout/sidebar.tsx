import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Heart, User, BookOpen, LogOut, X } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export interface SidebarProps {
  role?: string;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
  onTabChange?: (tabId: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  badges?: {
    orders?: string;
    wishlist?: string;
    resources?: string;
  };
  userName?: string;
  userEmail?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab = 'dashboard',
  onSelectTab,
  onTabChange,
  mobileOpen,
  onMobileClose,
  badges,
  userName,
  userEmail
}) => {
  const location = useLocation();
  const logout = useAuthStore((s) => s.logout);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/profile' },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag, path: '/orders', badge: badges?.orders },
    { id: 'my-books', label: 'My Library', icon: BookOpen, path: '/my-books' },
    { id: 'bookmarks', label: 'Wishlist / Bookmarks', icon: Heart, path: '/bookmarks', badge: badges?.wishlist },
    { id: 'profile', label: 'Account Profile', icon: User, path: '/profile' }
  ];

  const handleTabClick = (id: string) => {
    onSelectTab?.(id);
    onTabChange?.(id);
    onMobileClose?.();
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full p-6">
      <div className="space-y-6">
        {onMobileClose && (
          <div className="lg:hidden flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <span className="font-bold text-sm text-zinc-900 dark:text-white">Menu</span>
            <button onClick={onMobileClose} className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {userName && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-0.5">
            <p className="text-xs font-bold text-amber-700 dark:text-amber-400">{userName}</p>
            {userEmail && <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">{userEmail}</p>}
          </div>
        )}

        <div className="px-1">
          <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Navigation</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 min-h-[calc(100vh-64px)]">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-xs" onClick={onMobileClose}></div>
          <aside className="relative w-72 bg-white dark:bg-zinc-900 h-full shadow-2xl z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
