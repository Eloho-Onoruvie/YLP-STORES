import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

// Inline Icon Components for self-contained zero-dependency rendering
const IconBookOpen = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const IconSparkles = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconStar = ({ className = "w-5 h-5", fill = "none" }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const IconArrowRight = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const IconHeart = ({ className = "w-5 h-5", fill = "none" }: { className?: string; fill?: string }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
  </svg>
);

const IconFeather = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
);

const IconSun = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconBookmark = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
  </svg>
);

const IconLayers = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const IconDownload = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const IconCheckCircle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconMail = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconShoppingBag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

const IconSend = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const IconQuote = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const IconCheck = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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

const IconFacebook = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z" />
  </svg>
);

const IconTwitter = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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

const IconUser = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => setEmailSubmitted(false), 4000);
      setEmailInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A] font-sans antialiased overflow-x-hidden selection:bg-sky-200 selection:text-slate-900">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FFFDF8]/90 border-b border-sky-100/80 transition-all duration-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
              <IconBookOpen className="w-5.5 h-5.5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                YLP<span className="text-sky-500">.</span>Stores
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block animate-pulse"></span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#products" className="hover:text-sky-600 transition-colors">
              All Products
            </a>
            <a href="#printables" className="hover:text-sky-600 transition-colors">
              Printables
            </a>
            <a href="#physical" className="hover:text-sky-600 transition-colors">
              Physical Journal
            </a>
            <a href="#digital" className="hover:text-sky-600 transition-colors">
              Digital Journal
            </a>
          </nav>

          {/* Right Action Buttons featuring Login & Register */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              to="/login"
              className="text-slate-700 hover:text-sky-600 font-semibold px-4 py-2 rounded-full text-sm transition-colors flex items-center gap-1.5"
            >
              <IconUser className="w-4 h-4 text-sky-500" />
              Log In
            </Link>
            <Link
              to="/register"
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-5 py-2.5 rounded-full text-sm shadow-md shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              <IconSparkles className="w-4 h-4" />
              Create Account
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-sky-100 px-5 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top duration-200">
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-sky-600"
            >
              All Products
            </a>
            <a
              href="#printables"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-sky-600"
            >
              Printables
            </a>
            <a
              href="#physical"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-sky-600"
            >
              Physical Journal
            </a>
            <a
              href="#digital"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-slate-700 font-medium hover:text-sky-600"
            >
              Digital Journal
            </a>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-full block"
              >
                Log In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-sky-500 text-white font-semibold py-2.5 rounded-full block shadow-md"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF7FC] text-sky-700 border border-sky-200/70 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
                <IconSparkles className="w-4 h-4 text-sky-600" />
                For your Faith & Growth Journey
              </div>

              {/* Title with Editorial Serif */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial font-normal text-slate-900 tracking-tight leading-[1.14]">
                Grow Closer to God,{" "}
                <span className="font-editorial italic font-semibold text-sky-600 bg-gradient-to-r from-sky-600 via-sky-500 to-[#D4AF37] bg-clip-text text-transparent inline-block">
                  One Page
                </span>{" "}
                at a Time.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                An intentional approach to devotion, reflection, and spiritual growth.
                Created for believers seeking depth and clarity in their daily walk with God through Jesus Christ.
              </p>

              {/* Main CTAs Featuring Account Creation & Login */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <span>Create Free Account</span>
                  <IconArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/login"
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold px-7 py-3.5 rounded-full border border-slate-200 shadow-xs transition-all hover:border-slate-300 flex items-center justify-center gap-2 text-base cursor-pointer"
                >
                  <IconUser className="w-4 h-4 text-sky-500" />
                  <span>Log In</span>
                </Link>
              </div>

              {/* Social Proof Rating */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-3">
                <div className="flex items-center text-[#D4AF37] space-x-0.5">
                  <IconStar className="w-5 h-5 text-[#D4AF37]" fill="currentColor" />
                  <IconStar className="w-5 h-5 text-[#D4AF37]" fill="currentColor" />
                  <IconStar className="w-5 h-5 text-[#D4AF37]" fill="currentColor" />
                  <IconStar className="w-5 h-5 text-[#D4AF37]" fill="currentColor" />
                  <IconStar className="w-5 h-5 text-[#D4AF37]" fill="currentColor" />
                </div>
                <span className="text-sm font-medium text-slate-600">
                  Over <strong className="text-slate-900 font-semibold">1,000+</strong> Happy Believers
                </span>
              </div>
            </div>

            {/* Right Hero Graphic Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none"></div>

              {/* Outer Editorial Container */}
              <div className="relative bg-gradient-to-br from-[#EAF7FC] via-[#FFFDF8] to-[#F8F4EE] border border-sky-100/80 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-sm overflow-hidden min-h-[380px] flex items-center justify-center">
                
                {/* Floating Journal Mockup 1 */}
                <div className="absolute top-6 left-6 right-16 sm:right-20 bg-white rounded-2xl p-5 shadow-lg border border-slate-100 transform -rotate-3 hover:rotate-0 transition-transform duration-500 animate-float">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                        YLP
                      </span>
                      <div>
                        <div className="h-2 w-24 bg-slate-200 rounded"></div>
                        <div className="h-1.5 w-16 bg-slate-100 rounded mt-1"></div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                      Printable
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 w-3/4 font-editorial text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      <IconBookOpen className="w-3.5 h-3.5 text-sky-500" /> My Faith Journey
                    </div>
                    <div className="p-2.5 bg-sky-50/60 rounded-xl space-y-1.5 text-[11px] text-slate-700 italic font-serif">
                      "Be still, and know that I am God." — Psalm 46:10
                    </div>
                    <div className="space-y-1.5 pt-1">
                      <div className="h-2 w-full bg-slate-100 rounded"></div>
                      <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Journal Mockup 2 */}
                <div className="relative mt-20 sm:mt-24 ml-12 sm:ml-16 bg-white rounded-2xl p-5 shadow-2xl border border-slate-200/80 transform rotate-2 hover:rotate-0 transition-transform duration-500 animate-float-reverse">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-[#D4AF37] flex items-center justify-center text-xs font-bold">
                        ✦
                      </div>
                      <span className="text-xs font-bold text-slate-800 font-editorial">My Sermon Notes</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] bg-amber-50 px-2 py-0.5 rounded-full">
                      Physical
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      <IconHeart className="w-3.5 h-3.5 text-rose-500" fill="currentColor" />
                      Thank You Lord
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <IconCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Morning Prayer & Gratitude</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-600">
                        <IconCheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Scripture Reflection</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* MISSION SECTION */}
        <section className="py-16 md:py-24 border-t border-sky-100/70">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block">
              OUR MISSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-slate-900 tracking-tight">
              Helping believers build intentional relationships with God
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Thoughtfully crafted resources designed to enrich your quiet time, structure your prayers, and help you dwell in Scripture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                <IconHeart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-editorial text-slate-900 mb-3">Intentional Growth</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tools designed to help you cultivate consistent, meaningful daily habits in your spiritual walk without overwhelm.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#D4AF37] flex items-center justify-center mb-6">
                <IconFeather className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-editorial text-slate-900 mb-3">Spiritual Structure</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Organized prompts and frameworks that make deep bible study and prayer focused, rewarding, and effortless.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-6">
                <IconSun className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-editorial text-slate-900 mb-3">Daily Encouragement</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Inspiring layouts and verses that remind you of God's grace and promises throughout every single season.
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="py-16 md:py-24 border-t border-sky-100/70">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block">
                OUR PRODUCTS
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-slate-900 tracking-tight">
                Crafted for your faith journey
              </h2>
            </div>
            <a
              href="#products"
              className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 text-sm sm:text-base group"
            >
              See all
              <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Product Card 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="bg-gradient-to-b from-sky-50 to-indigo-50/40 rounded-2xl p-8 mb-6 relative aspect-[16/10] flex items-center justify-center overflow-hidden border border-sky-100/50">
                  <span className="absolute top-4 right-4 bg-[#D4AF37] text-white font-bold text-xs px-3.5 py-1 rounded-full shadow-xs">
                    Best Seller
                  </span>
                  
                  <div className="w-44 sm:w-52 bg-white rounded-xl shadow-lg border border-slate-200/80 p-5 transform group-hover:scale-105 transition-transform duration-300 space-y-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs">
                      FJ
                    </div>
                    <div className="h-3 bg-slate-800 rounded w-3/4"></div>
                    <div className="space-y-1.5 pt-2">
                      <div className="h-2 bg-slate-100 rounded w-full"></div>
                      <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                      <div className="h-2 bg-slate-100 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold font-editorial text-slate-900">My Faith Journey</h3>
                  <span className="text-xl font-extrabold text-sky-600">$14.99</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  A 90-day guided printable journal featuring daily prompts, scripture breakdown, gratitude reflections, and habit trackers.
                </p>
              </div>

              <Link
                to="/register"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 rounded-full shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <IconShoppingBag className="w-4 h-4" />
                Shop Now
              </Link>
            </div>

            {/* Product Card 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="bg-gradient-to-b from-amber-50 to-orange-50/40 rounded-2xl p-8 mb-6 relative aspect-[16/10] flex items-center justify-center overflow-hidden border border-amber-100/50">
                  <span className="absolute top-4 right-4 bg-sky-500 text-white font-bold text-xs px-3.5 py-1 rounded-full shadow-xs">
                    New
                  </span>
                  
                  <div className="w-44 sm:w-52 bg-white rounded-xl shadow-lg border border-slate-200/80 p-5 transform group-hover:scale-105 transition-transform duration-300 space-y-3 text-left">
                    <div className="w-8 h-8 rounded-lg bg-[#D4AF37] text-white flex items-center justify-center font-bold text-xs">
                      SD
                    </div>
                    <div className="h-3 bg-slate-800 rounded w-3/4"></div>
                    <div className="space-y-1.5 pt-2">
                      <div className="h-2 bg-slate-100 rounded w-full"></div>
                      <div className="h-2 bg-slate-100 rounded w-5/6"></div>
                      <div className="h-2 bg-slate-100 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold font-editorial text-slate-900">Spiritual Devotional</h3>
                  <span className="text-xl font-extrabold text-sky-600">$19.99</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Beautifully designed physical journal with gold foil accents, premium paper, and structured prayer tracking for deep spiritual growth.
                </p>
              </div>

              <Link
                to="/register"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 rounded-full shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <IconShoppingBag className="w-4 h-4" />
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        {/* KEY FEATURES SECTION */}
        <section id="features" className="py-16 md:py-24 border-t border-sky-100/70">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block">
              KEY FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-slate-900 tracking-tight">
              Designed to deepen your walk with God
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <IconBookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold font-editorial text-slate-900 mb-2">Guided Prompts & Reflection</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Deeper questions to help you meditate on scripture and reflect on God's active work in your daily life.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <IconBookmark className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold font-editorial text-slate-900 mb-2">Scripture Memory & Study</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Dedicated spaces to memorize key verses, write down key context, and record insights from sermons.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D4AF37] flex items-center justify-center mb-5">
                <IconLayers className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold font-editorial text-slate-900 mb-2">Structured Prayer Worksheets</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Categorized sections for praise, confession, thanksgiving, and supplication to keep your prayers focused.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-5">
                <IconDownload className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold font-editorial text-slate-900 mb-2">Aesthetic & Digital Printable</h4>
              <p className="text-slate-600 text-xs leading-relaxed">
                Instantly downloadable files ready to print at home or write on directly using your digital tablet.
              </p>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-16 md:py-24 border-t border-sky-100/70">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-normal text-slate-900 tracking-tight">
              Loved by believers everywhere
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-[#D4AF37] space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic font-serif mb-6">
                  "The Faith Journey printable has transformed my morning quiet time! I look forward to opening it every single day."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
                  SM
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Sarah M.</h5>
                  <p className="text-xs text-slate-500">Verified Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-[#D4AF37] space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic font-serif mb-6">
                  "Incredible design and quality. It gives so much structure to my prayers without feeling restrictive or overwhelming."
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="w-9 h-9 rounded-full bg-amber-100 text-[#D4AF37] font-bold text-xs flex items-center justify-center">
                  RK
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">Rachel K.</h5>
                  <p className="text-xs text-slate-500">Verified Customer</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200/70 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex text-[#D4AF37] space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} className="w-4 h-4 text-[#D4AF37]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic font-serif mb-6">
                  "I gave these journals to my Bible study group and everyone fell in love. Best spiritual purchase of the year!"
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <div className="w-9 h-9 rounded-full bg-sky-100 text-sky-700 font-bold text-xs flex items-center justify-center">
                  DP
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900">David P.</h5>
                  <p className="text-xs text-slate-500">Verified Customer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCRIPTURE QUOTE BANNER */}
        <section className="my-12 sm:my-16">
          <div className="bg-gradient-to-r from-sky-600 via-sky-500 to-[#D4AF37] rounded-3xl p-10 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden">
            <IconQuote className="w-24 h-24 text-white/10 absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <IconQuote className="w-10 h-10 text-white/80 mx-auto" />
              <p className="text-xl sm:text-2xl lg:text-3xl font-editorial italic leading-relaxed font-normal">
                "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future."
              </p>
              <p className="text-sm sm:text-base font-semibold tracking-wider uppercase text-sky-100">
                — Jeremiah 29:11
              </p>
            </div>
          </div>
        </section>

        {/* NEWSLETTER JOIN SECTION */}
        <section className="my-12 sm:my-16">
          <div className="bg-gradient-to-br from-[#EAF7FC] via-white to-[#F8F4EE] border border-sky-100/80 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 inline-block">
                  NEWSLETTER
                </span>
                <h3 className="text-3xl font-editorial font-normal text-slate-900 tracking-tight">
                  Join the YLP Community
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-md">
                  Get weekly encouragement, free printable templates, and exclusive discounts right in your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-white border border-slate-300 rounded-full px-5 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
                  />
                  <button
                    type="submit"
                    className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-7 py-3 rounded-full text-sm shadow-md shadow-sky-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2"
                  >
                    {emailSubmitted ? (
                      <>
                        <IconCheck className="w-4 h-4 text-white" />
                        Subscribed!
                      </>
                    ) : (
                      <>
                        Subscribe
                        <IconSend className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-40 h-40 rounded-full bg-white border border-slate-200/80 shadow-xl flex items-center justify-center animate-float">
                  <div className="w-24 h-24 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                    <IconMail className="w-10 h-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA BANNER FEATURING REGISTER & LOGIN */}
        <section className="my-12 sm:my-16">
          <div className="bg-[#1A1A1A] rounded-3xl p-10 sm:p-16 text-center text-white relative overflow-hidden border border-slate-800 shadow-2xl space-y-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/20 border border-sky-400/30 text-sky-400 flex items-center justify-center mx-auto">
                <IconSparkles className="w-6 h-6" />
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-normal tracking-tight">
                Your Journey With God Deserves Intention.
              </h2>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-sky-500/40 transition-all hover:scale-105 text-base"
                >
                  Create Account & Explore Collection
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white font-semibold px-6 py-3.5 rounded-full border border-slate-700 transition-all text-base"
                >
                  Log In to Your Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-sky-100/80 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100">
            
            {/* Brand Col */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white font-bold shadow-md shadow-sky-500/20">
                  <IconBookOpen className="w-5 h-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  YLP<span className="text-sky-500">.</span>Stores
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Dedicated to helping believers deepen their faith, stay consistent in quiet time, and grow closer to God through intentional journaling & printables.
              </p>
              <div className="flex items-center space-x-3 pt-2 text-slate-400">
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:text-sky-600 hover:bg-sky-50 transition-colors">
                  <IconInstagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:text-sky-600 hover:bg-sky-50 transition-colors">
                  <IconFacebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:text-sky-600 hover:bg-sky-50 transition-colors">
                  <IconTwitter className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Account & Quick Links */}
            <div className="md:col-span-2 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Account & Links</h5>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><Link to="/register" className="hover:text-sky-600 font-medium transition-colors">Create Account</Link></li>
                <li><Link to="/login" className="hover:text-sky-600 transition-colors">Log In</Link></li>
                <li><a href="#products" className="hover:text-sky-600 transition-colors">All Products</a></li>
                <li><a href="#printables" className="hover:text-sky-600 transition-colors">Printables</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div className="md:col-span-2 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Resources</h5>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-sky-600 transition-colors">Faith Blog</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors">Free Downloads</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors">Prayer Guides</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-3 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-900">Contact</h5>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Email: hello@ylpstores.com</li>
                <li>Hours: Mon - Fri (9am - 5pm EST)</li>
                <li>Location: United States</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} YLP.Stores. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-700">Privacy Policy</a>
              <a href="#" className="hover:text-slate-700">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
