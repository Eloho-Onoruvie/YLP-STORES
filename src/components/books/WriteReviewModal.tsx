import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { useToastStore } from '../../store/useToastStore';
import { useAuthStore } from '../../store/useAuthStore';
import type { Review } from '../../types';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  onAddReview: (review: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  bookTitle,
  onAddReview
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const { user } = useAuthStore();
  const addToast = useToastStore((s) => s.addToast);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !comment.trim()) {
      addToast('Please provide both a title and review content', 'error');
      return;
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      userName: user?.name || 'Anonymous Reader',
      userAvatar: user?.avatar,
      rating,
      date: new Date().toISOString().split('T')[0],
      title: title.trim(),
      comment: comment.trim(),
      helpfulCount: 0
    };

    onAddReview(newReview);
    addToast('Thank you! Your customer review has been posted.', 'success');
    setTitle('');
    setComment('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Review "${bookTitle}"`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Star Rating Select */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
            Your Rating
          </label>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1 text-amber-500 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-7 h-7 ${
                    (hoverRating || rating) >= star
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-zinc-300 dark:text-zinc-700'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 font-bold text-sm text-zinc-700 dark:text-zinc-300">
              {hoverRating || rating} / 5 Stars
            </span>
          </div>
        </div>

        {/* Headline / Title */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            Headline
          </label>
          <input
            type="text"
            placeholder="e.g., An unputdownable masterpiece!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm focus:border-amber-500 focus:outline-hidden"
          />
        </div>

        {/* Comment Text */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            Detailed Review
          </label>
          <textarea
            rows={4}
            placeholder="What did you love or dislike about this book? How was the writing style and pacing?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm focus:border-amber-500 focus:outline-hidden"
          />
        </div>

        <div className="pt-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-md"
          >
            Submit Review
          </button>
        </div>
      </form>
    </Modal>
  );
};
