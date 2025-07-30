export interface Language {
  id: string;
  name: string; // e.g., "Cherokee", "Basque", "Hmong"
  description?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  lessons?: Lesson[];
  
  // Language-specific fields
  nativeName?: string; // Native script/name
  region?: string; // Geographic region
  speakerCount?: number; // Estimated number of speakers
  difficulty?: 'easy' | 'medium' | 'hard';
  hasAudio?: boolean;
  hasGrammarNotes?: boolean;
  flashcardCount?: number;
  contributorCount?: number;
}

// Type alias for backward compatibility with existing components
export type Category = Language;

export interface Lesson {
  id: string;
  categoryId: string; // languageId
  title: string;
  content: string;
  order: number;
  duration?: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Language learning specific
  lessonType: 'flashcard' | 'audio' | 'grammar' | 'quiz' | 'conversation';
  audioUrl?: string;
  flashcards?: Flashcard[];
}

export interface Flashcard {
  id: string;
  front: string; // Question/prompt
  back: string; // Answer/translation
  audioUrl?: string;
  imageUrl?: string;
  difficulty: number; // 1-5
}

export interface LanguageCardProps {
  language: Language;
  progress?: number; // 0-100
  isLocked?: boolean;
  onClick?: (language: Language) => void;
}

// Backward compatibility - keeping old interface name
export interface CategoryCardProps {
  category: Language; // Using Language type but keeping category prop name
  progress?: number; // 0-100
  isLocked?: boolean;
  onClick?: (category: Language) => void;
}

export interface LanguageGridProps {
  languages: Language[];
  userProgress?: Record<string, number>; // languageId -> progress percentage
  onLanguageClick?: (language: Language) => void;
}