import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FinalReview = ({ questions, answers, onComplete }) => {
  const [currentAnswers, setCurrentAnswers] = useState(answers);

  const handleAnswer = (index, answer) => {
    const newAnswers = [...currentAnswers];
    newAnswers[index] = answer;
    setCurrentAnswers(newAnswers);
  };

  const handleSubmit = () => {
    onComplete(currentAnswers);
  };

  return (
    <div className="bg-gray-800 w-[32rem] max-w-full text-gray-200 rounded-lg shadow-lg p-4 sm:p-6 md:p-8  mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-200 text-center">Final Review</h2>
      {questions.map((question, index) => (
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="mb-6 p-4 rounded-lg bg-gray-700"
        >
          <h3 className="text-lg font-semibold mb-2 text-gray-200">Question {index + 1}</h3>
          <p className="mb-3 text-gray-300">{question.text}</p>
          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <button
                key={optionIndex}
                onClick={() => handleAnswer(index, option)}
                className={`w-full p-3 text-left rounded-lg transition-colors duration-400 ${currentAnswers[index] === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>
      ))}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: questions.length * 0.1 }}
        onClick={handleSubmit}
        className="hover:shadow-md hover:shadow-gray-500 w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-400 text-lg font-semibold"
      >
        Submit Test
      </motion.button>
    </div>
  );
};

export default FinalReview;