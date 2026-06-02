import React, { useState } from 'react';

// Interactive Slide Components
export function SubjekSlide() {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="materi-body">
      <button 
        className="spo-box s clickable-spo-btn" 
        onClick={() => setShowExplanation(!showExplanation)}
        style={{ 
          marginBottom: '12px', 
          padding: '12px', 
          width: '100%', 
          textAlign: 'left',
          cursor: 'pointer',
          border: '3px solid var(--yellow-deep)',
          transition: 'all 0.2s ease',
          display: 'block'
        }}
      >
        <div className="spo-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>S = Subjek</span>
          <span style={{ fontSize: '0.85rem', background: '#f4a100', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
            {showExplanation ? 'Tutup ✖' : 'Klik Penjelasan Detail! 🔍'}
          </span>
        </div>
        <div className="spo-name" style={{ fontSize: '.95rem', marginTop: '6px', fontWeight: 600 }}>Siapa yang melakukan kegiatan?</div>
      </button>

      {showExplanation && (
        <div className="explain-detail-box s-detail" style={{
          background: 'rgba(255, 248, 225, 0.95)',
          border: '2px dashed #f4a100',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '12px',
          animation: 'slideDown 0.3s ease-out',
          textAlign: 'left'
        }}>
          <h4 style={{ color: '#e65100', margin: '0 0 8px 0', fontSize: '1.05rem', fontFamily: 'Fredoka', fontWeight: 'bold' }}>🕵️‍♂️ Contoh Subjek:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#5c3317', lineHeight: '1.5', fontFamily: 'Nunito' }}>
            <li>🧑 <strong>Nama Orang / Keluarga:</strong> ayah, ibu, kakak, adik, nenek, kakek, paman, bibi, Budi, Ani, Rina, dll.</li>
            <li>👤 <strong>Kata Ganti:</strong> dia, aku, saya, mereka, kami, kamu, kalian, dll.</li>
            <li>🐱 <strong>Hewan:</strong> sapi, monyet, kucing, kambing, kelinci, anjing, gajah, dll.</li>
          </ul>
        </div>
      )}

      <div className="example-box" style={{ background: 'rgba(255,255,255,0.85)' }}>
        <div className="example-label">▶ Contoh</div>
        <div className="example-sentence">
          "<span className="highlight-s">Budi</span> bermain bola"
        </div>
        <div className="example-analysis">Subjek = <strong style={{ color: '#f4a100' }}>Budi</strong> (yang bermain)</div>
      </div>
      <div className="materi-image-row">
        <img src="/images/image17.png" alt="Budi bermain bola" />
        <img src="/images/image18.png" alt="Subjek" />
      </div>
    </div>
  );
}

export function PredikatSlide() {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="materi-body">
      <button 
        className="spo-box p clickable-spo-btn" 
        onClick={() => setShowExplanation(!showExplanation)}
        style={{ 
          marginBottom: '12px', 
          padding: '12px', 
          width: '100%', 
          textAlign: 'left',
          cursor: 'pointer',
          border: '3px solid var(--green)',
          transition: 'all 0.2s ease',
          display: 'block'
        }}
      >
        <div className="spo-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>P = Predikat</span>
          <span style={{ fontSize: '0.85rem', background: '#2e7d32', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
            {showExplanation ? 'Tutup ✖' : 'Klik Penjelasan Detail! 🔍'}
          </span>
        </div>
        <div className="spo-name" style={{ fontSize: '.95rem', marginTop: '6px', fontWeight: 600 }}>Apa yang sedang dilakukan?</div>
      </button>

      {showExplanation && (
        <div className="explain-detail-box p-detail" style={{
          background: 'rgba(232, 245, 233, 0.95)',
          border: '2px dashed #2e7d32',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '12px',
          animation: 'slideDown 0.3s ease-out',
          textAlign: 'left'
        }}>
          <h4 style={{ color: '#1b5e20', margin: '0 0 8px 0', fontSize: '1.05rem', fontFamily: 'Fredoka', fontWeight: 'bold' }}>🕵️‍♂️ Contoh Predikat:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#5c3317', lineHeight: '1.5', fontFamily: 'Nunito' }}>
            <li>🏃‍♂️ <strong>Kata Kerja Aktif (Kegiatan):</strong> membaca, menulis, memasak, mencuci, memanjat, meminum, memakan, melempar, berlari, dll.</li>
            <li>🔄 <strong>Kata Kerja Pasif (Dikenai):</strong> dibaca, ditulis, dimasak, dicuci, dipanjat, diminum, dimakan, dilempar, dll.</li>
          </ul>
        </div>
      )}

      <div className="example-box" style={{ background: 'rgba(255,255,255,0.85)', borderLeftColor: 'var(--green)' }}>
        <div className="example-label" style={{ color: 'var(--green-dark)' }}>▶ Contoh</div>
        <div className="example-sentence">
          "Kakak <span className="highlight-p">membaca</span> buku"
        </div>
        <div className="example-analysis">Predikat = <strong style={{ color: '#2e7d32' }}>membaca</strong> (kegiatan membaca)</div>
      </div>
      <div className="materi-image-row">
        <img src="/images/image21.png" alt="Membaca" />
        <img src="/images/image20.png" alt="Predikat" />
      </div>
    </div>
  );
}

export function ObjekSlide() {
  const [showExplanation, setShowExplanation] = useState(false);

  return (
    <div className="materi-body">
      <button 
        className="spo-box o clickable-spo-btn" 
        onClick={() => setShowExplanation(!showExplanation)}
        style={{ 
          marginBottom: '12px', 
          padding: '12px', 
          width: '100%', 
          textAlign: 'left',
          cursor: 'pointer',
          border: '3px solid var(--blue)',
          transition: 'all 0.2s ease',
          display: 'block'
        }}
      >
        <div className="spo-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>O = Objek</span>
          <span style={{ fontSize: '0.85rem', background: '#1565c0', color: '#fff', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
            {showExplanation ? 'Tutup ✖' : 'Klik Penjelasan Detail! 🔍'}
          </span>
        </div>
        <div className="spo-name" style={{ fontSize: '.95rem', marginTop: '6px', fontWeight: 600 }}>Benda yang dikenai kegiatan</div>
      </button>

      {showExplanation && (
        <div className="explain-detail-box o-detail" style={{
          background: 'rgba(227, 242, 253, 0.95)',
          border: '2px dashed #1565c0',
          borderRadius: '12px',
          padding: '14px 18px',
          marginBottom: '12px',
          animation: 'slideDown 0.3s ease-out',
          textAlign: 'left'
        }}>
          <h4 style={{ color: '#0d47a1', margin: '0 0 8px 0', fontSize: '1.05rem', fontFamily: 'Fredoka', fontWeight: 'bold' }}>🕵️‍♂️ Contoh Objek:</h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#5c3317', lineHeight: '1.5', fontFamily: 'Nunito' }}>
            <li>🍎 <strong>Makanan & Minuman:</strong> roti, susu, air, nasi, sayur, buah, kopi, teh, dll.</li>
            <li>⚽ <strong>Benda & Pakaian:</strong> buku, surat, bola, mobil, sepeda, tas, sepatu, baju, boneka, dll.</li>
            <li>🌲 <strong>Tumbuhan & Tempat:</strong> pohon, rumput, bunga, kelas, rumah, jalan, taman, dll.</li>
          </ul>
        </div>
      )}

      <div className="example-box" style={{ background: 'rgba(255,255,255,0.85)', borderLeftColor: 'var(--blue)' }}>
        <div className="example-label" style={{ color: 'var(--blue-dark)' }}>▶ Contoh</div>
        <div className="example-sentence">
          "Ibu memasak <span className="highlight-o">nasi</span>"
        </div>
        <div className="example-analysis">Objek = <strong style={{ color: '#1565c0' }}>nasi</strong> (yang dimasak)</div>
      </div>
      <div className="materi-image-row">
        <img src="/images/image24.png" alt="Memasak" />
        <img src="/images/image23.png" alt="Objek" />
      </div>
    </div>
  );
}

export function Contoh1Slide() {
  const [isBirdFlying, setIsBirdFlying] = useState(false);
  const [showFatherImage, setShowFatherImage] = useState(false);

  React.useEffect(() => {
    // Start bird flying animation after 1.5 seconds
    const flyTimeout = setTimeout(() => {
      setIsBirdFlying(true);
    }, 1500);

    // After bird flies away (animation takes 1.5s), show the father washing car image
    const revealTimeout = setTimeout(() => {
      setShowFatherImage(true);
    }, 3000);

    return () => {
      clearTimeout(flyTimeout);
      clearTimeout(revealTimeout);
    };
  }, []);

  return (
    <div className="materi-body">
      <div className="example-box" style={{ background: 'rgba(255,255,255,0.85)' }}>
        <div className="example-label">▶ Analisis Kalimat</div>
        <div className="example-sentence">
          "<span className="highlight-s">Ayah</span> <span className="highlight-p">mencuci</span> <span className="highlight-o">mobil</span>"
        </div>
        <div className="example-analysis">
          S: <strong>Ayah</strong> | P: <strong>mencuci</strong> | O: <strong>mobil</strong>
        </div>
      </div>

      <div className="materi-image-row contoh1-image-container" style={{ 
        position: 'relative', 
        minHeight: '180px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        margin: '15px auto 0',
        width: '100%'
      }}>
        {/* Bird Image (image16.png) */}
        {!showFatherImage && (
          <img 
            src="/images/image16.png" 
            alt="Burung" 
            className={`contoh1-bird ${isBirdFlying ? 'fly-away' : ''}`}
            style={{
              maxHeight: '120px',
              transition: 'transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1.2s ease',
              zIndex: 5
            }}
          />
        )}

        {/* Mobil Image (image25.png) */}
        {!showFatherImage && !isBirdFlying && (
          <img 
            src="/images/image25.png" 
            alt="Mobil" 
            style={{
              maxHeight: '60px',
              marginLeft: '15px'
            }}
          />
        )}

        {/* Father Washing Car Image (revealed after bird flies away) */}
        {showFatherImage && (
          <img 
            src="/images/father_washing_car.png" 
            alt="Ayah mencuci mobil" 
            className="fade-in-image"
            style={{
              maxHeight: '180px',
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              border: '4px solid #fff',
              display: 'block'
            }}
          />
        )}
      </div>
    </div>
  );
}

// Vocabulary for real-time Sandbox parser
export const vocabS = [
  // Kata Ganti & Keluarga
  'rina', 'ayah', 'kakak', 'ibu', 'dia', 'budi', 'saya', 'aku', 'kami', 'mereka', 
  'kalian', 'kamu', 'tante', 'adik', 'monyet', 'sapi', 'kerbau', 'kucing', 'anjing', 
  'guru', 'murid', 'kakek', 'nenek', 'paman', 'mama', 'papa', 'dokter', 'polisi', 
  'tentara', 'petani', 'nelayan', 'sopir', 'pilot', 'koki', 'anak', 'orang',
  // Nama-nama umum
  'siti', 'aldi', 'dodi', 'lani', 'edo', 'rudi', 'roni', 'dika', 'iwan', 'siska', 'ani', 
  'lisa', 'nita', 'wati', 'joko', 'ali', 'ratna', 'tito', 'kiki', 'wawan',
  // Hewan tambahan
  'kambing', 'domba', 'kelinci', 'gajah', 'singa', 'harimau', 'kuda', 'jerapah', 
  'ayam', 'bebek', 'burung', 'ular', 'tikus', 'semut', 'lebah', 'buaya'
];

export const vocabP = [
  // Kata Kerja Aktif
  'minum', 'meminum', 'mencuci', 'cuci', 'membaca', 'baca', 'dibaca', 'memasak', 
  'masak', 'dimasak', 'menulis', 'tulis', 'ditulis', 'bermain', 'main', 'manjat', 
  'memanjat', 'dipanjat', 'menggambar', 'gambar', 'membeli', 'beli', 'dimakan', 
  'makan', 'memakan', 'melempar', 'dilempar', 'lempar', 'membersihkan', 'bersih', 'memukul', 
  'pukul', 'menendang', 'tendang', 'membawa', 'bawa', 'menaruh', 'taruh',
  'membuka', 'buka', 'menutup', 'tutup', 'memotong', 'potong', 'menyapu', 'sapu',
  'mengepel', 'kepel', 'membuang', 'buang', 'mengambil', 'ambil', 'membuat', 'buat',
  'melihat', 'lihat', 'mendengar', 'dengar', 'menanam', 'tanam', 'menyiram', 'siram',
  'memetik', 'petik', 'menjaga', 'jaga', 'membantu', 'bantu', 'memanggil', 'panggil',
  'menjemput', 'jemput', 'mengantar', 'antar', 'menangkap', 'tangkap', 'mengejar', 'kejar',
  'belajar', 'berlari', 'lari', 'berenang', 'renang', 'bernyanyi', 'nyanyi', 'menari', 'tari',
  // Kata Kerja Pasif tambahan
  'dibuka', 'ditutup', 'dipotong', 'disapu', 'dikepel', 'dibuang', 'diambil', 'dibuat',
  'dilihat', 'didengar', 'ditanam', 'disiram', 'dipetik', 'dijaga', 'dibantu', 'dipanggil',
  'dijemput', 'diantar', 'ditangkap', 'dikejar',
  'memeriksa', 'periksa', 'diperiksa'
];

export const vocabO = [
  // Makanan & Minuman
  'susu', 'mobil', 'buku', 'nasi', 'surat', 'bola', 'pohon', 'rumah', 'sayur', 
  'roti', 'air', 'kelas', 'rumput', 'ikan', 'daging', 'sepatu', 'baju', 'sepeda',
  'kopi', 'teh', 'buah', 'apel', 'jeruk', 'pisang', 'bakso', 'mie', 'mangga', 
  'semangka', 'melon', 'stroberi', 'tomat', 'wortel', 'kentang', 'jagung',
  // Barang & Pakaian
  'celana', 'topi', 'tas', 'meja', 'kursi', 'piring', 'gelas', 'sendok', 'garpu', 
  'mangkuk', 'wajan', 'panci', 'pensil', 'pulpen', 'kertas', 'papan tulis', 
  'mainan', 'boneka', 'bantal', 'guling', 'selimut', 'sabun', 'sampo', 'sikat gigi',
  // Kendaraan & Bangunan
  'motor', 'pesawat', 'kereta', 'sekolah', 'kamar', 'taman', 'halaman', 'jalan', 'bunga',
  'pasien'
];

// Materials Content
export const materiSlides = [
  {
    id: 0,
    title: 'Misi Detektif Kalimat',
    emoji: '🔍',
    bgClass: 'bg-slide-intro',
    desc: 'Selamat datang di markas besar detektif kalimat! Ayo kita pecahkan teka-teki kata.',
    content: (
      <div className="materi-body" style={{ textAlign: 'center' }}>
        <div className="materi-slide1-clean" style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ fontSize: '4.5rem', animation: 'floatAnim 3s ease-in-out infinite', display: 'inline-block' }}>🕵️‍♂️🔍</div>
          <h3 style={{ fontFamily: 'Fredoka', color: 'var(--brown-dark)', fontSize: '1.8rem', margin: '0' }}>Ayo Mulai Petualangan!</h3>
          <p style={{ fontFamily: 'Nunito', color: '#5c3317', fontSize: '1.1rem', maxWidth: '420px', margin: '0 auto', lineHeight: '1.5' }}>
            Temukan rahasia di balik kata-kata dan jadilah ahli tata bahasa. Siap menyelidiki kalimat?
          </p>
        </div>
        <div className="example-box" style={{ marginTop: '10px', background: 'rgba(255,255,255,0.9)', borderLeftColor: 'var(--yellow-deep)' }}>
          <div className="example-sentence" style={{ fontSize: '1.15rem', color: 'var(--brown-dark)' }}>
            🕵️‍♂️ Tugas kita adalah menemukan <strong>Subjek</strong>, <strong>Predikat</strong>, dan <strong>Objek</strong> dalam kalimat!
          </div>
        </div>
      </div>
    )
  },
  {
    id: 1,
    title: 'Petunjuk Penggunaan',
    emoji: '💡',
    bgClass: 'bg-slide-guide',
    desc: 'Ikuti langkah-langkah di bawah ini untuk belajar dan bermain!',
    content: (
      <div className="materi-body">
        <div className="guide-container" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="guide-item" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderLeft: '5px solid var(--yellow-deep)',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.8rem' }}>📖</span>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--brown-dark)', fontFamily: 'Fredoka' }}>1. Pelajari Materi</strong>
              <span style={{ fontSize: '0.85rem', color: '#5c3317', fontFamily: 'Nunito' }}>Baca penjelasan SPO. Klik kotak Subjek, Predikat, & Objek untuk info detail!</span>
            </div>
          </div>

          <div className="guide-item" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderLeft: '5px solid var(--green)',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.8rem' }}>🎯</span>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--brown-dark)', fontFamily: 'Fredoka' }}>2. Mulai Latihan</strong>
              <span style={{ fontSize: '0.85rem', color: '#5c3317', fontFamily: 'Nunito' }}>Klik tombol "Latihan" di akhir slide untuk menguji kemampuanmu.</span>
            </div>
          </div>

          <div className="guide-item" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderLeft: '5px solid var(--blue)',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.8rem' }}>🧩</span>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--brown-dark)', fontFamily: 'Fredoka' }}>3. Jawab 3 Tipe Soal</strong>
              <span style={{ fontSize: '0.85rem', color: '#5c3317', fontFamily: 'Nunito' }}>Pilih kata (SPO), susun kalimat acak, dan kelompokkan kata (Drag & Drop).</span>
            </div>
          </div>

          <div className="guide-item" style={{
            background: 'rgba(255, 255, 255, 0.9)',
            borderLeft: '5px solid #a855f7',
            borderRadius: '8px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ fontSize: '1.8rem' }}>⭐</span>
            <div style={{ textAlign: 'left' }}>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--brown-dark)', fontFamily: 'Fredoka' }}>4. Dapatkan Bintang</strong>
              <span style={{ fontSize: '0.85rem', color: '#5c3317', fontFamily: 'Nunito' }}>Jawab benar untuk kumpulkan skor tertinggi dan masuk Papan Peringkat!</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'Apa Itu Kalimat SPO?',
    emoji: '📜',
    bgClass: 'bg-slide-spo',
    desc: 'Kalimat adalah kumpulan kata yang memiliki arti.',
    content: (
      <div className="materi-body">
        <div className="spo-grid" style={{ marginTop: '16px' }}>
          <div className="spo-box s">
            <div className="spo-label">S</div>
            <div className="spo-name">Subjek</div>
            <div className="spo-meaning">= siapa?</div>
          </div>
          <div className="spo-box p">
            <div className="spo-label">P</div>
            <div className="spo-name">Predikat</div>
            <div className="spo-meaning">= kegiatan</div>
          </div>
          <div className="spo-box o">
            <div className="spo-label">O</div>
            <div className="spo-name">Objek</div>
            <div className="spo-meaning">= benda</div>
          </div>
        </div>
        <img src="/images/image15.png" alt="SPO" className="materi-image" style={{ maxHeight: '100px', marginTop: '15px' }} />
      </div>
    )
  },
  {
    id: 3,
    title: 'Subjek (S)',
    emoji: '🟡',
    bgClass: 'bg-slide-s',
    desc: 'Subjek adalah pelaku – siapa yang melakukan kegiatan.',
    content: <SubjekSlide />
  },
  {
    id: 4,
    title: 'Predikat (P)',
    emoji: '🟢',
    bgClass: 'bg-slide-p',
    desc: 'Predikat adalah kegiatan atau tindakan yang dilakukan.',
    content: <PredikatSlide />
  },
  {
    id: 5,
    title: 'Objek (O)',
    emoji: '🔵',
    bgClass: 'bg-slide-o',
    desc: 'Objek adalah benda yang dikenai kegiatan.',
    content: <ObjekSlide />
  },
  {
    id: 6,
    title: 'Contoh 1: Ayah mencuci mobil',
    emoji: '🚗',
    bgClass: 'bg-slide-ex1',
    desc: 'Mari lihat struktur kalimat lengkap yang pertama!',
    content: <Contoh1Slide />
  },
  {
    id: 7,
    title: 'Contoh 2: Rina minum susu',
    emoji: '🥛',
    bgClass: 'bg-slide-ex2',
    desc: 'Mari lihat struktur kalimat lengkap yang kedua!',
    content: (
      <div className="materi-body">
        <div className="example-box" style={{ background: 'rgba(255,255,255,0.85)', borderLeftColor: 'var(--green)' }}>
          <div className="example-label" style={{ color: 'var(--green-dark)' }}>▶ Analisis Kalimat</div>
          <div className="example-sentence">
            "<span className="highlight-s">Rina</span> <span className="highlight-p">minum</span> <span className="highlight-o">susu</span>"
          </div>
          <div className="example-analysis">
            S: <strong>Rina</strong> | P: <strong>minum</strong> | O: <strong>susu</strong>
          </div>
        </div>
        <div className="materi-image-row">
          <img src="/images/image27.png" alt="Minum" />
          <img src="/images/image26.png" alt="Susu" />
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: 'Contoh 3: Dia menulis surat',
    emoji: '✉️',
    bgClass: 'bg-slide-ex3',
    desc: 'Mari lihat struktur kalimat lengkap yang ketiga!',
    content: (
      <div className="materi-body">
        <div className="example-box" style={{ background: 'rgba(255,255,255,0.85)', borderLeftColor: 'var(--blue)' }}>
          <div className="example-label" style={{ color: 'var(--blue-dark)' }}>▶ Analisis Kalimat</div>
          <div className="example-sentence">
            "<span className="highlight-s">Dia</span> <span className="highlight-p">menulis</span> <span className="highlight-o">surat</span>"
          </div>
          <div className="example-analysis">
            S: <strong>Dia</strong> | P: <strong>menulis</strong> | O: <strong>surat</strong>
          </div>
        </div>
        <div className="materi-image-row">
          <img src="/images/image28.png" alt="Menulis" />
          <img src="/images/image26.png" alt="Surat" />
        </div>
      </div>
    )
  }
];

// Quiz Questions Pool
export const allQuestions = [
  // 1. Ani membaca buku - S
  {
    id: 'q_docx1',
    type: 'token',
    sentence: 'Ani membaca buku',
    tokens: ['Ani', 'membaca', 'buku'],
    answer: 'Ani',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Tanya: "Siapa yang membaca?"',
    explain: '✅ Ani adalah subjek karena dia yang melakukan kegiatan membaca.'
  },
  // 2. Aku menulis surat - S
  {
    id: 'q_docx2',
    type: 'token',
    sentence: 'Aku menulis surat',
    tokens: ['Aku', 'menulis', 'surat'],
    answer: 'Aku',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Siapa yang menulis surat?',
    explain: '✅ Aku adalah subjek (S) karena Aku yang melakukan tindakan menulis.'
  },
  // 3. Monyet memanjat pohon - S
  {
    id: 'q_docx3',
    type: 'token',
    sentence: 'Monyet memanjat pohon',
    tokens: ['Monyet', 'memanjat', 'pohon'],
    answer: 'Monyet',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Siapa yang memanjat pohon?',
    explain: '✅ Monyet adalah subjek (S) karena Monyet yang melakukan tindakan memanjat.'
  },
  // 4. Ani membaca buku dongeng - S
  {
    id: 'q_docx4',
    type: 'token',
    sentence: 'Ani membaca buku dongeng',
    tokens: ['Ani', 'membaca', 'buku dongeng'],
    answer: 'Ani',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Siapa yang membaca buku dongeng?',
    explain: '✅ Ani adalah subjek (S) karena Ani yang melakukan tindakan membaca.'
  },
  // 5. Kakak membaca buku dongeng - S
  {
    id: 'q_docx5',
    type: 'token',
    sentence: 'Kakak membaca buku dongeng',
    tokens: ['Kakak', 'membaca', 'buku dongeng'],
    answer: 'Kakak',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Siapa yang membaca buku dongeng?',
    explain: '✅ Kakak adalah subjek (S) karena Kakak pelaku tindakan membaca.'
  },
  // 6. Anak memanjat pohon - P
  {
    id: 'q_docx6',
    type: 'token',
    sentence: 'Anak memanjat pohon',
    tokens: ['Anak', 'memanjat', 'pohon'],
    answer: 'memanjat',
    question: 'Tentukan PREDIKAT dari kalimat berikut!',
    hint: '💡 Apa kegiatan yang sedang dilakukan Anak?',
    explain: '✅ memanjat adalah predikat (P) karena menunjukkan tindakan/kegiatan yang dilakukan Anak.'
  },
  // 7. Kalian menggambar rumah - P
  {
    id: 'q_docx7',
    type: 'token',
    sentence: 'Kalian menggambar rumah',
    tokens: ['Kalian', 'menggambar', 'rumah'],
    answer: 'menggambar',
    question: 'Tentukan PREDIKAT dari kalimat berikut!',
    hint: '💡 Tindakan apa yang dilakukan Kalian?',
    explain: '✅ menggambar adalah predikat (P) – kata kerja yang menggambarkan aktivitas.'
  },
  // 8. Adik memanjat pohon - P
  {
    id: 'q_docx8',
    type: 'token',
    sentence: 'Adik memanjat pohon',
    tokens: ['Adik', 'memanjat', 'pohon'],
    answer: 'memanjat',
    question: 'Tentukan PREDIKAT dari kalimat berikut!',
    hint: '💡 Apa kegiatan yang sedang dilakukan Adik?',
    explain: '✅ memanjat adalah predikat (P) karena menunjukkan tindakan/kegiatan yang dilakukan Adik.'
  },
  // 9. Kamu membeli sayur - P
  {
    id: 'q_docx9',
    type: 'token',
    sentence: 'Kamu membeli sayur',
    tokens: ['Kamu', 'membeli', 'sayur'],
    answer: 'membeli',
    question: 'Tentukan PREDIKAT dari kalimat berikut!',
    hint: '💡 Temukan kata kerja/tindakan dalam kalimat ini.',
    explain: '✅ membeli adalah predikat (P) – tindakan yang dilakukan oleh subjek (Kamu).'
  },
  // 10. Ibu memasak sayur - P
  {
    id: 'q_docx10',
    type: 'token',
    sentence: 'Ibu memasak sayur',
    tokens: ['Ibu', 'memasak', 'sayur'],
    answer: 'memasak',
    question: 'Tentukan PREDIKAT dari kalimat berikut!',
    hint: '💡 Apa kegiatan yang sedang dilakukan Ibu?',
    explain: '✅ memasak adalah predikat (P) karena menunjukkan tindakan yang dilakukan Ibu.'
  },
  // 11. Tante memasak nasi - O
  {
    id: 'q_docx11',
    type: 'token',
    sentence: 'Tante memasak nasi',
    tokens: ['Tante', 'memasak', 'nasi'],
    answer: 'nasi',
    question: 'Tentukan OBJEK dari kalimat berikut!',
    hint: '💡 Benda apa yang dimasak oleh Tante?',
    explain: '✅ nasi adalah objek (O) karena merupakan sasaran benda yang dimasak Tante.'
  },
  // 12. Mereka mencuci mobil - O
  {
    id: 'q_docx12',
    type: 'token',
    sentence: 'Mereka mencuci mobil',
    tokens: ['Mereka', 'mencuci', 'mobil'],
    answer: 'mobil',
    question: 'Tentukan OBJEK dari kalimat berikut!',
    hint: '💡 Apa sasaran benda yang sedang dicuci?',
    explain: '✅ mobil adalah objek (O) – sasaran yang dikenai tindakan mencuci.'
  },
  // 13. Kakak memakan roti - O
  {
    id: 'q_docx13',
    type: 'token',
    sentence: 'Kakak memakan roti',
    tokens: ['Kakak', 'memakan', 'roti'],
    answer: 'roti',
    question: 'Tentukan OBJEK dari kalimat berikut!',
    hint: '💡 Benda apa yang dimakan oleh Kakak?',
    explain: '✅ roti adalah objek (O) karena merupakan sasaran benda yang dimakan Kakak.'
  },
  // 14. Kerbau meminum air - O
  {
    id: 'q_docx14',
    type: 'token',
    sentence: 'Kerbau meminum air',
    tokens: ['Kerbau', 'meminum', 'air'],
    answer: 'air',
    question: 'Tentukan OBJEK dari kalimat berikut!',
    hint: '💡 Benda apa yang diminum oleh Kerbau?',
    explain: '✅ air adalah objek (O) – sasaran air yang diminum Kerbau.'
  },
  // 15. Kakak melempar bola - O
  {
    id: 'q_docx15',
    type: 'token',
    sentence: 'Kakak melempar bola',
    tokens: ['Kakak', 'melempar', 'bola'],
    answer: 'bola',
    question: 'Tentukan OBJEK dari kalimat berikut!',
    hint: '💡 Benda apa yang dilempar oleh Kakak?',
    explain: '✅ bola adalah objek (O) karena merupakan sasaran benda yang dilempar Kakak.'
  },

  // 16. New Drag and Drop (SPO Identification) Questions
  {
    id: 'q_drag1',
    type: 'drag',
    sentence: 'Budi bermain bola',
    words: ['Budi', 'bermain', 'bola'],
    answer: { S: 'Budi', P: 'bermain', O: 'bola' },
    question: 'Tempatkan kata ke unsur SPO yang sesuai!',
    hint: '💡 Tarik kata ke kotak Subjek, Predikat, atau Objek!',
    explain: '✅ Budi (Subjek) + bermain (Predikat) + bola (Objek).'
  },
  {
    id: 'q_drag2',
    type: 'drag',
    sentence: 'Ibu memasak nasi',
    words: ['nasi', 'Ibu', 'memasak'],
    answer: { S: 'Ibu', P: 'memasak', O: 'nasi' },
    question: 'Tempatkan kata ke unsur SPO yang sesuai!',
    hint: '💡 Ibu adalah pelaku, memasak adalah kegiatan, nasi adalah objek.',
    explain: '✅ Ibu (Subjek) + memasak (Predikat) + nasi (Objek).'
  },
  {
    id: 'q_drag3',
    type: 'drag',
    sentence: 'Anak-anak menulis huruf',
    words: ['huruf', 'Anak-anak', 'menulis'],
    answer: { S: 'Anak-anak', P: 'menulis', O: 'huruf' },
    question: 'Tempatkan kata ke unsur SPO yang sesuai!',
    hint: '💡 Anak-anak adalah pelaku, menulis adalah kegiatan, huruf adalah objek.',
    explain: '✅ Anak-anak (Subjek) + menulis (Predikat) + huruf (Objek).'
  },

  // 17. Scramble Questions
  {
    id: 'q_docx16',
    type: 'scramble',
    words: ['membersihkan', 'Kami', 'kelas'],
    answer: ['Kami', 'membersihkan', 'kelas'],
    question: 'Susun kata menjadi kalimat SPO yang benar!',
    hint: '💡 Susun berurutan: Pelaku (S) + Kegiatan (P) + Benda (O).',
    explain: '✅ Susunan benar: Kami (S) + membersihkan (P) + kelas (O).'
  },
  {
    id: 'q_docx17',
    type: 'scramble',
    words: ['rumput', 'Sapi', 'memakan'],
    answer: ['Sapi', 'memakan', 'rumput'],
    question: 'Susun kata menjadi kalimat SPO yang benar!',
    hint: '💡 Mulai dari hewan yang memakan.',
    explain: '✅ Susunan benar: Sapi (S) + memakan (P) + rumput (O).'
  },
  {
    id: 'q_scramble3',
    type: 'scramble',
    words: ['surat', 'Dia', 'menulis'],
    answer: ['Dia', 'menulis', 'surat'],
    question: 'Susun kata menjadi kalimat SPO yang benar!',
    hint: '💡 Pelakunya adalah kata ganti orang.',
    explain: '✅ Susunan benar: Dia (S) + menulis (P) + surat (O).'
  },
  {
    id: 'q_scramble4',
    type: 'scramble',
    words: ['bola', 'Budi', 'bermain'],
    answer: ['Budi', 'bermain', 'bola'],
    question: 'Susun kata menjadi kalimat SPO yang benar!',
    hint: '💡 Mulai dari orang yang bermain.',
    explain: '✅ Susunan benar: Budi (S) + bermain (P) + bola (O).'
  },

  // 19–23. Tantangan Detektif Kreatif (5 soal sandbox)
  {
    id: 'q_sandbox1',
    type: 'sandbox',
    question: 'Tantangan Detektif Kreatif!',
    hint: '💡 Ketik kalimat sederhana buatanmu sendiri yang memiliki susunan Subjek (S), Predikat (P), dan Objek (O) yang benar!',
    explain: '✅ Kalimat kreatifmu berhasil dianalisis dengan susunan SPO yang lengkap!'
  },
  {
    id: 'q_sandbox2',
    type: 'sandbox',
    question: 'Tantangan Detektif Kreatif!',
    hint: '💡 Coba buat kalimat tentang kegiatan di sekolah! Pastikan ada Subjek, Predikat, dan Objek.',
    explain: '✅ Kalimat kreatifmu berhasil dianalisis dengan susunan SPO yang lengkap!'
  },
  {
    id: 'q_sandbox3',
    type: 'sandbox',
    question: 'Tantangan Detektif Kreatif!',
    hint: '💡 Buat kalimat tentang hewan! Siapa (S) melakukan apa (P) terhadap apa (O)?',
    explain: '✅ Kalimat kreatifmu berhasil dianalisis dengan susunan SPO yang lengkap!'
  },
  {
    id: 'q_sandbox4',
    type: 'sandbox',
    question: 'Tantangan Detektif Kreatif!',
    hint: '💡 Ceritakan kegiatan di rumah! Tuliskan kalimat dengan susunan SPO yang benar.',
    explain: '✅ Kalimat kreatifmu berhasil dianalisis dengan susunan SPO yang lengkap!'
  },
  {
    id: 'q_sandbox5',
    type: 'sandbox',
    question: 'Tantangan Detektif Kreatif!',
    hint: '💡 Tantangan terakhir! Buat kalimat SPO paling keren buatanmu sendiri!',
    explain: '✅ Kalimat kreatifmu berhasil dianalisis dengan susunan SPO yang lengkap!'
  }
];
