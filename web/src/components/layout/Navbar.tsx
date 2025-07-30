import React, { useState } from 'react';
import type { User } from '../../types/auth';

interface NavbarProps {
  user?: User | null;
  onSignIn?: () => void;
  onJoinCommunity?: () => void;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onSignIn,
  onJoinCommunity,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b-2 border-orange-200 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🏮</span>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  LangLantern
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">Preserving Languages</p>
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Lessons
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Languages
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              Contribute
            </a>
            <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">
              About
            </a>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            {!user ? (
              <>
                {/* Not logged in */}
                <button
                  onClick={onSignIn}
                  className="hidden sm:inline-flex px-4 py-2 text-gray-700 hover:text-orange-600 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={onJoinCommunity}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Join Community
                </button>
              </>
            ) : (
              <>
                {/* Logged in */}
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                    <p className="text-xs text-gray-600">
                      {user.contributorProfile ? 'Contributor' : 'Learner'}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-gray-600 hover:text-red-600 transition-colors font-medium"
                >
                  Logout
                </button>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium px-2 py-1">
                Lessons
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium px-2 py-1">
                Languages
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium px-2 py-1">
                Contribute
              </a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium px-2 py-1">
                About
              </a>
              
              {!user && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <button
                    onClick={onSignIn}
                    className="block w-full text-left text-gray-700 hover:text-orange-600 font-medium px-2 py-1"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
