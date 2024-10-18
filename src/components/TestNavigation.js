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
    <div className="bg-gray-800 w-[32rem] max-w-full text-gray-200 rounded-lg shadow-lg p-4 sm:p-6 md:p-8  mx-auto">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-200">Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p className="mb-4 text-gray-300 text-lg">{questions[currentQuestionIndex].text}</p>
        <div className="space-y-3">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className={`w-full p-3 text-left rounded-lg transition-colors duration-400 ${answers[currentQuestionIndex] === option
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
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
          className="hover:shadow-md hover:shadow-gray-500 px-4 py-2 bg-gray-300 font-bold  rounded-lg text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition-colors duration-400"
        >
          Previous
        </button>
        <button
          onClick={handleMarkForReview}
          className={`hover:shadow-md hover:shadow-gray-500 px-4 py-2 rounded-lg transition-colors duration-400 font-bold ${markedForReview[currentQuestionIndex] ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
        >
          {markedForReview[currentQuestionIndex] ? 'Marked for Review' : 'Mark for Review'}
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={onSubmit}
            className="hover:shadow-md hover:shadow-gray-500 px-4 py-2 bg-green-500 text-white rounded-lg font-bold  hover:bg-green-600 transition-colors duration-400"
          >
            Submit Test
          </button>
        ) : (
          <button
            onClick={goToNextQuestion}
            className="hover:shadow-md hover:shadow-gray-500 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold  hover:bg-blue-600 transition-colors duration-400"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TestNavigation;