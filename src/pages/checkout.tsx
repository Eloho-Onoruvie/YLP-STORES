import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  CreditCard,
  Building2,
  Lock,
  ArrowLeft,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { usePurchasedStore } from '../store/usePurchasedStore';
import { useAuthStore } from '../store/useAuthStore';
import { useToastStore } from '../store/useToastStore';
import type { Order, ShippingAddress } from '../types/index';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, getSubtotal, getDiscount, getTotal, clearCart, promoCode } = useCartStore();
  const { addOrder } = usePurchasedStore();
  const { user } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'wallet'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: user?.name || 'Eleanor Vance',
    email: user?.email || 'eleanor.vance@example.com',
    phone: user?.phone || '+1 (555) 234-5678',
    address: '742 Evergreen Terrace',
    city: 'Boston',
    state: 'MA',
    postalCode: '02108',
    country: 'United States'
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 •••• •••• 4242',
    expiry: '12/28',
    cvv: '888',
    nameOnCard: user?.name || 'Eleanor Vance'
  });

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast('Your cart is empty', 'error');
      navigate('/books');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.address) {
      addToast('Please fill out all required shipping fields', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      const orderDate = new Date().toISOString().split('T')[0];

      const newOrder: Order = {
        id: newOrderId,
        date: orderDate,
        items: cart.map((item) => ({
          bookId: item.book.id,
          title: item.book.title,
          author: item.book.author,
          cover: item.book.cover,
          price: item.book.price,
          quantity: item.quantity
        })),
        itemCount: cart.reduce((s, i) => s + i.quantity, 0),
        subtotal,
        discount,
        shipping: 0,
        tax: 0,
        total,
        status: 'Completed',
        paymentMethod:
          paymentMethod === 'card'
            ? `Credit Card (•••• 4242)`
            : paymentMethod === 'wallet'
            ? 'Apple / Google Pay'
            : 'Bank Transfer (Wire)',
        shippingAddress: formData
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);

      navigate('/purchase-success', { state: { order: newOrder } });
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <h2 className="font-editorial text-2xl font-bold text-zinc-900 dark:text-white">Your Cart is Empty</h2>
        <p className="text-sm text-zinc-500">Please add books to your shopping cart before checking out.</p>
        <Link to="/books" className="inline-block px-6 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-sm">
          Browse Books
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          to="/cart"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
          Checkout & Complete Purchase
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Customer Info & Payment */}
        <div className="lg:col-span-7 space-y-8">
          {/* Customer Information */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
            <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
              1. Customer Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:border-amber-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4">
            <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
              2. Payment Method
            </h3>

            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <CreditCard className="w-6 h-6" />
                <span className="text-xs">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('wallet')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <Smartphone className="w-6 h-6" />
                <span className="text-xs">Apple / Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank')}
                className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                  paymentMethod === 'bank'
                    ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <Building2 className="w-6 h-6" />
                <span className="text-xs">Bank Wire</span>
              </button>
            </div>

            {/* Card Mock Details */}
            {paymentMethod === 'card' && (
              <div className="pt-2 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="w-full px-4 py-2.5 font-mono text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">Expiry Date</label>
                    <input
                      type="text"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full px-4 py-2.5 font-mono text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">CVV / CVC</label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full px-4 py-2.5 font-mono text-sm rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 space-y-6 sticky top-28">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-md space-y-6">
            <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-800">
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.book.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={item.book.cover} alt={item.book.title} className="w-9 h-12 object-cover rounded-lg" />
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white line-clamp-1">{item.book.title}</p>
                      <span className="text-zinc-500">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-zinc-900 dark:text-white font-editorial">
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-zinc-900 dark:text-white font-editorial">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Promo Discount ({promoCode})</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <span>Total Due</span>
                <span className="text-amber-600 dark:text-amber-400 font-editorial">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-base shadow-xl shadow-amber-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Order...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Place Order (${total.toFixed(2)})
                </>
              )}
            </button>

            <p className="text-[11px] text-zinc-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Frontend mock payment — no charges will be made.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
