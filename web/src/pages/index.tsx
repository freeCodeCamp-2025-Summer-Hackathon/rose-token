
//dashboard = index

// src/pages/index.tsx
// src/pages/index.tsx

//import React from "react";

import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

// Types
type Mode = "learner" | "contributor";

interface Course {
  id: string;
  title: string;
  description: string;
}

interface Contribution {
  id: string;
  title: string;
  votes: number;
}

export const HomePage: React.FC = () => {
  const [mode, setMode] = useState<Mode>("learner");
  const [courses, setCourses] = useState<Course[]>([]);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
  // Fetch courses
  axios.get("http://localhost:3000/fetchCourses/courses")
    .then((res: { data: any[]; }) => setCourses(res.data))
    .catch(() => console.error("Failed to fetch courses"));

  // Fetch contributions
  axios.get("http://localhost:3000/api/contributions")
    .then((res: { data: any[]; }) => {
      // If you don’t have real votes yet, default to 0
      const contributionsWithVotes = res.data.map((c: any) => ({
        ...c,
        votes: 0,
      }));
      setContributions(contributionsWithVotes);
    })
    .catch(() => console.error("Failed to fetch contributions"));
}, []);


 // const navigate = useNavigate();

  const handleVote = (id: string, delta: number) => {
    setContributions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, votes: c.votes + delta } : c))
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* App Header */}
      <header className="bg-white border-b shadow-sm py-4 px-6 mb-6">
        <h1 className="text-2xl font-bold">🌍 LangLearn App</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4">
        {/* Mode Toggle */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMode("learner")}
            className={`px-4 py-2 rounded border ${
              mode === "learner"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Learner
          </button>
          <button
            onClick={() => setMode("contributor")}
            className={`px-4 py-2 rounded border ${
              mode === "contributor"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            Contributor
          </button>
        </div>

        {/* Learner View */}
        {mode === "learner" && (
          <section>
            <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {courses.map((course) => (
                <div key={course.id} className="border rounded p-4 shadow-sm bg-white">
                  <h3 className="text-lg font-bold mb-1">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                  <button className="text-sm text-blue-600 hover:underline">
                    Subscribe
                  </button>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
            <div className="text-sm text-gray-600">Progress tracking coming soon...</div>
          </section>
        )}

        {/* Contributor View */}
        {mode === "contributor" && (
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Contributions</h2>
             <a
  href="/addcontrib"
  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
  + Add Contribution
</a>
            </div>

            <ul className="space-y-4">
              {contributions.map((contribution) => (
                <li
                  key={contribution.id}
                  className="border p-4 rounded bg-white shadow-sm flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{contribution.title}</h3>
                    <p className="text-sm text-gray-500">Votes: {contribution.votes}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVote(contribution.id, 1)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleVote(contribution.id, -1)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      👎
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default HomePage;
