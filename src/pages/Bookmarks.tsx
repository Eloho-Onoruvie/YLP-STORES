import React from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { MOCK_BOOKS } from '../data/books';
import { BookGrid } from '../components/books/BookGrid';
import { EmptyState } from '../components/ui/EmptyState';
import { useBookmarkStore } from '../store/useBookmarkStore';

export const Bookmarks: React.FC = () => {
  const { bookmarkedIds, clearBookmarks } = useBookmarkStore();

  const bookmarkedBooks = MOCK_BOOKS.filter((b) => bookmarkedIds.includes(b.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Saved Reading List
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-1">
            Your Bookmarks
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {bookmarkedBooks.length} book(s) saved for later
          </p>
        </div>

        {bookmarkedBooks.length > 0 && (
          <button
            onClick={clearBookmarks}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear All Bookmarks
          </button>
        )}
      </div>

      {bookmarkedBooks.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="You haven't bookmarked any books yet."
          description="Save books you're interested in reading later by clicking the bookmark icon on any book card."
          actionText="Explore Books"
          actionLink="/books"
        />
      ) : (
        <BookGrid books={bookmarkedBooks} />
      )}
    </div>
  );
};
