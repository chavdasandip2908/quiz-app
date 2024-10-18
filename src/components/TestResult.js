import React from 'react';
import { motion } from 'framer-motion';

const TestResult = ({ result, questions, userAnswers }) => {
    return (
        <div className=" bg-gray-800 w-[32rem] max-w-full text-gray-200 rounded-lg shadow-lg p-4 sm:p-6 md:p-8  mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-200 text-center">Test Result</h2>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-[#3f5c9676] text-center"
            >
                <p className="text-xl font-semibold text-blue-100">
                    You answered {result.correctAnswers} out of {result.totalQuestions} questions correctly.
                </p>
            </motion.div>
            {questions.map((question, index) => (
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`mb-6 p-4 rounded-lg ${userAnswers[index] === question.correctAnswer ? 'bg-[#2a4e2b9a]' : 'bg-[#63333399]'
                        }`}
                >
                    <h3 className="text-lg font-semibold mb-2 text-gray-200">Question {index + 1}</h3>
                    <p className="mb-3 text-gray-300">{question.text}</p>
                    <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                            <div
                                key={optionIndex}
                                className={`w-full p-3 rounded-lg ${option === question.correctAnswer
                                    ? 'bg-green-500 text-white'
                                    : option === userAnswers[index]
                                        ? 'bg-red-500 text-white'
                                        : 'bg-gray-800 text-gray-300'
                                    }`}
                            >
                                {option}
                                {option === question.correctAnswer && ' ✓'}
                                {option === userAnswers[index] && option !== question.correctAnswer && ' ✗'}
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default TestResult;