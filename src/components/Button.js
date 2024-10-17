import React from 'react';

const Button = ({ text, onClick, color = 'blue' }) => (
  <button
    className={`bg-${color}-500 hover:bg-${color}-600 hover:border-2 hover:border-green-100 font-bold py-2 px-4 rounded-md transition duration-400 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-${color}-400 focus:ring-opacity-50 text-gray-200 shadow-md hover:shadow-green-400`}
    onClick={onClick}
  >
    {text}
  </button>
);
export default Button;