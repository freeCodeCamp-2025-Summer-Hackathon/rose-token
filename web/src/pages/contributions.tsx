

//list contributions

//list add contribution or languages on top or list 

//list existing contributions at bottom for rating

import { useState } from "react";

export const ContributionsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [newLanguage, setNewLanguage] = useState('');
  const [showAddLanguage, setShowAddLanguage] = useState(false);

  const languages = [
    'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Korean', 'Mandarin'
  ];

  const contributions = [
    {
      id: 1,
      type: 'flashcard',
      language: 'Spanish',
      category: 'Grammar',
      difficulty: 'Easy',
      front: '¿Cómo te llamas?',
      back: 'What is your name?',
      author: 'Maria',
      upvotes: 15,
      downvotes: 2,
      userVote: null
    },
    {
      id: 2,
      type: 'note',
      language: 'French',
      category: 'Pronunciation',
      difficulty: 'Medium',
      content: 'The French "r" is rolled from the back of the throat, not the tip of the tongue like in Spanish.',
      author: 'Pierre',
      upvotes: 8,
      downvotes: 1,
      userVote: 'up'
    },
    {
      id: 3,
      type: 'flashcard',
      language: 'German',
      category: 'Vocabulary',
      difficulty: 'Hard',
      front: 'Verschlimmbessern',
      back: 'To make something worse by trying to improve it',
      author: 'Hans',
      upvotes: 23,
      downvotes: 0,
      userVote: null
    },
    {
      id: 4,
      type: 'note',
      language: 'Japanese',
      category: 'Culture',
      difficulty: 'Easy',
      content: 'Always bow when greeting someone in Japan. The depth of the bow shows respect level.',
      author: 'Yuki',
      upvotes: 12,
      downvotes: 3,
      userVote: null
    }
  ];

  const handleVote = (contributionId: number, voteType: 'up' | 'down') => {
    console.log(`Voted ${voteType} on contribution ${contributionId}`);
  };

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      console.log(`Adding new language: ${newLanguage}`);
      setNewLanguage('');
      setShowAddLanguage(false);
    }
  };

  const handleAddContribution = (language: string) => {
    // Navigate to add contribution page with pre-selected language
    console.log(`Navigate to add contribution page for ${language}`);
    // In real app: navigate('/add-contribution', { state: { selectedLanguage: language } })
  };

  const filteredContributions = selectedLanguage === 'all' 
    ? contributions 
    : contributions.filter(c => c.language === selectedLanguage);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            🌍 Community Contributions
          </h1>
          <p className="text-slate-600">Browse and vote on language learning content</p>
        </header>

        {/* Language Selection */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-slate-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Select Language</h2>
            <button
              onClick={() => setShowAddLanguage(!showAddLanguage)}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm"
            >
              + Add Language
            </button>
          </div>
          
          {showAddLanguage && (
            <div className="flex gap-2 mb-4 p-3 bg-slate-50 rounded-md">
              <input
                type="text"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Enter new language or dialect..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-700"
              />
              <button
                onClick={handleAddLanguage}
                className="px-4 py-2 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddLanguage(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedLanguage('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLanguage === 'all'
                  ? 'bg-slate-700 text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              All Languages
            </button>
            {languages.map((language) => (
              <div key={language} className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedLanguage(language)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguage === language
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  {language}
                </button>
                <button
                  onClick={() => handleAddContribution(language)}
                  className="w-6 h-6 bg-emerald-500 text-white rounded-full text-xs hover:bg-emerald-600 transition-colors flex items-center justify-center"
                  title={`Add contribution for ${language}`}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Contributions List */}
        <div className="space-y-4">
          {filteredContributions.map((contribution) => (
            <div key={contribution.id} className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium">
                    {contribution.type}
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                    {contribution.language}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full font-medium">
                    {contribution.category}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getDifficultyColor(contribution.difficulty)}`}>
                    {contribution.difficulty}
                  </span>
                </div>
                <span className="text-sm text-slate-500">by {contribution.author}</span>
              </div>

              {contribution.type === 'flashcard' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="p-4 bg-slate-50 rounded-md">
                    <div className="text-sm text-slate-600 mb-1">Front</div>
                    <div className="font-medium text-slate-800">{contribution.front}</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-md">
                    <div className="text-sm text-slate-600 mb-1">Back</div>
                    <div className="font-medium text-slate-800">{contribution.back}</div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-md mb-4">
                  <div className="text-slate-800">{contribution.content}</div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleVote(contribution.id, 'up')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                      contribution.userVote === 'up'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-green-50'
                    }`}
                  >
                    ⬆️ {contribution.upvotes}
                  </button>
                  <button
                    onClick={() => handleVote(contribution.id, 'down')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                      contribution.userVote === 'down'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600 hover:bg-red-50'
                    }`}
                  >
                    ⬇️ {contribution.downvotes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};