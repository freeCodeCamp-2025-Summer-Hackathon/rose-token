import React, { useState } from 'react';
import type { LoginFormData, User } from '../../types/auth';

interface LoginFormProps {
  onSuccess?: (user: User) => void;
  onClose: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login for demo
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: formData.email,
        username: 'demo_user',
        role: 'USER',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferredLanguages: ['Cherokee', 'Basque', 'Hmong']
      };

      onSuccess?.(mockUser);
      onClose();
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider} - Feature coming soon!`);
  };

  return (
    <div className="space-y-4">
      {/* Demo Notice */}
      <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
        <div className="flex items-start gap-2">
          <span className="text-orange-500">ℹ️</span>
          <div>
            <h4 className="font-medium text-orange-800 text-sm mb-1">Demo Mode</h4>
            <p className="text-xs text-orange-700">
              Use any email and password (6+ characters) to sign in
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="your@email.com"
            disabled={loading}
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-3 h-3 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              disabled={loading}
            />
            <span className="text-xs text-gray-700">Remember me</span>
          </label>
          <button
            type="button"
            className="text-xs text-orange-600 hover:text-orange-700 transition-colors"
            disabled={loading}
          >
            Forgot password?
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-2">
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-sm">⚠️</span>
              <p className="text-xs text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.email || formData.password.length < 6}
          className="w-full bg-orange-500 text-white py-2.5 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing in...
            </span>
          ) : (
            'Sign In to LangLantern'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative bg-white px-3 text-xs text-gray-500">
          Or continue with
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => handleSocialLogin('Google')}
          className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs font-medium"
          disabled={loading}
        >
          <span>🔍</span> Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('Facebook')}
          className="flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs font-medium"
          disabled={loading}
        >
          <span>📘</span> Facebook
        </button>
      </div>

      {/* Community Benefits */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-md p-3">
        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2 text-sm">
          <span>🌟</span> Join the LangLantern Community
        </h4>
        <ul className="space-y-1 text-xs text-gray-600">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Track your learning progress across rare languages
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Connect with native speakers and language enthusiasts
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Contribute to preserving endangered languages
          </li>
        </ul>
      </div>
    </div>
  );
};
