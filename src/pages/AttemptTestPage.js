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
    <div className="bg-gray-900 min-h-screen text-gray-200 py-6 flex flex-col justify-center sm:py-12">
      {!testStarted ? (
        <TestInput onStartTest={handleStartTest} />
      ) : (
        <TestAttempt testCreator={testInfo.creator} testCode={testInfo.code} />
      )}
    </div>
  );
};

export default AttemptTestPage;