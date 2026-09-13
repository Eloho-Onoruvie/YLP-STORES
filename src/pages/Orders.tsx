import React, { useState } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { usePurchasedStore } from '../store/usePurchasedStore';
import { OrderCard } from '../components/orders/OrderCard';
import { OrderDetailModal } from '../components/orders/OrderDetailModal';
import { EmptyState } from '../components/ui/EmptyState';
import type { Order } from '../types';

export const Orders: React.FC = () => {
  const { orders } = usePurchasedStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter((o) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchId = o.id.toLowerCase().includes(q);
    const matchItem = o.items.some((i) => i.title.toLowerCase().includes(q) || i.author.toLowerCase().includes(q));
    return matchId || matchItem;
  });

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Purchases & Invoices
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-1">
            Order History
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {orders.length} past order(s) recorded in your account
          </p>
        </div>

        {orders.length > 0 && (
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-amber-500 focus:outline-hidden"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
          </div>
        )}
      </div>

      {filteredOrders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders found"
          description={
            orders.length === 0
              ? "You haven't placed any book orders yet. Explore our bookstore to make your first purchase."
              : "No orders match your search criteria."
          }
          actionText={orders.length === 0 ? 'Explore Books' : undefined}
          actionLink="/books"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
