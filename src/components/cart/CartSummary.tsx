import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ showCheckoutButton = true }) => {
  const {
    getSubtotal,
    getDiscount,
    getTotal,
    promoCode,
    discountPercentage,
    applyPromoCode,
    removePromoCode
  } = useCartStore();

  const [inputCode, setInputCode] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md space-y-6">
      <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
        Order Summary
      </h3>

      {/* Promo Code Form */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          Promo Code
        </label>
        {promoCode ? (
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4" /> {promoCode} ({discountPercentage}% Off)
            </span>
            <button
              onClick={removePromoCode}
              className="text-rose-600 hover:underline text-[11px]"
            >
              Remove
            </button>
          </div>
        ) : (
          <form onSubmit={handleApply} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Try READ20"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm uppercase font-mono rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-amber-500 focus:outline-hidden"
              />
              <Tag className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-semibold text-xs rounded-xl transition-colors shrink-0"
            >
              Apply
            </button>
          </form>
        )}
      </div>

      {/* Calculation breakdown */}
      <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold text-zinc-900 dark:text-white font-editorial">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
            <span>Discount ({discountPercentage}%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Digital Delivery</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">FREE</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Tax</span>
          <span>$0.00</span>
        </div>

        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-baseline">
          <span className="text-base font-bold text-zinc-900 dark:text-white">Total</span>
          <span className="text-2xl font-bold text-amber-600 dark:text-amber-400 font-editorial">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {showCheckoutButton && (
        <Link
          to="/checkout"
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-lg shadow-amber-600/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          Proceed to Checkout <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      <div className="flex items-center justify-center gap-2 text-xs text-zinc-400 pt-1">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>Secure 256-bit SSL encrypted checkout</span>
      </div>
    </div>
  );
};
