import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Book, CartItem } from '../types';
import { useToastStore } from './useToastStore';
import { MOCK_BOOKS } from '../data/books';

interface CartStore {
  cart: CartItem[];
  promoCode: string | null;
  discountPercentage: number;
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [
        { id: 'cart-1', book: MOCK_BOOKS[0], quantity: 1 },
        { id: 'cart-2', book: MOCK_BOOKS[2], quantity: 1 }
      ],
      promoCode: 'READ20',
      discountPercentage: 20,

      addToCart: (book, quantity = 1) => {
        const existingIndex = get().cart.findIndex((item) => item.book.id === book.id);
        if (existingIndex > -1) {
          const updatedCart = [...get().cart];
          updatedCart[existingIndex].quantity += quantity;
          set({ cart: updatedCart });
          useToastStore.getState().addToast(`Updated "${book.title}" quantity in cart`, 'success');
        } else {
          set((state) => ({
            cart: [...state.cart, { id: `cart-${Date.now()}`, book, quantity }]
          }));
          useToastStore.getState().addToast(`"${book.title}" added to cart`, 'success');
        }
      },

      removeFromCart: (bookId) => {
        const item = get().cart.find((i) => i.book.id === bookId);
        set((state) => ({
          cart: state.cart.filter((i) => i.book.id !== bookId)
        }));
        useToastStore.getState().addToast(
          item ? `"${item.book.title}" removed from cart` : 'Item removed from cart',
          'info'
        );
      },

      updateQuantity: (bookId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(bookId);
          return;
        }
        set((state) => ({
          cart: state.cart.map((item) =>
            item.book.id === bookId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ cart: [] }),

      applyPromoCode: (code) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'READ20' || cleanCode === 'BOOKWORM') {
          set({ promoCode: cleanCode, discountPercentage: 20 });
          useToastStore.getState().addToast('Promo code READ20 applied! 20% discount added.', 'success');
          return true;
        } else if (cleanCode === 'WELCOME10') {
          set({ promoCode: cleanCode, discountPercentage: 10 });
          useToastStore.getState().addToast('Promo code WELCOME10 applied! 10% discount added.', 'success');
          return true;
        }
        useToastStore.getState().addToast('Invalid promo code. Try READ20', 'error');
        return false;
      },

      removePromoCode: () => {
        set({ promoCode: null, discountPercentage: 0 });
        useToastStore.getState().addToast('Promo code removed', 'info');
      },

      getSubtotal: () => {
        return get().cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discountPercentage) / 100;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        return Math.max(0, subtotal - discount);
      },

      getItemCount: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      }
    }),
    {
      name: 'lumina-cart-storage'
    }
  )
);
