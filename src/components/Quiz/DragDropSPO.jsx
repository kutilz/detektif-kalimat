import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DragDropSPO({ q, onCheck }) {
  const [placements, setPlacements] = useState({ S: null, P: null, O: null });
  const [selectedWord, setSelectedWord] = useState(null);

  // Reset state when question changes
  useEffect(() => {
    setPlacements({ S: null, P: null, O: null });
    setSelectedWord(null);
  }, [q]);

  const availableWords = q.words.filter(
    (w) => w !== placements.S && w !== placements.P && w !== placements.O
  );

  const placeWord = (word, zone) => {
    setPlacements((prev) => {
      const updated = { ...prev };
      // If the word was already in another zone, clear it
      if (updated.S === word) updated.S = null;
      if (updated.P === word) updated.P = null;
      if (updated.O === word) updated.O = null;

      // If target zone has a word, it will return to bank automatically
      updated[zone] = word;
      return updated;
    });
    setSelectedWord(null);
  };

  const removeWord = (zone) => {
    setPlacements((prev) => ({
      ...prev,
      [zone]: null
    }));
  };

  // Click handler for tap-to-place fallback
  const handleWordClick = (word) => {
    setSelectedWord(word === selectedWord ? null : word);
  };

  const handleZoneClick = (zone) => {
    if (selectedWord) {
      placeWord(selectedWord, zone);
    } else if (placements[zone]) {
      removeWord(zone);
    }
  };

  // Drag end handler using Framer Motion
  const handleDragEnd = (event, info, word) => {
    const zones = ['S', 'P', 'O'];
    let targetZone = null;

    // Check overlap with each drop zone
    for (const zone of zones) {
      const el = document.getElementById(`dz-${zone}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        const { x, y } = info.point;
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          targetZone = zone;
          break;
        }
      }
    }

    if (targetZone) {
      placeWord(word, targetZone);
    }
  };

  const allPlaced = placements.S && placements.P && placements.O;

  const handleSubmit = () => {
    onCheck(placements);
  };

  return (
    <div className="drag-section">
      <p className="drag-instruction">
        👉 Tarik kata ke kotak SPO atau klik kata lalu klik kotaknya!
      </p>

      {/* Available word bank */}
      <div className="drag-sentence-area">
        {availableWords.map((word) => (
          <motion.div
            key={word}
            className={`word-chip available ${selectedWord === word ? 'selected-highlight' : ''}`}
            onClick={() => handleWordClick(word)}
            drag
            dragSnapToOrigin
            dragElastic={0.4}
            onDragEnd={(e, info) => handleDragEnd(e, info, word)}
            whileDrag={{ scale: 1.1, zIndex: 100, boxShadow: '0 8px 24px rgba(92, 51, 23, 0.3)' }}
            whileHover={{ scale: 1.05 }}
            style={{ touchAction: 'none', cursor: 'grab' }}
          >
            {word}
          </motion.div>
        ))}
        {availableWords.length === 0 && (
          <p className="empty-bank-text">Semua kata sudah terpasang! 🎉</p>
        )}
      </div>

      {/* Drop zones */}
      <div className="drop-zones">
        {/* Subjek */}
        <div
          id="dz-S"
          onClick={() => handleZoneClick('S')}
          className={`drop-zone s-zone ${placements.S ? 'occupied' : ''} ${selectedWord ? 'pulse-border' : ''}`}
        >
          <span className="dz-label">🟡 Subjek (S)</span>
          {placements.S ? (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="dz-word placed-s"
            >
              {placements.S}
            </motion.span>
          ) : (
            <span className="dz-placeholder">Siapa?</span>
          )}
        </div>

        {/* Predikat */}
        <div
          id="dz-P"
          onClick={() => handleZoneClick('P')}
          className={`drop-zone p-zone ${placements.P ? 'occupied' : ''} ${selectedWord ? 'pulse-border' : ''}`}
        >
          <span className="dz-label">🟢 Predikat (P)</span>
          {placements.P ? (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="dz-word placed-p"
            >
              {placements.P}
            </motion.span>
          ) : (
            <span className="dz-placeholder">Melakukan apa?</span>
          )}
        </div>

        {/* Objek */}
        <div
          id="dz-O"
          onClick={() => handleZoneClick('O')}
          className={`drop-zone o-zone ${placements.O ? 'occupied' : ''} ${selectedWord ? 'pulse-border' : ''}`}
        >
          <span className="dz-label">🔵 Objek (O)</span>
          {placements.O ? (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="dz-word placed-o"
            >
              {placements.O}
            </motion.span>
          ) : (
            <span className="dz-placeholder">Benda apa?</span>
          )}
        </div>
      </div>

      {/* Control buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '24px' }}>
        <button
          className="btn-back"
          style={{ padding: '12px 24px', fontSize: '1rem', borderColor: 'var(--yellow-deep)' }}
          onClick={() => setPlacements({ S: null, P: null, O: null })}
          disabled={!placements.S && !placements.P && !placements.O}
        >
          🔄 Reset
        </button>
        <button
          className="btn-check"
          onClick={handleSubmit}
          disabled={!allPlaced}
          style={{ margin: 0, width: '100%', maxWidth: '160px' }}
        >
          Periksa ✅
        </button>
      </div>
    </div>
  );
}
