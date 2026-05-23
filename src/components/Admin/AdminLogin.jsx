import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowLeft } from 'lucide-react';
import { verifyPasskey } from '../../data/adminStore';

export default function AdminLogin({ onLogin }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);
  const maxLen = 4;

  const handleDigit = useCallback((digit) => {
    if (pin.length >= maxLen) return;
    const next = pin + digit;
    setPin(next);
    setError('');

    if (next.length === maxLen) {
      // Auto-submit after a brief delay for visual feedback
      setTimeout(() => {
        if (verifyPasskey(next)) {
          onLogin();
        } else {
          setShaking(true);
          setError('Passkey salah! Coba lagi.');
          setTimeout(() => {
            setPin('');
            setShaking(false);
          }, 500);
        }
      }, 200);
    }
  }, [pin, onLogin]);

  const handleBackspace = useCallback(() => {
    setPin((p) => p.slice(0, -1));
    setError('');
  }, []);

  const handleGoBack = () => {
    window.location.hash = '';
  };

  return (
    <motion.div
      className="admin-login-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`admin-login-card ${shaking ? 'shake-anim' : ''}`}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <span className="admin-login-icon">
          <Shield size={48} color="#f4a100" style={{ margin: '0 auto' }} />
        </span>
        <h1 className="admin-login-title">Admin Panel</h1>
        <p className="admin-login-subtitle">Masukkan passkey untuk melanjutkan</p>

        {/* PIN Dots */}
        <div className="admin-passkey-dots">
          {Array.from({ length: maxLen }).map((_, i) => (
            <motion.div
              key={i}
              className={`admin-passkey-dot ${i < pin.length ? 'filled' : ''}`}
              animate={i < pin.length ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        {/* Number Pad */}
        <div className="admin-numpad">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              className="admin-numpad-btn"
              onClick={() => handleDigit(String(n))}
            >
              {n}
            </button>
          ))}
          <button className="admin-numpad-btn action" onClick={handleBackspace}>
            ⌫
          </button>
          <button
            className="admin-numpad-btn"
            onClick={() => handleDigit('0')}
          >
            0
          </button>
          <div className="admin-numpad-btn action" style={{ cursor: 'default', opacity: 0 }} />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="admin-login-error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back Button */}
        <button className="admin-login-back" onClick={handleGoBack}>
          <ArrowLeft size={16} /> Kembali ke Beranda
        </button>
      </motion.div>
    </motion.div>
  );
}
