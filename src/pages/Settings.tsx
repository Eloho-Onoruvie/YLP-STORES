import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

const IconSettings = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconBell = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const IconShield = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconTrash = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Toggle = ({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <button
    id={id}
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex w-11 h-6 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 ${
      checked ? 'bg-sky-500' : 'bg-slate-200'
    }`}
  >
    <span
      className={`inline-block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const SettingRow = ({
  title,
  description,
  id,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-start justify-between gap-4 py-5 border-b border-slate-100 last:border-0">
    <div className="flex-1">
      <p className="font-semibold text-slate-900 text-sm">{title}</p>
      <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{description}</p>
    </div>
    <Toggle id={id} checked={checked} onChange={onChange} />
  </div>
);

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useShop();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleUpdate = (key: keyof typeof settings) => (value: boolean) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="border-b border-sky-100 pb-6 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <IconSettings className="w-3.5 h-3.5" />
            <span>Preferences</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Settings</h1>
          <p className="text-slate-500 text-sm">Manage your notification preferences and account settings.</p>
        </div>

        {/* Notifications Section */}
        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center">
              <IconBell className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Notifications</h2>
              <p className="text-slate-500 text-xs">Choose when and how we contact you.</p>
            </div>
          </div>
          <div className="px-6">
            <SettingRow
              title="Email Notifications"
              description="Receive general updates, tips, and faith encouragements from YLP Stores via email."
              id="toggle-email-notifications"
              checked={settings.emailNotifications}
              onChange={handleUpdate('emailNotifications')}
            />
            <SettingRow
              title="Order Notifications"
              description="Get notified about your order status — shipping, delivery, and confirmations."
              id="toggle-order-notifications"
              checked={settings.orderNotifications}
              onChange={handleUpdate('orderNotifications')}
            />
            <SettingRow
              title="Marketing & Promotions"
              description="Receive updates about new products, collections, devotional releases, and sales."
              id="toggle-marketing-consent"
              checked={settings.marketingConsent}
              onChange={handleUpdate('marketingConsent')}
            />
          </div>
        </section>

        {/* Privacy Section */}
        <section className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <IconShield className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Privacy</h2>
              <p className="text-slate-500 text-xs">Control how your data is used.</p>
            </div>
          </div>
          <div className="px-6 py-6 space-y-4">
            <div className="bg-slate-50/70 rounded-2xl p-4 text-sm text-slate-600 leading-relaxed border border-slate-100">
              <p className="font-semibold text-slate-800 mb-1">Your Data</p>
              <p>
                YLP Stores stores your order history, wishlist, cart, and profile data locally on your device using
                browser storage. We do not share your personal information with third parties.
              </p>
            </div>
            <button
              id="clear-local-data-btn"
              onClick={() => {
                ['ylp_cart', 'ylp_wishlist', 'ylp_orders', 'ylp_addresses'].forEach((k) =>
                  localStorage.removeItem(k)
                );
                window.location.reload();
              }}
              className="text-sm font-semibold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-4 py-2.5 rounded-xl transition-all border border-amber-200"
            >
              Clear Browsing Data (Cart, Orders, Wishlist)
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-white rounded-3xl border border-rose-200/60 shadow-xs overflow-hidden">
          <div className="px-6 py-5 border-b border-rose-100/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center">
              <IconTrash className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h2 className="font-bold text-rose-700">Danger Zone</h2>
              <p className="text-rose-400 text-xs">These actions are irreversible.</p>
            </div>
          </div>
          <div className="px-6 py-6 space-y-4">
            <p className="text-sm text-slate-600">
              Deleting your account will remove all your data stored on this device. This action cannot be undone.
            </p>
            {!showDeleteConfirm ? (
              <button
                id="delete-account-btn"
                onClick={() => setShowDeleteConfirm(true)}
                className="text-sm font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-xl transition-all border border-rose-200"
              >
                Delete My Account
              </button>
            ) : (
              <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 space-y-3">
                <p className="text-sm font-semibold text-rose-800">Are you sure? This will clear all your data.</p>
                <div className="flex items-center gap-3">
                  <button
                    id="confirm-delete-btn"
                    onClick={() => {
                      Object.keys(localStorage)
                        .filter((k) => k.startsWith('ylp_'))
                        .forEach((k) => localStorage.removeItem(k));
                      window.location.href = '/';
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition-all"
                  >
                    Yes, Delete Everything
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="text-slate-600 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Faith Footer Note */}
        <div className="text-center py-4">
          <p className="text-slate-400 text-xs italic font-serif">
            "Let all that you do be done in love." — 1 Corinthians 16:14
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SettingsPage;
