import React, { useState, useEffect } from 'react';
import TestNavigation from './TestNavigation';
import ReviewMarkedQuestions from './ReviewMarkedQuestions';
import FinalReview from './FinalReview';
import TestResult from './TestResult';
import axios from 'axios';

const TestAttempt = ({ testCreator = "", testCode = "" }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [markedForReview, setMarkedForReview] = useState([]);
  const [currentStep, setCurrentStep] = useState('loading');
  const [finalAnswers, setFinalAnswers] = useState([]);
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.get(`https://exam-portal-server.onrender.com/api/test/${testCode}`);
        const fetchedQuestions = response.data.test.questions;

        // If the response is valid and contains questions
        if (fetchedQuestions && fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions);
          setAnswers(new Array(fetchedQuestions.length).fill(null)); // Initialize answers
          setMarkedForReview(new Array(fetchedQuestions.length).fill(false)); // Initialize marked for review
          setCurrentStep('attempt'); // Set current step to attempt
        } else {
          setError('No questions found for this test.');
          setCurrentStep('error');
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : 'Error fetching test');
        setCurrentStep('error');
      }
    };

    fetchTest();
  }, [testCode]);

  // Loading state
  if (currentStep === 'loading') {
    return <div>Loading test questions...</div>;
  }

  // Error state
  if (currentStep === 'error') {
    return <div className="text-red-500">{error}</div>;
  }

  const handleAnswer = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleMarkForReview = (index) => {
    const newMarkedForReview = [...markedForReview];
    newMarkedForReview[index] = !newMarkedForReview[index];
    setMarkedForReview(newMarkedForReview);
  };

  const handleSubmitTest = () => {
    setCurrentStep('reviewMarked');
  };

  const handleReviewMarkedComplete = (updatedAnswers) => {
    setAnswers(updatedAnswers);
    setCurrentStep('finalReview');
  };

  const handleFinalReviewComplete = (finalAnswers) => {
    setFinalAnswers(finalAnswers);
    // Here you would typically send the answers to your backend
    // For now, we'll just calculate the result
    const result = calculateResult(finalAnswers);
    setTestResult(result);
    setCurrentStep('result');
  };

  const calculateResult = (finalAnswers) => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === finalAnswers[index]) {
        correctCount++;
      }
    });
    return {
      totalQuestions: questions.length,
      correctAnswers: correctCount,
    };
  };

  switch (currentStep) {
    case 'loading':
      return <div className="text-center">Loading questions...</div>;
    case 'attempt':
      return (

        <TestNavigation
          questions={questions}
          answers={answers}
          markedForReview={markedForReview}
          onAnswer={handleAnswer}
          onMarkForReview={handleMarkForReview}
          onSubmit={handleSubmitTest}
        />
      );
    case 'reviewMarked':
      return (
        <ReviewMarkedQuestions
          questions={questions}
          answers={answers}
          markedForReview={markedForReview}
          onComplete={handleReviewMarkedComplete}
        />
      );
    case 'finalReview':
      return (
        <FinalReview
          questions={questions}
          answers={answers}
          onComplete={handleFinalReviewComplete}
        />
      );
    case 'result':
      return (
        <TestResult
          result={testResult}
          questions={questions}
          userAnswers={finalAnswers}
        />
      );
    default:
      return <div>Loading...</div>;
  }
};

export default TestAttempt;