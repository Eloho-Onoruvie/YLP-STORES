import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Library, ShoppingBag, BookOpen } from 'lucide-react';
import type { Order } from '../types';

export const PurchaseSuccess: React.FC = () => {
  const location = useLocation();
  const order = (location.state as { order?: Order })?.order;

  if (!order) {
    return <Navigate to="/my-books" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      {/* Animated Check Icon */}
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-500/5 animate-in zoom-in-50 duration-500">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Transaction Completed
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
          Purchase Successful!
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Thank you for your purchase. Your digital books have been unlocked in your library.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl space-y-6 text-left">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800 text-xs">
          <div>
            <span className="text-zinc-400 block">Order Number</span>
            <span className="font-mono font-bold text-sm text-zinc-900 dark:text-white">#{order.id}</span>
          </div>
          <div>
            <span className="text-zinc-400 block">Date</span>
            <span className="font-bold text-zinc-900 dark:text-white">{order.date}</span>
          </div>
          <div>
            <span className="text-zinc-400 block">Total Amount</span>
            <span className="font-editorial font-bold text-base text-amber-600 dark:text-amber-400">${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            Unlocked Digital Titles
          </h4>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={item.cover} alt={item.title} className="w-10 h-14 object-cover rounded-lg" />
                  <div>
                    <h5 className="font-bold text-zinc-900 dark:text-white text-sm line-clamp-1">{item.title}</h5>
                    <p className="text-zinc-500">by {item.author}</p>
                  </div>
                </div>
                <Link
                  to={`/read/${item.bookId}`}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs flex items-center gap-1 shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Read
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/my-books"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-600/25 transition-transform hover:scale-105"
        >
          <Library className="w-4 h-4" /> View My Digital Library
        </Link>
        <Link
          to="/books"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white font-semibold text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          <ShoppingBag className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    </div>
  );
};
