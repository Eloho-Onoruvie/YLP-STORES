import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Star,
  Search,
  ShieldCheck,
  Truck,
  Bookmark,
  ShoppingBag,
  Eye,
  ChevronRight
} from 'lucide-react';
import { MOCK_BOOKS } from '../data/books';
import { BOOK_CATEGORIES } from '../data/categories';
import { useCartStore } from '../store/useCartStore';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { useToastStore } from '../store/useToastStore';
import type { Book } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'featured' | 'bestsellers' | 'new' | 'discounted'>('featured');

  const addToCart = useCartStore((s) => s.addToCart);
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const addToast = useToastStore((s) => s.addToast);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/books');
    }
  };

  const featuredBooks = MOCK_BOOKS.filter((b: Book) => b.featured || b.badge === 'Bestseller' || b.badge === 'Editor Choice').slice(0, 8);
  const bestsellers = MOCK_BOOKS.filter((b: Book) => b.bestseller || b.rating >= 4.8).slice(0, 8);
  const newReleases = MOCK_BOOKS.filter((b: Book) => b.badge === 'New' || b.badge === 'Must Read').slice(0, 8);
  const discountedBooks = MOCK_BOOKS.filter((b: Book) => b.originalPrice && b.originalPrice > b.price).slice(0, 8);

  const displayedBooks =
    activeTab === 'bestsellers'
      ? bestsellers
      : activeTab === 'new'
      ? newReleases
      : activeTab === 'discounted'
      ? discountedBooks
      : featuredBooks;

  const spotlightBook = MOCK_BOOKS.find((b: Book) => b.id === 'book-1') || MOCK_BOOKS[0];

  const handleAddToCart = (book: Book, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(book);
  };

  const handleBookmarkToggle = (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const isSaved = isBookmarked(bookId);
    toggleBookmark(bookId);
    addToast(isSaved ? 'Removed from bookmarks' : 'Added to bookmarks', 'info');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-900/20 dark:via-zinc-950/50 dark:to-zinc-950 pt-12 pb-20 border-b border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Premier Online Sanctuary for Book Lovers</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                Discover Books That <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent italic">
                  Transform Your World.
                </span>
              </h1>

              <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Explore thousands of curated titles across literature, sci-fi, personal development, business, and philosophy. Enjoy instant e-reading or premium hardcover deliveries.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-xl mx-auto lg:mx-0 relative flex items-center">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, author, or genre..."
                    className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm font-medium transition-all"
                  />
                  <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                </div>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search</span>
                </button>
              </form>

              {/* Quick Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">Popular:</span>
                {['Fiction', 'Science Fiction', 'Self Development', 'Business', 'Fantasy'].map((cat) => (
                  <Link
                    key={cat}
                    to={`/books?category=${encodeURIComponent(cat)}`}
                    className="px-3 py-1 rounded-lg bg-zinc-200/60 dark:bg-zinc-800/60 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {cat}
                  </Link>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-zinc-200/60 dark:border-zinc-800/60 text-left">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">25k+</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Curated Titles</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">4.9 / 5</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Reader Rating</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">100%</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Stack */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Background Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 to-amber-700/30 rounded-3xl blur-2xl opacity-75"></div>

                {/* Primary Card Feature */}
                <div className="relative rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-6 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                      ★ Featured Spotlight
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-4 h-4 fill-amber-500" />
                      <span>{spotlightBook.rating} ({spotlightBook.reviews})</span>
                    </div>
                  </div>

                  <div className="flex gap-6 items-center">
                    <img
                      src={spotlightBook.cover}
                      alt={spotlightBook.title}
                      className="w-28 sm:w-32 h-40 sm:h-44 object-cover rounded-xl shadow-lg ring-1 ring-zinc-900/10 flex-shrink-0"
                    />
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {spotlightBook.category}
                      </p>
                      <h3 className="font-editorial text-lg sm:text-xl font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                        {spotlightBook.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        by <span className="font-semibold text-zinc-700 dark:text-zinc-300">{spotlightBook.author}</span>
                      </p>
                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-black text-amber-600 dark:text-amber-400">
                          ${spotlightBook.price.toFixed(2)}
                        </span>
                        {spotlightBook.originalPrice && (
                          <span className="text-xs text-zinc-400 line-through">
                            ${spotlightBook.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 italic">
                    "{spotlightBook.description}"
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <Link
                      to={`/books/${spotlightBook.id}`}
                      className="py-3 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </Link>
                    <button
                      onClick={(e) => handleAddToCart(spotlightBook, e)}
                      className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold text-center transition-transform hover:scale-[1.02] shadow-md shadow-amber-500/25 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Horizontal Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Explore by Genre
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Find your next favorite book in our curated categories
            </p>
          </div>
          <Link
            to="/books"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BOOK_CATEGORIES.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              to={`/books?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] p-4 flex flex-col justify-end border border-zinc-200/80 dark:border-zinc-800 shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.featuredImage}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent"></div>
              
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-md backdrop-blur-xs inline-block">
                  {cat.count} Titles
                </span>
                <h3 className="font-editorial text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Showcase Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-8">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Curated Collections
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Handpicked selections updated daily by our editorial staff
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {[
              { id: 'featured', label: 'Featured Picks', icon: Sparkles },
              { id: 'bestsellers', label: 'Bestsellers', icon: TrendingUp },
              { id: 'new', label: 'New Releases', icon: Award },
              { id: 'discounted', label: 'Special Offers', icon: Star }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'featured' | 'bestsellers' | 'new' | 'discounted')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  <IconComp className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedBooks.map((book: Book) => {
            const bookmarked = isBookmarked(book.id);
            return (
              <div
                key={book.id}
                onClick={() => navigate(`/books/${book.id}`)}
                className="group relative rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 mb-4">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badge */}
                    {book.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-zinc-900/80 backdrop-blur-md text-white text-[10px] font-extrabold tracking-wider uppercase border border-white/10">
                        {book.badge}
                      </span>
                    )}

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => handleBookmarkToggle(book.id, e)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-transform hover:scale-110 cursor-pointer ${
                        bookmarked
                          ? 'bg-amber-500 text-white'
                          : 'bg-zinc-900/60 text-white hover:bg-zinc-900/80'
                      }`}
                      title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                    >
                      <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {book.category}
                    </p>
                    <h3 className="font-editorial text-base font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {book.author}
                    </p>
                  </div>
                </div>

                {/* Rating & Action Footer */}
                <div className="pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{book.rating}</span>
                      <span className="text-zinc-400 text-[10px]">({book.reviews})</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span className="text-base font-extrabold text-zinc-900 dark:text-white">
                        ${book.price.toFixed(2)}
                      </span>
                      {book.originalPrice && (
                        <span className="text-[11px] text-zinc-400 line-through">
                          ${book.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(book, e)}
                    className="p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-600 hover:text-white transition-all cursor-pointer"
                    title="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-[1.02]"
          >
            <span>Explore Full Catalog ({MOCK_BOOKS.length} Books)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Feature Highlights Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-900 dark:bg-zinc-900/90 text-white p-8 sm:p-12 border border-zinc-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-lg font-bold">Express Global Delivery</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Fast, tracked shipping straight to your doorstep in eco-friendly protective packaging.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-lg font-bold">Instant E-Reader Sync</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Start reading instantly on your web browser or sync seamlessly with any EPUB device.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-lg font-bold">100% Quality Guarantee</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  30-day hassle-free return policy if your book arrives in anything less than pristine condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-700/10 dark:from-amber-950/40 dark:via-zinc-900 dark:to-zinc-950 p-8 sm:p-12 border border-amber-500/20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Join Our Literary Circle
            </span>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              Get 15% Off Your Next Purchase
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Subscribe to receive curated reading recommendations, author interviews, and exclusive discounts.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addToast('Thank you for subscribing! Check your email for your 15% discount code.', 'success');
            }}
            className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 max-w-md"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address..."
              className="px-4 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 flex-1 min-w-[240px]"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-500/30 whitespace-nowrap cursor-pointer"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
