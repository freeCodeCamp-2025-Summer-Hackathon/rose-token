

//redirect to homepage
//learn lesson

import { useState } from "react";

export const LearnPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [waitingForSelfAssessment, setWaitingForSelfAssessment] = useState(false);

  // Demo learning content
  const learningContent = [
    {
      id: 1,
      type: 'flashcard',
      language: 'Spanish',
      category: 'Grammar',
      front: '¿Cómo te llamas?',
      back: 'What is your name?',
      author: 'Maria'
    },
    {
      id: 2,
      type: 'note',
      language: 'Spanish',
      category: 'Pronunciation',
      content: 'The Spanish "rr" is rolled with the tip of your tongue. Practice with words like "perro" (dog) and "carro" (car).',
      author: 'Carlos'
    },
    {
      id: 3,
      type: 'flashcard',
      language: 'Spanish',
      category: 'Vocabulary',
      front: 'El gato',
      back: 'The cat',
      author: 'Ana'
    },
    {
      id: 4,
      type: 'note',
      language: 'Spanish',
      category: 'Culture',
      content: 'In many Spanish-speaking countries, lunch is the main meal of the day and is typically eaten between 1-3 PM.',
      author: 'Diego'
    }
  ];

  const currentContent = learningContent[currentIndex];
  const isLastItem = currentIndex === learningContent.length - 1;

  const handleShowAnswer = () => {
    setShowAnswer(true);
    setWaitingForSelfAssessment(true);
  };

  const handleSelfAssessment = (wasCorrect: boolean) => {
    console.log(`User assessment: ${wasCorrect ? 'Correct' : 'Incorrect'} for item ${currentContent.id}`);
    setWaitingForSelfAssessment(false);
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < learningContent.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
      setWaitingForSelfAssessment(false);
    } else {
      console.log('Learning session completed!');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setWaitingForSelfAssessment(false);
  };

  if (currentIndex >= learningContent.length) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">🎉 Great Job!</h1>
          <p className="text-lg text-slate-600 mb-6">You've completed this learning session</p>
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            📚 Learn {currentContent.language}
          </h1>
          <div className="flex items-center justify-center gap-4 text-slate-600">
            <span>{currentIndex + 1} of {learningContent.length}</span>
            <span>•</span>
            <span>{currentContent.category}</span>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
          <div 
            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / learningContent.length) * 100}%` }}
          ></div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-slate-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium">
              {currentContent.type}
            </span>
            <span className="text-sm text-slate-500">by {currentContent.author}</span>
          </div>

          {currentContent.type === 'flashcard' ? (
            <div className="space-y-6">
              {/* Flashcard Front */}
              <div className="text-center p-6 bg-slate-50 rounded-lg">
                <div className="text-sm text-slate-600 mb-2">Question</div>
                <div className="text-2xl font-semibold text-slate-800">{currentContent.front}</div>
              </div>

              {/* Flashcard Back (shown after reveal) */}
              {showAnswer && (
                <div className="text-center p-6 bg-emerald-50 rounded-lg border-2 border-emerald-200">
                  <div className="text-sm text-emerald-700 mb-2">Answer</div>
                  <div className="text-2xl font-semibold text-emerald-800">{currentContent.back}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6 bg-slate-50 rounded-lg">
              <div className="text-slate-800 leading-relaxed">{currentContent.content}</div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          {currentContent.type === 'flashcard' ? (
            <div className="space-y-4 w-full max-w-md">
              {!showAnswer ? (
                <button
                  onClick={handleShowAnswer}
                  className="w-full py-3 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Show Answer
                </button>
              ) : waitingForSelfAssessment ? (
                <div className="space-y-3">
                  <p className="text-center text-slate-700 font-medium">Did you get it right?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleSelfAssessment(true)}
                      className="flex-1 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      ✓ Correct
                    </button>
                    <button
                      onClick={() => handleSelfAssessment(false)}
                      className="flex-1 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      ✗ Wrong
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {isLastItem ? 'Finish' : 'Continue'}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};