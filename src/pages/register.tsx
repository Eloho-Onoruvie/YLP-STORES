import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

// Inline SVG Icon Helpers
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

const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const IconCross = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10.5 2h3v6h6v3h-6v11h-3V11h-6V8h6V2z" />
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

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Password Requirements Check
  const passwordLength = formData.password.length >= 8;
  const passwordHasUppercase = /[A-Z]/.test(formData.password);
  const passwordHasNumOrSymbol = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password);

  const getPasswordStrength = () => {
    if (!formData.password) return 0;
    let score = 0;
    if (passwordLength) score += 1;
    if (passwordHasUppercase) score += 1;
    if (passwordHasNumOrSymbol) score += 1;
    return score;
  };

  const strengthScore = getPasswordStrength();

  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case "firstName":
        if (!value.trim()) return "First name is required.";
        return undefined;
      case "lastName":
        if (!value.trim()) return "Last name is required.";
        return undefined;
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
        return undefined;
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 8) return "Password must be at least 8 characters.";
        return undefined;
      case "confirmPassword":
        if (!value) return "Please confirm your password.";
        if (value !== formData.password) return "Passwords do not match.";
        return undefined;
      case "agreeToTerms":
        if (!value) return "You must agree to the Terms of Service & Privacy Policy.";
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: fieldValue }));

    if (touched[name]) {
      const errorMsg = validateField(name, fieldValue);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }

    if (name === "password" && touched.confirmPassword) {
      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match." }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
      }
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, (formData as any)[name]);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const allTouched = {
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true,
    };
    setTouched(allTouched);

    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, (formData as any)[key]);
      if (err) (newErrors as any)[key] = err;
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate real auth creation network delay
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#1A1A1A] font-sans antialiased flex flex-col justify-between selection:bg-sky-200 selection:text-slate-900">
      
      {/* Top Mobile Bar Logo */}
      <div className="lg:hidden p-4 sm:p-6 bg-[#EAF7FC]/60 border-b border-sky-100 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/20">
            <IconBookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
            YLP<span className="text-sky-500">.</span>Stores
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block"></span>
          </span>
        </Link>
        <Link to="/" className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-1">
          Back to Home
        </Link>
      </div>

      {/* SPLIT SCREEN MAIN CONTAINER */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-65px)] lg:min-h-screen">
        
        {/* LEFT SIDE — BRAND EXPERIENCE (Soft Sky Blue / Warm Beige / Cream Gradient) */}
        <div className="lg:col-span-6 relative bg-gradient-to-br from-[#EAF7FC] via-[#FFFDF8] to-[#F8F4EE] p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-sky-100/70">
          
          {/* Subtle Ambient Light Rays & Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-300/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>
          <div className="absolute top-1/2 -right-24 w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Background Decorative Shimmer Rays */}
          <div className="absolute inset-0 opacity-20 pointer-events-none animate-ray-shimmer">
            <div className="absolute top-0 left-1/4 w-96 h-[600px] bg-gradient-to-b from-white/80 to-transparent transform -rotate-45"></div>
          </div>

          {/* Top Brand Header (Desktop) */}
          <div className="hidden lg:flex items-center justify-between relative z-10">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                <IconBookOpen className="w-5.5 h-5.5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                YLP<span className="text-sky-500">.</span>Stores
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] inline-block animate-pulse"></span>
              </span>
            </Link>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-sky-100 text-xs font-semibold text-slate-700 shadow-xs">
              <IconCross className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Faith & Lifestyle</span>
            </div>
          </div>

          {/* Center Content: Headline & Visual Mockup */}
          <div className="my-auto py-8 lg:py-12 relative z-10 max-w-xl mx-auto lg:mx-0 space-y-8">
            
            {/* Inspirational Headline */}
            <div className="space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/70 text-sky-700 text-xs font-bold uppercase tracking-wider border border-sky-200/60 shadow-xs">
                <IconSparkles className="w-3.5 h-3.5 text-sky-600" />
                Join Our Believers Community
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-editorial font-normal text-slate-900 leading-[1.18] tracking-tight">
                Welcome to Your <br className="hidden sm:inline" />
                <span className="text-sky-600 italic font-semibold bg-gradient-to-r from-sky-600 via-sky-500 to-[#D4AF37] bg-clip-text text-transparent">
                  Growth Journey.
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-md font-normal">
                Create an account and make your journey with God more intentional, one page at a time.
              </p>
            </div>

            {/* EDITORIAL VISUAL MOCKUP OF JOURNALS & SERMON NOTES */}
            <div className="relative pt-6 pb-4 flex justify-center lg:justify-start">
              
              {/* Card Container frame */}
              <div className="relative w-full max-w-md h-72 sm:h-80 bg-white/40 backdrop-blur-md rounded-3xl border border-white/80 p-6 shadow-xl shadow-sky-900/5 flex items-center justify-center overflow-hidden">
                
                {/* Floating Background Glow Circle */}
                <div className="absolute w-44 h-44 rounded-full bg-sky-200/40 blur-2xl top-4 right-4 pointer-events-none"></div>

                {/* Floating Journal 1: My Growth Journal (Back left) */}
                <div className="absolute top-4 left-4 sm:left-6 w-56 sm:w-64 bg-[#FFFDF8] rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-200/80 transform -rotate-6 hover:rotate-0 transition-transform duration-700 animate-float">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-bold">
                        ✝
                      </span>
                      <span className="text-xs font-bold text-slate-800 font-editorial">My Growth Journal</span>
                    </div>
                    <span className="text-[9px] uppercase font-bold text-[#D4AF37] bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                      Guided
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-sky-50/60 rounded-lg text-[10px] text-slate-700 italic font-serif">
                      "I can do all things through Christ who strengthens me."
                    </div>
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <IconCheck className="w-3 h-3 text-sky-500" />
                        <span>Daily Devotion & Prayer</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <IconCheck className="w-3 h-3 text-sky-500" />
                        <span>Gratitude Reflections</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Journal 2: My Sermon Notes (Front right) */}
                <div className="relative mt-16 sm:mt-20 ml-12 sm:ml-16 w-56 sm:w-64 bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border border-slate-200/80 transform rotate-3 hover:rotate-0 transition-transform duration-700 animate-float-reverse">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center text-[10px] font-bold">
                        ✦
                      </div>
                      <span className="text-xs font-bold text-slate-900">My Sermon Notes</span>
                    </div>
                    <span className="text-[9px] uppercase font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                      Printable
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] font-semibold text-slate-800">
                      Topic: Walking in Wisdom & Faith
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-5/6"></div>
                      <div className="h-1.5 bg-slate-100 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>

                {/* Decorative floating minimal cross watermark */}
                <IconCross className="w-8 h-8 text-[#D4AF37]/20 absolute bottom-3 left-6 pointer-events-none animate-float-slow" />
              </div>

            </div>

            {/* Inspirational Scripture Quote */}
            <div className="pt-2 text-center lg:text-left">
              <div className="inline-block p-4 rounded-2xl bg-white/60 backdrop-blur-xs border border-amber-200/50 shadow-xs max-w-md">
                <p className="text-xs sm:text-sm font-serif italic text-slate-700 leading-relaxed">
                  "Draw near to God, and He will draw near to you."
                </p>
                <p className="text-[11px] font-bold tracking-wider text-[#D4AF37] uppercase mt-1">
                  — James 4:8
                </p>
              </div>
            </div>

          </div>

          {/* Bottom Left Footer Tagline */}
          <div className="hidden lg:flex items-center justify-between text-xs text-slate-500 pt-6 border-t border-slate-200/50 relative z-10">
            <span>© {new Date().getFullYear()} YLP.Stores</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Encouraging Faithful Living
            </span>
          </div>

        </div>

        {/* RIGHT SIDE — REGISTRATION FORM */}
        <div className="lg:col-span-6 bg-[#FFFDF8] p-6 sm:p-10 lg:p-14 flex items-center justify-center relative overflow-y-auto">
          
          <div className="w-full max-w-md my-auto">
            
            {/* Clean White Form Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl shadow-slate-200/40 relative">
              
              {isSuccess ? (
                /* SUCCESS STATE VIEW */
                <div className="text-center py-8 space-y-6 animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                    <IconCheck className="w-8 h-8 text-emerald-600" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold font-editorial text-slate-900">
                      Welcome to YLP.Stores!
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">
                      Your account has been created successfully. We're honored to walk alongside you in your faith journey.
                    </p>
                  </div>

                  <div className="pt-4 space-y-3">
                    <Link
                      to="/"
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 px-6 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm"
                    >
                      Start Exploring Collection
                      <IconArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setFormData({
                          firstName: "",
                          lastName: "",
                          email: "",
                          password: "",
                          confirmPassword: "",
                          agreeToTerms: false,
                        });
                        setTouched({});
                        setErrors({});
                      }}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                    >
                      Create another account
                    </button>
                  </div>
                </div>
              ) : (
                /* REGISTRATION FORM VIEW */
                <div className="space-y-6">
                  
                  {/* Form Header */}
                  <div className="space-y-1.5 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                      Create your account
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Join the YLP community and begin your journey of intentional spiritual growth.
                    </p>
                  </div>

                  {/* SOCIAL REGISTRATION BUTTON */}
                  <div className="space-y-4 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setIsSuccess(true);
                        }, 1200);
                      }}
                      className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-full border border-slate-200 shadow-xs hover:border-slate-300 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 text-sm cursor-pointer"
                    >
                      <IconGoogle className="w-5 h-5" />
                      <span>Continue with Google</span>
                    </button>

                    {/* DIVIDER */}
                    <div className="relative flex items-center justify-center">
                      <div className="border-t border-slate-200 w-full"></div>
                      <span className="bg-white px-3 text-xs font-bold uppercase tracking-wider text-slate-400 absolute">
                        OR
                      </span>
                    </div>
                  </div>

                  {/* FORM FIELDS */}
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    
                    {/* First & Last Name Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="firstName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          First Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          onBlur={() => handleBlur("firstName")}
                          placeholder="Enter your first name"
                          aria-invalid={!!errors.firstName}
                          className={`w-full bg-slate-50/70 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                            errors.firstName
                              ? "border-rose-400 focus:ring-2 focus:ring-rose-400"
                              : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-300/40"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-xs text-rose-500 font-medium animate-in fade-in">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="lastName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                          Last Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          onBlur={() => handleBlur("lastName")}
                          placeholder="Enter your last name"
                          aria-invalid={!!errors.lastName}
                          className={`w-full bg-slate-50/70 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                            errors.lastName
                              ? "border-rose-400 focus:ring-2 focus:ring-rose-400"
                              : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-300/40"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-xs text-rose-500 font-medium animate-in fade-in">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        placeholder="you@example.com"
                        aria-invalid={!!errors.email}
                        className={`w-full bg-slate-50/70 border rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                          errors.email
                            ? "border-rose-400 focus:ring-2 focus:ring-rose-400"
                            : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-300/40"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-500 font-medium animate-in fade-in">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Field with Visibility Toggle */}
                    <div className="space-y-1.5">
                      <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={() => handleBlur("password")}
                          placeholder="Create a password"
                          aria-invalid={!!errors.password}
                          className={`w-full bg-slate-50/70 border rounded-2xl px-4 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                            errors.password
                              ? "border-rose-400 focus:ring-2 focus:ring-rose-400"
                              : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-300/40"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Dynamic Password Strength Indicator */}
                      {formData.password.length > 0 && (
                        <div className="pt-2 space-y-2 animate-in fade-in duration-200">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-slate-600">Password Strength:</span>
                            <span
                              className={`font-bold uppercase tracking-wider ${
                                strengthScore === 3
                                  ? "text-emerald-600"
                                  : strengthScore === 2
                                  ? "text-amber-600"
                                  : "text-rose-500"
                              }`}
                            >
                              {strengthScore === 3 ? "Strong" : strengthScore === 2 ? "Medium" : "Weak"}
                            </span>
                          </div>

                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex gap-1">
                            <div
                              className={`h-full flex-1 transition-all duration-300 rounded-full ${
                                strengthScore >= 1
                                  ? strengthScore === 3
                                    ? "bg-emerald-500"
                                    : strengthScore === 2
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                                  : "bg-slate-200"
                              }`}
                            ></div>
                            <div
                              className={`h-full flex-1 transition-all duration-300 rounded-full ${
                                strengthScore >= 2
                                  ? strengthScore === 3
                                    ? "bg-emerald-500"
                                    : "bg-amber-500"
                                  : "bg-slate-200"
                              }`}
                            ></div>
                            <div
                              className={`h-full flex-1 transition-all duration-300 rounded-full ${
                                strengthScore === 3 ? "bg-emerald-500" : "bg-slate-200"
                              }`}
                            ></div>
                          </div>

                          {/* Password Criteria Checklist */}
                          <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                            <div className={`flex items-center gap-1.5 ${passwordLength ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                              <IconCheck className={`w-3.5 h-3.5 ${passwordLength ? "text-emerald-600" : "text-slate-300"}`} />
                              8+ characters
                            </div>
                            <div className={`flex items-center gap-1.5 ${passwordHasUppercase ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                              <IconCheck className={`w-3.5 h-3.5 ${passwordHasUppercase ? "text-emerald-600" : "text-slate-300"}`} />
                              Uppercase letter
                            </div>
                            <div className={`flex items-center gap-1.5 ${passwordHasNumOrSymbol ? "text-emerald-600 font-semibold" : "text-slate-400"}`}>
                              <IconCheck className={`w-3.5 h-3.5 ${passwordHasNumOrSymbol ? "text-emerald-600" : "text-slate-300"}`} />
                              Number or Symbol
                            </div>
                          </div>
                        </div>
                      )}

                      {errors.password && (
                        <p className="text-xs text-rose-500 font-medium animate-in fade-in">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-1.5">
                      <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Confirm Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={() => handleBlur("confirmPassword")}
                          placeholder="Confirm your password"
                          aria-invalid={!!errors.confirmPassword}
                          className={`w-full bg-slate-50/70 border rounded-2xl px-4 py-3 pr-11 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white transition-all ${
                            errors.confirmPassword
                              ? "border-rose-400 focus:ring-2 focus:ring-rose-400"
                              : "border-slate-200 focus:border-sky-400 focus:ring-2 focus:ring-sky-300/40"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                          aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                          {showConfirmPassword ? <IconEyeOff className="w-5 h-5" /> : <IconEye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-rose-500 font-medium animate-in fade-in">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Checkbox: Terms & Privacy */}
                    <div className="pt-1 space-y-1">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          onBlur={() => handleBlur("agreeToTerms")}
                          className="mt-0.5 w-4 h-4 text-sky-500 rounded border-slate-300 focus:ring-sky-400 cursor-pointer"
                        />
                        <span className="text-xs text-slate-600 leading-normal">
                          I agree to the{" "}
                          <a href="#" className="text-sky-600 font-semibold hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-sky-600 font-semibold hover:underline">
                            Privacy Policy
                          </a>.
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="text-xs text-rose-500 font-medium animate-in fade-in">
                          {errors.agreeToTerms}
                        </p>
                      )}
                    </div>

                    {/* Primary CTA Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3.5 px-6 rounded-full shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm mt-4 cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <IconSpinner className="w-5 h-5 text-white" />
                          <span>Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <IconArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>

                  {/* Below Button Link: Login */}
                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-600">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="text-sky-600 hover:text-sky-700 font-bold hover:underline transition-colors"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
