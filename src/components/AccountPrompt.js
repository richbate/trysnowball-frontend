import React, { useState } from 'react';
import { useUserFlow } from '../contexts/UserFlowContext';
import { useTheme } from '../contexts/ThemeContext';
import Auth from './auth';

const AccountPrompt = () => {
  const { showAccountPrompt, dismissAccountPrompt, migrateDataToAccount } = useUserFlow();
  const { colors } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!showAccountPrompt) return null;

  const handleAuthSuccess = async (userData) => {
    await migrateDataToAccount(userData);
    setShowAuthModal(false);
  };

  if (showAuthModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="max-w-md w-full max-h-[90vh] overflow-y-auto">
          <div className="relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute -top-2 -right-2 z-10 bg-gray-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              ×
            </button>
            <Auth onAuthSuccess={handleAuthSuccess} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm animate-slide-up">
      <div className={`${colors.surface} rounded-lg shadow-lg ${colors.border} border p-6`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${colors.text.primary} mb-2`}>
              Save Your Progress! 🎉
            </h3>
            <p className={`text-sm ${colors.text.secondary} mb-4`}>
              You're making great progress! Create an account to save your debt data and track your journey to freedom.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowAuthModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Create Account
              </button>
              <button
                onClick={dismissAccountPrompt}
                className={`px-4 py-2 ${colors.surfaceSecondary} ${colors.text.secondary} rounded-lg hover:${colors.surface} transition-colors text-sm font-medium`}
              >
                Maybe Later
              </button>
            </div>
          </div>
          <button
            onClick={dismissAccountPrompt}
            className={`flex-shrink-0 ${colors.text.muted} hover:${colors.text.secondary} transition-colors`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPrompt;