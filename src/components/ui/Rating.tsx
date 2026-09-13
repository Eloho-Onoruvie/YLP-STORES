import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  value: number;
  max?: number;
  showText?: boolean;
  reviewsCount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  showText = true,
  reviewsCount,
  size = 'sm'
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5 text-amber-500">
        {Array.from({ length: max }).map((_, i) => {
          const filled = i + 1 <= Math.floor(value);
          const half = !filled && i < value;

          return (
            <Star
              key={i}
              className={`${iconSizes[size]} ${
                filled
                  ? 'fill-amber-500 text-amber-500'
                  : half
                  ? 'fill-amber-500/50 text-amber-500'
                  : 'text-zinc-300 dark:text-zinc-700'
              }`}
            />
          );
        })}
      </div>
      {showText && (
        <span className={`font-semibold text-zinc-800 dark:text-zinc-200 ${textSizes[size]}`}>
          {value.toFixed(1)}
        </span>
      )}
      {reviewsCount !== undefined && (
        <span className={`text-zinc-500 dark:text-zinc-400 ${textSizes[size]}`}>
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
