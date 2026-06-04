import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Hash, Phone, Instagram, Linkedin, Sparkles, Award, X } from 'lucide-react';
import ParticlesBackground from '../ReactBits/ParticlesBackground';

export default function IdentityLoadingScreen({ isInitialLoad = true, isStoreLoaded, onComplete, onClose }) {
  const [progress, setProgress] = useState(isInitialLoad ? 0 : 100);
  const [statusText, setStatusText] = useState(isInitialLoad ? 'Menghubungkan ke Server...' : 'Informasi Pengembang');
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Keep track of window size for precise collapse animation to bottom-left corner
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Linear progress timer for initial load
  useEffect(() => {
    if (!isInitialLoad) return;

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
  }, [isInitialLoad]);

  // Update status messages during initial load
  useEffect(() => {
    if (!isInitialLoad) {
      setStatusText('Deteksi Unsur Kalimat Aktif!');
      return;
    }
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
  }, [progress, isInitialLoad]);

  // Handle completion when progress is 100% and store is loaded (for initial load)
  useEffect(() => {
    if (isInitialLoad && progress === 100 && isStoreLoaded) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 500); // Small delay for visual polish
      return () => clearTimeout(timeout);
    }
  }, [progress, isStoreLoaded, isInitialLoad, onComplete]);

  // Animation Variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    exit: {
      opacity: 0,
      scale: 0.05,
      // Target the exact bottom-left corner where the floating Info button sits
      x: -(windowSize.width / 2) + 40,
      y: (windowSize.height / 2) - 40,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  return (
    <motion.div
      className="identity-loader-screen"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Background Forest Overlay */}
      <div className="loader-bg-overlay" />
      <ParticlesBackground count={30} color="#f9c74f" />

      <motion.div
        className="loader-card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Close Button (only when opened as Info modal) */}
        {!isInitialLoad && (
          <button
            className="loader-close-btn"
            onClick={onClose}
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        )}

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
              <span className="avatar-initials">Ale</span>
            </div>
          </div>

          <div className="developer-info">
            <h2 className="dev-name">Berliana Indra Lestari</h2>
            
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

          <a
            href="https://id.linkedin.com/in/berliana-indra-lestari"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item linkedin-btn"
          >
            <div className="contact-icon-wrapper">
              <Linkedin size={18} />
            </div>
            <div className="contact-text">
              <span className="contact-label">LinkedIn</span>
              <span className="contact-value">Berliana Indra Lestari</span>
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
    </motion.div>
  );
}
