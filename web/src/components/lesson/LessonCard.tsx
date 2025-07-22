import React from 'react';
import type { LessonCardProps } from '../../types/lesson';

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  progress = 0,
  onClick,
  showProgress = true
}) => {
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'flashcard': return '🃏';
      case 'audio': return '🔊';
      case 'grammar': return '📝';
      case 'quiz': return '🧩';
      case 'conversation': return '💬';
      default: return '📚';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-500 text-white';
      case 'intermediate': return 'bg-yellow-500 text-white';
      case 'advanced': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div 
      className={`
        relative bg-white border-2 rounded-xl p-4 cursor-pointer transition-all duration-300
        shadow-md hover:shadow-lg hover:-translate-y-0.5 min-h-[160px]
        ${lesson.userCompleted ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-white' : 'border-gray-200 hover:border-orange-300'}
      `}
      onClick={() => onClick?.(lesson)}
    >
      {/* Completion Glow */}
      {lesson.userCompleted && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-transparent opacity-50 pointer-events-none rounded-xl" />
      )}

      <div className="relative z-10">
        {/* Lesson Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getLessonIcon(lesson.lessonType)}</span>
            <span className="text-sm font-medium text-gray-600 capitalize">{lesson.lessonType}</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.level)}`}>
            {lesson.level}
          </div>
        </div>

        {/* Lesson Content */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-800 leading-tight">{lesson.title}</h3>
          {lesson.description && (
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{lesson.description}</p>
          )}

          {/* Lesson Stats */}
          <div className="flex flex-wrap gap-2 text-xs">
            {lesson.duration && (
              <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                ⏱️ {lesson.duration} min
              </span>
            )}
            {lesson.flashcards && (
              <span className="flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                🃏 {lesson.flashcards.length} cards
              </span>
            )}
            {lesson.audioUrl && (
              <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                🔊 Audio
              </span>
            )}
            {lesson.contributorName && (
              <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                👤 {lesson.contributorName}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {showProgress && (
            <div className="flex items-center gap-3 mt-4">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-500 transition-all duration-300 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-orange-600 min-w-[45px]">
                {Math.round(progress)}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Completion Badge */}
      {lesson.userCompleted && (
        <div className="absolute top-2 right-2 text-xl z-20">
          ✅
        </div>
      )}
    </div>
  );
};