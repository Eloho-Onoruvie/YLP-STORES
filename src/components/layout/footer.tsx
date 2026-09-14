import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-[#FFFDF8] via-sky-50/40 to-[#F8F4EE] border-t border-sky-100/80 pt-16 pb-24 lg:pb-12 text-slate-600 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Faith Quote Banner */}
        <div className="p-8 rounded-3xl bg-white/80 backdrop-blur-md border border-sky-100 shadow-sm text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto text-lg">
            ✝
          </div>
          <p className="font-serif italic text-lg sm:text-xl text-slate-800 leading-relaxed">
            "Your word is a lamp for my feet, a light on my path."
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
            — Psalm 119:105
          </p>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 pb-12 border-b border-sky-100/60">
          
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20">
                ✝
              </div>
              <span className="font-editorial text-2xl font-bold tracking-tight text-slate-900">
                YLP<span className="text-sky-500">.</span>Stores 🤍
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-500 max-w-xs">
              A modern Christian lifestyle & digital faith store created to help you deepen your walk with God and become more intentional about your relationship with Jesus.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Explore Store</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/shop" className="hover:text-sky-600 transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/shop?category=Journals" className="hover:text-sky-600 transition-colors">Growth Journals</Link>
              </li>
              <li>
                <Link to="/shop?category=Sermon+Notes" className="hover:text-sky-600 transition-colors">Sermon Notes</Link>
              </li>
              <li>
                <Link to="/shop?category=Bibles" className="hover:text-sky-600 transition-colors">Illuminated Bibles</Link>
              </li>
              <li>
                <Link to="/shop?category=Devotionals" className="hover:text-sky-600 transition-colors">Daily Devotionals</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Customer Care</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/orders" className="hover:text-sky-600 transition-colors">Track Orders</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-sky-600 transition-colors">My Wishlist</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-sky-600 transition-colors">My Account</Link>
              </li>
              <li>
                <Link to="/account/addresses" className="hover:text-sky-600 transition-colors">Saved Addresses</Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-sky-600 transition-colors">Notification Settings</Link>
              </li>
            </ul>
          </div>

          {/* Community & Encouragement */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Faith Community</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Join our email circle for weekly devotional encouragement, scripture cards, and exclusive new releases.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold border border-sky-200/60">
                <span>🤍 Walk with Jesus Daily</span>
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} YLP Stores (Yesha's Little Princess). All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Made with faith, peace & intention 🤍</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
