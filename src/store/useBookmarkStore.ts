import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useToastStore } from './useToastStore';

interface BookmarkStore {
  bookmarkedIds: string[];
  toggleBookmark: (bookId: string, bookTitle?: string) => void;
  isBookmarked: (bookId: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarkedIds: ['book-1', 'book-3', 'book-7', 'book-11'],
      toggleBookmark: (bookId, bookTitle) => {
        const isSaved = get().bookmarkedIds.includes(bookId);
        if (isSaved) {
          set((state) => ({
            bookmarkedIds: state.bookmarkedIds.filter((id) => id !== bookId)
          }));
          useToastStore.getState().addToast(
            bookTitle ? `"${bookTitle}" removed from bookmarks` : 'Book removed from bookmarks',
            'info'
          );
        } else {
          set((state) => ({
            bookmarkedIds: [...state.bookmarkedIds, bookId]
          }));
          useToastStore.getState().addToast(
            bookTitle ? `"${bookTitle}" added to bookmarks` : 'Book added to your bookmarks',
            'success'
          );
        }
      },
      isBookmarked: (bookId) => get().bookmarkedIds.includes(bookId),
      clearBookmarks: () => set({ bookmarkedIds: [] })
    }),
    {
      name: 'lumina-bookmark-storage'
    }
  )
);
