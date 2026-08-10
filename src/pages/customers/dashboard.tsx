import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/sidebar";

// Inline Icon Components for self-contained zero-dependency rendering
const IconBookOpen = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconShoppingBag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const IconHeart = ({ className = "w-5 h-5", fill = "none" }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const IconUser = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconSparkles = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const IconQuote = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconMenu = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const IconPackage = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const IconCross = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10.5 2h3v6h6v3h-6v11h-3V11h-6V8h6V2z" />
  </svg>
);

const IconInstagram = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const IconTikTok = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c0 1.53-.33 3.04-1.07 4.36-.88 1.58-2.29 2.8-3.97 3.39-1.89.67-4 .51-5.78-.39-1.78-.89-3.08-2.52-3.58-4.44-.52-1.95-.14-4.04.99-5.69 1.13-1.65 2.91-2.73 4.88-3.01.62-.09 1.25-.08 1.87 0v4.06c-.46-.08-.94-.06-1.39.04-.95.21-1.78.8-2.22 1.65-.44.85-.45 1.87-.03 2.73.42.86 1.23 1.47 2.17 1.63 1.05.18 2.13-.17 2.87-.93.74-.76 1.09-1.83 1.06-2.91V.02z" />
  </svg>
);

const IconFacebook = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
  </svg>
);

interface OrderItem {
  id: string;
  name: string;
  orderNumber: string;
  date: string;
  qty: number;
  price: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  imageBg: string;
  type: string;
}

interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: string;
  badge?: string;
  badgeBg?: string;
  imageBg: string;
  isWishlisted: boolean;
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [emptyResourcesState, setEmptyResourcesState] = useState(false);
  const [emptyOrdersState, setEmptyOrdersState] = useState(false);
  const [emptyWishlistState, setEmptyWishlistState] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [orders] = useState<OrderItem[]>([
    {
      id: "ord-1",
      name: "My Growth Journal",
      orderNumber: "#YLP-00124",
      date: "August 5, 2026",
      qty: 1,
      price: "₦7,500",
      status: "Delivered",
      imageBg: "from-sky-100 to-indigo-100/60",
      type: "Guided Journal",
    },
    {
      id: "ord-2",
      name: "My Sermon Notes (Physical Edition)",
      orderNumber: "#YLP-00119",
      date: "July 28, 2026",
      qty: 2,
      price: "₦15,000",
      status: "Shipped",
      imageBg: "from-amber-100 to-orange-100/60",
      type: "Hardcover Book",
    },
    {
      id: "ord-3",
      name: "Spiritual Devotional Printable Set",
      orderNumber: "#YLP-00108",
      date: "July 12, 2026",
      qty: 1,
      price: "₦5,000",
      status: "Processing",
      imageBg: "from-cyan-100 to-blue-100/60",
      type: "Digital PDF",
    },
  ]);

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: "prod-1",
      name: "My Growth Journal",
      description: "A 90-day guided journal designed to structure your quiet time & daily devotion.",
      price: "₦7,500",
      badge: "Best Seller",
      badgeBg: "bg-[#D4AF37] text-white",
      imageBg: "from-sky-50 to-indigo-50",
      isWishlisted: true,
    },
    {
      id: "prod-2",
      name: "My Sermon Notes",
      description: "Elegant physical notebook to capture sermon key points, scriptures, and application.",
      price: "₦7,500",
      badge: "Popular",
      badgeBg: "bg-sky-500 text-white",
      imageBg: "from-amber-50 to-orange-50",
      isWishlisted: true,
    },
    {
      id: "prod-3",
      name: "Spiritual Devotional & Study Guide",
      description: "In-depth Bible study worksheets, prayer trackers, and verse reflection templates.",
      price: "₦12,000",
      badge: "New Release",
      badgeBg: "bg-purple-600 text-white",
      imageBg: "from-purple-50 to-indigo-50",
      isWishlisted: false,
    },
    {
      id: "prod-4",
      name: "Faith Reflection Sticky Notes Set",
      description: "Beautiful aesthetic sticky notes for your Bible margins and daily encouragement.",
      price: "₦3,500",
      imageBg: "from-rose-50 to-amber-50",
      isWishlisted: false,
    },
  ]);

  const toggleWishlist = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.isWishlisted;
          showToast(nextState ? `Saved "${p.name}" to your wishlist!` : `Removed "${p.name}" from wishlist.`);
          return { ...p, isWishlisted: nextState };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A] font-sans antialiased flex flex-col selection:bg-sky-200">
      
      {/* TOAST NOTIFICATION POPUP */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <IconSparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MOBILE TOP BAR HEADER */}
      <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100/80 px-4 py-3.5 flex items-center justify-between shadow-xs">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20">
            <IconBookOpen className="w-4.5 h-4.5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            YLP<span className="text-sky-500">.</span>Stores
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block ml-0.5"></span>
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] font-bold text-xs flex items-center justify-center">
            E
          </div>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label="Toggle Navigation"
          >
            {mobileSidebarOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* REUSABLE SIDEBAR COMPONENT (CUSTOMER ROLE) */}
      <Sidebar
        role="customer"
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        badges={{
          orders: emptyOrdersState ? "0" : "3",
          wishlist: emptyWishlistState ? "0" : "5",
          resources: emptyResourcesState ? "0" : "2",
        }}
        userName="Eloho O."
        userEmail="eloho@example.com"
      />

      {/* DASHBOARD LAYOUT GRID */}
      <div className="flex-1 flex">
        
        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 lg:ml-72 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full space-y-8">
          
          {/* DEMO TOOLBAR TO TOGGLE UX STATES */}
          <div className="bg-sky-50/70 border border-sky-200/60 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-sky-800 font-semibold">
              <IconSparkles className="w-4 h-4 text-sky-600" />
              <span>UX Interactive State Demonstrator:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 800);
                }}
                className="px-3 py-1 bg-white border border-sky-200 rounded-full font-medium hover:bg-sky-100 text-sky-700 transition-colors cursor-pointer"
              >
                Toggle Loading Skeleton
              </button>
              <button
                onClick={() => setEmptyOrdersState(!emptyOrdersState)}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  emptyOrdersState ? "bg-amber-500 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {emptyOrdersState ? "Orders: Empty State" : "Orders: Normal State"}
              </button>
              <button
                onClick={() => setEmptyWishlistState(!emptyWishlistState)}
                className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                  emptyWishlistState ? "bg-amber-500 text-white" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {emptyWishlistState ? "Wishlist: Empty State" : "Wishlist: Normal State"}
              </button>
            </div>
          </div>

          {/* DASHBOARD TOP GREETING HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sky-100/70 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block mb-1">
                Welcome back, Eloho 👋
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Your YLP Journey
              </h1>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Keep growing, keep learning, and keep walking intentionally with God.
              </p>
            </div>

            {/* Date Indicator */}
            <div className="flex items-center gap-2 bg-white border border-slate-200/80 px-4 py-2 rounded-2xl shadow-xs text-xs font-semibold text-slate-600 self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              Saturday, August 8, 2026
            </div>
          </div>

          {isLoading ? (
            /* ELEGANT SKELETON LOADING STATE */
            <div className="space-y-6 animate-pulse">
              <div className="h-64 bg-slate-200/60 rounded-3xl w-full"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-28 bg-slate-200/60 rounded-3xl"></div>
                ))}
              </div>
              <div className="h-80 bg-slate-200/60 rounded-3xl"></div>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in duration-300">
              
              {/* FEATURED SPIRITUAL GROWTH CARD */}
              <div className="bg-gradient-to-r from-[#EAF7FC] via-white to-[#FFFDF8] border border-sky-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
                
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-sky-300/20 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none"></div>

                <div className="space-y-4 max-w-lg text-center lg:text-left relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 text-sky-700 text-xs font-bold uppercase tracking-wider border border-sky-200/60 shadow-xs">
                    <IconSparkles className="w-3.5 h-3.5 text-sky-600" />
                    Daily Quiet Time
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-slate-900 tracking-tight leading-tight">
                    Keep Growing
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Small intentional moments with God can become meaningful growth. Dwell in His word today and record what He is speaking to your heart.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => showToast("Opening your digital journal reader...")}
                      className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-7 py-3 rounded-full text-sm shadow-md shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>Continue Your Journey</span>
                      <IconArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative w-full max-w-sm h-56 bg-white/60 backdrop-blur-xs rounded-2xl border border-white p-5 shadow-lg flex items-center justify-center overflow-hidden">
                  <div className="w-56 bg-white rounded-2xl p-4 shadow-xl border border-slate-100 transform -rotate-3 hover:rotate-0 transition-transform duration-500 animate-float space-y-2.5">
                    <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                      <span className="text-xs font-bold text-slate-900 font-editorial">My Growth Journal</span>
                      <span className="text-[9px] font-bold text-[#D4AF37] uppercase bg-amber-50 px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <p className="text-[10px] italic font-serif text-slate-600 bg-sky-50/70 p-2 rounded-lg">
                      "Be still, and know that I am God." — Psalm 46:10
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-semibold">
                      <IconCheck className="w-3 h-3 text-emerald-500" />
                      <span>Day 14 Completed</span>
                    </div>
                  </div>
                  <IconCross className="w-6 h-6 text-[#D4AF37]/20 absolute bottom-3 right-4 pointer-events-none" />
                </div>

              </div>

              {/* QUICK STATS CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                      <IconShoppingBag className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">Purchases</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{emptyOrdersState ? "0 Orders" : "3 Orders"}</h3>
                    <p className="text-xs text-slate-500 mt-1">Physical & Digital items</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group transition-colors cursor-pointer"
                  >
                    View Orders
                    <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center">
                      <IconHeart className="w-5 h-5 text-rose-500" fill="currentColor" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">Saved</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{emptyWishlistState ? "0 Saved Items" : "5 Saved Items"}</h3>
                    <p className="text-xs text-slate-500 mt-1">Products on your radar</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("wishlist")}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group transition-colors cursor-pointer"
                  >
                    View Wishlist
                    <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#D4AF37] flex items-center justify-center">
                      <IconBookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400">Library</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{emptyResourcesState ? "0 Resources" : "2 Saved Resources"}</h3>
                    <p className="text-xs text-slate-500 mt-1">Study guides & devotions</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("resources")}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group transition-colors cursor-pointer"
                  >
                    Explore
                    <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <IconUser className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 font-mono">80%</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900">Profile 80% Complete</h3>
                    <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full w-[80%]"></div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group transition-colors cursor-pointer"
                  >
                    Complete Profile
                    <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>

              {/* RECENT ORDERS SECTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1 group cursor-pointer"
                  >
                    View All Orders
                    <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {emptyOrdersState ? (
                  <div className="bg-white border border-slate-200/80 rounded-3xl p-8 text-center space-y-4 shadow-xs">
                    <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center mx-auto">
                      <IconPackage className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-900">Your journey starts here.</h3>
                      <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
                        You haven't placed an order yet. Discover something created to support your walk with God.
                      </p>
                    </div>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 bg-sky-500 text-white font-semibold px-6 py-2.5 rounded-full text-xs shadow-md shadow-sky-500/20 hover:bg-sky-600 transition-all"
                    >
                      Explore the Shop
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ord.imageBg} border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 shadow-xs shrink-0`}>
                            YLP
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-900">{ord.name}</h4>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                              <span className="font-mono font-medium text-slate-700">{ord.orderNumber}</span>
                              <span>•</span>
                              <span>{ord.date}</span>
                              <span>•</span>
                              <span>Qty: {ord.qty}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                          <div className="text-right">
                            <span className="block text-sm font-extrabold text-slate-900">{ord.price}</span>
                            <span
                              className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mt-0.5 ${
                                ord.status === "Delivered"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : ord.status === "Shipped"
                                  ? "bg-sky-50 text-sky-700 border border-sky-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold px-4 py-2 rounded-full border border-slate-200 transition-colors cursor-pointer"
                          >
                            View Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* RECOMMENDATIONS */}
              <div className="space-y-6 pt-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100 inline-block">
                    CONTINUE SHOPPING
                  </span>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    You Might Love These
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative"
                    >
                      <button
                        onClick={() => toggleWishlist(prod.id)}
                        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        aria-label="Save to wishlist"
                      >
                        <IconHeart className={`w-4.5 h-4.5 ${prod.isWishlisted ? "text-rose-500" : ""}`} fill={prod.isWishlisted ? "currentColor" : "none"} />
                      </button>

                      <div>
                        <div className={`bg-gradient-to-b ${prod.imageBg} rounded-2xl aspect-[4/3] p-4 mb-4 flex items-center justify-center relative overflow-hidden border border-slate-100`}>
                          {prod.badge && (
                            <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full shadow-xs ${prod.badgeBg}`}>
                              {prod.badge}
                            </span>
                          )}
                          <div className="w-24 bg-white rounded-xl shadow-md p-3 text-center space-y-1.5 group-hover:scale-105 transition-transform">
                            <div className="w-5 h-5 rounded-md bg-sky-500 text-white font-bold text-[9px] flex items-center justify-center mx-auto">
                              YLP
                            </div>
                            <div className="h-1.5 bg-slate-200 rounded w-full"></div>
                            <div className="h-1.5 bg-slate-100 rounded w-3/4 mx-auto"></div>
                          </div>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 mb-1">{prod.name}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">{prod.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-sm font-extrabold text-sky-600">{prod.price}</span>
                        <button
                          onClick={() => showToast(`Opening product details for ${prod.name}...`)}
                          className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SCRIPTURE BANNER */}
              <div className="bg-gradient-to-br from-[#EAF7FC] via-[#FFFDF8] to-[#F8F4EE] rounded-3xl p-8 sm:p-12 border border-amber-200/60 shadow-sm relative overflow-hidden text-center space-y-4">
                <IconQuote className="w-16 h-16 text-sky-200/50 absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-amber-50 px-3.5 py-1 rounded-full border border-amber-200/60 inline-block">
                    A Little Reminder
                  </span>
                  <p className="text-xl sm:text-2xl font-editorial italic text-slate-900 leading-relaxed">
                    "Draw near to God, and He will draw near to you."
                  </p>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-600">
                    — James 4:8
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* DASHBOARD FOOTER */}
          <footer className="border-t border-sky-100/80 pt-10 pb-6 mt-16 space-y-6 text-xs text-slate-500">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                  <IconBookOpen className="w-4 h-4" />
                </div>
                <span className="text-sm font-extrabold text-slate-900">
                  YLP<span className="text-sky-500">.</span>Stores
                </span>
                <span className="text-slate-400">•</span>
                <span>Helping you grow closer to God through Jesus Christ.</span>
              </div>

              <div className="flex items-center space-x-3 text-slate-400">
                <a href="#" className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center hover:text-sky-600 transition-colors">
                  <IconInstagram className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center hover:text-sky-600 transition-colors">
                  <IconTikTok className="w-3.5 h-3.5" />
                </a>
                <a href="#" className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center hover:text-sky-600 transition-colors">
                  <IconFacebook className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
              <p>© {new Date().getFullYear()} YLP.Stores. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link to="/" className="hover:text-slate-700">Shop</Link>
                <a href="#" className="hover:text-slate-700">About</a>
                <a href="#" className="hover:text-slate-700">Contact</a>
                <a href="#" className="hover:text-slate-700">Privacy Policy</a>
                <a href="#" className="hover:text-slate-700">Terms & Conditions</a>
              </div>
            </div>
          </footer>

        </main>
      </div>

      {/* ORDER DETAILS MODAL DRAWER */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Order Details</h3>
                <p className="text-xs font-mono text-sky-600">{selectedOrder.orderNumber}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <IconX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="font-semibold">Product Name:</span>
                <span className="font-bold text-slate-900">{selectedOrder.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="font-semibold">Format:</span>
                <span>{selectedOrder.type}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="font-semibold">Date Placed:</span>
                <span>{selectedOrder.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="font-semibold">Quantity:</span>
                <span>{selectedOrder.qty}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="font-semibold">Total Price:</span>
                <span className="font-extrabold text-sky-600">{selectedOrder.price}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold">Fulfillment Status:</span>
                <span className="font-bold text-emerald-600">{selectedOrder.status}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-full text-xs shadow-md transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
