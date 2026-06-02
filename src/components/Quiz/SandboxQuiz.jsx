import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { vocabS, vocabP, vocabO } from '../../data/quizData';

export default function SandboxQuiz({ q, onCheck, usedSentences = [] }) {
  const [inputValue, setInputValue] = useState('');
  const [foundS, setFoundS] = useState(null);
  const [foundP, setFoundP] = useState(null);
  const [foundO, setFoundO] = useState(null);
  const [warningMessage, setWarningMessage] = useState('');
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
    
    // 1. Find the Predikat (P) first
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (vocabP.includes(w)) {
        p = w;
        break;
      }
    }
    
    // Heuristic if not found in vocabP, check Indonesian morphological prefixes
    if (!p) {
      const verbPrefixes = ['me', 'di', 'ber', 'ter'];
      for (let i = 0; i < words.length; i++) {
        const w = words[i];
        if (w.length >= 4 && verbPrefixes.some(prefix => w.startsWith(prefix))) {
          p = w;
          break;
        }
      }
    }
    
    // 2. Parse Subjek (S) before Predikat, and Objek (O) after Predikat
    if (p) {
      const pIndex = words.indexOf(p);
      
      const beforeWords = words.slice(0, pIndex);
      const afterWords = words.slice(pIndex + 1);
      
      // Find S in beforeWords: prefer vocabS
      for (const w of beforeWords) {
        if (vocabS.includes(w)) {
          s = w;
          break;
        }
      }
      // Heuristic fallback for S
      if (!s && beforeWords.length > 0) {
        s = beforeWords.find(w => !vocabO.includes(w)) || beforeWords[0];
      }
      
      // Find O in afterWords: prefer vocabO
      for (const w of afterWords) {
        if (vocabO.includes(w)) {
          o = w;
          break;
        }
      }
      // Heuristic fallback for O (prefer vocabS next)
      if (!o) {
        for (const w of afterWords) {
          if (vocabS.includes(w)) {
            o = w;
            break;
          }
        }
      }
      // General fallback for O
      if (!o && afterWords.length > 0) {
        o = afterWords[0];
      }
    }
    
    setFoundS(s);
    setFoundP(p);
    setFoundO(o);

    // Check duplicate sentence
    const normalized = val
      .toLowerCase()
      .trim()
      .replace(/[.,?!]/g, '')
      .replace(/\s+/g, ' ');

    if (usedSentences.includes(normalized)) {
      setWarningMessage('⚠️ Kamu sudah menggunakan kalimat ini sebelumnya! Tulis kalimat yang berbeda ya.');
    } else {
      setWarningMessage('');
    }
  };

  const capitalize = (str) => {
    if (!str) return '-';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const isComplete = foundS && foundP && foundO;

  const handleSubmit = () => {
    if (!isComplete) return;

    const normalizedInput = inputValue
      .toLowerCase()
      .trim()
      .replace(/[.,?!]/g, '')
      .replace(/\s+/g, ' ');

    if (usedSentences.includes(normalizedInput)) {
      setWarningMessage('⚠️ Kamu sudah menggunakan kalimat ini sebelumnya! Tulis kalimat yang berbeda ya.');
      return;
    }

    // Check that S, P, O appear in the correct order in the original sentence
    const wordsLower = inputValue
      .toLowerCase()
      .replace(/[.,?!]/g, '')
      .split(/\s+/)
      .filter(Boolean);

    const pIndex = wordsLower.indexOf(foundP);
    
    let sIndex = -1;
    for (let i = 0; i < pIndex; i++) {
      if (wordsLower[i] === foundS) {
        sIndex = i;
        break;
      }
    }
    if (sIndex === -1) sIndex = wordsLower.indexOf(foundS);

    let oIndex = -1;
    for (let i = pIndex + 1; i < wordsLower.length; i++) {
      if (wordsLower[i] === foundO) {
        oIndex = i;
        break;
      }
    }
    if (oIndex === -1) oIndex = wordsLower.indexOf(foundO);

    const isOrderCorrect = sIndex !== -1 && pIndex !== -1 && oIndex !== -1 && sIndex < pIndex && pIndex < oIndex;

    // Check passive verb semantics
    const isPassive = foundP.startsWith('di') || [
      'dibaca', 'ditulis', 'dimasak', 'dicuci', 'dimakan', 'diminum', 'dilempar', 'dibeli', 'dibawa',
      'dibuka', 'ditutup', 'dipotong', 'disapu', 'dikepel', 'dibuang', 'diambil', 'dibuat',
      'dilihat', 'didengar', 'ditanam', 'disiram', 'dipetik', 'dijaga', 'dibantu', 'dipanggil',
      'dijemput', 'diantar', 'ditangkap', 'dikejar', 'diperiksa'
    ].includes(foundP);

    let isSemanticValid = true;
    let semanticErrorMsg = '';

    if (isPassive) {
      // In a passive sentence, the Object (agent) must be animate
      if (vocabO.includes(foundO)) {
        isSemanticValid = false;
        semanticErrorMsg = `🤔 Benda mati seperti <strong>${capitalize(foundO)}</strong> tidak bisa melakukan kegiatan <strong>${foundP}</strong>!`;
      }
    } else {
      // In an active sentence, the Subject (agent) must be animate
      if (vocabO.includes(foundS)) {
        isSemanticValid = false;
        semanticErrorMsg = `🤔 Benda mati seperti <strong>${capitalize(foundS)}</strong> tidak bisa melakukan kegiatan <strong>${foundP}</strong>!`;
      }
    }

    if (isOrderCorrect && isSemanticValid) {
      const explain = `🎉 <strong>Luar Biasa Detektif!</strong> Kalimat SPO buatanmu berhasil dianalisis:<br/><br/>
        - 🟡 Subjek: <strong>${capitalize(foundS)}</strong> (Pelaku)<br/>
        - 🟢 Predikat: <strong>${capitalize(foundP)}</strong> (Kegiatan)<br/>
        - 🔵 Objek: <strong>${capitalize(foundO)}</strong> (Benda sasaran)`;

      onCheck(true, explain, {
        S: capitalize(foundS),
        P: capitalize(foundP),
        O: capitalize(foundO),
        sentence: normalizedInput
      });
    } else if (!isSemanticValid) {
      onCheck(false, semanticErrorMsg, {
        S: capitalize(foundS),
        P: capitalize(foundP),
        O: capitalize(foundO)
      });
    } else {
      const explain = `🤔 <strong>Hmm, coba perhatikan urutannya ya!</strong><br/><br/>
        Ingat, kalimat SPO yang benar urutannya:<br/>
        - 🟡 <strong>Subjek (S)</strong> = Pelaku → siapa yang melakukan?<br/>
        - 🟢 <strong>Predikat (P)</strong> = Kegiatan → apa yang dilakukan?<br/>
        - 🔵 <strong>Objek (O)</strong> = Benda sasaran → apa yang dikenai?<br/><br/>
        Contoh: <strong>Saya</strong> (S) + <strong>menulis</strong> (P) + <strong>buku</strong> (O) ✅`;

      onCheck(false, explain, {
        S: capitalize(foundS),
        P: capitalize(foundP),
        O: capitalize(foundO)
      });
    }
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
          placeholder="Tuliskan kalimatmu di kotak ini ya! (contoh: Rina minum susu)"
          autoComplete="off"
        />
        {warningMessage && (
          <div className="sandbox-warning" style={{ color: '#e53e3e', fontSize: '0.9rem', marginTop: '8px', fontWeight: '600' }}>
            {warningMessage}
          </div>
        )}
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
        disabled={!isComplete || !!warningMessage}
        style={{ marginTop: '24px', width: '100%', maxWidth: '240px' }}
      >
        Periksa Kalimat 🔍
      </button>
    </div>
  );
}
