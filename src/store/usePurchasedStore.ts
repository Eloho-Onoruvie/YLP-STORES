import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Order, PurchasedBook } from '../types';
import { useToastStore } from './useToastStore';

interface PurchasedStore {
  orders: Order[];
  purchasedBooks: Record<string, PurchasedBook>;
  addOrder: (order: Order) => void;
  updateReadingProgress: (bookId: string, chapterIndex: number, progress: number) => void;
  getPurchasedBook: (bookId: string) => PurchasedBook | undefined;
  getOrderById: (orderId: string) => Order | undefined;
  isBookPurchased: (bookId: string) => boolean;
}

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-98421',
    date: '2024-03-28',
    items: [
      {
        bookId: 'book-1',
        title: 'The Echoes of Eternity',
        author: 'Elena Vance',
        cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
        price: 24.99,
        quantity: 1
      },
      {
        bookId: 'book-3',
        title: 'The Sovereign Mind',
        author: 'Julian Mercer',
        cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80',
        price: 21.50,
        quantity: 1
      }
    ],
    itemCount: 2,
    subtotal: 46.49,
    discount: 9.30,
    shipping: 0,
    tax: 0,
    total: 37.19,
    status: 'Completed',
    paymentMethod: 'Credit Card (•••• 4242)',
    shippingAddress: {
      fullName: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'United States'
    }
  },
  {
    id: 'ORD-87105',
    date: '2024-02-14',
    items: [
      {
        bookId: 'book-2',
        title: 'Quantum Horizon',
        author: 'Dr. Aris Thorne',
        cover: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&auto=format&fit=crop&q=80',
        price: 19.99,
        quantity: 1
      }
    ],
    itemCount: 1,
    subtotal: 19.99,
    discount: 0,
    shipping: 0,
    tax: 0,
    total: 19.99,
    status: 'Completed',
    paymentMethod: 'Apple Pay',
    shippingAddress: {
      fullName: 'Eleanor Vance',
      email: 'eleanor.vance@example.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'United States'
    }
  }
];

const INITIAL_PURCHASED: Record<string, PurchasedBook> = {
  'book-1': {
    bookId: 'book-1',
    purchaseDate: '2024-03-28',
    progress: 45,
    currentChapterIndex: 1,
    lastReadDate: 'Yesterday',
    status: 'Currently Reading'
  },
  'book-3': {
    bookId: 'book-3',
    purchaseDate: '2024-03-28',
    progress: 100,
    currentChapterIndex: 1,
    lastReadDate: '3 days ago',
    status: 'Completed'
  },
  'book-2': {
    bookId: 'book-2',
    purchaseDate: '2024-02-14',
    progress: 15,
    currentChapterIndex: 0,
    lastReadDate: 'Last week',
    status: 'Currently Reading'
  }
};

export const usePurchasedStore = create<PurchasedStore>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,
      purchasedBooks: INITIAL_PURCHASED,

      addOrder: (order) => {
        set((state) => {
          const newPurchased = { ...state.purchasedBooks };
          const todayStr = new Date().toISOString().split('T')[0];

          order.items.forEach((item) => {
            if (!newPurchased[item.bookId]) {
              newPurchased[item.bookId] = {
                bookId: item.bookId,
                purchaseDate: todayStr,
                progress: 0,
                currentChapterIndex: 0,
                lastReadDate: 'Just purchased',
                status: 'Unread'
              };
            }
          });

          return {
            orders: [order, ...state.orders],
            purchasedBooks: newPurchased
          };
        });
        useToastStore.getState().addToast('Order placed successfully! Added to your library.', 'success');
      },

      updateReadingProgress: (bookId, chapterIndex, progress) => {
        set((state) => {
          const existing = state.purchasedBooks[bookId];
          const newStatus = progress >= 100 ? 'Completed' : progress > 0 ? 'Currently Reading' : 'Unread';
          
          return {
            purchasedBooks: {
              ...state.purchasedBooks,
              [bookId]: {
                bookId,
                purchaseDate: existing?.purchaseDate || new Date().toISOString().split('T')[0],
                progress: Math.min(100, Math.max(0, progress)),
                currentChapterIndex: chapterIndex,
                lastReadDate: 'Just now',
                status: newStatus
              }
            }
          };
        });
      },

      getPurchasedBook: (bookId) => get().purchasedBooks[bookId],
      getOrderById: (orderId) => get().orders.find((o) => o.id === orderId),
      isBookPurchased: (bookId) => !!get().purchasedBooks[bookId]
    }),
    {
      name: 'lumina-purchased-storage'
    }
  )
);
