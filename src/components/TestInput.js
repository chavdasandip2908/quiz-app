import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import StyledButton from './StyledButton';

const TestInput = ({ onStartTest }) => {
  const [testCreator, setTestCreator] = useState('');
  const [testCode, setTestCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (testCreator.trim() && testCode.trim()) {
      onStartTest(testCreator, testCode);
    } else {
      toast.error('Please enter both Test Creator and Test Code.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 w-[32rem] max-w-full text-gray-200 rounded-lg shadow-lg p-8  mx-auto"
    >
      <h2 className="text-3xl font-bold text-gray-200 mb-6 text-center">Start Your Test</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="testCreator" className="block text-sm font-medium text-gray-200 mb-1">
            Test Creator
          </label>
          <input
            type="text"
            id="testCreator"
            value={testCreator}
            onChange={(e) => setTestCreator(e.target.value)}
            className="w-full px-4 py-2 border focus:outline-none border-gray-500 focus:border-green-300 bg-transparent rounded-md ext-gray-200 transition duration-150 ease-in-out"
            placeholder="Enter test creator's name"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="testCode" className="block text-sm font-medium text-gray-200 mb-1">
            Test Code
          </label>
          <input
            type="text"
            id="testCode"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value)}
            className="w-full px-4 py-2 border focus:outline-none border-gray-500 focus:border-green-300 bg-transparent rounded-md  text-gray-200 transition duration-150 ease-in-out"
            placeholder="Enter test code"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >

          <StyledButton type="submit" bgColor="rgb(100 116 139)" gradientStartColor="rgba(255,255,255,0.4)" gradientEndColor="rgba(34,197,94,0.5)" hoverGradientStartColor="rgba(255,255,255,0.6)" hoverGradientEndColor="rgba(34,197,94,0.7)" shadowColor="rgba(34,197,94,1)">Submit</StyledButton>
          {/* <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 hover:shadow-md hover:shadow-blue-400"
          >
            Start Test
          </button> */}
        </motion.div>
      </form>
    </motion.div>
  );
};

export default TestInput;