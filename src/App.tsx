import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import CustomerDashboard from "./pages/customers/dashboard";

function App() {
  return (
    <div className="min-h-screen bg-[#FFFDF8] text-slate-900 antialiased selection:bg-sky-200">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customers/dashboard" element={<CustomerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
