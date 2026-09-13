import { create } from 'zustand';
import type { Book, FilterState } from '../types';
import { MOCK_BOOKS } from '../data/books';

interface BookStore {
  books: Book[];
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setGenre: (genre: string) => void;
  setPriceRange: (min: number, max: number) => void;
  setMinRating: (rating: number) => void;
  setSortBy: (sort: FilterState['sortBy']) => void;
  resetFilters: () => void;
  getFilteredBooks: () => Book[];
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'all',
  genre: 'all',
  minPrice: 0,
  maxPrice: 60,
  minRating: 0,
  sortBy: 'popularity'
};

export const useBookStore = create<BookStore>((set, get) => ({
  books: MOCK_BOOKS,
  filters: DEFAULT_FILTERS,

  setSearchQuery: (searchQuery) =>
    set((state) => ({ filters: { ...state.filters, searchQuery } })),

  setCategory: (category) =>
    set((state) => ({ filters: { ...state.filters, category, genre: 'all' } })),

  setGenre: (genre) =>
    set((state) => ({ filters: { ...state.filters, genre } })),

  setPriceRange: (minPrice, maxPrice) =>
    set((state) => ({ filters: { ...state.filters, minPrice, maxPrice } })),

  setMinRating: (minRating) =>
    set((state) => ({ filters: { ...state.filters, minRating } })),

  setSortBy: (sortBy) =>
    set((state) => ({ filters: { ...state.filters, sortBy } })),

  resetFilters: () => set({ filters: DEFAULT_FILTERS }),

  getFilteredBooks: () => {
    const { books, filters } = get();
    return books
      .filter((book) => {
        // Search Filter
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchesTitle = book.title.toLowerCase().includes(q);
          const matchesAuthor = book.author.toLowerCase().includes(q);
          const matchesCategory = book.category.toLowerCase().includes(q);
          const matchesGenre = book.genre.toLowerCase().includes(q);
          const matchesIsbn = book.isbn.toLowerCase().includes(q);
          if (!matchesTitle && !matchesAuthor && !matchesCategory && !matchesGenre && !matchesIsbn) {
            return false;
          }
        }

        // Category Filter
        if (filters.category !== 'all' && filters.category.toLowerCase() !== book.category.toLowerCase()) {
          // Normalize slug match e.g. "science-fiction" vs "Science Fiction"
          const slugCategory = book.category.toLowerCase().replace(/\s+/g, '-');
          const slugFilter = filters.category.toLowerCase().replace(/\s+/g, '-');
          if (slugCategory !== slugFilter && book.category.toLowerCase() !== filters.category.toLowerCase()) {
            return false;
          }
        }

        // Genre Filter
        if (filters.genre !== 'all' && book.genre.toLowerCase() !== filters.genre.toLowerCase()) {
          return false;
        }

        // Price Filter
        if (book.price < filters.minPrice || book.price > filters.maxPrice) {
          return false;
        }

        // Rating Filter
        if (book.rating < filters.minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'popularity') {
          return (b.reviews || 0) - (a.reviews || 0);
        }
        if (filters.sortBy === 'newest') {
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        }
        if (filters.sortBy === 'price-low') {
          return a.price - b.price;
        }
        if (filters.sortBy === 'price-high') {
          return b.price - a.price;
        }
        if (filters.sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return 0;
      });
  }
}));
