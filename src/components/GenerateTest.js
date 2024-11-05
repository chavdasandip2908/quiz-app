// src/components/GenerateTest.js

import React, { useState } from 'react';
import axios from 'axios';

const GenerateTest = () => {
    const [topic, setTopic] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/test/ai', {
                topic,
                numQuestions,
            });
            setQuestions(response.data.questions);
        } catch (error) {
            console.error("Error generating test:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 max-w-lg mx-auto space-y-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Generate Test with ChatGPT</h2>
            <input
                type="text"
                placeholder="Enter topic"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <input
                type="number"
                placeholder="Number of questions"
                className="w-full p-2 border border-gray-300 rounded-md mt-2"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
            />
            <button
                onClick={handleGenerate}
                className={`w-full mt-4 p-2 bg-blue-500 text-white rounded-md ${
                    loading ? 'animate-pulse' : ''
                }`}
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>

            <div className="mt-4 space-y-2">
                {questions.map((question, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center p-3 border border-gray-200 rounded-md"
                    >
                        <p>{question}</p>
                        <button
                            onClick={() => removeQuestion(index)}
                            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {questions.length > 0 && (
                <button className="w-full mt-6 p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                    Create Test
                </button>
            )}
        </div>
    );
};

export default GenerateTest;
