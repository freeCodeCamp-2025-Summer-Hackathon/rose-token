import React, { useState } from 'react';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';
import { Navbar } from '../layout/Navbar';
import type { User } from '../../types/auth';

export const AuthTest: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    console.log('Auth successful:', userData);
  };

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user}
        onSignIn={() => setIsLoginModalOpen(true)}
        onJoinCommunity={() => setIsSignupModalOpen(true)}
        onLogout={handleLogout}
      />
      
      {/* Main Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-6xl font-extrabold mb-6">
              🏮 Welcome to <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">LangLantern</span>! 🏮
            </h1>
            <p className="text-2xl text-gray-700 mb-4 font-medium">
              Illuminate rare languages through community learning
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover and preserve uncommon languages and dialects through crowd-sourced flashcards, 
              audio clips, and cultural knowledge. Join our community of language preservationists!
            </p>
            
            {!user ? (
              <div className="flex gap-6 justify-center flex-wrap">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-8 py-4 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignupModalOpen(true)}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Join Community
                </button>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-lg border p-8">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl text-white font-bold">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
                    <p className="text-gray-600">{user.email}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-medium">{user.role}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">Username:</span>
                      <span className="font-medium">@{user.username}</span>
                    </div>
                    {user.preferredLanguages && user.preferredLanguages.length > 0 && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Languages:</span>
                        <div className="flex gap-1 flex-wrap">
                          {user.preferredLanguages.map(lang => (
                            <span key={lang} className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {user.learnerProfile && (
                      <div className="flex justify-between items-center py-2 border-b">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium">
                          {user.learnerProfile.completedLessons} lessons • {user.learnerProfile.xpPoints} XP
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demo Note Section */}
      {!user && (
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  💡 Demo Information
                </h3>
                <p className="text-blue-700 mb-2">
                  Use any credentials to test the authentication system
                </p>
                <p className="text-sm text-blue-600">
                  Both forms are fully functional with validation and language selection features
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Components */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleAuthSuccess}
        onSwitchToSignup={handleSwitchToSignup}
      />

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSuccess={handleAuthSuccess}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};
