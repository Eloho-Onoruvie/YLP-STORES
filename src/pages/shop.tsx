import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { Product } from '../data/products';

export const ShopPage: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'All';
  const searchQueryParam = searchParams.get('search') || '';

  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [visibleCount, setVisibleCount] = useState(9);

  const categories = ['All', 'Journals', 'Sermon Notes', 'Bibles', 'Books', 'Devotionals', 'Christian Gifts'];

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchesCategory = activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  const handleCategorySelect = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        {/* SHOP HEADER */}
        <div className="space-y-3 text-center sm:text-left border-b border-sky-100 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <span>✨ Complete Store</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            Faith & Lifestyle Store
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-2xl">
            Discover intentional growth journals, sermon note books, illuminated Bibles, and devotionals crafted to inspire your walk with Jesus.
          </p>
        </div>

        {/* CONTROLS BAR: SEARCH, CATEGORIES, SORT */}
        <div className="space-y-6">
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto sm:mx-0 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, keyword, or category..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-300/40"
            />
            <svg className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Categories Pills & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = (cat === 'All' && !searchParams.get('category')) || activeCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                        : 'bg-white border border-slate-200/80 text-slate-600 hover:border-sky-300 hover:text-sky-600'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-bold text-slate-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200/80 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl focus:outline-none focus:border-sky-400 cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

        </div>

        {/* PRODUCT GRID */}
        {displayedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {displayedProducts.map((product) => {
              const bookmarked = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group rounded-3xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 relative"
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
                        className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer ${
                          bookmarked
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500'
                        }`}
                        title={bookmarked ? 'Remove from Wishlist' : 'Add to Wishlist'}
                      >
                        <svg className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                        </svg>
                      </button>

                      {product.isBestseller && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <span>★ {product.rating}</span>
                        <span className="text-slate-400 text-[11px]">({product.reviewCount})</span>
                      </div>
                      <Link to={`/shop/${product.id}`} className="block">
                        <h3 className="font-editorial text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-1">
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
        ) : (
          /* EMPTY SEARCH / FILTER STATE */
          <div className="text-center py-16 rounded-3xl bg-white border border-slate-200/80 p-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mx-auto text-2xl">
              🔍
            </div>
            <h3 className="font-editorial text-2xl font-bold text-slate-900">No Products Found 🤍</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn't find anything matching your search. Try adjusting your search query or choosing another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              className="px-6 py-3 rounded-full bg-sky-500 text-white text-xs font-bold shadow-md hover:bg-sky-600 transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* LOAD MORE BUTTON */}
        {filteredProducts.length > visibleCount && (
          <div className="text-center pt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3.5 rounded-full bg-white border border-slate-300 hover:border-sky-400 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:shadow-md"
            >
              Load More Products
            </button>
          </div>
        )}

      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default ShopPage;
