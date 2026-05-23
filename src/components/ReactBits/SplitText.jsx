import React from 'react';
import { motion } from 'framer-motion';

export default function SplitText({
  text = '',
  className = '',
  delay = 0.03,
  duration = 0.4,
  stagger = 0.05
}) {
  const characters = text.split('');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: duration
      }
    }
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'inline-block' }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          variants={childVariants}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal'
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
