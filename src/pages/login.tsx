import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

const IconEye = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const IconEyeOff = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a10.025 10.025 0 013.68-.813c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m-6.23-6.23a3 3 0 11-4.243-4.243m4.242 4.242L3 3l18 18" />
  </svg>
);

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

const IconGoogle = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

const IconSpinner = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const IconArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A] font-sans antialiased flex flex-col justify-between selection:bg-sky-200">
      <div className="lg:hidden p-4 sm:p-6 bg-[#EAF7FC]/60 border-b border-sky-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20">
            <IconBookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
            YLP<span className="text-sky-500">.</span>Stores
          </span>
        </Link>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-65px)] lg:min-h-screen">
        <div className="lg:col-span-6 relative bg-gradient-to-br from-[#EAF7FC] via-[#FFFDF8] to-[#F8F4EE] p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-sky-100/70">
          <div className="hidden lg:flex items-center justify-between relative z-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                <IconBookOpen className="w-5.5 h-5.5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                YLP<span className="text-sky-500">.</span>Stores
              </span>
            </Link>
          </div>

          <div className="my-auto py-8 lg:py-12 relative z-10 max-w-xl mx-auto lg:mx-0 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider border border-sky-200/60 shadow-xs">
              <IconSparkles className="w-3.5 h-3.5 text-sky-600" />
              Welcome Back
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-normal text-slate-900 leading-[1.18] tracking-tight">
              Continue Your <br />
              <span className="text-sky-600 italic font-semibold">Walk of Faith.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-md">
              Log in to access your guided journals, sermon study notes, and personal devotions.
            </p>

            <div className="pt-4">
              <div className="inline-block p-4 rounded-2xl bg-white/60 backdrop-blur-xs border border-amber-200/50 shadow-xs max-w-md">
                <p className="text-xs sm:text-sm font-serif italic text-slate-700 leading-relaxed">
                  "Your word is a lamp for my feet, a light on my path."
                </p>
                <p className="text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase mt-1">
                  — Psalm 119:105
                </p>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-200/50 relative z-10">
            <span>© {new Date().getFullYear()} YLP.Stores</span>
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#FFFDF8] p-6 sm:p-10 lg:p-14 flex items-center justify-center">
          <div className="w-full max-w-md my-auto">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  Welcome back
                </h2>
                <p className="text-slate-500 text-sm">
                  Sign in to your YLP account to continue.
                </p>
              </div>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-full border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex items-center justify-center gap-3 text-sm cursor-pointer"
                >
                  <IconGoogle className="w-5 h-5" />
                  <span>Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full"></div>
                  <span className="bg-white px-3 text-xs font-bold uppercase tracking-wider text-slate-400 absolute">
                    OR
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-300/40 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <a href="#" className="text-xs text-sky-600 font-semibold hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-3 pr-11 text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-2 focus:ring-sky-300/40 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                    >
                      {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 px-6 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 text-sm mt-2 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <IconSpinner className="w-5 h-5 text-white" />
                      <span>Logging in...</span>
                    </>
                  ) : (
                    <>
                      <span>Log In</span>
                      <IconArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-slate-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-sky-600 hover:text-sky-700 font-bold hover:underline transition-colors"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
