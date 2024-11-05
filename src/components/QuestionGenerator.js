import React, { useState } from 'react';
import axios from 'axios';

const QuestionGenerator = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try { 
      const { data } = await axios.post('http://localhost:5000/api/test/ai', { topic });

      // Check if 'questions' exists in the response
      if (data?.questions && Array.isArray(data.questions)) {
          setQuestions(prevQuestions => [...prevQuestions, ...data.questions]);
      } else {
          throw new Error("Invalid response format");  // Handle unexpected response format
      }
  } catch (error) {
      console.error('Error fetching questions:', error);
      setError(error.response?.data?.message || 'Error generating questions');  // Set more specific error
  } finally {
      setLoading(false);  // End loading state
  }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-4xl font-bold text-white mb-6 animate-bounce">Quiz Question Generator</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic..."
          className="border-2 border-gray-300 rounded-lg p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className={`w-full p-2 rounded-lg text-white font-semibold ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} transition-all duration-300`}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <div className="mt-6">
        {questions.map((question, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 animate-fade-in">
            <p className="font-semibold">{question.test}</p>
            <p className="mt-2">Options:</p>
            <ul className="list-disc list-inside">
              {question.Options.map((option, i) => (
                <li key={i}>{option}</li>
              ))}
            </ul>
            <p className="mt-2">Answer: {question.Answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionGenerator;
