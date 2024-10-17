// src/components/AnimatedComponents.js

import React from 'react';
import { motion } from 'framer-motion';

export const FadeInDiv = ({ children, duration = 0.5, ...props }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration }}
    {...props}
  >
    {children}
  </motion.div>
);

export const SlideInDiv = ({ children, direction = 'left', duration = 0.5, ...props }) => {
  const variants = {
    hidden: { 
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'top' ? -100 : direction === 'bottom' ? 100 : 0,
      opacity: 0 
    },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: {
        duration: duration
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// You can add more animated components here as needed