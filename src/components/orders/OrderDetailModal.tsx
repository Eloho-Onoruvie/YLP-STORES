import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import type { Order } from '../../types';
import { CheckCircle2, CreditCard, MapPin, BookOpen } from 'lucide-react';

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order Receipt #${order.id}`} maxWidth="lg">
      <div className="space-y-6">
        {/* Status header */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider block">Status</span>
              <span className="font-semibold text-sm">{order.status}</span>
            </div>
          </div>
          <span className="text-xs font-mono">{order.date}</span>
        </div>

        {/* Purchased Books List */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
            Purchased Books
          </h4>
          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <img src={item.cover} alt={item.title} className="w-12 h-16 object-cover rounded-lg" />
                  <div>
                    <h5 className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1">{item.title}</h5>
                    <p className="text-xs text-zinc-500">by {item.author}</p>
                    <p className="text-xs text-zinc-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white font-editorial">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <Link
                    to={`/read/${item.bookId}`}
                    onClick={onClose}
                    className="flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline mt-1"
                  >
                    <BookOpen className="w-3 h-3" /> Read Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer & Payment Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 space-y-1">
            <h5 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 mb-2">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> Customer Information
            </h5>
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">{order.shippingAddress.fullName}</p>
            <p className="text-zinc-500">{order.shippingAddress.email}</p>
            <p className="text-zinc-500">{order.shippingAddress.phone}</p>
            <p className="text-zinc-500">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 space-y-1">
            <h5 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 mb-2">
              <CreditCard className="w-3.5 h-3.5 text-amber-500" /> Payment Details
            </h5>
            <p className="text-zinc-700 dark:text-zinc-300 font-semibold">{order.paymentMethod}</p>
            <div className="pt-2 space-y-1 text-zinc-500">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Discount:</span>
                  <span>-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-zinc-200 dark:border-zinc-700 font-bold text-zinc-900 dark:text-white text-sm">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
