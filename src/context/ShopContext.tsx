import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PRODUCTS } from '../data/products';
import { getCurrentUser } from '../utils/authStorage';

export interface CartItem {
  product: any;
  quantity: number;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  deliveryAddress: Address;
  paymentMethod: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface UserSettings {
  emailNotifications: boolean;
  orderNotifications: boolean;
  marketingConsent: boolean;
}

interface ShopContextType {
  products: any[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  addresses: Address[];
  profile: UserProfile;
  settings: UserSettings;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  addToCart: (product: any[], quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  placeOrder: (shippingAddress: Address, paymentMethod: string) => Order;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, addr: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  cartSubtotal: number;
  cartItemCount: number;
  cartTotal: number;
  shippingFee: number;
}

const DEFAULT_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'Home Address',
    street: '742 Evergreen Terrace',
    city: 'Seattle',
    state: 'WA',
    postalCode: '98101',
    country: 'United States',
    phone: '+1 (555) 234-5678',
    isDefault: true
  }
];

const DEFAULT_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'YLP-89210',
    date: '2026-09-02',
    items: [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[1], quantity: 1 }
    ],
    subtotal: 52.00,
    shippingFee: 0,
    total: 52.00,
    status: 'Delivered',
    paymentStatus: 'Paid',
    deliveryAddress: DEFAULT_ADDRESSES[0],
    paymentMethod: 'Credit Card (**** 4242)'
  },
  {
    id: 'ord-1002',
    orderNumber: 'YLP-94102',
    date: '2026-09-10',
    items: [
      { product: PRODUCTS[2], quantity: 1 }
    ],
    subtotal: 55.00,
    shippingFee: 5.00,
    total: 60.00,
    status: 'Shipped',
    paymentStatus: 'Paid',
    deliveryAddress: DEFAULT_ADDRESSES[0],
    paymentMethod: 'Credit Card (**** 4242)'
  }
];

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const currentUser = getCurrentUser();

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ylp_cart');
      return saved ? JSON.parse(saved) : [{ product: PRODUCTS[0], quantity: 1 }];
    } catch {
      return [{ product: PRODUCTS[0], quantity: 1 }];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ylp_wishlist');
      return saved ? JSON.parse(saved) : ['my-growth-journal', 'abide-in-him-cards'];
    } catch {
      return ['my-growth-journal', 'abide-in-him-cards'];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ylp_orders');
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch {
      return DEFAULT_ORDERS;
    }
  });

  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem('ylp_addresses');
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [profile, setProfile] = useState<UserProfile>(() => ({
    name: currentUser?.name || 'Yesha M.',
    email: currentUser?.email || 'yesha@example.com',
    phone: '+1 (555) 891-2345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  }));

  const [settings, setSettings] = useState<UserSettings>(() => ({
    emailNotifications: true,
    orderNotifications: true,
    marketingConsent: true
  }));

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem('ylp_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ylp_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ylp_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ylp_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your cart 🤍`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = PRODUCTS.find((p) => p.id === productId);
        showToast(`Saved "${prod?.name || 'Item'}" to your wishlist 🤍`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = cartSubtotal >= 50 || cartSubtotal === 0 ? 0 : 5.00;
  const cartTotal = cartSubtotal + shippingFee;
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = (shippingAddress: Address, paymentMethod: string): Order => {
    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: 'YLP-' + Math.floor(10000 + Math.random() * 90000),
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal: cartSubtotal,
      shippingFee,
      total: cartTotal,
      status: 'Processing',
      paymentStatus: 'Paid',
      deliveryAddress: shippingAddress,
      paymentMethod
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order #${newOrder.orderNumber} placed successfully! 🤍`, 'success');
    return newOrder;
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profile information updated', 'success');
  };

  const addAddress = (addr: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addr,
      id: 'addr-' + Date.now()
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })));
    }
    setAddresses((prev) => [...prev, newAddr]);
    showToast('New address saved', 'success');
  };

  const updateAddress = (id: string, addr: Partial<Address>) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const updated = { ...a, ...addr };
          return updated;
        }
        if (addr.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      })
    );
    showToast('Address updated', 'success');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    showToast('Address deleted', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id
      }))
    );
    showToast('Default address updated', 'success');
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Preferences updated', 'success');
  };

  return (
    <ShopContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        wishlist,
        orders,
        addresses,
        profile,
        settings,
        toast,
        showToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        updateProfile,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        updateSettings,
        cartSubtotal,
        cartItemCount,
        cartTotal,
        shippingFee
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
