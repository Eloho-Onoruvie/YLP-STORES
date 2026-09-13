import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Grid, List, X, SlidersHorizontal } from 'lucide-react';
import { useBookStore } from '../store/useBookStore';
import { BookGrid } from '../components/books/BookGrid';
import { BookFilters } from '../components/books/BookFilters';
import { Modal } from '../components/ui/Modal';
import { BOOK_CATEGORIES } from '../data/categories';

export const Books: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { category: urlCategory } = useParams<{ category?: string }>();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const {
    filters,
    setCategory,
    setSearchQuery,
    setSortBy,
    resetFilters,
    getFilteredBooks
  } = useBookStore();

  useEffect(() => {
    if (urlCategory) {
      setCategory(urlCategory);
    } else {
      const catParam = searchParams.get('category');
      if (catParam) setCategory(catParam);
    }

    const sortParam = searchParams.get('sort');
    if (sortParam) setSortBy(sortParam as any);

    const queryParam = searchParams.get('q');
    if (queryParam) setSearchQuery(queryParam);
  }, [urlCategory, searchParams]);

  const filteredBooks = getFilteredBooks();
  const visibleBooks = filteredBooks.slice(0, visibleCount);

  const activeCategoryObj = BOOK_CATEGORIES.find(
    (c) => c.slug.toLowerCase() === filters.category.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Catalog Explorer
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-1">
            {activeCategoryObj ? `${activeCategoryObj.name} Books` : 'Explore All Books'}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Showing {filteredBooks.length} titles matching your criteria
          </p>
        </div>

        {/* Toolbar Top Controls */}
        <div className="flex items-center gap-3 self-end">
          {/* Mobile Filters Modal Trigger */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-semibold shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-500" /> Filters
          </button>

          {/* Grid / List Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <button
              onClick={() => setLayout('grid')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'grid'
                  ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                  : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout('list')}
              className={`p-2 rounded-lg transition-colors ${
                layout === 'list'
                  ? 'bg-white dark:bg-zinc-800 text-amber-600 dark:text-amber-400 shadow-xs font-bold'
                  : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Page Layout (Sidebar + Books Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1 space-y-6">
          <div className="sticky top-28 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs">
            <BookFilters />
          </div>
        </div>

        {/* Books Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Active Filter Badges */}
          {(filters.searchQuery || filters.category !== 'all' || filters.minRating > 0 || filters.maxPrice < 60) && (
            <div className="flex flex-wrap items-center gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs">
              <span className="font-bold text-amber-700 dark:text-amber-300">Active Filters:</span>

              {filters.searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 font-medium">
                  Query: "{filters.searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 font-medium">
                  Category: {activeCategoryObj?.name || filters.category}
                  <button onClick={() => setCategory('all')} className="hover:text-rose-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 font-medium">
                  Rating: {filters.minRating}+ Stars
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Book Cards Grid */}
          <BookGrid
            books={visibleBooks}
            layout={layout}
            onResetFilters={resetFilters}
          />

          {/* Load More Pagination Simulation */}
          {visibleCount < filteredBooks.length && (
            <div className="pt-8 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + 8)}
                className="px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 font-bold text-sm shadow-md transition-all"
              >
                Load More Books ({filteredBooks.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <Modal
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        title="Filter & Sort Books"
      >
        <BookFilters onCloseMobile={() => setIsMobileFiltersOpen(false)} />
      </Modal>
    </div>
  );
};
