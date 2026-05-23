import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Save } from 'lucide-react';

export default function QuestionEditor({ isOpen, onClose, onSave, editingQuestion }) {
  const isEditing = !!editingQuestion;
  const [step, setStep] = useState(isEditing ? 2 : 1);
  const [type, setType] = useState(editingQuestion?.type || 'token');

  // Common fields
  const [questionText, setQuestionText] = useState(editingQuestion?.question || '');
  const [hint, setHint] = useState(editingQuestion?.hint || '');
  const [explain, setExplain] = useState(editingQuestion?.explain || '');

  // Token type
  const [sentence, setSentence] = useState(editingQuestion?.sentence || '');
  const [tokenAnswer, setTokenAnswer] = useState(editingQuestion?.answer || '');

  // Scramble type
  const [scrambleWords, setScrambleWords] = useState(editingQuestion?.answer || []);
  const [scrambleWordInput, setScrambleWordInput] = useState('');

  // Drag type
  const [dragS, setDragS] = useState(editingQuestion?.answer?.S || '');
  const [dragP, setDragP] = useState(editingQuestion?.answer?.P || '');
  const [dragO, setDragO] = useState(editingQuestion?.answer?.O || '');

  if (!isOpen) return null;

  const handleSelectType = (t) => {
    setType(t);
    setStep(2);
    // Reset fields
    if (!isEditing) {
      setQuestionText('');
      setHint('');
      setExplain('');
      setSentence('');
      setTokenAnswer('');
      setScrambleWords([]);
      setDragS('');
      setDragP('');
      setDragO('');
    }
  };

  const handleAddScrambleWord = () => {
    const w = scrambleWordInput.trim();
    if (w) {
      setScrambleWords([...scrambleWords, w]);
      setScrambleWordInput('');
    }
  };

  const handleRemoveScrambleWord = (idx) => {
    setScrambleWords(scrambleWords.filter((_, i) => i !== idx));
  };

  const handleScrambleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddScrambleWord();
    }
  };

  const computeTokens = () => {
    if (!sentence.trim()) return [];
    return sentence.trim().split(/\s+/);
  };

  const canSave = () => {
    if (!questionText.trim()) return false;
    if (type === 'token') {
      return sentence.trim() && tokenAnswer.trim() && computeTokens().includes(tokenAnswer.trim());
    }
    if (type === 'scramble') {
      return scrambleWords.length >= 2;
    }
    if (type === 'drag') {
      return dragS.trim() && dragP.trim() && dragO.trim();
    }
    return false;
  };

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
      question = {
        ...question,
        sentence: sentence.trim(),
        tokens,
        answer: tokenAnswer.trim(),
      };
    } else if (type === 'scramble') {
      question = {
        ...question,
        words: [...scrambleWords].sort(() => Math.random() - 0.5),
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

    if (isEditing) {
      question.id = editingQuestion.id;
    }

    onSave(question);
    onClose();
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
            {/* Step 1: Choose Type */}
            {step === 1 && (
              <div className="admin-fade-in">
                <div className="admin-label">Pilih Tipe Soal</div>
                <div className="admin-radio-group" style={{ marginTop: 8 }}>
                  <div
                    className={`admin-radio-option ${type === 'token' ? 'active' : ''}`}
                    onClick={() => handleSelectType('token')}
                  >
                    <span className="radio-icon">🎯</span>
                    <span className="radio-label">Token</span>
                    <span className="radio-desc">Pilih kata yang tepat</span>
                  </div>
                  <div
                    className={`admin-radio-option ${type === 'scramble' ? 'active' : ''}`}
                    onClick={() => handleSelectType('scramble')}
                  >
                    <span className="radio-icon">🔀</span>
                    <span className="radio-label">Scramble</span>
                    <span className="radio-desc">Susun kata acak</span>
                  </div>
                  <div
                    className={`admin-radio-option ${type === 'drag' ? 'active' : ''}`}
                    onClick={() => handleSelectType('drag')}
                  >
                    <span className="radio-icon">🎯</span>
                    <span className="radio-label">Drag SPO</span>
                    <span className="radio-desc">Tempatkan ke S/P/O</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Fill Details */}
            {step === 2 && (
              <div className="admin-fade-in">
                {!isEditing && (
                  <button
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={() => setStep(1)}
                    style={{ marginBottom: 20 }}
                  >
                    ← Ubah Tipe
                  </button>
                )}

                <div className="admin-form-group">
                  <label className="admin-label">Pertanyaan <span className="required">*</span></label>
                  <input
                    className="admin-input"
                    placeholder="Contoh: Tentukan SUBJEK dari kalimat berikut!"
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                  />
                </div>

                {/* Token Type Fields */}
                {type === 'token' && (
                  <>
                    <div className="admin-form-group">
                      <label className="admin-label">Kalimat <span className="required">*</span></label>
                      <input
                        className="admin-input"
                        placeholder="Contoh: Ani membaca buku"
                        value={sentence}
                        onChange={(e) => setSentence(e.target.value)}
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
                              {t}
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

                {/* Scramble Type Fields */}
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
                    <div style={{ marginTop: 6, fontSize: '0.78rem', color: 'var(--admin-text-3)' }}>
                      Masukkan kata dalam urutan yang BENAR. Kata akan diacak saat soal ditampilkan.
                    </div>
                  </div>
                )}

                {/* Drag Type Fields */}
                {type === 'drag' && (
                  <div className="admin-form-row">
                    <div className="admin-form-group">
                      <label className="admin-label">Subjek (S) <span className="required">*</span></label>
                      <input
                        className="admin-input"
                        placeholder="Contoh: Budi"
                        value={dragS}
                        onChange={(e) => setDragS(e.target.value)}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Predikat (P) <span className="required">*</span></label>
                      <input
                        className="admin-input"
                        placeholder="Contoh: membaca"
                        value={dragP}
                        onChange={(e) => setDragP(e.target.value)}
                      />
                    </div>
                    <div className="admin-form-group">
                      <label className="admin-label">Objek (O) <span className="required">*</span></label>
                      <input
                        className="admin-input"
                        placeholder="Contoh: buku"
                        value={dragO}
                        onChange={(e) => setDragO(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="admin-form-group">
                  <label className="admin-label">Hint</label>
                  <input
                    className="admin-input"
                    placeholder="💡 Contoh hint untuk siswa"
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Penjelasan</label>
                  <textarea
                    className="admin-textarea"
                    placeholder="✅ Penjelasan jawaban yang benar"
                    value={explain}
                    onChange={(e) => setExplain(e.target.value)}
                  />
                </div>

                {/* Preview */}
                {canSave() && (
                  <div className="admin-preview-card">
                    <div className="admin-preview-label">👁 Preview Soal</div>
                    <div style={{ color: 'var(--admin-text)', fontWeight: 700, marginBottom: 8 }}>
                      {questionText}
                    </div>
                    {type === 'token' && (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {computeTokens().map((t, i) => (
                          <span
                            key={i}
                            className="admin-chip"
                            style={t === tokenAnswer ? { background: 'rgba(244,161,0,0.3)', borderColor: 'var(--admin-accent)' } : {}}
                          >
                            {t} {t === tokenAnswer && '✓'}
                          </span>
                        ))}
                      </div>
                    )}
                    {type === 'scramble' && (
                      <div style={{ color: 'var(--admin-text-2)', fontSize: '0.85rem' }}>
                        Urutan benar: {scrambleWords.join(' → ')}
                      </div>
                    )}
                    {type === 'drag' && (
                      <div style={{ display: 'flex', gap: 12 }}>
                        <span style={{ color: '#f4a100', fontWeight: 800 }}>S: {dragS}</span>
                        <span style={{ color: '#22c55e', fontWeight: 800 }}>P: {dragP}</span>
                        <span style={{ color: '#3b82f6', fontWeight: 800 }}>O: {dragO}</span>
                      </div>
                    )}
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
