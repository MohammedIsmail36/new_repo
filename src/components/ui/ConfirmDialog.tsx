import React, { ReactNode } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
  icon?: ReactNode;
  isLoading?: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'تأكيد العملية',
  message = 'هل أنت متأكد من هذا الإجراء؟',
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  type = 'danger',
  icon,
  isLoading = false
}) => {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          confirmButton: 'danger'
        };
      case 'warning':
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          confirmButton: 'warning'
        };
      case 'info':
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          confirmButton: 'default'
        };
      default:
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          confirmButton: 'danger'
        };
    }
  };

  const typeStyles = getTypeStyles();
  const defaultIcon = type === 'danger' ? <Trash2 className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          disabled={isLoading}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          {/* Icon */}
          <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${typeStyles.iconBg} flex items-center justify-center`}>
            <div className={typeStyles.iconColor}>
              {icon || defaultIcon}
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {message}
            </p>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="min-w-[100px]"
              >
                {cancelText}
              </Button>
              <Button
                variant={typeStyles.confirmButton as any}
                onClick={onConfirm}
                disabled={isLoading}
                className="min-w-[100px]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري المعالجة...
                  </div>
                ) : (
                  confirmText
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;