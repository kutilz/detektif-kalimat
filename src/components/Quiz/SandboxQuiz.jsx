import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { vocabS, vocabP, vocabO } from '../../data/quizData';

export default function SandboxQuiz({ q, onCheck }) {
  const [inputValue, setInputValue] = useState('');
  const [foundS, setFoundS] = useState(null);
  const [foundP, setFoundP] = useState(null);
  const [foundO, setFoundO] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (val) => {
    setInputValue(val);
    
    // Clean and split words
    const words = val
      .toLowerCase()
      .replace(/[.,?!]/g, '')
      .split(/\s+/)
      .filter(Boolean);
    
    let s = null;
    let p = null;
    let o = null;
    
    // 1. Direct Dictionary Match
    words.forEach((w) => {
      if (vocabS.includes(w) && !s) {
        s = w;
      } else if (vocabP.includes(w) && !p) {
        p = w;
      } else if (vocabO.includes(w) && !o) {
        o = w;
      }
    });

    // 2. Heuristics for Unmatched Slots
    // If Predikat (Verb) is still not found, check Indonesian morphological prefixes
    if (!p) {
      const verbPrefixes = ['me', 'di', 'ber', 'ter'];
      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        // Must be longer than 3 letters to filter out short nouns/names
        const hasVerbPrefix = verbPrefixes.some(prefix => w.startsWith(prefix) && w.length >= 4);
        if (hasVerbPrefix) {
          p = w;
          break;
        }
      }
    }

    // If we have a Predikat (from dictionary or prefix check)
    if (p) {
      const pIndex = words.indexOf(p);
      
      // If Subjek is still empty, look for any word before Predikat
      if (!s) {
        for (let i = 0; i < pIndex; i++) {
          const w = words[i];
          if (w !== p) {
            s = w;
            break;
          }
        }
      }
      
      // If Objek is still empty, look for any word after Predikat
      if (!o) {
        for (let i = pIndex + 1; i < words.length; i++) {
          const w = words[i];
          if (w !== p && w !== s) {
            o = w;
            break;
          }
        }
      }
    }

    // 3. Fallback: If exactly 3 words are typed, map them directly to S-P-O
    if (words.length === 3 && (!s || !p || !o)) {
      s = words[0];
      p = words[1];
      o = words[2];
    }

    setFoundS(s);
    setFoundP(p);
    setFoundO(o);
  };

  const capitalize = (str) => {
    if (!str) return '-';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const isComplete = foundS && foundP && foundO;

  const handleSubmit = () => {
    if (!isComplete) return;
    
    const explain = `🎉 <strong>Luar Biasa Detektif!</strong> Kalimat SPO buatanmu berhasil dianalisis:<br/><br/>
      - 🟡 Subjek: <strong>${capitalize(foundS)}</strong> (Pelaku)<br/>
      - 🟢 Predikat: <strong>${capitalize(foundP)}</strong> (Kegiatan)<br/>
      - 🔵 Objek: <strong>${capitalize(foundO)}</strong> (Benda sasaran)`;

    onCheck(true, explain, {
      S: capitalize(foundS),
      P: capitalize(foundP),
      O: capitalize(foundO)
    });
  };

  return (
    <div className="sandbox-container">
      <p className="sandbox-instruction">Buatlah kalimat SPO dengan benar!</p>
      
      <div className="sandbox-input-group">
        <input
          ref={inputRef}
          type="text"
          className="sandbox-input"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Tuliskan kaalimatmu di kotak ini ya! (contoh: Rina minum susu)"
          autoComplete="off"
        />
      </div>

      <div className="sandbox-feedback-grid">
        {/* Subjek (S) */}
        <motion.div
          className={`sandbox-part s-part ${foundS ? 'active' : ''}`}
          animate={{ scale: foundS ? 1.05 : 1 }}
        >
          <div className="sandbox-label">Subjek (S)</div>
          <div className="sandbox-val">{capitalize(foundS)}</div>
        </motion.div>

        {/* Predikat (P) */}
        <motion.div
          className={`sandbox-part p-part ${foundP ? 'active' : ''}`}
          animate={{ scale: foundP ? 1.05 : 1 }}
        >
          <div className="sandbox-label">Predikat (P)</div>
          <div className="sandbox-val">{capitalize(foundP)}</div>
        </motion.div>

        {/* Objek (O) */}
        <motion.div
          className={`sandbox-part o-part ${foundO ? 'active' : ''}`}
          animate={{ scale: foundO ? 1.05 : 1 }}
        >
          <div className="sandbox-label">Objek (O)</div>
          <div className="sandbox-val">{capitalize(foundO)}</div>
        </motion.div>
      </div>

      <button
        className="btn-check"
        id="btn-check-sandbox"
        onClick={handleSubmit}
        disabled={!isComplete}
        style={{ marginTop: '24px', width: '100%', maxWidth: '240px' }}
      >
        Periksa Kalimat 🔍
      </button>
    </div>
  );
}
