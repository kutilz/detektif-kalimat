import React, { useEffect, useState } from 'react';
import { Download, Share, PlusSquare, WifiOff, Zap, X } from 'lucide-react';
import {
  canInstall,
  subscribeInstall,
  promptInstall,
  getPlatform,
} from '../utils/pwa';

// Full-screen "Install the app first" gate, shown to users who open the site
// in a browser (not yet installed). Skippable via "Lanjut di browser".
export default function InstallGate({ onSkip }) {
  const [installable, setInstallable] = useState(canInstall());
  const { isIOS, isAndroid } = getPlatform();

  useEffect(() => subscribeInstall(() => setInstallable(canInstall())), []);

  const handleInstall = async () => {
    const outcome = await promptInstall();
    if (outcome === 'accepted') {
      // appinstalled will fire; the gate unmounts once standalone is detected.
    }
  };

  return (
    <div className="install-gate">
      <button className="install-skip-x" onClick={onSkip} aria-label="Lanjut di browser">
        <X size={22} />
      </button>

      <div className="install-card">
        <img className="install-icon" src="/pwa-192x192.png" alt="Detektif Kalimat" />
        <h1 className="install-title">Detektif Kalimat</h1>
        <p className="install-sub">Pasang aplikasinya biar bisa main langsung dari layar HP!</p>

        <ul className="install-benefits">
          <li><WifiOff size={20} /> Bisa dimainkan <b>tanpa internet</b></li>
          <li><Zap size={20} /> Buka lebih cepat, layar penuh tanpa browser</li>
          <li><Download size={20} /> Nilai &amp; skor otomatis tersimpan saat online</li>
        </ul>

        {installable && (
          <button className="install-btn" onClick={handleInstall}>
            <Download size={22} /> Pasang Aplikasi
          </button>
        )}

        {!installable && isIOS && (
          <div className="install-ios-steps">
            <p className="install-ios-title">Cara pasang di iPhone/iPad:</p>
            <ol>
              <li>Ketuk tombol <Share size={16} className="inline-ic" /> <b>Bagikan</b> di Safari</li>
              <li>Pilih <PlusSquare size={16} className="inline-ic" /> <b>Tambahkan ke Layar Utama</b></li>
              <li>Ketuk <b>Tambah</b></li>
            </ol>
          </div>
        )}

        {!installable && !isIOS && (
          <div className="install-ios-steps">
            <p className="install-ios-title">
              {isAndroid ? 'Buka menu ⋮ browser lalu pilih ' : 'Di menu browser pilih '}
              <b>“Pasang aplikasi”</b> / <b>“Tambahkan ke Layar Utama”</b>.
            </p>
          </div>
        )}

        <button className="install-skip" onClick={onSkip}>
          Lanjut di browser saja
        </button>
      </div>
    </div>
  );
}
