import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmModal({ isOpen, onClose, onConfirm, message }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="confirm-modal-overlay">
          {/* Backdrop */}
          <motion.div
            className="confirm-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div
            className="confirm-modal-card"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            <div className="confirm-modal-icon">⚠️</div>
            <h3 className="confirm-modal-title">Konfirmasi</h3>
            <p className="confirm-modal-message">{message}</p>
            <div className="confirm-modal-actions">
              <button className="confirm-btn confirm-btn-cancel" onClick={onClose}>
                Batal
              </button>
              <button className="confirm-btn confirm-btn-yes" onClick={onConfirm}>
                Ya, Keluar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
