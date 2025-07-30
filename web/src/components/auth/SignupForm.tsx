import React, { useState } from 'react';
import type { SignupFormData, User } from '../../types/auth';

interface SignupFormProps {
  onSuccess?: (user: User) => void;
  onClose: () => void;
}

const UNCOMMON_LANGUAGES = [
  'Cherokee', 'Basque', 'Hmong', 'Quechua', 'Maori', 'Navajo', 
  'Welsh', 'Hawaiian', 'Inuktitut', 'Sami', 'Guarani', 'Tibetan'
];

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    userType: 'learner',
    agreeToTerms: false,
    interestedLanguages: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Update password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      interestedLanguages: (prev.interestedLanguages || []).includes(language)
        ? (prev.interestedLanguages || []).filter(lang => lang !== language)
        : [...(prev.interestedLanguages || []), language]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful signup
      const mockUser: User = {
        id: '2',
        name: formData.name,
        email: formData.email,
        username: formData.username,
        role: 'USER',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        preferredLanguages: formData.interestedLanguages || []
      };

      onSuccess?.(mockUser);
      onClose();
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500';
    if (passwordStrength <= 50) return 'bg-yellow-500';
    if (passwordStrength <= 75) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak';
    if (passwordStrength <= 50) return 'Fair';
    if (passwordStrength <= 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className="space-y-4">{/* Removed overflow styling to prevent double scroll */}
      {/* Welcome Message */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          Join the Language Preservation Movement
        </h3>
        <p className="text-xs text-gray-600">
          Help preserve rare languages for future generations
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name and Email Row */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Your full name"
              disabled={loading}
            />
          </div>
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
        </div>

        {/* Username */}
        <div>
          <label htmlFor="username" className="block text-xs font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
            placeholder="Choose a username"
            disabled={loading}
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-2 gap-3">
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
              minLength={8}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Create a password"
              disabled={loading}
            />
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-1">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {getPasswordStrengthText()}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
              placeholder="Confirm your password"
              disabled={loading}
            />
          </div>
        </div>

        {/* User Type Selection */}
        <div>
          <label htmlFor="userType" className="block text-xs font-medium text-gray-700 mb-1">
            I am joining as a...
          </label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors bg-white"
            disabled={loading}
          >
            <option value="learner">🎓 Language Learner</option>
            <option value="contributor">✍️ Language Contributor</option>
            <option value="native_speaker">🗣️ Native Speaker</option>
            <option value="researcher">🔬 Language Researcher</option>
          </select>
        </div>

        {/* Language Interests */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Languages I'm interested in:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {UNCOMMON_LANGUAGES.map(language => (
              <label
                key={language}
                className={`flex items-center gap-1 p-1.5 rounded-md border cursor-pointer transition-colors text-xs ${
                  (formData.interestedLanguages || []).includes(language)
                    ? 'bg-orange-50 border-orange-300 text-orange-700'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <input
                  type="checkbox"
                  checked={(formData.interestedLanguages || []).includes(language)}
                  onChange={() => handleLanguageToggle(language)}
                  className="w-3 h-3 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  disabled={loading}
                />
                <span className="font-medium truncate">{language}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
            className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-0.5"
            disabled={loading}
          />
          <label htmlFor="agreeToTerms" className="text-xs text-gray-600 leading-tight">
            I agree to the{' '}
            <button type="button" className="text-orange-600 hover:text-orange-700 underline">
              Terms of Service
            </button>
            {' '}and{' '}
            <button type="button" className="text-orange-600 hover:text-orange-700 underline">
              Privacy Policy
            </button>
            , and I'm committed to helping preserve endangered languages.
          </label>
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
          disabled={loading || !formData.agreeToTerms}
          className="w-full bg-orange-500 text-white py-2.5 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Creating Account...
            </span>
          ) : (
            'Join LangLantern Community'
          )}
        </button>
      </form>

      {/* Benefits Summary */}
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-md p-3">
        <h4 className="font-medium text-gray-800 mb-2 flex items-center gap-2 text-sm">
          <span>🎯</span> What you'll get:
        </h4>
        <ul className="space-y-1 text-xs text-gray-600">
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Access to rare language learning materials
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Connect with native speakers worldwide
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Contribute to language preservation efforts
          </li>
          <li className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            Track your learning progress and achievements
          </li>
        </ul>
      </div>
    </div>
  );
};
