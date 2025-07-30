export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
  
  // Language learning profile
  preferredLanguages?: string[];
  contributorProfile?: ContributorProfile;
  learnerProfile?: LearnerProfile;
}

export interface ContributorProfile {
  bio?: string;
  expertise: string[]; // Languages they can contribute to
  contributionCount: number;
  rating?: number; // Community rating
  verified: boolean;
}

export interface LearnerProfile {
  currentLanguages: string[]; // Languages they're learning
  completedLessons: number;
  streakDays: number;
  xpPoints: number;
  achievements: string[];
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  userType: 'learner' | 'contributor' | 'both';
  agreeToTerms: boolean;
  // Optional initial language interests
  interestedLanguages?: string[];
}

export interface AuthFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
  defaultMode?: 'login' | 'signup';
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginFormData) => Promise<AuthResponse>;
  signup: (data: SignupFormData) => Promise<AuthResponse>;
  logout: () => void;
  loading: boolean;
}
