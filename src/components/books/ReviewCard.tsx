import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import type { Review } from '../../types';
import { Rating } from '../ui/Rating';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHelpfulCount((c) => c + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">
            {review.userAvatar ? (
              <img src={review.userAvatar} alt={review.userName} className="w-full h-full rounded-full object-cover" />
            ) : (
              review.userName.charAt(0)
            )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{review.userName}</h4>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{review.date}</span>
          </div>
        </div>
        <Rating value={review.rating} showText={false} size="sm" />
      </div>

      <h5 className="font-editorial text-base font-semibold text-zinc-900 dark:text-white">
        {review.title}
      </h5>
      <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
        {review.comment}
      </p>

      <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
        <button
          onClick={handleHelpfulClick}
          disabled={hasVoted}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-colors ${
            hasVoted
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-semibold'
              : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>Helpful ({helpfulCount})</span>
        </button>
        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">✓ Verified Purchase</span>
      </div>
    </div>
  );
};
