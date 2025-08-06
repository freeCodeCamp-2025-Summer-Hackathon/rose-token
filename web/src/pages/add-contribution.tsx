
//add contributions

import { useState } from "react";

export const AddContributionPage = () => {
  const [contributionType, setContributionType] = useState('flashcard');
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');
  const [noteText, setNoteText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const categories = ['Grammar', 'Pronunciation', 'Vocabulary', 'Culture', 'Phrases'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const languages = ['Spanish', 'German', 'Japanese', 'Arabic', 'Mandarin'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hllo")
     try {
    const response = await fetch("http://localhost:3000/api/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        {
          type: contributionType,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      language: selectedLanguage,
      frontText,
      backText,
      noteText
        }
      ), 
    });

    console.log("hellloo")

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create contribution');
    }

    const result = await response.json();
    console.log("Success:", result);


    /*
    // Reset form
    setContributionType('flashcard');
    setFrontText('');
    setBackText('');
    setNoteText('');
    setSelectedCategory('');
    // ... reset other states
    */

  } catch (error) {
    console.error("Error:", error);
    // Set error state for UI: 
    // setSubmissionError(error.message);
  }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            ✏️ Add Contribution
          </h1>
          <p className="text-slate-600">Help others learn by sharing your knowledge</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 border border-slate-200">
          
          {/* Contribution Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Contribution Type</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setContributionType('flashcard')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  contributionType === 'flashcard' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Flashcard
              </button>
              <button
                type="button"
                onClick={() => setContributionType('note')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  contributionType === 'note' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                Note
              </button>
            </div>
          </div>

          {/* Content Input */}
          {contributionType === 'flashcard' ? (
            <div className="mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Front of Card</label>
                <textarea
                  value={frontText}
                  onChange={(e) => setFrontText(e.target.value)}
                  placeholder="Enter the question or prompt..."
                  className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-slate-700"
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Back of Card</label>
                <textarea
                  value={backText}
                  onChange={(e) => setBackText(e.target.value)}
                  placeholder="Enter the answer or explanation..."
                  className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-slate-700"
                  rows={3}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Note Content</label>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Share your language learning tip, insight, or explanation..."
                className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none text-slate-700"
                rows={6}
                required
              />
            </div>
          )}

          {/* Language Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Language</label>
            <div className="flex gap-2">
              {languages.map((language) => (
                <button
                  key={language}
                  type="button"
                  onClick={() => setSelectedLanguage(language)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguage === language
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-orange-500 text-white'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">Difficulty Level</label>
            <div className="flex gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  type="button"
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!selectedCategory || !selectedDifficulty}
              className="flex-1 py-3 bg-emerald-600 text-white font-medium rounded-md hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              Submit Contribution
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-slate-200 text-slate-700 font-medium rounded-md hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
