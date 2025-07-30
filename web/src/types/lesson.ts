export interface Lesson {
  id: string;
  languageId: string;
  title: string;
  description?: string;
  content: string;
  order: number;
  duration?: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Language learning specific
  lessonType: 'flashcard' | 'audio' | 'grammar' | 'quiz' | 'conversation';
  audioUrl?: string;
  flashcards?: Flashcard[];
  
  // Contributor info
  contributorId?: string;
  contributorName?: string;
  
  // Learning progress
  completionRate?: number; // 0-100
  userCompleted?: boolean;
}

export interface Flashcard {
  id: string;
  lessonId: string;
  front: string; // Question/prompt
  back: string; // Answer/translation
  audioUrl?: string;
  imageUrl?: string;
  difficulty: number; // 1-5
  nativeScript?: string; // For languages with different writing systems
}

export interface LessonCardProps {
  lesson: Lesson;
  progress?: number;
  onClick?: (lesson: Lesson) => void;
  showProgress?: boolean;
}

export interface LessonListProps {
  lessons: Lesson[];
  languageName?: string;
  filters?: LessonFilters;
  onFilterChange?: (filters: LessonFilters) => void;
  onLessonClick?: (lesson: Lesson) => void;
}

export interface LessonFilters {
  lessonType?: string[];
  level?: string[];
  hasAudio?: boolean;
  completed?: boolean;
  search?: string;
}