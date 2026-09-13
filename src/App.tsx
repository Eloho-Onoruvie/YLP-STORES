import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/ui/Toast';

import { Home } from './pages/Home';
import { Books } from './pages/Books';
import { BookDetails } from './pages/BookDetails';
import { Bookmarks } from './pages/Bookmarks';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { PurchaseSuccess } from './pages/PurchaseSuccess';
import { MyBooks } from './pages/MyBooks';
import { Reading } from './pages/Reading';
import { Orders } from './pages/Orders';
import { Profile } from './pages/Profile';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LayoutWrapper() {
  const location = useLocation();
  const isReaderPage = location.pathname.startsWith('/read/');

  if (isReaderPage) {
    return (
      <main className="min-h-screen">
        <ScrollToTop />
        <Routes>
          <Route path="/read/:bookId" element={<Reading />} />
        </Routes>
        <ToastContainer />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors selection:bg-amber-500 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/categories/:category" element={<Books />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/purchase-success" element={<PurchaseSuccess />} />
          <Route path="/my-books" element={<MyBooks />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
      <Footer />
      <MobileNav />
      <ToastContainer />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
