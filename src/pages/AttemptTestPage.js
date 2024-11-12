import React, { useState } from 'react';
import TestInput from '../components/TestInput';
import TestAttempt from '../components/TestAttempt';

const AttemptTestPage = () => {
  const [testStarted, setTestStarted] = useState(false);
  const [testInfo, setTestInfo] = useState({ creator: '', code: '' });

  const handleStartTest = (creator, code) => {
    setTestInfo({ creator, code });
    setTestStarted(true);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 py-6 flex flex-col justify-center sm:py-12"
      style={{
        backgroundImage: `radial-gradient(circle at 11% 37%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 50%, transparent 50%, transparent 56%, transparent 56%, transparent 100%), 
                      radial-gradient(circle at 82% 7%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 46%, transparent 46%, transparent 88%, transparent 88%, transparent 100%), 
                      radial-gradient(circle at 81% 79%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 33%, transparent 33%, transparent 89%, transparent 89%, transparent 100%), 
                      radial-gradient(circle at 68% 96%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 8%, transparent 8%, transparent 26%, transparent 26%, transparent 100%), 
                      radial-gradient(circle at 69% 20%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 84%, transparent 84%, transparent 86%, transparent 86%, transparent 100%), 
                      radial-gradient(circle at 49% 22%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 71%, transparent 71%, transparent 78%, transparent 78%, transparent 100%), 
                      radial-gradient(circle at 23% 60%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 6%, transparent 6%, transparent 40%, transparent 40%, transparent 100%), 
                      radial-gradient(circle at 86% 33%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 13%, transparent 13%, transparent 98%, transparent 98%, transparent 100%), 
                      radial-gradient(circle at 38% 60%, rgba(73,73,73, 0.05) 0%, rgba(73,73,73, 0.05) 15%, transparent 15%, transparent 61%, transparent 61%, transparent 100%), 
                      linear-gradient(0deg, rgb(17,24,39), rgb(17,24,39))`,
      }}>
      {!testStarted ? (
        <TestInput onStartTest={handleStartTest} />
      ) : (
        <TestAttempt testCreator={testInfo.creator} testCode={testInfo.code} />
      )}
    </div>
  );
};

export default AttemptTestPage;