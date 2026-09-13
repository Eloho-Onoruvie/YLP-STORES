import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { CartItemRow } from '../components/cart/CartItemRow';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyState } from '../components/ui/EmptyState';

export const Cart: React.FC = () => {
  const { cart, clearCart, getItemCount } = useCartStore();

  const itemCount = getItemCount();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Shopping Cart
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-1">
            Your Cart ({itemCount} item{itemCount !== 1 ? 's' : ''})
          </h1>
        </div>

        {cart.length > 0 && (
          <div className="flex items-center gap-4">
            <Link
              to="/books"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Cart
            </button>
          </div>
        )}
      </div>

      {cart.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your shopping cart is empty"
          description="Looks like you haven't added any books to your cart yet. Explore our collection and discover your next great read."
          actionText="Start Shopping"
          actionLink="/books"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <CartItemRow key={item.book.id} item={item} />
            ))}

            <div className="pt-4 flex justify-between items-center">
              <Link
                to="/books"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Continue Browsing Books
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 sticky top-28">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};
