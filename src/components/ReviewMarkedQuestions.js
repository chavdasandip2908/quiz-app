  import React, { useState } from 'react';
  import { motion } from 'framer-motion';

  const ReviewMarkedQuestions = ({ questions, answers, markedForReview, onComplete }) => {
    const [currentAnswers, setCurrentAnswers] = useState(answers);

    const markedQuestions = questions.filter((_, index) => markedForReview[index]);

    const handleAnswer = (questionIndex, answer) => {
      const newAnswers = [...currentAnswers];
      newAnswers[questionIndex] = answer;
      setCurrentAnswers(newAnswers);
    };

    const handleComplete = () => {
      onComplete(currentAnswers);
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">Review Marked Questions</h2>
        {markedQuestions.map((question, index) => {
          const originalIndex = questions.findIndex(q => q.id === question.id);
          return (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-6 p-4 rounded-lg bg-yellow-100"
            >
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Question {originalIndex + 1}</h3>
              <p className="mb-3 text-gray-700">{question.text}</p>
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <button
                    key={optionIndex}
                    onClick={() => handleAnswer(originalIndex, option)}
                    className={`w-full p-3 text-left rounded-lg transition-colors duration-200 ${
                      currentAnswers[originalIndex] === option
                        ? 'bg-blue-500 text-white'
                        : 'bg-white hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          );
        })}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: markedQuestions.length * 0.1 }}
          onClick={handleComplete}
          className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 text-lg font-semibold"
        >
          Continue to Final Review
        </motion.button>
      </div>
    );
  };

  export default ReviewMarkedQuestions;