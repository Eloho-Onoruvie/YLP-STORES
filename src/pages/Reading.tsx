import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { MOCK_BOOKS } from '../data/books';
import { usePurchasedStore } from '../store/usePurchasedStore';
import { useBookmarkStore } from '../store/useBookmarkStore';
import { ReaderControls } from '../components/reader/ReaderControls';
import type { ReaderSettings } from '../types';

export const Reading: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();

  const book = MOCK_BOOKS.find((b) => b.id === bookId);
  const { getPurchasedBook, updateReadingProgress } = usePurchasedStore();
  const { isBookmarked, toggleBookmark } = useBookmarkStore();

  const purchasedData = bookId ? getPurchasedBook(bookId) : undefined;

  const [currentChapterIdx, setCurrentChapterIdx] = useState(
    purchasedData?.currentChapterIndex || 0
  );
  const [showControls, setShowControls] = useState(false);

  const [readerSettings, setReaderSettings] = useState<ReaderSettings>({
    theme: 'sepia',
    fontSize: 'lg',
    width: 'normal',
    fontFamily: 'serif'
  });

  const chapters = book?.chapters || [
    {
      id: 'c1',
      title: 'Chapter 1: The Beginning',
      content: [
        'The morning light streamed through the stained glass windows, illuminating decades of collected dust atop mahogany bookracks.',
        'Every book held a secret, but this ledger held a destiny. Clara stepped closer to the reading desk, taking a deep breath of aged parchment and cedar.',
        'As she reached for the silver binding, a soft hum echoed through the silent sanctuary.'
      ]
    },
    {
      id: 'c2',
      title: 'Chapter 2: The Hidden Portal',
      content: [
        'Behind the third bookcase in the manuscript wing stood a narrow archway concealed by dark damask velvet.',
        'She pressed her palm against the cold granite keystones. A soft click vibrated through the floorboards as a secret spiral staircase emerged.'
      ]
    }
  ];

  const currentChapter = chapters[currentChapterIdx] || chapters[0];
  const progressPercent = Math.round(((currentChapterIdx + 1) / chapters.length) * 100);

  useEffect(() => {
    if (bookId) {
      updateReadingProgress(bookId, currentChapterIdx, progressPercent);
    }
  }, [bookId, currentChapterIdx, progressPercent]);

  if (!book) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-editorial text-2xl font-bold">Book Not Found</h2>
        <Link to="/my-books" className="text-amber-600 underline text-sm mt-2 inline-block">
          Return to My Library
        </Link>
      </div>
    );
  }

  const bookmarked = isBookmarked(book.id);

  const themeStyles = {
    light: 'bg-white text-zinc-900',
    sepia: 'bg-[#FBF0D9] text-[#2C221E]',
    dark: 'bg-zinc-950 text-zinc-200'
  };

  const fontSizeStyles = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
    '2xl': 'text-2xl leading-loose'
  };

  const widthStyles = {
    narrow: 'max-w-xl',
    normal: 'max-w-2xl',
    wide: 'max-w-4xl'
  };

  const handleUpdateSettings = (newSet: Partial<ReaderSettings>) => {
    setReaderSettings((prev) => ({ ...prev, ...newSet }));
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between transition-colors duration-300 ${themeStyles[readerSettings.theme]}`}>
      {/* Top Header Controls Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/5 dark:bg-white/5 border-b border-black/10 dark:border-white/10 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/my-books"
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title="Return to Library"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="font-editorial text-sm font-bold truncate max-w-[200px] sm:max-w-xs">{book.title}</h2>
            <p className="text-[11px] opacity-70 truncate">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleBookmark(book.id, book.title)}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            title={bookmarked ? 'Remove Bookmark' : 'Bookmark Page'}
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current text-amber-500' : ''}`} />
          </button>
          <button
            onClick={() => setShowControls(!showControls)}
            className={`p-2 rounded-xl transition-colors ${
              showControls ? 'bg-amber-500 text-white' : 'hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            title="Reader Display Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Reader Display Overlay Settings Panel */}
      {showControls && (
        <div className="fixed top-16 right-4 sm:right-8 z-50 max-w-xs w-full animate-in fade-in zoom-in-95">
          <ReaderControls settings={readerSettings} onUpdateSettings={handleUpdateSettings} />
        </div>
      )}

      {/* Main Distraction-Free Reader Document Area */}
      <main className={`flex-1 mx-auto px-6 py-12 ${widthStyles[readerSettings.width]} space-y-8`}>
        {/* Chapter Title */}
        <div className="text-center space-y-2 pb-6 border-b border-black/10 dark:border-white/10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            {book.category}
          </span>
          <h1 className="font-editorial text-2xl sm:text-3xl font-bold">{currentChapter.title}</h1>
        </div>

        {/* Chapter Text Content */}
        <article
          className={`space-y-6 ${fontSizeStyles[readerSettings.fontSize]} ${
            readerSettings.fontFamily === 'serif' ? 'font-editorial' : 'font-sans'
          }`}
        >
          {currentChapter.content.map((paragraph, pIdx) => (
            <p key={pIdx} className="indent-6 text-justify">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Chapter Navigation Controls */}
        <div className="pt-12 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          <button
            onClick={() => setCurrentChapterIdx((i) => Math.max(0, i - 1))}
            disabled={currentChapterIdx === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs border border-black/10 dark:border-white/10 disabled:opacity-30 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Previous Chapter
          </button>

          <span className="text-xs opacity-70 font-mono">
            {currentChapterIdx + 1} / {chapters.length}
          </span>

          <button
            onClick={() => setCurrentChapterIdx((i) => Math.min(chapters.length - 1, i + 1))}
            disabled={currentChapterIdx === chapters.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-600 text-white disabled:opacity-30 hover:bg-amber-700 transition-colors shadow-md"
          >
            Next Chapter <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Reader Bottom Progress Bar */}
      <footer className="sticky bottom-0 z-40 backdrop-blur-md bg-black/5 dark:bg-white/5 border-t border-black/10 dark:border-white/10 px-4 sm:px-8 py-2">
        <div className="max-w-4xl mx-auto flex items-center gap-4 text-xs">
          <div className="flex-1 h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="font-bold opacity-80 shrink-0">{progressPercent}% Read</span>
        </div>
      </footer>
    </div>
  );
};
