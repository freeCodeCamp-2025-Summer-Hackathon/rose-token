import React from 'react';
import { CategoryCard } from './CategoryCard';
import type { Language } from '../../types/category';

const testLanguages: Language[] = [
  {
    id: '1',
    name: 'Cherokee',
    nativeName: 'ᏣᎳᎩ ᎦᏬᏂᎯᏍᏗ',
    description: 'Indigenous language of the Cherokee people',
    region: 'North America',
    speakerCount: 2000,
    difficulty: 'hard',
    color: '#8B4513',
    hasAudio: true,
    hasGrammarNotes: true,
    flashcardCount: 156,
    contributorCount: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lessons: [{} as any, {} as any, {} as any] // 3 lessons
  },
  {
    id: '2', 
    name: 'Basque',
    nativeName: 'Euskera',
    description: 'Ancient language isolate from the Pyrenees',
    region: 'Spain/France',
    speakerCount: 750000,
    difficulty: 'hard',
    color: '#DC143C',
    hasAudio: true,
    hasGrammarNotes: false,
    flashcardCount: 89,
    contributorCount: 12,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lessons: [{} as any, {} as any] // 2 lessons
  },
  {
    id: '3',
    name: 'Hmong',
    nativeName: 'Hmoob',
    description: 'Dialect continuum spoken by the Hmong people',
    region: 'Southeast Asia',
    speakerCount: 4000000,
    difficulty: 'medium',
    color: '#228B22',
    hasAudio: false,
    hasGrammarNotes: true,
    flashcardCount: 34,
    contributorCount: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lessons: [{} as any] // 1 lesson
  }
];

export const CategoryTest: React.FC = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Discover Uncommon Languages</h1>
      <p className="text-gray-600 mb-6">Learn rare and endangered languages through community contributions</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CategoryCard 
          category={testLanguages[0]} 
          progress={65}
          onClick={(lang: Language) => console.log('Learning:', lang.name)}
        />
        <CategoryCard 
          category={testLanguages[1]} 
          progress={23}
          onClick={(lang: Language) => console.log('Learning:', lang.name)}
        />
        <CategoryCard 
          category={testLanguages[2]} 
          progress={0}
          onClick={(lang: Language) => console.log('Learning:', lang.name)}
        />
      </div>
    </div>
  );
};