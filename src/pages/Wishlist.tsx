import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

const IconHeart = ({ className = 'w-5 h-5', fill = 'currentColor' }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const IconShoppingBag = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const IconTrash = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const IconArrowRight = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const PRODUCT_GRADIENTS = [
  'from-sky-100 to-indigo-100',
  'from-amber-100 to-orange-100',
  'from-purple-100 to-pink-100',
  'from-emerald-100 to-teal-100',
  'from-rose-100 to-red-100',
  'from-blue-100 to-cyan-100',
];

const WishlistPage: React.FC = () => {
  const { products, wishlist, toggleWishlist, addToCart } = useShop();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="border-b border-sky-100 pb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100/70 text-rose-600 text-xs font-bold uppercase tracking-wider">
            <IconHeart className="w-3.5 h-3.5" fill="currentColor" />
            <span>Saved with Love</span>
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">My Wishlist</h1>
              <p className="text-slate-500 text-sm mt-1">
                {wishlisted.length === 0
                  ? 'Your wishlist is empty — start saving items you love.'
                  : `${wishlisted.length} item${wishlisted.length !== 1 ? 's' : ''} saved for later`}
              </p>
            </div>
            {wishlisted.length > 0 && (
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center gap-2 text-sky-600 font-semibold text-sm hover:text-sky-700 transition-colors"
              >
                Continue Shopping <IconArrowRight />
              </Link>
            )}
          </div>
        </div>

        {wishlisted.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center">
              <IconHeart className="w-12 h-12 text-rose-300" fill="none" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-800">Nothing saved yet</h2>
              <p className="text-slate-500 text-sm max-w-xs">
                Browse our faith-filled collection and tap the heart to save your favorites here.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5"
            >
              Browse the Shop <IconArrowRight />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {wishlisted.map((product, i) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Product Image Area */}
                  <div className={`relative h-48 bg-gradient-to-br ${PRODUCT_GRADIENTS[i % PRODUCT_GRADIENTS.length]} flex items-center justify-center`}>
                    <div className="text-center p-4">
                      <div className="text-5xl mb-2">📖</div>
                      {product.badge && (
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 text-slate-700 shadow-xs">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    {/* Remove from Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-xs flex items-center justify-center text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove from Wishlist"
                    >
                      <IconHeart className="w-4 h-4" fill="currentColor" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex flex-col flex-1 gap-3">
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider mb-1">{product.category}</p>
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug hover:text-sky-600 transition-colors line-clamp-2">{product.name}</h3>
                      </Link>
                      <p className="text-slate-500 text-xs mt-1 line-clamp-2">{product.description}</p>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg font-extrabold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition-all"
                      >
                        <IconShoppingBag className="w-3.5 h-3.5" />
                        Add to Cart
                      </button>
                    </div>

                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="w-full flex items-center justify-center gap-2 text-slate-500 hover:text-rose-500 text-xs font-semibold py-1.5 rounded-xl hover:bg-rose-50 transition-all"
                    >
                      <IconTrash className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="bg-gradient-to-r from-sky-50 to-indigo-50/60 rounded-3xl p-6 border border-sky-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-800">Ready to order?</p>
                <p className="text-slate-500 text-sm">Add your favorites to the cart and checkout when you're ready.</p>
              </div>
              <Link
                to="/cart"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-2xl transition-all whitespace-nowrap"
              >
                <IconShoppingBag className="w-4 h-4" />
                View Cart
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default WishlistPage;
