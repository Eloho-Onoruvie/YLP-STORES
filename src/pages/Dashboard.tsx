import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

export const DashboardPage: React.FC = () => {
  const { profile, products, addToCart, toggleWishlist, isInWishlist } = useShop();

  const featuredProducts = products.filter((p) => p.isFeatured || p.isBestseller).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">

        {/* 1. WELCOME SECTION */}
        <section className="relative rounded-3xl bg-gradient-to-br from-[#EAF7FC] via-[#FFFDF8] to-[#F8F4EE] p-8 sm:p-12 border border-sky-100/80 shadow-sm overflow-hidden">
          {/* Subtle Ambient Light Rays & Shimmer */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-wider border border-sky-200/60">
              <span>✦ Faithful Living</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-slate-900 leading-tight">
              Welcome back, <span className="text-sky-600 italic font-semibold">{profile.name.split(' ')[0]}</span> 🤍
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Let's continue growing intentionally in your walk with God.
            </p>
          </div>
        </section>

        {/* 2. QUICK ACTIONS */}
        <section className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Navigation</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

            {/* Action 1: Shop Products */}
            <Link
              to="/shop"
              className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                  Shop Products
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Explore journals & faith items</p>
              </div>
            </Link>

            {/* Action 2: My Orders */}
            <Link
              to="/orders"
              className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                  My Orders
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Track your purchases</p>
              </div>
            </Link>

            {/* Action 3: My Wishlist */}
            <Link
              to="/wishlist"
              className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-rose-500 transition-colors">
                  My Wishlist
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Saved spiritual items</p>
              </div>
            </Link>

            {/* Action 4: My Account */}
            <Link
              to="/account"
              className="group p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all duration-300 flex flex-col justify-between space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                  My Account
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Profile & settings</p>
              </div>
            </Link>

          </div>
        </section>

        {/* 3. FEATURED PRODUCTS SECTION */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-900">
                Featured Faith Essentials
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Handpicked tools to inspire devotion, quiet time, and biblical study
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 hover:underline"
            >
              <span>View All Store</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
              const bookmarked = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 relative"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-xs ${bookmarked
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
                          }`}
                        title={bookmarked ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                      </button>
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-bold text-sky-700 uppercase tracking-wider shadow-xs">
                        {product.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5">
                      <Link to={`/shop/${product.id}`} className="block">
                        <h3 className="font-editorial text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. FAITH / GROWTH PEACEFUL SECTION */}
        <section className="rounded-3xl bg-gradient-to-r from-sky-50 via-[#FFFDF8] to-amber-50/40 p-8 sm:p-14 border border-sky-100 shadow-sm text-center relative overflow-hidden space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#D4AF37] border border-amber-200/60 shadow-xs flex items-center justify-center mx-auto text-xl font-bold">
            ✝
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <p className="font-editorial text-2xl sm:text-3xl text-slate-800 leading-snug">
              "Be still, and know that I am God."
            </p>
            <p className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
              Psalm 46:10
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto font-normal">
            Take a deep breath. In the rush of daily life, remember that God’s grace is sufficient, His presence is near, and your worth is anchored in Christ 🤍
          </p>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
