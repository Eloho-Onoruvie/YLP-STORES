import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  BookOpen,
  Bookmark,
  ShoppingBag,
  Edit3,
  Check
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { usePurchasedStore } from '../store/usePurchasedStore';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { useToastStore } from '../store/useToastStore';

export const Profile: React.FC = () => {
  const { user, updateProfile } = useAuthStore();
  const { purchasedBooks, orders } = usePurchasedStore();
  const { bookmarkedIds } = useBookmarkStore();
  const addToast = useToastStore((s) => s.addToast);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const purchasedCount = Object.keys(purchasedBooks).length;
  const completedCount = Object.values(purchasedBooks).filter((b) => b.status === 'Completed').length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    addToast('Profile information updated successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white shadow-xl flex flex-col md:flex-row items-center gap-6">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-24 h-24 rounded-full object-cover ring-4 ring-white/30 shadow-2xl shrink-0"
        />
        <div className="space-y-2 text-center md:text-left flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-editorial text-3xl font-bold">{user?.name}</h1>
              <p className="text-amber-100 text-sm">{user?.email}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors self-center md:self-auto"
            >
              <Edit3 className="w-4 h-4" /> {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-amber-200 pt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> {user?.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Member since {user?.joinedDate}
            </span>
          </div>
        </div>
      </div>

      {/* Reader Stats Counter Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs text-zinc-400 font-semibold block">Books Owned</span>
          <span className="font-editorial text-3xl font-bold text-zinc-900 dark:text-white">{purchasedCount}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs text-zinc-400 font-semibold block">Completed Titles</span>
          <span className="font-editorial text-3xl font-bold text-amber-600 dark:text-amber-400">{completedCount}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs text-zinc-400 font-semibold block">Saved Bookmarks</span>
          <span className="font-editorial text-3xl font-bold text-zinc-900 dark:text-white">{bookmarkedIds.length}</span>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-1">
          <span className="text-xs text-zinc-400 font-semibold block">Orders Placed</span>
          <span className="font-editorial text-3xl font-bold text-zinc-900 dark:text-white">{orders.length}</span>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Personal Information / Form */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-6">
          <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
            Personal Information
          </h3>

          {isEditing ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  Bio / Reader Note
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold">Email</span>
                  <p className="font-semibold text-zinc-900 dark:text-white">{user?.email}</p>
                </div>
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1">
                  <span className="text-xs text-zinc-400 block font-semibold">Phone</span>
                  <p className="font-semibold text-zinc-900 dark:text-white">{user?.phone}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 space-y-1">
                <span className="text-xs text-zinc-400 block font-semibold">Bio</span>
                <p className="leading-relaxed">{user?.bio}</p>
              </div>

              <div>
                <span className="text-xs text-zinc-400 block font-bold uppercase tracking-wider mb-2">
                  Favorite Genres
                </span>
                <div className="flex flex-wrap gap-2">
                  {user?.favoriteGenres.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold text-xs"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Quick Navigation Links */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
          <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
            Account Shortcuts
          </h3>

          <div className="space-y-2">
            <Link
              to="/my-books"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-amber-500/10 transition-colors text-sm font-semibold text-zinc-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" /> Digital Library
              </span>
              <span className="text-xs text-zinc-400">{purchasedCount} books</span>
            </Link>

            <Link
              to="/bookmarks"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-amber-500/10 transition-colors text-sm font-semibold text-zinc-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500" /> Saved Bookmarks
              </span>
              <span className="text-xs text-zinc-400">{bookmarkedIds.length} items</span>
            </Link>

            <Link
              to="/orders"
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-amber-500/10 transition-colors text-sm font-semibold text-zinc-900 dark:text-white"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-500" /> Order History
              </span>
              <span className="text-xs text-zinc-400">{orders.length} orders</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
