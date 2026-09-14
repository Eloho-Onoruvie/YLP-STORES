import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItemCount, wishlist, profile } = useShop();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/dashboard' },
    { name: 'Shop', path: '/shop' },
    { name: 'Orders', path: '/orders' },
    { name: 'Wishlist', path: '/wishlist' },
    { name: 'My Account', path: '/account' }
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path === '/shop' && (location.pathname === '/shop' || location.pathname.startsWith('/shop/'))) return true;
    if (path === '/orders' && location.pathname.startsWith('/orders')) return true;
    if (path === '/wishlist' && (location.pathname === '/wishlist' || location.pathname === '/bookmarks')) return true;
    if (path === '/account' && (location.pathname.startsWith('/account') || location.pathname === '/profile' || location.pathname === '/settings')) return true;
    return false;
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-sky-100/80 shadow-xs transition-all">
        {/* Top Banner Notice */}
        <div className="bg-gradient-to-r from-sky-50 via-[#EAF7FC] to-amber-50/50 py-1.5 px-4 text-center text-xs text-slate-600 font-medium border-b border-sky-100/50 flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span>Free shipping on all Christian devotionals & orders over $50</span>
          <span className="hidden sm:inline text-sky-600 font-semibold">• Code: BLESSINGS</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Left: Mobile Menu Trigger + Brand Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-sky-600 rounded-xl hover:bg-sky-50 transition-colors"
                aria-label="Toggle navigation menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>

              {/* Logo */}
              <Link to="/dashboard" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                  <svg className="w-5.5 h-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-1">
                    YLP<span className="text-sky-500">.</span>Stores
                    <span className="text-xs font-sans text-[#D4AF37] font-normal">🤍</span>
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest -mt-1 hidden sm:inline">Faith & Lifestyle</span>
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/70 backdrop-blur-xs px-3 py-1.5 rounded-full border border-sky-100/70 shadow-xs">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isActive(link.path)
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/20'
                      : 'text-slate-600 hover:text-sky-600 hover:bg-sky-50/60'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart, Profile) */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:text-sky-600 hover:border-sky-300 transition-all shadow-xs"
                title="Search Products"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-2xl bg-white border border-slate-200/80 text-slate-600 hover:text-rose-500 hover:border-rose-200 transition-all shadow-xs"
                title="View Wishlist"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Link */}
              <Link
                to="/cart"
                className="relative p-2.5 rounded-2xl bg-sky-500 text-white hover:bg-sky-600 transition-all shadow-md shadow-sky-500/20 flex items-center gap-2"
                title="View Cart"
              >
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="hidden sm:inline text-xs font-bold">{cartItemCount}</span>
                {cartItemCount > 0 && (
                  <span className="sm:hidden absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-white text-[10px] font-bold flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-2xl border border-slate-200/80 hover:border-sky-300 transition-all bg-white"
                >
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-8 h-8 rounded-xl object-cover"
                  />
                  <span className="hidden md:inline text-xs font-bold text-slate-800 pr-1 max-w-[100px] truncate">
                    {profile.name.split(' ')[0]}
                  </span>
                </button>

                {profileDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-slate-200/80 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                  >
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{profile.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{profile.email}</p>
                    </div>

                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/account"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      >
                        Account & Profile
                      </Link>
                      <Link
                        to="/account/addresses"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      >
                        Saved Addresses
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="block px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-sky-50 hover:text-sky-600"
                      >
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <Link
                        to="/login"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          localStorage.removeItem('ylp_current_user');
                        }}
                        className="block px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        Sign Out
                      </Link>
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Expandable Search Input Bar */}
        {searchOpen && (
          <div className="bg-sky-50/80 border-t border-sky-100 p-4 animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for journals, Bibles, sermon notes, devotionals..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-sky-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-sm"
                  autoFocus
                />
                <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="relative w-80 max-w-full bg-[#FFFDF8] h-full shadow-2xl z-10 flex flex-col justify-between p-6 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-sky-100 pb-4">
                <span className="font-editorial text-xl font-bold text-slate-900">Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive(link.path)
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-sky-50 hover:text-sky-600'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-sky-100 space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-sky-50/60 border border-sky-100">
                <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-900 truncate">{profile.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{profile.email}</p>
                </div>
              </div>
              <Link
                to="/login"
                onClick={() => {
                  setMobileMenuOpen(false);
                  localStorage.removeItem('ylp_current_user');
                }}
                className="w-full py-2.5 rounded-2xl border border-rose-200 text-rose-600 text-xs font-bold text-center block hover:bg-rose-50"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Fixed Touch Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sky-100/80 px-4 py-2 flex items-center justify-around shadow-lg">
        <Link
          to="/dashboard"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname === '/dashboard' ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </Link>

        <Link
          to="/shop"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname.startsWith('/shop') ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Shop</span>
        </Link>

        <Link
          to="/search"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname === '/search' ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search</span>
        </Link>

        <Link
          to="/wishlist"
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname === '/wishlist' ? 'text-rose-500' : 'text-slate-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
          </svg>
          <span>Wishlist</span>
        </Link>

        <Link
          to="/cart"
          className={`relative flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname === '/cart' ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Cart ({cartItemCount})</span>
        </Link>

        <Link
          to="/account"
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            location.pathname.startsWith('/account') ? 'text-sky-600' : 'text-slate-400'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Account</span>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
