import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ShoppingBag, Check } from 'lucide-react';
import type { Book } from '../../types';
import { Rating } from '../ui/Rating';
import { useBookmarkStore } from '../../store/useBookmarkStore';
import { useCartStore } from '../../store/useCartStore';

interface BookCardProps {
  book: Book;
  layout?: 'grid' | 'list';
}

export const BookCard: React.FC<BookCardProps> = ({ book, layout = 'grid' }) => {
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { addToCart, cart } = useCartStore();

  const bookmarked = isBookmarked(book.id);
  const inCart = cart.some((item) => item.book.id === book.id);

  if (layout === 'list') {
    return (
      <div className="group flex flex-col sm:flex-row gap-5 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-md hover:border-amber-500/30 transition-all">
        {/* Cover */}
        <Link to={`/books/${book.id}`} className="relative shrink-0 overflow-hidden rounded-xl w-full sm:w-36 h-48 sm:h-52 bg-zinc-100 dark:bg-zinc-800">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {book.bestseller && (
            <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500 text-white shadow-xs uppercase tracking-wider">
              Bestseller
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {book.category} • {book.genre}
              </span>
              <button
                onClick={() => toggleBookmark(book.id, book.title)}
                className={`p-2 rounded-full transition-colors ${
                  bookmarked
                    ? 'text-amber-500 bg-amber-500/10'
                    : 'text-zinc-400 hover:text-amber-500 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
                title={bookmarked ? 'Remove Bookmark' : 'Bookmark Book'}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-500' : ''}`} />
              </button>
            </div>

            <Link to={`/books/${book.id}`}>
              <h3 className="font-editorial text-lg font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                {book.title}
              </h3>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">by {book.author}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <Rating value={book.rating} reviewsCount={book.reviews} size="sm" />
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-lg font-bold text-zinc-900 dark:text-white font-editorial">
                  ${book.price.toFixed(2)}
                </span>
                {book.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through">
                    ${book.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => addToCart(book)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                inCart
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700'
              }`}
            >
              {inCart ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Added
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-xl hover:border-amber-500/40 transition-all duration-300 overflow-hidden">
      {/* Cover Image Container */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Link to={`/books/${book.id}`} className="block w-full h-full">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {book.bestseller && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500 text-white shadow-md uppercase tracking-wider">
              Bestseller
            </span>
          )}
          {book.newRelease && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-indigo-600 text-white shadow-md uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        {/* Quick Bookmark Floating Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleBookmark(book.id, book.title);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all shadow-md z-10 ${
            bookmarked
              ? 'bg-amber-500 text-white'
              : 'bg-white/80 dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-300 hover:text-amber-500 hover:bg-white'
          }`}
          title={bookmarked ? 'Remove Bookmark' : 'Bookmark Book'}
        >
          <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Book Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
            {book.category}
          </span>
          <Link to={`/books/${book.id}`}>
            <h3 className="font-editorial text-base font-bold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
              {book.title}
            </h3>
          </Link>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 mb-2 truncate">
            {book.author}
          </p>

          <Rating value={book.rating} reviewsCount={book.reviews} size="sm" />
        </div>

        <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-zinc-900 dark:text-white font-editorial">
              ${book.price.toFixed(2)}
            </span>
            {book.originalPrice && (
              <span className="text-xs text-zinc-400 line-through">
                ${book.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(book)}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
              inCart
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700'
            }`}
            title={inCart ? 'Already in Cart' : 'Add to Shopping Cart'}
          >
            {inCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
