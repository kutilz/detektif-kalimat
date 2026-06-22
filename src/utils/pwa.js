// ============================================
// PWA helpers — install prompt + standalone detection
// ============================================

let deferredPrompt = null;
const listeners = new Set();

function notify() {
  listeners.forEach((l) => {
    try { l(); } catch {}
  });
}

if (typeof window !== 'undefined') {
  // Chrome/Android fires this when the app is installable. We stash the event
  // so a custom "Install" button can trigger the native prompt on demand.
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    notify();
  });

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    notify();
  });
}

export function canInstall() {
  return !!deferredPrompt;
}

export function subscribeInstall(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export async function promptInstall() {
  if (!deferredPrompt) return null;
  deferredPrompt.prompt();
  const choice = await deferredPrompt.userChoice;
  deferredPrompt = null;
  notify();
  return choice.outcome; // 'accepted' | 'dismissed'
}

// True when running as an installed app (home-screen / standalone window).
export function isStandalone() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true ||
    document.referrer.startsWith('android-app://')
  );
}

export function getPlatform() {
  const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || '';
  const isIOS =
    /iphone|ipad|ipod/i.test(ua) ||
    // iPadOS 13+ reports as Macintosh but is touch-capable
    (/Macintosh/.test(ua) && typeof navigator !== 'undefined' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(ua);
  return { isIOS, isAndroid };
}

const SKIP_KEY = 'dk_install_skipped';

export function isInstallSkipped() {
  try {
    return localStorage.getItem(SKIP_KEY) === '1';
  } catch {
    return false;
  }
}

export function setInstallSkipped(v) {
  try {
    if (v) localStorage.setItem(SKIP_KEY, '1');
    else localStorage.removeItem(SKIP_KEY);
  } catch {}
}
