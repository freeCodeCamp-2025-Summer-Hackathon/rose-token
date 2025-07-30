import React from 'react';
import { LessonList } from './LessonList';
import type { Lesson } from '../../types/lesson';

const testLessons: Lesson[] = [
  // Cherokee Lessons
  {
    id: '1',
    languageId: 'cherokee',
    title: 'Cherokee Syllabary Basics',
    description: 'Learn the Cherokee writing system with 85 syllabic characters',
    content: 'Introduction to ᏣᎳᎩ syllabary...',
    order: 1,
    duration: 15,
    level: 'beginner',
    tags: ['writing', 'syllabary', 'basics'],
    isPublished: true,
    lessonType: 'flashcard',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contributorName: 'Joseph Horn',
    flashcards: [
      { id: '1', lessonId: '1', front: 'ᎦᏙ', back: 'hello', difficulty: 1 },
      { id: '2', lessonId: '1', front: 'ᏩᏙ', back: 'thank you', difficulty: 2 }
    ],
    completionRate: 85,
    userCompleted: false
  },
  {
    id: '2',
    languageId: 'cherokee',
    title: 'Cherokee Pronunciation Guide',
    description: 'Audio lessons for proper Cherokee pronunciation',
    content: 'Cherokee pronunciation rules...',
    order: 2,
    duration: 20,
    level: 'beginner',
    tags: ['pronunciation', 'audio', 'speaking'],
    isPublished: true,
    lessonType: 'audio',
    audioUrl: '/audio/cherokee-pronunciation.mp3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contributorName: 'Mary Swimmer',
    completionRate: 45,
    userCompleted: false
  },
  {
    id: '3',
    languageId: 'cherokee',
    title: 'Cherokee Grammar: Word Order',
    description: 'Understanding Cherokee SOV (Subject-Object-Verb) structure',
    content: 'Cherokee uses SOV word order...',
    order: 3,
    duration: 25,
    level: 'intermediate',
    tags: ['grammar', 'syntax', 'structure'],
    isPublished: true,
    lessonType: 'grammar',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contributorName: 'Robert Littlejohn',
    completionRate: 100,
    userCompleted: true
  },

  // Basque Lessons
  {
    id: '4',
    languageId: 'basque',
    title: 'Basque Essential Phrases',
    description: 'Common greetings and everyday expressions in Euskera',
    content: 'Essential Basque phrases for beginners...',
    order: 1,
    duration: 12,
    level: 'beginner',
    tags: ['phrases', 'greetings', 'everyday'],
    isPublished: true,
    lessonType: 'flashcard',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contributorName: 'Mikel Etxeberria',
    flashcards: [
      { id: '3', lessonId: '4', front: 'Kaixo', back: 'Hello', difficulty: 1 },
      { id: '4', lessonId: '4', front: 'Eskerrik asko', back: 'Thank you very much', difficulty: 2 },
      { id: '5', lessonId: '4', front: 'Barkatu', back: 'Excuse me', difficulty: 1 }
    ],
    completionRate: 60,
    userCompleted: false
  },
  {
    id: '5',
    languageId: 'basque',
    title: 'Basque Ergative Case',
    description: 'Understanding the unique ergative-absolutive alignment',
    content: 'Basque ergative case system...',
    order: 2,
    duration: 30,
    level: 'advanced',
    tags: ['grammar', 'cases', 'ergative'],
    isPublished: true,
    lessonType: 'grammar',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contributorName: 'Ane Goikoetxea',
    completionRate: 20,
    userCompleted: false
  },

  // Hmong Lessons
  {
    id: '6',
    languageId: 'hmong',
    title: 'Hmong Tone System',
    description: 'Master the 7-tone system in White Hmong',
    content: 'Hmong tonal pronunciation...',
    order: 1,
    duration: 18,
    level: 'intermediate',
    tags: ['tones', 'pronunciation', 'audio'],
    isPublished: true,
    lessonType: 'audio',
    audioUrl: '/audio/hmong-tones.mp3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contributorName: 'Pao Yang',
    completionRate: 0,
    userCompleted: false
  },
  {
    id: '7',
    languageId: 'hmong',
    title: 'Hmong Family Terms',
    description: 'Learn the complex kinship vocabulary',
    content: 'Hmong family relationships...',
    order: 2,
    duration: 22,
    level: 'beginner',
    tags: ['family', 'kinship', 'vocabulary'],
    isPublished: true,
    lessonType: 'flashcard',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contributorName: 'Mai Vue',
    flashcards: [
      { id: '6', lessonId: '7', front: 'niam', back: 'mother', difficulty: 1 },
      { id: '7', lessonId: '7', front: 'txiv', back: 'father', difficulty: 1 },
      { id: '8', lessonId: '7', front: 'pog', back: 'grandmother (maternal)', difficulty: 2 }
    ],
    completionRate: 30,
    userCompleted: false
  },

  // Mixed lesson types for testing
  {
    id: '8',
    languageId: 'cherokee',
    title: 'Cherokee Conversation Practice',
    description: 'Practice basic dialogues and conversations',
    content: 'Cherokee conversation examples...',
    order: 4,
    duration: 35,
    level: 'intermediate',
    tags: ['conversation', 'practice', 'dialogue'],
    isPublished: true,
    lessonType: 'conversation',
    audioUrl: '/audio/cherokee-conversation.mp3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    contributorName: 'Elizabeth Ridge',
    completionRate: 0,
    userCompleted: false
  }
];

export const LessonTest: React.FC = () => {
  const handleLessonClick = (lesson: Lesson) => {
    console.log('Opening lesson:', lesson.title);
    // Here you would navigate to the lesson detail page
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <LessonList
        lessons={testLessons}
        languageName="Uncommon Languages"
        onLessonClick={handleLessonClick}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};
