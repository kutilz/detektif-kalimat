import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { vocabS, vocabP, vocabO } from '../../data/quizData';

export default function TokenSelector({ q, onCheck }) {
  const [placedToken, setPlacedToken] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [roleInfo, setRoleInfo] = useState({ label: 'Kata', color: '#888', code: 'S' });

  // Find answer index in tokens
  const answerIndex = q.tokens ? q.tokens.indexOf(q.answer) : -1;

  useEffect(() => {
    setPlacedToken(null);
    setHasAnswered(false);

    if (answerIndex === -1) {
      setShuffledOptions(q.tokens || []);
      return;
    }

    // Determine grammatical role S, P, O based on question text
    let role = 'S';
    let label = 'Subjek';
    let color = '#f4a100'; // Yellow S
    if (q.question.toUpperCase().includes('PREDIKAT')) {
      role = 'P';
      label = 'Predikat';
      color = '#2e7d32'; // Green P
    } else if (q.question.toUpperCase().includes('OBJEK')) {
      role = 'O';
      label = 'Objek';
      color = '#1565c0'; // Blue O
    }
    setRoleInfo({ label, color, code: role });

    // ── Cross-category distractor strategy ──────────────────────────────
    // If asking for S → pull from P or O vocab (a verb/object, NOT another noun)
    // If asking for P → pull from S or O vocab (a noun/object, NOT another verb)
    // If asking for O → pull from S or P vocab (a noun/verb, NOT another object)
    // This ensures the distractor is obviously the wrong grammatical category,
    // so it won't form a plausible sentence in the blank and won't confuse kids.
    let distractor = '';
    const tokenLower = q.tokens.map((t) => t.toLowerCase());

    const pickFrom = (vocabArr) =>
      vocabArr.filter((w) => !tokenLower.includes(w.toLowerCase()));

    let candidatePool = [];
    if (role === 'S') {
      // Wrong-category: verbs (P) or objects (O) — neither can be a subject cleanly
      candidatePool = [...pickFrom(vocabP), ...pickFrom(vocabO)];
    } else if (role === 'P') {
      // Wrong-category: subjects (S) or objects (O)
      candidatePool = [...pickFrom(vocabS), ...pickFrom(vocabO)];
    } else {
      // Wrong-category: subjects (S) or verbs (P)
      candidatePool = [...pickFrom(vocabS), ...pickFrom(vocabP)];
    }

    if (candidatePool.length > 0) {
      distractor = candidatePool[Math.floor(Math.random() * candidatePool.length)];
    }

    // Compile choices: all tokens + 1 distractor
    const choices = [...q.tokens];
    if (distractor) {
      // Keep distractor lowercase (it's clearly a different category — no need to capitalise)
      choices.push(distractor.toLowerCase());
    }

    // Shuffle choices
    const shuffled = choices.sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
  }, [q, answerIndex]);

  const handlePlaceToken = (word) => {
    if (hasAnswered) return;
    setPlacedToken(word);
  };

  const handleRemoveToken = () => {
    if (hasAnswered) return;
    setPlacedToken(null);
  };

  const handleSubmit = () => {
    if (!placedToken || hasAnswered) return;
    setHasAnswered(true);

    const correct = placedToken === q.answer;

    // Call onCheck after a delay for visual feedback inside the slot
    setTimeout(() => {
      onCheck(correct, placedToken);
    }, 850);
  };

  const handleWordClick = (word) => {
    if (hasAnswered) return;
    handlePlaceToken(word);
  };

  const handleDragEnd = (event, info, word) => {
    if (hasAnswered) return;
    const el = document.getElementById('dz-token');
    if (el) {
      const rect = el.getBoundingClientRect();
      const { x, y } = info.point;
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        handlePlaceToken(word);
      }
    }
  };

  // Fallback view: if answer is not in tokens
  if (answerIndex === -1) {
    return (
      <div className="token-sentence" id="token-sentence">
        {shuffledOptions.map((tok, index) => {
          const isSelected = placedToken === tok;
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
              onClick={() => {
                setPlacedToken(tok);
                setHasAnswered(true);
                onCheck(tok === q.answer, tok);
              }}
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

  // Puzzle view: Drag and Drop
  return (
    <div className="drag-section token-puzzle-section" style={{ width: '100%' }}>
      <p className="drag-instruction" style={{ textAlign: 'center', marginBottom: '16px' }}>
        👉 Tarik kata yang tepat ke kotak kosong!
      </p>

      {/* Sentence row with Drop Zone */}
      <div className="token-puzzle-sentence" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '8px', margin: '24px 0' }}>
        {q.tokens.slice(0, answerIndex).map((tok, idx) => (
          <span key={`before-${idx}`} className="puzzle-static-word">
            {tok}
          </span>
        ))}

        <div
          id="dz-token"
          className={`drop-zone token-dz ${placedToken ? 'occupied' : ''} ${
            hasAnswered ? (placedToken === q.answer ? 'correct' : 'wrong') : ''
          }`}
          onClick={handleRemoveToken}
          style={{
            borderColor: roleInfo.color,
            boxShadow: hasAnswered
              ? placedToken === q.answer
                ? '0 0 12px rgba(46, 125, 50, 0.4)'
                : '0 0 12px rgba(244, 67, 54, 0.4)'
              : 'none'
          }}
        >
          {placedToken ? (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`dz-word ${
                roleInfo.code === 'S'
                  ? 'placed-s'
                  : roleInfo.code === 'P'
                  ? 'placed-p'
                  : 'placed-o'
              }`}
              style={{
                backgroundColor: roleInfo.color
              }}
            >
              {placedToken}
            </motion.span>
          ) : (
            <span className="dz-placeholder">
              ? {roleInfo.label}
            </span>
          )}
        </div>

        {q.tokens.slice(answerIndex + 1).map((tok, idx) => (
          <span key={`after-${idx}`} className="puzzle-static-word">
            {tok}
          </span>
        ))}
      </div>

      {/* Word Options Bank */}
      <div className="drag-sentence-area" style={{ marginTop: '24px', justifyContent: 'center', gap: '12px' }}>
        {shuffledOptions.map((word, idx) => {
          const isPlaced = placedToken === word;
          return (
            <motion.div
              key={idx}
              className={`word-chip available ${isPlaced ? 'disabled' : ''}`}
              drag={!hasAnswered && !isPlaced}
              dragSnapToOrigin
              dragElastic={0.4}
              onDragEnd={(e, info) => handleDragEnd(e, info, word)}
              whileDrag={{ scale: 1.1, zIndex: 100, boxShadow: '0 8px 24px rgba(92, 51, 23, 0.3)' }}
              whileHover={!hasAnswered && !isPlaced ? { scale: 1.05 } : {}}
              style={{
                touchAction: 'none',
                cursor: hasAnswered || isPlaced ? 'default' : 'grab',
                opacity: isPlaced ? 0.35 : 1,
              }}
            >
              {word}
            </motion.div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
        <button
          className="btn-back"
          style={{ padding: '12px 24px', fontSize: '1rem', borderColor: 'var(--yellow-deep)' }}
          onClick={handleRemoveToken}
          disabled={!placedToken || hasAnswered}
        >
          🔄 Reset
        </button>
        <button
          className="btn-check"
          onClick={handleSubmit}
          disabled={!placedToken || hasAnswered}
          style={{ margin: 0, width: '100%', maxWidth: '160px' }}
        >
          Periksa ✅
        </button>
      </div>

      {/* Hint */}
      {q.hint && (
        <div className="quiz-sentence-hint" style={{ marginTop: '24px', textAlign: 'center' }}>
          {q.hint}
        </div>
      )}
    </div>
  );
}
