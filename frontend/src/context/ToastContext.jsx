import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const toast = {
    success: (message, title = 'Success') => addToast({ type: 'success', title, message }),
    error: (message, title = 'Error') => addToast({ type: 'error', title, message, duration: 6000 }),
    warning: (message, title = 'Warning') => addToast({ type: 'warning', title, message, duration: 5000 }),
    info: (message, title = 'Information') => addToast({ type: 'info', title, message }),
  };

  return (
    <ToastContext.Provider value={{ toast, addToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
        {toasts.map((item) => {
          const typeStyles = {
            success: {
              bg: 'bg-white border-emerald-500/30 text-emerald-950 shadow-emerald-500/10',
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
              badge: 'bg-emerald-50 text-emerald-700',
            },
            error: {
              bg: 'bg-white border-rose-500/30 text-rose-950 shadow-rose-500/10',
              icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
              badge: 'bg-rose-50 text-rose-700',
            },
            warning: {
              bg: 'bg-white border-amber-500/30 text-amber-950 shadow-amber-500/10',
              icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
              badge: 'bg-amber-50 text-amber-700',
            },
            info: {
              bg: 'bg-white border-primary-500/30 text-primary-950 shadow-primary-500/10',
              icon: <Info className="w-5 h-5 text-primary-500 shrink-0" />,
              badge: 'bg-primary-50 text-primary-700',
            },
          }[item.type] || {
            bg: 'bg-white border-gray-200 text-gray-900',
            icon: <Info className="w-5 h-5 text-gray-500 shrink-0" />,
            badge: 'bg-gray-100 text-gray-700',
          };

          return (
            <div
              key={item.id}
              className={`pointer-events-auto p-4 rounded-xl border shadow-xl flex items-start gap-3 transition-all duration-300 transform translate-y-0 ${typeStyles.bg}`}
            >
              {typeStyles.icon}
              <div className="flex-1 min-w-0">
                {item.title && (
                  <h4 className="text-sm font-semibold text-[#171923]">{item.title}</h4>
                )}
                <p className="text-xs text-[#737987] mt-0.5 leading-relaxed break-words">{item.message}</p>
              </div>
              <button
                onClick={() => removeToast(item.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 -mt-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context.toast;
};
