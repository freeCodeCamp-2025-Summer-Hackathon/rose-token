import React, { useState } from 'react';
import { LessonCard } from './LessonCard';
import type { LessonListProps, LessonFilters } from '../../types/lesson';

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  languageName = '',
  filters,
  onFilterChange,
  onLessonClick
}) => {
  const [localFilters, setLocalFilters] = useState<LessonFilters>(filters || {});

  const handleFilterChange = (newFilters: Partial<LessonFilters>) => {
    const updatedFilters = { ...localFilters, ...newFilters };
    setLocalFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
  };

  const filteredLessons = lessons.filter(lesson => {
    // Filter by lesson type
    if (localFilters.lessonType && localFilters.lessonType.length > 0) {
      if (!localFilters.lessonType.includes(lesson.lessonType)) return false;
    }

    // Filter by level
    if (localFilters.level && localFilters.level.length > 0) {
      if (!localFilters.level.includes(lesson.level)) return false;
    }

    // Filter by audio availability
    if (localFilters.hasAudio) {
      if (!lesson.audioUrl) return false;
    }

    // Filter by completion status
    if (localFilters.completed !== undefined) {
      if (lesson.userCompleted !== localFilters.completed) return false;
    }

    // Filter by search term
    if (localFilters.search) {
      const searchLower = localFilters.search.toLowerCase();
      if (!lesson.title.toLowerCase().includes(searchLower) && 
          !lesson.description?.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    return true;
  });

  const getLessonTypeCount = (type: string) => {
    return lessons.filter(lesson => lesson.lessonType === type).length;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 rounded-2xl border border-orange-200 p-8 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {languageName ? `${languageName} Language Lessons` : 'Language Lessons'}
            </h1>
            <div className="flex items-center gap-4 text-lg">
              <span className="text-gray-700 font-medium">
                {filteredLessons.length} of {lessons.length} lessons
              </span>
              {languageName && (
                <span className="px-3 py-1 bg-orange-200 text-orange-800 rounded-full text-sm font-semibold">
                  Uncommon Languages
                </span>
              )}
            </div>
          </div>
          <div className="text-6xl opacity-80 hidden sm:block">🏮</div>
        </div>
      </div>

      {/* Enhanced Filter Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <span>🎯</span>
            Filter & Search
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Lesson Type Filters */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Lesson Type:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                  !localFilters.lessonType 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg scale-105' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50'
                }`}
                onClick={() => handleFilterChange({ lessonType: undefined })}
              >
                All ({lessons.length})
              </button>
              <button
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                  localFilters.lessonType?.includes('flashcard')
                    ? 'bg-purple-500 text-white border-purple-500 shadow-lg scale-105' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50'
                }`}
                onClick={() => handleFilterChange({ 
                  lessonType: localFilters.lessonType?.includes('flashcard') 
                    ? localFilters.lessonType.filter(t => t !== 'flashcard')
                    : [...(localFilters.lessonType || []), 'flashcard']
                })}
              >
                🃏 Flashcards ({getLessonTypeCount('flashcard')})
              </button>
              <button
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                  localFilters.lessonType?.includes('audio')
                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg scale-105' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
                }`}
                onClick={() => handleFilterChange({ 
                  lessonType: localFilters.lessonType?.includes('audio') 
                    ? localFilters.lessonType.filter(t => t !== 'audio')
                    : [...(localFilters.lessonType || []), 'audio']
                })}
              >
                🔊 Audio ({getLessonTypeCount('audio')})
              </button>
              <button
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                  localFilters.lessonType?.includes('grammar')
                    ? 'bg-green-500 text-white border-green-500 shadow-lg scale-105' 
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:text-green-600 hover:bg-green-50'
                }`}
                onClick={() => handleFilterChange({ 
                  lessonType: localFilters.lessonType?.includes('grammar') 
                    ? localFilters.lessonType.filter(t => t !== 'grammar')
                    : [...(localFilters.lessonType || []), 'grammar']
                })}
              >
                📝 Grammar ({getLessonTypeCount('grammar')})
              </button>
            </div>
          </div>

          {/* Difficulty Level Filters */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Difficulty Level:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { level: 'beginner', color: 'green', icon: '🌱' },
                { level: 'intermediate', color: 'yellow', icon: '⚡' },
                { level: 'advanced', color: 'red', icon: '🔥' }
              ].map(({ level, color, icon }) => (
                <button
                  key={level}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-2 ${
                    localFilters.level?.includes(level)
                      ? `bg-${color}-500 text-white border-${color}-500 shadow-lg scale-105` 
                      : `bg-white text-gray-700 border-gray-200 hover:border-${color}-300 hover:text-${color}-600 hover:bg-${color}-50`
                  }`}
                  onClick={() => handleFilterChange({ 
                    level: localFilters.level?.includes(level) 
                      ? localFilters.level.filter(l => l !== level)
                      : [...(localFilters.level || []), level]
                  })}
                >
                  {icon} {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-bold text-gray-800 uppercase tracking-wider">Search:</span>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search lessons by title or description..."
                value={localFilters.search || ''}
                onChange={(e) => handleFilterChange({ search: e.target.value })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-100 focus:border-orange-400 outline-none transition-all duration-200 text-lg placeholder-gray-400"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                🔍
              </div>
              {localFilters.search && (
                <button
                  onClick={() => handleFilterChange({ search: '' })}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-xl">✕</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Lesson Grid */}
      <div>
        {filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLessons.map(lesson => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                progress={lesson.completionRate || 0}
                onClick={onLessonClick}
                showProgress={true}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
            <div className="text-8xl mb-6 opacity-50">📚</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">No lessons found</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-8 text-lg leading-relaxed">
              Try adjusting your filters or search terms to discover more lessons for learning {languageName || 'languages'}.
            </p>
            <button
              onClick={() => handleFilterChange({ search: '', lessonType: undefined, level: undefined })}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🔄 Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
