import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({
  addToast: (message, type = 'info', duration = 4000) => {},
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Notification Container */}
      <div
        className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none"
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        aria-relevant="additions"
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            role={toast.type === 'error' ? 'alert' : 'status'}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl backdrop-blur-md border shadow-2xl transition-all duration-300 animate-slideInRight ${
              toast.type === 'success'
                ? 'bg-[#0f1f18]/90 border-[#10b981]/40 text-[#a7f3d0]'
                : toast.type === 'error'
                ? 'bg-[#2a0e14]/90 border-[#e11d48]/40 text-[#fecdd3]'
                : 'bg-[#182333]/90 border-[#f59e0b]/40 text-[#fde68a]'
            }`}
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" aria-hidden="true" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-[#e11d48] shrink-0 mt-0.5" aria-hidden="true" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" aria-hidden="true" />
            )}

            <div className="flex-1 text-sm font-medium leading-relaxed">{toast.message}</div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
