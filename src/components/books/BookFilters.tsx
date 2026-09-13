import React from 'react';
import { Filter, RotateCcw, Star, Search } from 'lucide-react';
import { useBookStore } from '../../store/useBookStore';
import { BOOK_CATEGORIES } from '../../data/categories';

interface BookFiltersProps {
  onCloseMobile?: () => void;
}

export const BookFilters: React.FC<BookFiltersProps> = ({ onCloseMobile }) => {
  const {
    filters,
    setSearchQuery,
    setCategory,
    setPriceRange,
    setMinRating,
    setSortBy,
    resetFilters
  } = useBookStore();

  return (
    <div className="space-y-6 text-zinc-800 dark:text-zinc-200">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="font-editorial text-lg font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
          <Filter className="w-4 h-4 text-amber-500" />
          Filter Books
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Search Filter Input */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          Keyword Search
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Title, author, ISBN..."
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:outline-hidden"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
        </div>
      </div>

      {/* Sort By Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full px-3 py-2 text-sm rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:outline-hidden"
        >
          <option value="popularity">Most Popular & Bestsellers</option>
          <option value="newest">Newest Releases</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Categories */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          Category
        </label>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
          <button
            onClick={() => setCategory('all')}
            className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
              filters.category === 'all'
                ? 'bg-amber-500/10 font-bold text-amber-600 dark:text-amber-400'
                : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <span>All Categories</span>
          </button>
          {BOOK_CATEGORIES.map((cat) => {
            const isSelected = filters.category.toLowerCase() === cat.slug.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.slug)}
                className={`text-left px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/10 font-bold text-amber-600 dark:text-amber-400'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <span>{cat.name}</span>
                <span className="text-[11px] opacity-70">({cat.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter Slider */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          <span>Price Range</span>
          <span className="text-amber-600 dark:text-amber-400 font-mono text-sm">
            ${filters.minPrice} - ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="60"
          step="5"
          value={filters.maxPrice}
          onChange={(e) => setPriceRange(filters.minPrice, Number(e.target.value))}
          className="w-full accent-amber-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
          <span>$0</span>
          <span>$30</span>
          <span>$60+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
          Minimum Rating
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {[0, 4.0, 4.5, 4.8].map((ratingVal) => (
            <button
              key={ratingVal}
              onClick={() => setMinRating(ratingVal)}
              className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-1 ${
                filters.minRating === ratingVal
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-amber-500/50'
              }`}
            >
              {ratingVal === 0 ? (
                'All'
              ) : (
                <>
                  <span>{ratingVal}+</span>
                  <Star className="w-3 h-3 fill-current text-amber-300" />
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {onCloseMobile && (
        <button
          onClick={onCloseMobile}
          className="w-full py-3 rounded-xl bg-amber-600 text-white font-semibold text-sm shadow-md"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};
