import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/footer';

const IconSearch = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconX = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconShoppingBag = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const IconHeart = ({ className = 'w-5 h-5', fill = 'none' }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
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

const POPULAR = ['journal', 'devotional', 'sermon', 'bible', 'prayer', 'study guide'];

const SearchPage: React.FC = () => {
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [query, setQuery] = useState(queryParam);

  // Sync input when URL param changes
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        (p.badge && p.badge.toLowerCase().includes(lower))
    );
  }, [products, query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handlePopular = (term: string) => {
    setQuery(term);
    setSearchParams({ q: term });
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <IconSearch className="w-3.5 h-3.5" />
            <span>Search</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Find Faith Resources
          </h1>
          <p className="text-slate-500 text-sm">
            Search across all journals, devotionals, books, and gifts in the YLP Stores collection.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <IconSearch className="w-5 h-5 text-slate-400" />
            </div>
            <input
              id="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for journals, devotionals, Bibles..."
              className="w-full pl-12 pr-32 py-4 rounded-2xl border border-slate-200 bg-white text-slate-900 text-sm font-medium shadow-sm focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-24 flex items-center px-2 text-slate-400 hover:text-slate-600"
              >
                <IconX className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              id="search-submit-btn"
              className="absolute inset-y-0 right-2 my-1.5 px-5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* Popular Searches */}
        {!queryParam && (
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Popular Searches</p>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR.map((term) => (
                <button
                  key={term}
                  onClick={() => handlePopular(term)}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-white text-sm text-slate-700 font-medium hover:border-sky-300 hover:text-sky-700 hover:bg-sky-50 transition-all capitalize"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {queryParam && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-bold text-slate-900">
                  {results.length > 0
                    ? `${results.length} result${results.length !== 1 ? 's' : ''} for`
                    : 'No results for'}{' '}
                  <span className="text-sky-600">"{queryParam}"</span>
                </h2>
                {results.length === 0 && (
                  <p className="text-slate-500 text-sm mt-0.5">
                    Try a different term, or{' '}
                    <Link to="/shop" className="text-sky-600 font-semibold hover:underline">
                      browse all products
                    </Link>
                    .
                  </p>
                )}
              </div>
            </div>

            {results.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {results.map((product, i) => {
                  const wishlisted = isInWishlist(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Image */}
                      <div className={`relative h-44 bg-gradient-to-br ${PRODUCT_GRADIENTS[i % PRODUCT_GRADIENTS.length]} flex items-center justify-center`}>
                        <div className="text-center">
                          <div className="text-4xl mb-2">📖</div>
                          {product.badge && (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 text-slate-700 shadow-xs">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-xs flex items-center justify-center transition-colors hover:bg-rose-50"
                        >
                          <IconHeart
                            className="w-4 h-4"
                            fill={wishlisted ? 'currentColor' : 'none'}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-1 gap-3">
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold text-sky-600 uppercase tracking-wider mb-1">{product.category}</p>
                          <Link to={`/product/${product.id}`}>
                            <h3 className="font-bold text-slate-900 text-sm hover:text-sky-600 transition-colors line-clamp-2">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-slate-500 text-xs mt-1 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-base font-extrabold text-slate-900">
                            ${product.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => addToCart(product)}
                            className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-3 py-2.5 rounded-xl transition-all"
                          >
                            <IconShoppingBag className="w-3.5 h-3.5" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* No Results — suggestions */}
            {results.length === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.slice(0, 3).map((product, i) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-4 flex items-center gap-4 hover:-translate-y-0.5 transition-all"
                  >
                    <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${PRODUCT_GRADIENTS[i % PRODUCT_GRADIENTS.length]} flex items-center justify-center text-2xl`}>
                      📖
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${product.id}`} className="font-bold text-slate-900 text-sm hover:text-sky-600 transition-colors line-clamp-1">
                        {product.name}
                      </Link>
                      <p className="text-slate-500 text-xs">{product.category} · ${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty / Landing state */}
        {!queryParam && (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mx-auto">
              <span className="text-3xl">✦</span>
            </div>
            <p className="text-slate-500 text-sm">Begin your search above to find something meaningful.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
