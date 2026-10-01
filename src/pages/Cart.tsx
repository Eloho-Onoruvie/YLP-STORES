import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartQuantity, toggleWishlist, cartSubtotal, shippingFee, cartTotal } = useShop();

  const handleSaveForLater = (productId: string) => {
    toggleWishlist(productId);
    removeFromCart(productId);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">

        {/* PAGE HEADER */}
        <div className="border-b border-sky-100 pb-6 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <span>🛍️ Shopping Bag</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900">
            Your Cart
          </h1>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* CART ITEMS LIST */}
            <div className="lg:col-span-8 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 transition-all"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">
                        {item.product.category}
                      </span>
                      <Link to={`/shop/${item.product.id}`} className="block">
                        <h3 className="font-editorial text-base sm:text-lg font-bold text-slate-900 hover:text-sky-600 transition-colors line-clamp-1">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-xs font-extrabold text-slate-900">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 font-bold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-900 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Total item price */}
                    <span className="text-sm font-extrabold text-slate-900 min-w-[60px] text-right">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveForLater(item.product.id)}
                        className="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors p-1"
                        title="Save for Later (Move to Wishlist)"
                      >
                        🤍
                      </button>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove from Cart"
                      >
                        ✕
                      </button>
                    </div>

                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between pt-2">
                <Link to="/shop" className="text-xs font-bold text-sky-600 hover:underline">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* SUMMARY CARD */}
            <div className="lg:col-span-4 rounded-3xl bg-white border border-slate-200/80 p-6 shadow-sm space-y-6">
              <h3 className="font-editorial text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Order Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping:</span>
                  <span className="font-bold text-slate-900">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-[11px] text-sky-600 italic">
                    Add ${(50 - cartSubtotal).toFixed(2)} more for FREE shipping!
                  </p>
                )}
                <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-extrabold text-slate-900">
                  <span>Total:</span>
                  <span className="text-sky-600">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                Proceed to Checkout 🤍
              </button>

              <div className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-100 text-[11px] text-slate-600 text-center space-y-1">
                <p className="font-bold text-slate-800">100% Satisfaction Guarantee</p>
                <p>Hassle-free 30-day returns on all YLP store products.</p>
              </div>
            </div>

          </div>
        ) : (
          /* EMPTY CART STATE */
          <div className="text-center py-20 rounded-3xl bg-white border border-slate-200/80 p-8 space-y-6 max-w-md mx-auto shadow-xs">
            <div className="w-20 h-20 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mx-auto text-3xl shadow-inner">
              🤍
            </div>

            <div className="space-y-2">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900">
                Your cart is waiting 🤍
              </h2>
              <p className="text-xs text-slate-500">
                Find something that helps you grow in your walk with God.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-block px-8 py-3.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-sky-500/20 transition-all"
            >
              Explore the Store
            </Link>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
