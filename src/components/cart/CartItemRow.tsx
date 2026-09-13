import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { useCartStore } from '../../store/useCartStore';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const itemTotal = item.book.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
      <div className="flex items-center gap-4 flex-1">
        {/* Cover Thumbnail */}
        <Link to={`/books/${item.book.id}`} className="shrink-0 w-16 h-22 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <img
            src={item.book.cover}
            alt={item.book.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </Link>

        {/* Info */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            {item.book.category}
          </span>
          <Link to={`/books/${item.book.id}`}>
            <h4 className="font-editorial font-bold text-base text-zinc-900 dark:text-white hover:text-amber-600 transition-colors line-clamp-1">
              {item.book.title}
            </h4>
          </Link>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">by {item.book.author}</p>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white font-editorial">
            ${item.book.price.toFixed(2)} each
          </p>
        </div>
      </div>

      {/* Quantity & Delete Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800">
        {/* Counter */}
        <div className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 bg-zinc-50 dark:bg-zinc-950">
          <button
            onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
            className="p-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-bold text-zinc-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
            className="p-1 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[70px]">
          <span className="text-base font-bold text-zinc-900 dark:text-white font-editorial">
            ${itemTotal.toFixed(2)}
          </span>
        </div>

        {/* Remove */}
        <button
          onClick={() => removeFromCart(item.book.id)}
          className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
          title="Remove from Cart"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
