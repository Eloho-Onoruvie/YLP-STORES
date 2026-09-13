import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Bookmark,
  ShoppingBag,
  User as UserIcon,
  Sun,
  Moon,
  Library,
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useBookmarkStore } from '../../store/useBookmarkStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useBookStore } from '../../store/useBookStore';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQueryLocal] = useState('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const itemCount = useCartStore((s) => s.getItemCount());
  const bookmarkCount = useBookmarkStore((s) => s.bookmarkedIds.length);
  const { theme, toggleTheme } = useThemeStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const setSearchQueryStore = useBookStore((s) => s.setSearchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchQueryStore(searchQuery.trim());
      navigate('/books');
    }
  };

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-zinc-950/90 border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="font-editorial text-2xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-1">
              Lumina <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500 hidden sm:inline" />
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-600 dark:text-amber-400 block -mt-1">
              Online Bookstore
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-sm">
          <Link
            to="/"
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              isActive('/')
                ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={`px-3.5 py-2 rounded-lg transition-colors ${
              isActive('/books')
                ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            Explore
          </Link>
          <Link
            to="/bookmarks"
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              isActive('/bookmarks')
                ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            Bookmarks
            {bookmarkCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                {bookmarkCount}
              </span>
            )}
          </Link>
          <Link
            to="/my-books"
            className={`px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
              isActive('/my-books')
                ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            <Library className="w-4 h-4" />
            My Books
          </Link>
        </nav>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-xs lg:max-w-sm relative">
          <input
            type="text"
            placeholder="Search by title, author, genre..."
            value={searchQuery}
            onChange={(e) => setSearchQueryLocal(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-transparent focus:border-amber-500 focus:bg-white dark:focus:bg-zinc-950 focus:outline-hidden transition-all placeholder:text-zinc-400"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
        </form>

        {/* Right Actions Header */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 rounded-full bg-amber-600 text-white text-[11px] font-bold flex items-center justify-center animate-in zoom-in-50">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User Profile / Account Menu */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-500/50"
                />
                <span className="hidden sm:inline font-medium text-sm text-zinc-800 dark:text-zinc-200">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:inline" />
              </button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <UserIcon className="w-4 h-4 text-amber-500" />
                        My Profile
                      </Link>
                      <Link
                        to="/my-books"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <Library className="w-4 h-4 text-amber-500" />
                        Digital Library
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <ShoppingBag className="w-4 h-4 text-amber-500" />
                        Order History
                      </Link>
                      <Link
                        to="/bookmarks"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <Bookmark className="w-4 h-4 text-amber-500" />
                        Saved Bookmarks
                      </Link>
                    </div>
                    <div className="border-t border-zinc-100 dark:border-zinc-800 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02]"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
