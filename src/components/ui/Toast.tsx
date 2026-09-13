import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useToastStore } from '../../store/useToastStore';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl shadow-lg border transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-5 ${
              isSuccess
                ? 'bg-emerald-900/90 text-emerald-50 border-emerald-700/50 dark:bg-emerald-950 dark:border-emerald-800'
                : isError
                ? 'bg-rose-900/90 text-rose-50 border-rose-700/50 dark:bg-rose-950 dark:border-rose-800'
                : isWarning
                ? 'bg-amber-900/90 text-amber-50 border-amber-700/50 dark:bg-amber-950 dark:border-amber-800'
                : 'bg-zinc-900/90 text-zinc-50 border-zinc-700/50 dark:bg-zinc-900 dark:border-zinc-800'
            }`}
          >
            <div className="shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
              {isError && <XCircle className="w-5 h-5 text-rose-300" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-300" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-amber-400" />}
            </div>
            <p className="text-sm font-medium leading-tight flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              aria-label="Close toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
