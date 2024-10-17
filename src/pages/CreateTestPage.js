// pages/CreateTestPage.js
import React from 'react';
import TestCreation from '../components/TestCreation';


const CreateTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 py-6 flex flex-col justify-center sm:py-12">
      <TestCreation />
    </div>
  );
};

export default CreateTestPage;