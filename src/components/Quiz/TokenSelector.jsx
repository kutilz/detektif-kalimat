import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TokenSelector({ q, onCheck }) {
  const [selectedToken, setSelectedToken] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    setSelectedToken(null);
    setHasAnswered(false);
  }, [q]);

  const handleTokenClick = (tok) => {
    if (hasAnswered) return;
    setSelectedToken(tok);
    setHasAnswered(true);
    const correct = tok === q.answer;
    onCheck(correct, tok);
  };

  return (
    <div className="token-sentence" id="token-sentence">
      {q.tokens.map((tok, index) => {
        const isSelected = selectedToken === tok;
        const isCorrectAnswer = tok === q.answer;
        
        let btnClass = 'word-token';
        if (hasAnswered) {
          btnClass += ' disabled';
          if (isCorrectAnswer) {
            btnClass += ' correct';
          } else if (isSelected) {
            btnClass += ' wrong';
          }
        }

        return (
          <motion.button
            key={index}
            className={btnClass}
            onClick={() => handleTokenClick(tok)}
            disabled={hasAnswered}
            whileHover={!hasAnswered ? { scale: 1.05 } : {}}
            whileTap={!hasAnswered ? { scale: 0.95 } : {}}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {tok}
          </motion.button>
        );
      })}
    </div>
  );
}
