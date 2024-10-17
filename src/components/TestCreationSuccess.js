import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestCreationSuccess = ({ testId }) => {
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const copyToClipboard = () => {
        navigator.clipboard.writeText(testId).then(() => {
            setCopied(true);
            // Redirect to the test attempt page after a short delay
            setTimeout(() => {
                navigate(`/attempt-test`);
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    if (!testId) return null;

    return (
        <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-900 text-gray-200">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto text-center">
                <h1 className="text-3xl font-bold mb-4 ">Test Created Successfully</h1>
                <p className="text-xl  mb-4">Your Test ID is:</p>

                <div
                    onClick={copyToClipboard}
                    className="bg-blue-100 text-blue-600 cursor-pointer font-bold py-2 px-4 rounded-lg border border-blue-300 hover:bg-blue-200 transition duration-300"
                    title="Click to copy the Test ID"
                >
                    {testId}
                </div>

                {copied && (
                    <p className="text-green-500 mt-4">Test ID copied to clipboard!</p>
                )}

                <p className="text-gray-500 mt-4">Redirecting to the test attempt page...</p>
            </div>
        </div>
    );
};

export default TestCreationSuccess;
