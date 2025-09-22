import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Component
const ToastItem: React.FC<Toast & { onClose: (id: string) => void }> = ({
  id,
  type,
  title,
  message,
  onClose
}) => {
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          icon: <CheckCircle className="w-5 h-5 text-green-600" />,
          titleColor: 'text-green-900',
          messageColor: 'text-green-700'
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: <XCircle className="w-5 h-5 text-red-600" />,
          titleColor: 'text-red-900',
          messageColor: 'text-red-700'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 border-yellow-200',
          icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
          titleColor: 'text-yellow-900',
          messageColor: 'text-yellow-700'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: <Info className="w-5 h-5 text-blue-600" />,
          titleColor: 'text-blue-900',
          messageColor: 'text-blue-700'
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div className={`min-w-80 max-w-md w-auto ${styles.bg} border rounded-lg shadow-lg transition-all duration-300 transform animate-slide-in-right`}>
      <div className="flex items-start p-4 min-h-16">
        <div className="flex-shrink-0 mt-0.5">
          {styles.icon}
        </div>
        <div className="mx-3 flex-1 min-w-0">
          <p className={`text-sm font-medium leading-5 ${styles.titleColor}`}>
            {title}
          </p>
          {message && (
            <p className={`mt-1 text-sm leading-5 ${styles.messageColor} break-words`}>
              {message}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 ml-2">
          <button
            onClick={() => onClose(id)}
            className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Container
const ToastContainer: React.FC<{ toasts: Toast[]; onClose: (id: string) => void }> = ({
  toasts,
  onClose
}) => {
  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
};

// Toast Provider
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration (default 5 seconds)
    const duration = toast.duration ?? 5000;
    setTimeout(() => {
      hideToast(id);
    }, duration);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
};

// Utility functions for easy use
export const toast = {
  success: (title: string, message?: string, duration?: number) => ({
    type: 'success' as const,
    title,
    message,
    duration
  }),
  error: (title: string, message?: string, duration?: number) => ({
    type: 'error' as const,
    title,
    message,
    duration
  }),
  warning: (title: string, message?: string, duration?: number) => ({
    type: 'warning' as const,
    title,
    message,
    duration
  }),
  info: (title: string, message?: string, duration?: number) => ({
    type: 'info' as const,
    title,
    message,
    duration
  })
};