import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Library, BookOpen, Search } from 'lucide-react';
import { usePurchasedStore } from '../store/usePurchasedStore';
import { MOCK_BOOKS } from '../data/books';
import { EmptyState } from '../components/ui/EmptyState';

export const MyBooks: React.FC = () => {
  const { purchasedBooks } = usePurchasedStore();
  const [filterTab, setFilterTab] = useState<'All' | 'Currently Reading' | 'Completed'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const purchasedList = Object.values(purchasedBooks);

  const booksWithDetails = purchasedList
    .map((item) => {
      const bookData = MOCK_BOOKS.find((b) => b.id === item.bookId);
      return { ...item, book: bookData };
    })
    .filter((item): item is typeof item & { book: NonNullable<typeof item.book> } => item.book !== undefined);

  const filteredBooks = booksWithDetails.filter((item) => {
    if (filterTab === 'Currently Reading' && item.status !== 'Currently Reading') return false;
    if (filterTab === 'Completed' && item.status !== 'Completed') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.book.title.toLowerCase().includes(q);
      const matchAuthor = item.book.author.toLowerCase().includes(q);
      return matchTitle || matchAuthor;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Personal Library
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-1">
            My Purchased Books
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {booksWithDetails.length} digital book(s) in your collection
          </p>
        </div>

        {/* Search within library */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search my library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:outline-hidden"
          />
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        {(['All', 'Currently Reading', 'Completed'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterTab === tab
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Library Grid */}
      {filteredBooks.length === 0 ? (
        <EmptyState
          icon={Library}
          title="No books found in this view"
          description={
            purchasedList.length === 0
              ? "You haven't purchased any digital books yet. Browse our store to build your personal library."
              : "No books match your selected status filter."
          }
          actionText={purchasedList.length === 0 ? 'Browse Bookstore' : undefined}
          actionLink="/books"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((item) => (
            <div
              key={item.bookId}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex gap-4">
                <Link to={`/books/${item.book.id}`} className="shrink-0 w-24 h-32 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <img src={item.book.cover} alt={item.book.title} className="w-full h-full object-cover" />
                </Link>

                <div className="space-y-1 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {item.book.category}
                  </span>
                  <Link to={`/books/${item.book.id}`}>
                    <h3 className="font-editorial text-base font-bold text-zinc-900 dark:text-white line-clamp-1 hover:text-amber-600">
                      {item.book.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-zinc-500 truncate">by {item.book.author}</p>

                  <div className="pt-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
                      <span>Progress</span>
                      <span className="font-bold text-zinc-900 dark:text-white">{item.progress}%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-zinc-400 text-[11px]">Last read: {item.lastReadDate}</span>
                <Link
                  to={`/read/${item.book.id}`}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold flex items-center gap-1.5 shadow-md shadow-amber-600/20 transition-transform hover:scale-105"
                >
                  <BookOpen className="w-4 h-4" /> Continue Reading
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
