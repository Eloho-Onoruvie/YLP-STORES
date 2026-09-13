import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onActionClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionLink,
  onActionClick
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 ring-8 ring-amber-500/5">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white font-editorial mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">{description}</p>
      {actionText && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-lg shadow-amber-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {actionText}
        </Link>
      )}
      {actionText && !actionLink && onActionClick && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm shadow-lg shadow-amber-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
