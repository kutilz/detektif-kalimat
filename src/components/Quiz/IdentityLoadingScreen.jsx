import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Hash, Phone, Instagram, Sparkles, Award } from 'lucide-react';
import ParticlesBackground from '../ReactBits/ParticlesBackground';

export default function IdentityLoadingScreen({ isStoreLoaded, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Menghubungkan ke Server...');

  useEffect(() => {
    const duration = 3000; // 3 seconds total wait time
    const intervalTime = 30; // 30ms tick
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress < 20) {
      setStatusText('🔍 Menghubungkan ke Server...');
    } else if (progress < 40) {
      setStatusText('📖 Memuat Database Soal SPO...');
    } else if (progress < 60) {
      setStatusText('✨ Mempersiapkan Karakter Detektif...');
    } else if (progress < 80) {
      setStatusText('🎵 Mengaktifkan Audio Efek...');
    } else if (progress < 100) {
      setStatusText('🚀 Menyiapkan Ruang Investigasi...');
    } else {
      setStatusText('Deteksi Selesai! Selamat Datang...');
    }
  }, [progress]);

  // Handle completion when progress is 100% and store is loaded
  useEffect(() => {
    if (progress === 100 && isStoreLoaded) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500); // Small delay for visual polish
      return () => clearTimeout(timeout);
    }
  }, [progress, isStoreLoaded, onComplete]);

  return (
    <div className="identity-loader-screen">
      {/* Background Forest Overlay */}
      <div className="loader-bg-overlay" />
      <ParticlesBackground count={30} color="#f9c74f" />

      <motion.div
        className="loader-card"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Decorative Badge */}
        <div className="loader-badge">
          <Sparkles className="icon-sparkle" size={14} style={{ color: 'var(--yellow)' }} />
          <span>MEDIA PEMBELAJARAN INTERAKTIF</span>
        </div>

        {/* Game Title */}
        <h1 className="loader-title">
          DETEKTIF KALIMAT
        </h1>
        <p className="loader-subtitle">Aplikasi Pengenalan Unsur Kalimat SPO</p>

        {/* Divider */}
        <div className="loader-divider">
          <span className="divider-line" />
          <div className="divider-icon-wrapper">
            <Search className="divider-icon" size={18} />
          </div>
          <span className="divider-line" />
        </div>

        {/* Identity Section */}
        <div className="developer-profile">
          <div className="avatar-container">
            <div className="avatar-ring" />
            <div className="avatar-content">
              <span className="avatar-initials">BIL</span>
            </div>
          </div>

          <div className="developer-info">
            <span className="dev-label">PENGEMBANG APLIKASI</span>
            <h2 className="dev-name">Berliana Indah Lestari</h2>
            
            <div className="nim-badge">
              <Hash size={12} className="nim-icon" />
              <span>NIM 2207343</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="contact-links">
          <a
            href="https://wa.me/6287784891482"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item whatsapp-btn"
          >
            <div className="contact-icon-wrapper">
              <Phone size={18} />
            </div>
            <div className="contact-text">
              <span className="contact-label">WhatsApp</span>
              <span className="contact-value">+62 877-8489-1482</span>
            </div>
          </a>

          <a
            href="https://instagram.com/berlianaindrale"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item instagram-btn"
          >
            <div className="contact-icon-wrapper">
              <Instagram size={18} />
            </div>
            <div className="contact-text">
              <span className="contact-label">Instagram</span>
              <span className="contact-value">@berlianaindrale</span>
            </div>
          </a>
        </div>

        {/* Progress & Loading State */}
        <div className="loading-progress-container">
          <div className="progress-text-wrapper">
            <span className="status-text">{statusText}</span>
            <span className="percentage-text">{Math.round(progress)}%</span>
          </div>

          <div className="progress-bar-bg">
            <motion.div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
        </div>

        <div className="loader-footer">
          <Award size={14} className="footer-icon" />
          <span>Universitas Pendidikan Indonesia</span>
        </div>
      </motion.div>
    </div>
  );
}
