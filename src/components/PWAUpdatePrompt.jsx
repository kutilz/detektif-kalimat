import { useRegisterSW } from 'virtual:pwa-register/react';
import { motion, AnimatePresence } from 'framer-motion';

// How often an already-open (installed) app re-checks for a newly deployed
// version. This is what makes updates feel automatic even when the app is never
// fully closed. Offline is unaffected — registration.update() is a harmless no-op
// without a network.
const UPDATE_CHECK_INTERVAL = 30 * 60 * 1000; // 30 minutes

export default function PWAUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return;

      // Periodic check so a long-running installed app notices new deploys
      // without needing to be manually closed and reopened.
      setInterval(() => {
        registration.update().catch(() => {});
      }, UPDATE_CHECK_INTERVAL);

      // Also check the moment the app regains focus (user reopens/switches back).
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          registration.update().catch(() => {});
        }
      });
    },
  });

  return (
    <AnimatePresence>
      {needRefresh && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          style={styles.wrap}
          role="status"
          aria-live="polite"
        >
          <span style={styles.text}>✨ Versi baru tersedia</span>
          <div style={styles.actions}>
            <button style={styles.updateBtn} onClick={() => updateServiceWorker(true)}>
              Perbarui
            </button>
            <button
              style={styles.closeBtn}
              onClick={() => setNeedRefresh(false)}
              aria-label="Tutup"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Inline styles keep this drop-in (no index.css changes) while matching the app
// theme: cream bg, orange accent, Fredoka. Sits bottom-centre, lifted above the
// floating download button (bottom-right) so they never overlap.
const styles = {
  wrap: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
    zIndex: 10001,
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    maxWidth: 'min(92vw, 380px)',
    width: 'max-content',
    padding: '10px 12px 10px 18px',
    borderRadius: 999,
    background: '#fff9f0',
    border: '3px solid #f4a100',
    boxShadow: '0 8px 24px rgba(92,51,23,.28)',
    fontFamily: "'Fredoka', 'Nunito', sans-serif",
  },
  text: {
    color: '#5c3317',
    fontWeight: 700,
    fontSize: '0.98rem',
    whiteSpace: 'nowrap',
  },
  actions: { display: 'flex', alignItems: 'center', gap: 6 },
  updateBtn: {
    fontFamily: "'Fredoka', sans-serif",
    fontWeight: 700,
    fontSize: '0.95rem',
    color: '#fff',
    background: 'linear-gradient(135deg, #f9c74f, #f4a100)',
    border: 'none',
    borderRadius: 999,
    padding: '8px 18px',
    cursor: 'pointer',
    boxShadow: '0 3px 8px rgba(244,161,0,.4)',
  },
  closeBtn: {
    fontFamily: "'Fredoka', sans-serif",
    fontSize: '1.4rem',
    lineHeight: 1,
    color: '#8b5e3c',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '2px 6px',
  },
};
