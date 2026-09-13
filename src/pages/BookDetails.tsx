import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bookmark,
  ShoppingBag,
  Zap,
  Calendar,
  FileText,
  Barcode,
  Share2,
  Check,
  MessageSquare,
  ArrowLeft,
  Globe,
  Award
} from 'lucide-react';
import { MOCK_BOOKS } from '../data/books';
import { Rating } from '../components/ui/Rating';
import { ReviewCard } from '../components/books/ReviewCard';
import { WriteReviewModal } from '../components/books/WriteReviewModal';
import { BookGrid } from '../components/books/BookGrid';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { useCartStore } from '../store/useCartStore';
import { useToastStore } from '../store/useToastStore';
import type { Review } from '../types';

export const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'chapters'>('overview');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const book = MOCK_BOOKS.find((b) => b.id === id);

  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { addToCart, cart } = useCartStore();
  const addToast = useToastStore((s) => s.addToast);

  const [reviewsList, setReviewsList] = useState<Review[]>(book?.customerReviews || []);

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-editorial text-2xl font-bold text-zinc-900 dark:text-white">Book Not Found</h2>
        <p className="text-sm text-zinc-500">The requested book does not exist or was removed.</p>
        <Link to="/books" className="inline-block px-6 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-sm">
          Return to Explore
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(book.id);
  const inCart = cart.some((item) => item.book.id === book.id);

  const relatedBooks = MOCK_BOOKS.filter(
    (b) => b.id !== book.id && (b.category === book.category || b.genre === book.genre)
  ).slice(0, 4);

  const handleBuyNow = () => {
    if (!inCart) {
      addToCart(book, 1);
    }
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Book link copied to clipboard!', 'info');
  };

  const handleAddReview = (newReview: Review) => {
    setReviewsList([newReview, ...reviewsList]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Back Link */}
      <div>
        <Link
          to="/books"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Explore
        </Link>
      </div>

      {/* Main Book Hero Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Large Cover */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="relative w-full max-w-sm aspect-3/4 rounded-3xl overflow-hidden shadow-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800">
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
            {book.bestseller && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-lg bg-amber-500 text-white shadow-md uppercase tracking-wider">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Right Details Info */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                {book.category} • {book.genre}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-500 transition-colors"
                  title="Share Book"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleBookmark(book.id, book.title)}
                  className={`p-2.5 rounded-full border transition-colors ${
                    bookmarked
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-500'
                  }`}
                  title={bookmarked ? 'Remove Bookmark' : 'Bookmark Book'}
                >
                  <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />
                </button>
              </div>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mt-2 leading-tight">
              {book.title}
            </h1>
            <p className="text-base text-zinc-600 dark:text-zinc-400 font-medium mt-1">
              Written by <span className="text-zinc-900 dark:text-white font-bold">{book.author}</span>
            </p>

            <div className="mt-4 flex items-center gap-4">
              <Rating value={book.rating} reviewsCount={book.reviews} size="md" />
              <span className="text-xs text-zinc-400">•</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> In Stock & Instant Download
              </span>
            </div>
          </div>

          {/* Pricing & CTA Card */}
          <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="font-editorial text-3xl font-bold text-zinc-900 dark:text-white">
                ${book.price.toFixed(2)}
              </span>
              {book.originalPrice && (
                <span className="text-base text-zinc-400 line-through">
                  ${book.originalPrice.toFixed(2)}
                </span>
              )}
              {book.originalPrice && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  Save ${(book.originalPrice - book.price).toFixed(2)}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(book)}
                className={`py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  inCart
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700'
                }`}
              >
                {inCart ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                <Zap className="w-4 h-4 fill-current" /> Buy Now
              </button>
            </div>
          </div>

          {/* Quick Specifications Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs">
            <div className="space-y-1">
              <span className="text-zinc-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-500" /> Pages
              </span>
              <p className="font-bold text-zinc-900 dark:text-white">{book.pages} pages</p>
            </div>
            <div className="space-y-1">
              <span className="text-zinc-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-500" /> Published
              </span>
              <p className="font-bold text-zinc-900 dark:text-white">{book.publishedDate}</p>
            </div>
            <div className="space-y-1">
              <span className="text-zinc-400 flex items-center gap-1">
                <Barcode className="w-3.5 h-3.5 text-amber-500" /> ISBN
              </span>
              <p className="font-bold text-zinc-900 dark:text-white font-mono">{book.isbn}</p>
            </div>
            <div className="space-y-1">
              <span className="text-zinc-400 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-amber-500" /> Format
              </span>
              <p className="font-bold text-zinc-900 dark:text-white">{book.format || 'eBook'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation: Overview, Reviews, Table of Contents */}
      <div className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-6 border-b border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-editorial text-lg font-bold transition-all relative ${
              activeTab === 'overview'
                ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500'
                : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Overview & Author
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 font-editorial text-lg font-bold transition-all relative flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500'
                : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            Customer Reviews ({reviewsList.length})
          </button>
          {book.chapters && book.chapters.length > 0 && (
            <button
              onClick={() => setActiveTab('chapters')}
              className={`pb-3 font-editorial text-lg font-bold transition-all relative ${
                activeTab === 'chapters'
                  ? 'text-amber-600 dark:text-amber-400 border-b-2 border-amber-500'
                  : 'text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Chapter Preview ({book.chapters.length})
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white">About the Book</h3>
              <p className="text-sm sm:text-base leading-relaxed">
                {book.longDescription || book.description}
              </p>
            </div>

            {/* About the Author Sidebar Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <h4 className="font-editorial text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" /> About the Author
              </h4>
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{book.author}</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {book.authorBio}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white">
                  Customer Ratings & Reviews
                </h3>
                <Rating value={book.rating} reviewsCount={book.reviews} size="md" />
              </div>
              <button
                onClick={() => setIsWriteReviewOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" /> Write a Review
              </button>
            </div>

            {reviewsList.length === 0 ? (
              <p className="text-sm text-zinc-500 py-6">No reviews written yet. Be the first to review this book!</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewsList.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'chapters' && book.chapters && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-editorial text-xl font-bold text-zinc-900 dark:text-white">
              Table of Contents
            </h3>
            <div className="space-y-3">
              {book.chapters.map((ch) => (
                <div key={ch.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <h4 className="font-bold text-sm text-zinc-900 dark:text-white">{ch.title}</h4>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{ch.content[0]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Related Books Section */}
      {relatedBooks.length > 0 && (
        <section className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <h2 className="font-editorial text-2xl font-bold text-zinc-900 dark:text-white">
            Similar & Related Books
          </h2>
          <BookGrid books={relatedBooks} />
        </section>
      )}

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        bookTitle={book.title}
        onAddReview={handleAddReview}
      />
    </div>
  );
};
