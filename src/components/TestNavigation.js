import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TestNavigation = ({ questions, answers, markedForReview, onAnswer, onMarkForReview, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (questions.length === 0) {
    return <div className="text-center">No questions available.</div>;
  }

  const handleAnswer = (answer) => {
    onAnswer(currentQuestionIndex, answer);
  };

  const handleMarkForReview = () => {
    onMarkForReview(currentQuestionIndex);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-800">Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p className="mb-4 text-gray-700 text-lg">{questions[currentQuestionIndex].text}</p>
        <div className="space-y-3">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full p-3 text-left rounded-lg transition-colors duration-200 ${
                answers[currentQuestionIndex] === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
      <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-300 rounded-lg text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors duration-200"
        >
          Previous
        </button>
        <button
          onClick={handleMarkForReview}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            markedForReview[currentQuestionIndex] ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {markedForReview[currentQuestionIndex] ? 'Marked for Review' : 'Mark for Review'}
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={onSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={goToNextQuestion}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TestNavigation;