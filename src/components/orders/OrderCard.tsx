import React from 'react';
import { ChevronRight } from 'lucide-react';
import type { Order } from '../../types';

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails }) => {
  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'Processing':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Shipped':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'Cancelled':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xs space-y-4 hover:border-amber-500/30 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">Order #{order.id}</span>
          <p className="text-xs text-zinc-400">Placed on {order.date}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusBadge(order.status)}`}>
            {order.status}
          </span>
          <button
            onClick={() => onViewDetails(order)}
            className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Details <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Thumbnails of items */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0 bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-xl border border-zinc-100 dark:border-zinc-800">
            <img src={item.cover} alt={item.title} className="w-10 h-14 object-cover rounded-lg" />
            <div className="max-w-[140px]">
              <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">{item.title}</p>
              <p className="text-[10px] text-zinc-500">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
        <span>{order.itemCount} item(s)</span>
        <span className="text-base font-bold text-zinc-900 dark:text-white font-editorial">
          Total: ${order.total.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
