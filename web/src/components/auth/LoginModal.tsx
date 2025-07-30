import React from 'react';
import { LoginForm } from './LoginForm';
import type { User } from '../../types/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
  onSwitchToSignup?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onSwitchToSignup
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏮</span>
            <div>
              <span className="text-lg font-bold text-orange-600">LangLantern</span>
              <p className="text-xs text-gray-600">Sign in to your account</p>
            </div>
          </div>
          <button 
            className="text-gray-400 hover:text-gray-600 transition-colors"
            onClick={onClose}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <LoginForm onSuccess={onSuccess} onClose={onClose} />
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <p className="text-center text-sm text-gray-600">
            New to LangLantern?{' '}
            <button
              className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
              onClick={onSwitchToSignup}
            >
              Join our community
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
