export interface Chapter {
  id: string;
  title: string;
  content: string[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  helpfulCount: number;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  authorBio: string;
  authorAvatar?: string;
  description: string;
  longDescription?: string;
  cover: string;
  price: number;
  originalPrice?: number;
  category: string;
  genre: string;
  rating: number;
  reviews: number;
  pages: number;
  publishedDate: string;
  isbn: string;
  publisher?: string;
  language?: string;
  format?: string;
  featured?: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
  popular?: boolean;
  recommended?: boolean;
  badge?: string;
  chapters?: Chapter[];
  customerReviews?: Review[];
}

export interface CartItem {
  id: string;
  book: Book;
  quantity: number;
}

export interface OrderItem {
  bookId: string;
  title: string;
  author: string;
  cover: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'Completed' | 'Processing' | 'Shipped' | 'Cancelled';
  paymentMethod: string;
  shippingAddress: ShippingAddress;
}

export interface PurchasedBook {
  bookId: string;
  purchaseDate: string;
  progress: number; // 0 to 100
  currentChapterIndex: number;
  lastReadDate: string;
  status: 'Currently Reading' | 'Completed' | 'Unread';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  joinedDate: string;
  bio: string;
  favoriteGenres: string[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  genre: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: 'popularity' | 'newest' | 'price-low' | 'price-high' | 'rating';
}

export type ReaderTheme = 'light' | 'sepia' | 'dark';
export type ReaderWidth = 'narrow' | 'normal' | 'wide';
export type ReaderFontSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';

export interface ReaderSettings {
  theme: ReaderTheme;
  fontSize: ReaderFontSize;
  width: ReaderWidth;
  fontFamily: 'serif' | 'sans';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}
