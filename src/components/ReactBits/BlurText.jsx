import React from 'react';
import { motion } from 'framer-motion';

export default function BlurText({
  text = '',
  className = '',
  delay = 0.05,
  duration = 0.5,
  stagger = 0.03
}) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: { filter: 'blur(8px)', opacity: 0, y: 10 },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: 'easeOut'
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
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
