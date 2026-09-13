import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Phone, MapPin, Heart, Shield, RefreshCw, Truck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800">
      {/* Top benefits strip */}
      <div className="border-b border-zinc-800/80 py-8 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Free Global Delivery</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">On all orders over $50</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Secure Payments</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">256-bit encrypted checkout</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <RefreshCw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">30-Day Returns</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Hassle-free guarantee</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">25k+ Titles</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">Curated digital & physical</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-editorial text-xl font-bold tracking-tight text-white">
                YLP<span className="text-amber-500">.</span>STORES
              </span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Your premier destination for literature, fiction, personal development, and faith-inspired books. Crafting meaningful reading experiences worldwide.
            </p>

            <div className="space-y-2 text-xs text-zinc-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>124 Literary Way, Suite 400, Seattle, WA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>support@ylp-stores.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>+1 (800) 555-READ</span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/books" className="hover:text-amber-400 transition-colors">Browse Catalog</Link>
              </li>
              <li>
                <Link to="/books?category=Fiction" className="hover:text-amber-400 transition-colors">Fiction</Link>
              </li>
              <li>
                <Link to="/books?category=Science+Fiction" className="hover:text-amber-400 transition-colors">Sci-Fi & Fantasy</Link>
              </li>
              <li>
                <Link to="/books?category=Self+Development" className="hover:text-amber-400 transition-colors">Self Development</Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-amber-400 transition-colors">My Bookmarks</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Account & Support</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/profile" className="hover:text-amber-400 transition-colors">My Profile</Link>
              </li>
              <li>
                <Link to="/my-books" className="hover:text-amber-400 transition-colors">My Library</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-amber-400 transition-colors">Order Tracking</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-amber-400 transition-colors">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-amber-400 transition-colors">Sign In / Register</Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">About Us</span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">Shipping & Returns</span>
              </li>
              <li>
                <span className="hover:text-amber-400 transition-colors cursor-pointer">Affiliate Program</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} YLP.STORES. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for book lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};
