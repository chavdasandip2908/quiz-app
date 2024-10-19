import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import TestCreationSuccess from './TestCreationSuccess';

const TestCreation = () => {
  const [questions, setQuestions] = useState([{
    text: '',
    options: [''],
    correctAnswer: '',
  }]);
  const [testName, setTestName] = useState('');
  const [testId, setTestId] = useState(null);
  const [errors, setErrors] = useState({});

  // Add New Question with Validation
  const addNewQuestion = () => {
    const lastQuestion = questions[questions.length - 1];

    // Check if the question text is filled
    if (!lastQuestion.text.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`question-${questions.length - 1}`]: 'Please fill in the question text.',
      }));

      return;
    }

    // Check if the question has at least two options and all options are filled
    if (lastQuestion.options.length < 2) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`options-${questions.length - 1}`]: 'Please add at least two options.',
      }));
      return;
    }

    // Check if all options are filled
    if (lastQuestion.options.some(option => !option.trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`options-${questions.length - 1}`]: 'Please fill in all options.',
      }));
      return;
    }


    // Check if correct answer is selected
    if (!lastQuestion.correctAnswer) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`correctAnswer-${questions.length - 1}`]: 'Please select a correct answer.',
      }));
      return;
    }

    // Clear errors if all validations pass
    setErrors({});

    // Add a new empty question
    setQuestions([...questions, { text: '', options: [''], correctAnswer: '' }]);
  };

  // Update Question Text with Validation
  const updateQuestion = (index, field, value) => {
    const newQuestions = [...questions];

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`question-${index}`]: 'Please fill in the question text.',
      }));
      newQuestions[index][field] = value;
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`question-${index}`]: '', // Clear the error for this question
    }));

    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  // Update Option with Validation
  const updateOption = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`option-${questionIndex}-${optionIndex}`]: 'Please fill in the option text.',
      }));
      newQuestions[questionIndex].options[optionIndex] = value;
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`option-${questionIndex}-${optionIndex}`]: '', // Clear error for this option
    }));

    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  // Add New Option with Validation
  const addOption = (questionIndex) => {
    const question = questions[questionIndex];

    if (question.options.some(option => !option.trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [`options-${questionIndex}`]: 'Please fill in all options.',
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`options-${questionIndex}`]: '', // Clear error when valid
    }));

    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push('');
    setQuestions(newQuestions);
  };

  const removeOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  // Create Test API Call
  const createTest = async () => {
    if (!testName.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        testName: 'Please enter a valid test name.',
      }));
      return;
    }

    if (questions.some(q => !q.text.trim() || q.options.some(option => !option.trim()))) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'Please ensure all questions and options are filled out.',
      }));
      return;
    }

    console.log('Test Created:', { name: testName, questions });

    try {
      const testData = { name: testName, creator: "creatorId", questions };
      const response = await axios.post('https://exam-portal-server.onrender.com/api/test/create', testData);

      setTestId(response.data.code);
    } catch (error) {
      if (error.response) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'Error creating test: ' + error.response.data.message,
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'An error occurred while creating the test.',
        }));
      }
    }
  };

  if (testId) {
    return (
      <TestCreationSuccess testId={testId} />
    )
  }

  return (
    <div className="bg-gray-800 w-[32rem] max-w-full rounded-lg shadow-lg p-6  mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center ">Create New Test</h1>


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          placeholder="Enter Test Name"
          className="w-full p-2 mb-6 border border-gray-500 rounded focus:outline-none focus:border-green-300 bg-transparent"
        />
        {errors.testName && <p className="text-red-500">{errors.testName}</p>}
      </motion.div>

      <AnimatePresence>
        {questions.map((question, questionIndex) => (
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-4 border border-gray-500 rounded-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Question {questionIndex + 1}</h2>
            <textarea
              value={question.text}
              onChange={(e) => updateQuestion(questionIndex, 'text', e.target.value)}
              placeholder="Enter question text"
              className={`w-full p-2 mb-4 border border-gray-500 rounded focus:outline-none focus:border-green-300 bg-transparent ${errors[`question-${questionIndex}`] && 'focus:border-red-700'}`}
              rows="3"
            />
            {/* {errors[`question-${questionIndex}`] && <p className="text-red-500">{errors[`question-${questionIndex}`]}</p>} */}

            <div className="flex flex-wrap justify-between items-baseline ">
              {/* Correct answer select box */}
              <label className="block mb-2">Options : </label>
              {/* Add Option button */}
              {question.options.length < 6 && (
                <button
                  onClick={() => addOption(questionIndex)}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  + Add Option
                </button>
              )}
            </div>
            {question.options.map((option, optionIndex) => (
              <motion.div
                key={optionIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center mb-2"
              >
                <input
                  type="text"
                  value={option}
                  onChange={(e) => updateOption(questionIndex, optionIndex, e.target.value)}
                  placeholder={`Option ${optionIndex + 1}`}
                  className={`flex-grow p-2 border border-gray-500 rounded focus:outline-none focus:border-green-300 bg-transparent ${errors[`option-${questionIndex}-${optionIndex}`] && 'focus:border-red-700'}`}
                />
                <button
                  onClick={() => removeOption(questionIndex, optionIndex)}
                  className={`ml-2 text-red-500 hover:text-red-700 ${question.options.length === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={question.options.length === 1} // Disable button if there's only one option
                >
                  X
                </button>
                {/* {errors[`option-${questionIndex}-${optionIndex}`] && <p className="text-red-500">{errors[`option-${questionIndex}-${optionIndex}`]}</p>} */}
              </motion.div>

            ))}


            {/* Correct answer select box */}
            <label className="block mb-2">Select Correct Answer:</label>
            <select
              value={question.correctAnswer}
              onChange={(e) => updateQuestion(questionIndex, 'correctAnswer', e.target.value)}
              className={`w-full p-2 mb-4 border border-gray-500 rounded focus:outline-none focus:border-green-300 ${errors[`correctAnswer-${questionIndex}`] && 'border-red-700'} `}
              style={{
                backgroundColor: 'transparent', // Light green background
                color: '#E0E0E0', // Dark green text color
              }}
            >
              <option value="" className='bg-gray-700' style={{ color: '#E0E0E0' }}>
                Select correct answer
              </option>
              {question.options.map((option, optionIndex) => (
                <option key={optionIndex} className='bg-gray-700' value={option} style={{ color: '#E0E0E0' }}>
                  {option}
                </option>
              ))}
            </select>
            {/* {errors[`correctAnswer-${questionIndex}`] && (
              <p className="text-red-500">{errors[`correctAnswer-${questionIndex}`]}</p>
            )} */}
          </motion.div>
        ))}
      </AnimatePresence>


      <div className="flex justify-between mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addNewQuestion}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          Add New Question
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createTest}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Create Test
        </motion.button>
      </div>
    </div>
  );
};

export default TestCreation;