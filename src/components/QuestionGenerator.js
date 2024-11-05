import React, { useState } from 'react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import TestCreationSuccess from './TestCreationSuccess';

const QuestionGenerator = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [testId, setTestId] = useState(null);
  const [testName, setTestName] = useState('');
  const [error, setError] = useState('');

  // Handle generating a new question based on the topic
  const handleGenerateQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setCurrentQuestion(null);  // Clear current question

    try {
      const { data } = await axios.post('http://localhost:5000/api/test/ai', { topic });

      if (data?.questions && Array.isArray(data.questions)) {
        setCurrentQuestion({ ...data.questions[0], Options: [...data.questions[0].Options], Answer: data.questions[0].Answer });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      setError(error.response?.data?.message || 'Error generating question');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTest = async () => {
    try {
      const formattedQuestions = questions.map((question) => ({
        text: question.test,
        options: question.Options,
        correctAnswer: question.Options[question.Answer]  // Use the correct answer based on the index
      }));

      const testData = { name: testName, creator: "creatorId", questions: formattedQuestions };
      const response = await axios.post('https://exam-portal-server.onrender.com/api/test/create', testData);

      setTestId(response.data.code);
    } catch (error) {
      if (error.response) {
        setError('Error creating test: ' + error.response.data.message);
      } else {
        setError('An error occurred while creating the test.');
      }
    }
  };

  // Handle confirming the current question
  const handleConfirmQuestion = () => {
    if (validateCurrentQuestion()) {
      setQuestions(prevQuestions => [...prevQuestions, currentQuestion]);
      setCurrentQuestion(null);  // Clear after confirmation
    }
  };

  // Validation function for the current question
  const validateCurrentQuestion = () => {
    if (!currentQuestion.test.trim()) {
      setError('Question text cannot be empty.');
      return false;
    }
    if (currentQuestion.Options.length < 2) {
      setError('At least two options are required.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle updating the question text or options
  const handleUpdateQuestion = (value) => {
    setCurrentQuestion(prev => ({ ...prev, test: value }));
  };

  const handleUpdateOption = (index, value) => {
    setCurrentQuestion(prev => {
      const newOptions = [...prev.Options];
      newOptions[index] = value;
      return { ...prev, Options: newOptions };
    });
  };

  const handleAddOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      Options: [...prev.Options, '']
    }));
  };

  const handleRemoveOption = (index) => {
    setCurrentQuestion(prev => ({
      ...prev,
      Options: prev.Options.filter((_, i) => i !== index),
      Answer: prev.Answer === prev.Options[index] ? '' : prev.Answer,  // Reset answer if it was the removed option
    }));
  };

  const handleSetCorrectAnswer = (answer) => {
    setCurrentQuestion(prev => ({ ...prev, Answer: answer }));
  };

  if (testId) {
    return (
      <TestCreationSuccess testId={testId} />
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-4xl font-bold text-white mb-6 animate-bounce">Quiz Question Generator</h1>
      <AnimatePresence >
        <form onSubmit={handleGenerateQuestion} className="bg-slate-600 p-6 rounded-lg shadow-lg w-[32rem] max-w-full">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic..."
            className="border-2  rounded-lg p-2 w-full mb-4 bg-slate-700 text-white outline-none border-green-700 focus:border-green-600"
            required
          />
          <button
            type="submit"
            className={`w-full p-2 rounded-lg text-white font-semibold ${loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} transition-all duration-300`}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Question'}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </AnimatePresence>
      <AnimatePresence >
        {/* Question editing section */}
        {currentQuestion && (
          <div className="bg-slate-600 p-6 mt-6 rounded-lg shadow-lg animate-slide-up  w-[32rem] max-w-full text-white">
            <h2 className="text-2xl font-semibold mb-4">Edit Question</h2>
            <input
              type="text"
              value={currentQuestion.test}
              onChange={(e) => handleUpdateQuestion(e.target.value)}
              className="border-2 rounded-lg p-2 w-full mb-4 bg-slate-700 text-white outline-none border-green-700 focus:border-green-600"
              placeholder="Edit question text..."
              required
            />


            <div className="flex flex-wrap justify-between items-baseline ">
              <h3 className="font-semibold mb-2">Options:</h3>
              <button
                onClick={handleAddOption}
                className=" font-semibold transition-all duration-300 mt-2 text-blue-500 hover:text-blue-700"
              >
                + Add Option
              </button>
            </div>

            {currentQuestion.Options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleUpdateOption(index, e.target.value)}
                  className="border-2 rounded-lg p-2 flex-grow mr-2 bg-slate-700 text-white outline-none border-green-700 focus:border-green-600"
                  placeholder={`Option ${index + 1}`}
                  required
                />
                <button
                  onClick={() => handleRemoveOption(index)}
                  className="text-red-500 font-bold  focus:text-red-600 hover:text-red-600 text-2xl"
                  title="Remove option"
                >
                  &times;
                </button>
              </div>
            ))}



            <div className="mt-4">
              <h3 className="font-semibold mb-2">Select Correct Answer:</h3>
              <select
                value={currentQuestion.Answer}  // Set the value to the index of the correct answer
                onChange={(e) => handleSetCorrectAnswer(Number(e.target.value))}  // Convert the selected value to a number
                className="border-2  rounded-lg p-2 w-full bg-slate-700 text-white outline-none border-green-700 "
              >
                <option value="" disabled>Select correct answer</option>
                {currentQuestion.Options.map((option, index) => (


                  <option key={index} value={index} selected={index === currentQuestion.Answer}>  {/* Set the option value to its index */}
                    {option}
                  </option>
                ))}
              </select>

            </div>
            {console.log(currentQuestion)}

            <button
              onClick={handleConfirmQuestion}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg transition-all duration-300 w-full"
            >
              Confirm Question
            </button>
          </div>
        )}

        {/* Display confirmed questions */}
        <div className="mt-6  w-[32rem] max-w-full bg-slate-600 text-white rounded-lg ">
          {questions.map((question, index) => (
            <div key={index} className="text-white bg-slate-700 p-4 rounded-lg my-2 mx-1 animate-fade-in">
              <p className="font-semibold">{question.test}</p>
              <p className="mt-2">Options:</p>
              <ul className="list-disc list-inside">
                {question.Options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
              <p className="mt-2">Correct Answer: {question.Options[question.Answer]}</p>
            </div>
          ))}
        </div>
        {questions.length !== 0 &&
          <div className="mt-6  w-[32rem] max-w-full rounded-lg ">
            <input
              type="text"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="Enter test name..."
              className="border-2 border-green-600 bg-slate-700 focus:border-green-700 outline-none rounded-lg p-2 w-full mb-4"
              required
            />
            <button
              onClick={handleCreateTest}
              className="w-full p-2 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition-all duration-300 "
              disabled={questions.length === 0}  // Only enable if there are questions
            >
              Create Test
            </button>
          </div>
        }

      </AnimatePresence >
    </div >
  );
};

export default QuestionGenerator;
