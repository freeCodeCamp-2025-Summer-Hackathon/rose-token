import React from 'react';
import type { CategoryCardProps } from '../../types/category';

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  progress = 0,
  isLocked = false,
  onClick
}) => {
  // Calculate if category is "lit up" based on progress
  const isLitUp = progress > 0;
  
  return (
    <div 
      className={`
        relative overflow-hidden bg-white cursor-pointer transition-all duration-300 ease-out
        border-2 rounded-2xl min-h-[200px] shadow-lg
        ${isLitUp ? 'border-orange-500 shadow-orange-200' : 'border-gray-200'}
        ${isLocked ? 'opacity-60 cursor-not-allowed grayscale-50' : 'hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-200'}
      `}
      onClick={() => !isLocked && onClick?.(category)}
      style={{ '--category-color': category.color || '#FF6B35' } as React.CSSProperties}
    >
      {/* Lantern Glow Effect */}
      {isLitUp && (
        <div className="absolute inset-0 opacity-10 transition-opacity duration-300 hover:opacity-20 z-0"
             style={{ background: `radial-gradient(circle at center, ${category.color || '#FF6B35'} 0%, transparent 70%)` }} />
      )}
      
      {/* Card Header with Category Color */}
      <div 
        className="relative z-10 flex items-center justify-between p-4"
        style={{ 
          background: `linear-gradient(135deg, ${category.color || '#FF6B35'} 0%, rgba(255,255,255,0.1) 100%)` 
        }}
      >
        <div className="text-2xl drop-shadow-sm">
          🏮
        </div>
        <div className="relative">
          <svg className="w-6 h-6 transform -rotate-90" width="24" height="24">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              strokeWidth="2"
              strokeDasharray={`${progress * 0.628} 62.8`}
              className="stroke-white stroke-2 opacity-80"
              style={{ strokeLinecap: 'round' }}
            />
          </svg>
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 p-4 pt-2">
        <h3 className="text-lg font-bold mb-1 text-gray-800">{category.name}</h3>
        
        {/* Native name for languages */}
        {(category as any).nativeName && (
          <p className="text-sm italic text-gray-600 mb-2 font-medium">
            {(category as any).nativeName}
          </p>
        )}
        
        {category.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {category.description}
          </p>
        )}
        
        {/* Language-specific info */}
        <div className="flex flex-col gap-1 mb-3 text-xs">
          {(category as any).region && (
            <span className="text-gray-500 font-medium">📍 {(category as any).region}</span>
          )}
          {(category as any).speakerCount && (
            <span className="text-gray-500 font-medium">
              👥 {(category as any).speakerCount?.toLocaleString()} speakers
            </span>
          )}
        </div>

        {/* Content availability indicators */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(category as any).hasAudio && (
            <span className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-md font-medium">
              🔊 Audio
            </span>
          )}
          {(category as any).hasGrammarNotes && (
            <span className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-md font-medium">
              📝 Grammar
            </span>
          )}
          {(category as any).flashcardCount && (
            <span className="text-xs px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-md font-medium">
              🃏 {(category as any).flashcardCount} cards
            </span>
          )}
        </div>
        
        {/* Progress Info */}
        <div className="flex items-center justify-between text-xs">
          <div className="text-gray-500 font-medium">
            {category.lessons?.length || 0} lessons • {(category as any).contributorCount || 0} contributors
          </div>
          {progress > 0 && (
            <div className="font-semibold text-orange-600">
              {Math.round(progress)}% complete
            </div>
          )}
        </div>
      </div>

      {/* Lock Overlay */}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="text-3xl opacity-60">🔒</div>
        </div>
      )}
    </div>
  );
};