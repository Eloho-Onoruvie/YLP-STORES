import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export const OrdersPage: React.FC = () => {
  const { orders } = useShop();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Shipped':
        return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'Processing':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-200">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        
        <div className="border-b border-sky-100 pb-6 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <span>📦 Order History</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-slate-900">
            My Orders
          </h1>
          <p className="text-xs text-slate-500">Track and view all your previous and current YLP store purchases.</p>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-editorial text-lg font-bold text-slate-900">
                        Order #{order.orderNumber}
                      </span>
                      <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Placed on {order.date}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right sm:text-right">
                      <p className="text-xs text-slate-400">Total Amount</p>
                      <p className="text-base font-extrabold text-slate-900">${order.total.toFixed(2)}</p>
                    </div>
                    <Link
                      to={`/orders/${order.id}`}
                      className="px-4 py-2 rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-500 hover:text-white text-xs font-bold transition-all"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-2xl border border-slate-100 flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 truncate max-w-[140px]">{item.product.name}</p>
                        <p className="text-[11px] text-slate-400">Qty: {item.quantity} • ${item.product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* EMPTY ORDERS STATE */
          <div className="text-center py-20 rounded-3xl bg-white border border-slate-200/80 p-8 space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mx-auto text-2xl">
              📦
            </div>
            <h2 className="font-editorial text-2xl font-bold text-slate-900">No Orders Yet 🤍</h2>
            <p className="text-xs text-slate-500">You haven't placed any orders yet. Find tools to inspire your daily walk.</p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 rounded-full bg-sky-500 text-white font-bold text-xs"
            >
              Start Shopping
            </Link>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default OrdersPage;
