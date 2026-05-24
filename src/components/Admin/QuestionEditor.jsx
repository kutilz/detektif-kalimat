import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';

// Helper to shuffle array
function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Derive initial state from an existing question (for edit mode)
function deriveState(q) {
  if (!q) {
    return {
      type: 'token',
      questionText: '',
      hint: '',
      explain: '',
      sentence: '',
      tokenAnswer: '',
      scrambleWords: [],
      scrambleWordsDisplay: [],
      dragS: '',
      dragP: '',
      dragO: '',
    };
  }

  const base = {
    type: q.type || 'token',
    questionText: q.question || '',
    hint: q.hint || '',
    explain: q.explain || '',
    sentence: '',
    tokenAnswer: '',
    scrambleWords: [],
    scrambleWordsDisplay: [],
    dragS: '',
    dragP: '',
    dragO: '',
  };

  if (q.type === 'token') {
    base.sentence = q.sentence || '';
    base.tokenAnswer = typeof q.answer === 'string' ? q.answer : '';
  } else if (q.type === 'scramble') {
    // answer is the correct word order array
    base.scrambleWords = Array.isArray(q.answer) ? [...q.answer] : [];
    // words is the scrambled order array
    const savedWords = Array.isArray(q.words) ? [...q.words] : [];
    if (savedWords.length === 0 && base.scrambleWords.length > 0) {
      base.scrambleWordsDisplay = shuffleArray(base.scrambleWords);
    } else {
      base.scrambleWordsDisplay = savedWords;
    }
  } else if (q.type === 'drag') {
    base.dragS = q.answer?.S || '';
    base.dragP = q.answer?.P || '';
    base.dragO = q.answer?.O || '';
  }

  return base;
}

export default function QuestionEditor({ isOpen, onClose, onSave, editingQuestion }) {
  const isEditing = !!editingQuestion;

  // Step: 1 = choose type (add mode only), 2 = fill details
  const [step, setStep] = useState(isEditing ? 2 : 1);

  const [type, setType] = useState('token');
  const [questionText, setQuestionText] = useState('');
  const [hint, setHint] = useState('');
  const [explain, setExplain] = useState('');
  const [sentence, setSentence] = useState('');
  const [tokenAnswer, setTokenAnswer] = useState('');
  const [scrambleWords, setScrambleWords] = useState([]);
  const [scrambleWordsDisplay, setScrambleWordsDisplay] = useState([]);
  const [scrambleWordInput, setScrambleWordInput] = useState('');
  const [dragS, setDragS] = useState('');
  const [dragP, setDragP] = useState('');
  const [dragO, setDragO] = useState('');

  // Sync ALL state whenever the modal opens or editingQuestion changes
  useEffect(() => {
    if (!isOpen) return;
    const s = deriveState(editingQuestion);
    setStep(editingQuestion ? 2 : 1);
    setType(s.type);
    setQuestionText(s.questionText);
    setHint(s.hint);
    setExplain(s.explain);
    setSentence(s.sentence);
    setTokenAnswer(s.tokenAnswer);
    setScrambleWords(s.scrambleWords);
    setScrambleWordsDisplay(s.scrambleWordsDisplay);
    setScrambleWordInput('');
    setDragS(s.dragS);
    setDragP(s.dragP);
    setDragO(s.dragO);
  }, [isOpen, editingQuestion]);

  if (!isOpen) return null;

  // ---- Type select (add mode step 1) ----
  const handleSelectType = (t) => {
    setType(t);
    // Reset type-specific fields when switching type in add mode
    setSentence('');
    setTokenAnswer('');
    setScrambleWords([]);
    setScrambleWordsDisplay([]);
    setScrambleWordInput('');
    setDragS('');
    setDragP('');
    setDragO('');
    setStep(2);
  };

  // ---- Scramble helpers ----
  const handleAddScrambleWord = () => {
    const w = scrambleWordInput.trim();
    if (w) {
      setScrambleWords([...scrambleWords, w]);
      setScrambleWordsDisplay([...scrambleWordsDisplay, w]);
      setScrambleWordInput('');
    }
  };
  const handleRemoveScrambleWord = (idx) => {
    const wordToRemove = scrambleWords[idx];
    setScrambleWords(scrambleWords.filter((_, i) => i !== idx));
    const displayIdx = scrambleWordsDisplay.indexOf(wordToRemove);
    if (displayIdx !== -1) {
      setScrambleWordsDisplay(scrambleWordsDisplay.filter((_, i) => i !== displayIdx));
    }
  };
  const handleScrambleKeyDown = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); handleAddScrambleWord(); }
  };

  // ---- Token helpers ----
  const computeTokens = () => (sentence.trim() ? sentence.trim().split(/\s+/) : []);

  // ---- Validation ----
  const canSave = () => {
    if (!questionText.trim()) return false;
    if (type === 'token') return sentence.trim() && tokenAnswer.trim() && computeTokens().includes(tokenAnswer.trim());
    if (type === 'scramble') return scrambleWords.length >= 2;
    if (type === 'drag') return dragS.trim() && dragP.trim() && dragO.trim();
    return false;
  };

  // ---- Save ----
  const handleSave = () => {
    if (!canSave()) return;

    let question = {
      question: questionText.trim(),
      hint: hint.trim() || '💡 Perhatikan baik-baik!',
      explain: explain.trim() || '✅ Jawaban benar!',
      type,
    };

    if (type === 'token') {
      const tokens = computeTokens();
      question = { ...question, sentence: sentence.trim(), tokens, answer: tokenAnswer.trim() };
    } else if (type === 'scramble') {
      question = {
        ...question,
        words: [...scrambleWordsDisplay],
        answer: [...scrambleWords],
      };
    } else if (type === 'drag') {
      question = {
        ...question,
        sentence: `${dragS.trim()} ${dragP.trim()} ${dragO.trim()}`,
        words: [dragP.trim(), dragS.trim(), dragO.trim()].sort(() => Math.random() - 0.5),
        answer: { S: dragS.trim(), P: dragP.trim(), O: dragO.trim() },
      };
    }

    if (isEditing) question.id = editingQuestion.id;

    onSave(question);
    onClose();
  };

  const TYPE_INFO = {
    token: { icon: '🎯', label: 'Token', desc: 'Pilih kata yang tepat dari kalimat' },
    scramble: { icon: '🔀', label: 'Scramble', desc: 'Susun kata-kata acak menjadi kalimat' },
    drag: { icon: '📦', label: 'Drag SPO', desc: 'Tempatkan kata ke kotak S/P/O' },
  };

  return (
    <AnimatePresence>
      <motion.div
        className="admin-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="admin-modal"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="admin-modal-header">
            <h3>{isEditing ? '✏️ Edit Soal' : '➕ Tambah Soal Baru'}</h3>
            <button className="admin-modal-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="admin-modal-body">

            {/* ── Step 1: Choose Type (add mode only) ── */}
            {step === 1 && (
              <div className="admin-fade-in">
                <div className="admin-label">Pilih Tipe Soal</div>
                <div className="admin-radio-group" style={{ marginTop: 8 }}>
                  {Object.entries(TYPE_INFO).map(([key, info]) => (
                    <div
                      key={key}
                      className={`admin-radio-option ${type === key ? 'active' : ''}`}
                      onClick={() => handleSelectType(key)}
                    >
                      <span className="radio-icon">{info.icon}</span>
                      <span className="radio-label">{info.label}</span>
                      <span className="radio-desc">{info.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Step 2: Fill Details ── */}
            {step === 2 && (
              <div className="admin-fade-in">

                {/* Type badge + back button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  {!isEditing && (
                    <button
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      onClick={() => setStep(1)}
                    >
                      ← Ubah Tipe
                    </button>
                  )}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'var(--admin-surface-2)', borderRadius: 8,
                    padding: '4px 12px', fontSize: '0.82rem', fontWeight: 700,
                    color: 'var(--admin-accent)',
                  }}>
                    <span>{TYPE_INFO[type]?.icon}</span>
                    <span>{TYPE_INFO[type]?.label}</span>
                  </div>
                  {isEditing && (
                    <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-3)' }}>
                      Tipe soal tidak dapat diubah
                    </span>
                  )}
                </div>

                {/* Question text */}
                <div className="admin-form-group">
                  <label className="admin-label">Pertanyaan <span className="required">*</span></label>
                  <input
                    className="admin-input"
                    placeholder="Contoh: Tentukan SUBJEK dari kalimat berikut!"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>

                {/* ── Token fields ── */}
                {type === 'token' && (
                  <>
                    <div className="admin-form-group">
                      <label className="admin-label">Kalimat <span className="required">*</span></label>
                      <input
                        className="admin-input"
                        placeholder="Contoh: Ani membaca buku"
                        value={sentence}
                        onChange={(e) => {
                          setSentence(e.target.value);
                          // Clear token answer if it's no longer in the new tokens
                          if (tokenAnswer && !e.target.value.trim().split(/\s+/).includes(tokenAnswer)) {
                            setTokenAnswer('');
                          }
                        }}
                      />
                      {sentence.trim() && (
                        <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {computeTokens().map((t, i) => (
                            <span key={i} className="admin-chip">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Jawaban Benar <span className="required">*</span></label>
                      {computeTokens().length > 0 ? (
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {computeTokens().map((t, i) => (
                            <button
                              key={i}
                              className={`admin-btn admin-btn-sm ${tokenAnswer === t ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                              onClick={() => setTokenAnswer(t)}
                            >
                              {t} {tokenAnswer === t && '✓'}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div style={{ color: 'var(--admin-text-3)', fontSize: '0.85rem' }}>
                          Isi kalimat terlebih dahulu
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ── Scramble fields ── */}
                {type === 'scramble' && (
                  <div className="admin-form-group">
                    <label className="admin-label">
                      Kata-kata (urutan benar) <span className="required">*</span>
                    </label>
                    <div className="admin-chips-input">
                      {scrambleWords.map((w, i) => (
                        <span key={i} className="admin-chip">
                          {w}
                          <button className="admin-chip-remove" onClick={() => handleRemoveScrambleWord(i)}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                      <input
                        className="admin-chip-add-input"
                        placeholder="Ketik kata & Enter"
                        value={scrambleWordInput}
                        onChange={(e) => setScrambleWordInput(e.target.value)}
                        onKeyDown={handleScrambleKeyDown}
                      />
                    </div>
                    <button
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ marginTop: 8 }}
                      onClick={handleAddScrambleWord}
                      disabled={!scrambleWordInput.trim()}
                    >
                      + Tambah Kata
                    </button>
                    <div style={{ marginTop: 6, fontSize: '0.78rem', color: 'var(--admin-text-3)' }}>
                      Masukkan kata dalam urutan yang BENAR. Kata akan diacak saat soal ditampilkan.
                    </div>
                    {scrambleWords.length >= 2 && (
                      <>
                        <div style={{ marginTop: 10, padding: '8px 12px', background: 'var(--admin-surface-2)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--admin-text-2)' }}>
                          Urutan benar: <strong>{scrambleWords.join(' → ')}</strong>
                        </div>
                        <div style={{ marginTop: 16 }}>
                          <label className="admin-label">Urutan Tampilan Pilihan Kata (Scramble) <span className="required">*</span></label>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8, marginBottom: 8 }}>
                            {scrambleWordsDisplay.map((w, idx) => (
                              <span key={idx} className="admin-chip" style={{ background: 'rgba(244,161,0,0.15)', borderColor: 'var(--admin-accent)' }}>
                                {w}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                            style={{ display: 'flex', alignItems: 'center', gap: 4 }}
                            onClick={() => setScrambleWordsDisplay(shuffleArray(scrambleWordsDisplay))}
                          >
                            🎲 Acak Tampilan Pilihan
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* ── Drag SPO fields ── */}
                {type === 'drag' && (
                  <>
                    <div style={{ fontSize: '0.82rem', color: 'var(--admin-text-3)', marginBottom: 12, padding: '8px 12px', background: 'var(--admin-surface-2)', borderRadius: 8 }}>
                      💡 Isi S, P, O — siswa akan men-drag kata-kata ke kotak yang sesuai.
                    </div>
                    <div className="admin-form-row">
                      <div className="admin-form-group">
                        <label className="admin-label" style={{ color: '#f4a100' }}>Subjek (S) <span className="required">*</span></label>
                        <input
                          className="admin-input"
                          placeholder="Contoh: Budi"
                          value={dragS}
                          onChange={(e) => setDragS(e.target.value)}
                          style={{ borderColor: dragS ? '#f4a100' : undefined }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label" style={{ color: '#22c55e' }}>Predikat (P) <span className="required">*</span></label>
                        <input
                          className="admin-input"
                          placeholder="Contoh: membaca"
                          value={dragP}
                          onChange={(e) => setDragP(e.target.value)}
                          style={{ borderColor: dragP ? '#22c55e' : undefined }}
                        />
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-label" style={{ color: '#3b82f6' }}>Objek (O) <span className="required">*</span></label>
                        <input
                          className="admin-input"
                          placeholder="Contoh: buku"
                          value={dragO}
                          onChange={(e) => setDragO(e.target.value)}
                          style={{ borderColor: dragO ? '#3b82f6' : undefined }}
                        />
                      </div>
                    </div>
                    {dragS && dragP && dragO && (
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 4, padding: '8px 12px', background: 'var(--admin-surface-2)', borderRadius: 8, fontSize: '0.9rem' }}>
                        <span style={{ color: '#f4a100', fontWeight: 800 }}>S: {dragS}</span>
                        <span style={{ color: 'var(--admin-text-3)' }}>|</span>
                        <span style={{ color: '#22c55e', fontWeight: 800 }}>P: {dragP}</span>
                        <span style={{ color: 'var(--admin-text-3)' }}>|</span>
                        <span style={{ color: '#3b82f6', fontWeight: 800 }}>O: {dragO}</span>
                      </div>
                    )}
                  </>
                )}

                {/* Hint & Explain */}
                <div className="admin-form-group" style={{ marginTop: 8 }}>
                  <label className="admin-label">Hint (opsional)</label>
                  <input
                    className="admin-input"
                    placeholder="💡 Contoh hint untuk siswa"
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Penjelasan (opsional)</label>
                  <textarea
                    className="admin-textarea"
                    placeholder="✅ Penjelasan jawaban yang benar"
                    value={explain}
                    onChange={(e) => setExplain(e.target.value)}
                  />
                </div>

                {/* Live validation indicator */}
                {!canSave() && questionText.trim() && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--admin-danger, #ef4444)', marginTop: 4 }}>
                    {type === 'token' && !sentence.trim() && '⚠ Isi kalimat terlebih dahulu'}
                    {type === 'token' && sentence.trim() && !tokenAnswer && '⚠ Pilih jawaban benar dari token di atas'}
                    {type === 'scramble' && scrambleWords.length < 2 && '⚠ Tambahkan minimal 2 kata'}
                    {type === 'drag' && (!dragS || !dragP || !dragO) && '⚠ Isi semua field S, P, dan O'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {step === 2 && (
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={onClose}>
                Batal
              </button>
              <button
                className="admin-btn admin-btn-primary"
                onClick={handleSave}
                disabled={!canSave()}
                style={!canSave() ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
              >
                <Save size={16} />
                {isEditing ? 'Simpan Perubahan' : 'Tambah Soal'}
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
