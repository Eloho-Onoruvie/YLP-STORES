import { Routes, Route } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";

// Public Pages
import LandingPage from "./pages/landingPage";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";

// Customer Dashboard (existing monolithic page)
import CustomerDashboard from "./pages/customers/dashboard";

// New authenticated pages
import { ShopPage } from "./pages/shop";
import { CartPage } from "./pages/Cart";
import { CheckoutPage } from "./pages/checkout";
import { OrdersPage } from "./pages/Orders";
import WishlistPage from "./pages/Wishlist";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import AddressesPage from "./pages/Addresses";
import SearchPage from "./pages/Search";
import { ProductDetailsPage } from "./pages/ProductDetails";


function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#FFFDF8] text-slate-900 antialiased selection:bg-sky-200">
        <Routes>
          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Customer Dashboard (existing) */}
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customers/dashboard" element={<CustomerDashboard />} />

          {/* Authenticated Pages */}
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/addresses" element={<AddressesPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </ShopProvider>
  );
}

export default App;
