// pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="text-center bg-gray-900 h-[100vh] flex flex-col justify-center  ">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-gray-200 "
      >
        Welcome to Quiz Master
      </motion.h1>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/create-test">
            <Button text="Create Test" color="green" />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/attempt-test">
            <Button text="Attempt Test" color="blue" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;