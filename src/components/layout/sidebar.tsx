import { Link, useLocation } from "react-router-dom";

// Inline Icon Helpers for zero-dependency rendering
const IconBookOpen = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconHome = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const IconShoppingBag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const IconHeart = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const IconUser = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const IconBookmark = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const IconSettings = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconHelp = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconLogOut = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const IconBox = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const IconUsers = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconChartBar = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconShield = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const IconX = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export interface NavItemConfig {
  id: string;
  label: string;
  href?: string;
  icon: (props: { className?: string }) => JSX.Element;
  badge?: string;
  badgeBg?: string;
}

export interface SidebarProps {
  role?: "customer" | "admin";
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  badges?: Record<string, string>;
  userName?: string;
  userEmail?: string;
}

export default function Sidebar({
  role = "customer",
  activeTab,
  onTabChange,
  mobileOpen = false,
  onMobileClose,
  badges = {},
  userName = role === "admin" ? "Admin Manager" : "Eloho O.",
  userEmail = role === "admin" ? "admin@ylpstores.com" : "eloho@example.com",
}: SidebarProps) {
  const location = useLocation();

  // Navigation Items according to Role
  const customerNavItems: NavItemConfig[] = [
    { id: "overview", label: "Overview", href: "/dashboard", icon: IconHome },
    { id: "orders", label: "My Orders", href: "/dashboard", icon: IconShoppingBag, badge: badges.orders ?? "3" },
    { id: "wishlist", label: "Wishlist", href: "/dashboard", icon: IconHeart, badge: badges.wishlist ?? "5" },
    { id: "profile", label: "My Profile", href: "/dashboard", icon: IconUser },
    { id: "resources", label: "Saved Resources", href: "/dashboard", icon: IconBookmark, badge: badges.resources ?? "2" },
    { id: "settings", label: "Settings", href: "/dashboard", icon: IconSettings },
  ];

  const adminNavItems: NavItemConfig[] = [
    { id: "admin-dashboard", label: "Dashboard", href: "/admin/dashboard", icon: IconHome },
    { id: "admin-products", label: "Products", href: "/admin/products", icon: IconBox, badge: badges.products ?? "12" },
    { id: "admin-orders", label: "Orders & Fulfillment", href: "/admin/orders", icon: IconShoppingBag, badge: badges.pendingOrders ?? "8", badgeBg: "bg-[#D4AF37] text-white" },
    { id: "admin-customers", label: "Customers", href: "/admin/customers", icon: IconUsers },
    { id: "admin-analytics", label: "Analytics & Sales", href: "/admin/analytics", icon: IconChartBar },
    { id: "admin-settings", label: "Store Settings", href: "/admin/settings", icon: IconSettings },
  ];

  const navItems = role === "admin" ? adminNavItems : customerNavItems;

  const tagline = role === "admin" ? "Managing YLP resources & community." : "Growing with God, intentionally.";

  const isCurrentActive = (item: NavItemConfig) => {
    if (activeTab) {
      return activeTab === item.id;
    }
    if (item.href) {
      return location.pathname === item.href;
    }
    return false;
  };

  const handleNavClick = (item: NavItemConfig) => {
    if (onTabChange) {
      onTabChange(item.id);
    }
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-6">
      
      <div className="space-y-8">
        {/* Logo & Tagline */}
        <div className="space-y-1.5 px-2">
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-2xl text-white flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform ${role === "admin" ? "bg-slate-900 shadow-slate-900/20" : "bg-sky-500 shadow-sky-500/25"}`}>
              {role === "admin" ? <IconShield className="w-5.5 h-5.5 text-sky-400" /> : <IconBookOpen className="w-5.5 h-5.5" />}
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                YLP<span className="text-sky-500">.</span>Stores
                <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${role === "admin" ? "bg-sky-500" : "bg-[#D4AF37]"}`}></span>
              </span>
              {role === "admin" && (
                <span className="text-[10px] uppercase font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100 w-fit mt-0.5">
                  Admin Portal
                </span>
              )}
            </div>
          </Link>
          <p className="text-xs text-slate-500 italic pl-1 font-serif">{tagline}</p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item);

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm transition-all duration-200 cursor-pointer ${
                  active
                    ? "bg-[#EAF7FC] text-sky-700 font-bold border border-sky-200/60 shadow-xs translate-x-1"
                    : "text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900 hover:translate-x-0.5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${active ? "text-sky-600" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                      item.badgeBg
                        ? item.badgeBg
                        : active
                        ? "bg-sky-500 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile Info & Actions */}
      <div className="space-y-4">
        {/* User Card */}
        <div className="bg-slate-50/80 rounded-2xl p-3.5 border border-slate-200/70 flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center shadow-xs ${role === "admin" ? "bg-slate-800" : "bg-gradient-to-br from-sky-400 to-[#D4AF37]"}`}>
            {userName.charAt(0)}
          </div>
          <div className="overflow-hidden flex-1">
            <h5 className="text-xs font-bold text-slate-900 truncate">{userName}</h5>
            <p className="text-[10px] text-slate-500 truncate">{userEmail}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-slate-100 pt-3 space-y-1 text-xs font-semibold">
          <button
            onClick={() => alert(`Help & Support center for YLP.Stores ${role} Portal.`)}
            className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
          >
            <IconHelp className="w-4.5 h-4.5 text-slate-400" />
            Help & Support
          </button>
          
          <Link
            to="/login"
            className="w-full flex items-center gap-3 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          >
            <IconLogOut className="w-4.5 h-4.5 text-rose-500" />
            Log Out
          </Link>
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* DESKTOP FIXED SIDEBAR */}
      <aside className="hidden lg:flex w-64 lg:w-72 bg-white border-r border-sky-100/80 fixed top-0 bottom-0 left-0 z-30 shadow-xs">
        {sidebarContent}
      </aside>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-start">
          <div className="w-72 bg-white h-full shadow-2xl animate-in slide-in-from-left duration-250 relative">
            <button
              onClick={onMobileClose}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100"
              aria-label="Close Sidebar"
            >
              <IconX className="w-4 h-4" />
            </button>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
