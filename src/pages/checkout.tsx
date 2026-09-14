import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop, type Address } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, shippingFee, cartTotal, placeOrder, addresses, profile } = useShop();

  const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0] || {
    id: 'addr-new',
    name: profile.name,
    street: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'United States',
    phone: profile.phone,
    isDefault: true
  };

  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    name: defaultAddr.name || profile.name,
    street: defaultAddr.street || '',
    city: defaultAddr.city || '',
    state: defaultAddr.state || '',
    postalCode: defaultAddr.postalCode || '',
    country: defaultAddr.country || 'United States',
    phone: defaultAddr.phone || profile.phone,
    isDefault: true
  });

  const [email, setEmail] = useState(profile.email);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'bank'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const order = placeOrder(
        { ...formData, id: 'addr-' + Date.now() },
        paymentMethod === 'card' ? 'Credit Card (**** 4242)' : paymentMethod === 'apple' ? 'Apple Pay' : 'Bank Transfer'
      );
      setIsSubmitting(false);
      navigate(`/orders/${order.id}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFDF8] flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20 px-4 max-w-md mx-auto space-y-4">
          <h2 className="font-editorial text-2xl font-bold text-slate-900">Your Cart is Empty 🤍</h2>
          <p className="text-xs text-slate-500">Please add items to your cart before checking out.</p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 rounded-full bg-sky-500 text-white font-bold text-xs"
          >
            Go to Store
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        <div className="border-b border-sky-100 pb-6 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <span>🔒 Secure Checkout</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900">
            Complete Your Order
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: FORM SECTIONS */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. CONTACT INFORMATION */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="font-editorial text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                <span>1. Contact Information</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            {/* 2. DELIVERY INFORMATION */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="font-editorial text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                2. Shipping Address
              </h2>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter recipient full name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Street Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="123 Faith Way, Apt 4B"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      City <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Seattle"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      State <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="WA"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5 col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Postal Code <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="98101"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400"
                  />
                </div>
              </div>
            </div>

            {/* 3. PAYMENT METHOD */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
              <h2 className="font-editorial text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
                3. Payment Method
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-sky-500 bg-sky-50/50 text-slate-900 ring-2 ring-sky-300/40'
                      : 'border-slate-200 text-slate-600 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-sky-500 flex items-center justify-center">
                      {paymentMethod === 'card' && <span className="w-2 h-2 rounded-full bg-sky-500"></span>}
                    </span>
                    <span className="text-xs font-bold">Credit / Debit Card</span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">VISA / MC / AMEX</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('apple')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'apple'
                      ? 'border-sky-500 bg-sky-50/50 text-slate-900 ring-2 ring-sky-300/40'
                      : 'border-slate-200 text-slate-600 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-sky-500 flex items-center justify-center">
                      {paymentMethod === 'apple' && <span className="w-2 h-2 rounded-full bg-sky-500"></span>}
                    </span>
                    <span className="text-xs font-bold">Apple Pay / Digital Wallet</span>
                  </div>
                  <span className="text-xs text-slate-400">Instant</span>
                </label>

                <label
                  onClick={() => setPaymentMethod('bank')}
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-sky-500 bg-sky-50/50 text-slate-900 ring-2 ring-sky-300/40'
                      : 'border-slate-200 text-slate-600 hover:border-sky-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full border-2 border-sky-500 flex items-center justify-center">
                      {paymentMethod === 'bank' && <span className="w-2 h-2 rounded-full bg-sky-500"></span>}
                    </span>
                    <span className="text-xs font-bold">Direct Bank Transfer</span>
                  </div>
                  <span className="text-xs text-slate-400">Manual</span>
                </label>
              </div>

              {/* Card Inputs Mock */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 pt-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Card Number</label>
                    <input
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      defaultValue="4242 8910 2341 4242"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Expiry</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        defaultValue="12/28"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        defaultValue="891"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 sticky top-24">
            <h2 className="font-editorial text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary ({cart.length} items)
            </h2>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{item.product.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee:</span>
                <span className="font-bold text-slate-900">
                  {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-extrabold text-slate-900">
                <span>Total Due:</span>
                <span className="text-sky-600">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Placing Order...</span>
              ) : (
                <span>Complete Order (${cartTotal.toFixed(2)}) 🤍</span>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-relaxed">
              By clicking "Complete Order", you confirm your order details and delivery address.
            </p>
          </div>

        </form>

      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
