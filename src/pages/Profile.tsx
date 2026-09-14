import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

const IconUser = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconEdit = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const IconCheck = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconX = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const InputField = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
  disabled = false,
  placeholder,
}: {
  label: string;
  id: string;
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
  placeholder?: string;
}) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-xs font-bold text-slate-600 uppercase tracking-wider">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium transition-all outline-none ${
        disabled
          ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
          : 'bg-white border-slate-200 text-slate-900 focus:border-sky-400 focus:ring-4 focus:ring-sky-100'
      }`}
    />
  </div>
);

const ProfilePage: React.FC = () => {
  const { profile, updateProfile, orders, wishlist } = useShop();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ ...profile });

  const handleSave = () => {
    updateProfile(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setEditing(false);
  };

  const initials = profile.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const stats = [
    { label: 'Total Orders', value: orders.length.toString() },
    { label: 'Wishlisted', value: wishlist.length.toString() },
    {
      label: 'Total Spent',
      value: `$${orders.reduce((s, o) => s + o.total, 0).toFixed(2)}`,
    },
    { label: 'Member Since', value: '2026' },
  ];

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="border-b border-sky-100 pb-6 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <IconUser className="w-3.5 h-3.5" />
            <span>Account</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">My Profile</h1>
          <p className="text-slate-500 text-sm">Manage your personal information and account details.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Avatar & Stats */}
          <div className="space-y-5">
            {/* Avatar Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 flex flex-col items-center gap-4 text-center">
              <div className="relative">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-24 h-24 rounded-full object-cover shadow-md ring-4 ring-sky-100"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-400 to-[#D4AF37] flex items-center justify-center text-white text-2xl font-extrabold shadow-md ring-4 ring-sky-100">
                    {initials}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                  <IconCheck className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-lg">{profile.name}</h2>
                <p className="text-slate-500 text-sm">{profile.email}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  ✦ Faith Member
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-slate-500 text-sm">{s.label}</span>
                  <span className="font-bold text-slate-900 text-sm">{s.value}</span>
                </div>
              ))}
            </div>

            {/* Faith verse */}
            <div className="bg-gradient-to-br from-sky-50 to-indigo-50/60 rounded-3xl border border-sky-100 p-5 text-center">
              <p className="text-sm text-slate-600 italic font-serif leading-relaxed">
                "I can do all things through Christ who strengthens me."
              </p>
              <p className="text-xs text-slate-400 mt-2 font-semibold">— Philippians 4:13</p>
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900">Personal Information</h3>
                  <p className="text-slate-500 text-sm">Update your name, email, and contact details.</p>
                </div>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    id="edit-profile-btn"
                    className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl transition-all"
                  >
                    <IconEdit className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField
                  label="Full Name"
                  id="profile-name"
                  value={editing ? draft.name : profile.name}
                  onChange={(v) => setDraft((d) => ({ ...d, name: v }))}
                  disabled={!editing}
                  placeholder="Your full name"
                />
                <InputField
                  label="Email Address"
                  id="profile-email"
                  value={editing ? draft.email : profile.email}
                  onChange={(v) => setDraft((d) => ({ ...d, email: v }))}
                  type="email"
                  disabled={!editing}
                  placeholder="your@email.com"
                />
                <InputField
                  label="Phone Number"
                  id="profile-phone"
                  value={editing ? draft.phone : profile.phone}
                  onChange={(v) => setDraft((d) => ({ ...d, phone: v }))}
                  type="tel"
                  disabled={!editing}
                  placeholder="+1 (555) 000-0000"
                />
                <InputField
                  label="Profile Photo URL"
                  id="profile-avatar"
                  value={editing ? draft.avatar : profile.avatar}
                  onChange={(v) => setDraft((d) => ({ ...d, avatar: v }))}
                  disabled={!editing}
                  placeholder="https://..."
                />
              </div>

              {editing && (
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <button
                    onClick={handleSave}
                    id="save-profile-btn"
                    className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-2.5 rounded-2xl transition-all shadow-sm shadow-sky-500/20"
                  >
                    <IconCheck className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    id="cancel-edit-btn"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold px-4 py-2.5 rounded-2xl hover:bg-slate-100 transition-all"
                  >
                    <IconX className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Devotional / Activity section */}
            <div className="mt-5 bg-gradient-to-r from-[#FFF8F0] to-amber-50/40 rounded-3xl border border-amber-100 p-6 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-lg">✦</span>
                <h4 className="font-bold text-slate-800">Your Faith Journey</h4>
              </div>
              <p className="text-slate-600 text-sm">
                You've been growing with God intentionally. Keep showing up — every page turned, every prayer noted,
                every moment spent with Him is shaping your story.
              </p>
              <div className="flex flex-wrap gap-3">
                {['📖 Reader', '🙏 Prayer Warrior', '✨ Devoted'].map((badge) => (
                  <span key={badge} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
