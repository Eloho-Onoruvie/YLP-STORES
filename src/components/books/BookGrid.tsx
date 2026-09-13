import React from 'react';
import type { Book } from '../../types';
import { BookCard } from './BookCard';
import { EmptyState } from '../ui/EmptyState';
import { SearchX } from 'lucide-react';

interface BookGridProps {
  books: Book[];
  layout?: 'grid' | 'list';
  emptyMessage?: string;
  onResetFilters?: () => void;
}

export const BookGrid: React.FC<BookGridProps> = ({
  books,
  layout = 'grid',
  emptyMessage = 'No books match your current filters or search terms.',
  onResetFilters
}) => {
  if (books.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No books found"
        description={emptyMessage}
        actionText={onResetFilters ? 'Clear All Filters' : 'Explore All Books'}
        onActionClick={onResetFilters}
        actionLink={!onResetFilters ? '/books' : undefined}
      />
    );
  }

  if (layout === 'list') {
    return (
      <div className="flex flex-col gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} layout="grid" />
      ))}
    </div>
  );
};
