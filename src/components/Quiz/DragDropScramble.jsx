import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import { playSound } from '../../utils/sound';

export default function DragDropScramble({ q, onCheck, isSoundEnabled }) {
  const [words, setWords] = useState([]);

  // Helper to shuffle array
  const shuffle = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  // Setup/Shuffle when question changes
  useEffect(() => {
    let scrambled = shuffle(q.words);
    // If the scrambled version happens to be the correct answer, shuffle again (if words > 1)
    if (scrambled.length > 1 && scrambled.every((w, i) => w === q.answer[i])) {
      scrambled = shuffle(q.words);
    }
    setWords(scrambled);
  }, [q]);

  const handleReorder = (newOrder) => {
    playSound('click', isSoundEnabled);
    setWords(newOrder);
  };

  const handleSubmit = () => {
    onCheck(words);
  };

  const handleReset = () => {
    playSound('click', isSoundEnabled);
    setWords(shuffle(q.words));
  };

  return (
    <div className="scramble-section">
      <p className="drag-instruction">
        👉 Geser dan urutkan kata-kata berikut (kiri ke kanan) sampai menjadi kalimat SPO yang benar!
      </p>

      <div className="scramble-container">
        <Reorder.Group
          axis="x"
          values={words}
          onReorder={handleReorder}
          className="scramble-reorder-group"
        >
          {words.map((word) => (
            <Reorder.Item
              key={word}
              value={word}
              className="scramble-chip draggable"
              whileDrag={{ scale: 1.15, boxShadow: '0 8px 24px rgba(92, 51, 23, 0.3)' }}
              style={{ touchAction: 'none' }}
            >
              {word}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
        <button
          className="btn-back"
          style={{ padding: '12px 24px', fontSize: '1rem', borderColor: 'var(--yellow-deep)' }}
          onClick={handleReset}
        >
          🔄 Acak Ulang
        </button>
        <button
          className="btn-check"
          onClick={handleSubmit}
          style={{ margin: 0, width: '100%', maxWidth: '160px' }}
        >
          Periksa ✅
        </button>
      </div>
    </div>
  );
}
