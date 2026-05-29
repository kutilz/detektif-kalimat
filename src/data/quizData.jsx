import React from 'react';

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
  'dijemput', 'diantar', 'ditangkap', 'dikejar'
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
  'motor', 'pesawat', 'kereta', 'sekolah', 'kamar', 'taman', 'halaman', 'jalan', 'bunga'
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
        <div className="materi-slide1-row">
          <img src="/images/image11.png" alt="Mengenal" className="img-mengenal" />
          <img src="/images/image13.png" alt="Detektif Kalimat" className="img-detektif" />
          <img src="/images/image12.png" alt="Bintang" className="img-bintang" />
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
    title: 'Apa Itu Kalimat SPO?',
    emoji: '📜',
    bgClass: 'bg-slide-spo',
    desc: 'Kalimat adalah kumpulan kata yang memiliki arti.',
    content: (
      <div className="materi-body">
        <div className="example-box" style={{ background: 'rgba(255,255,255,0.85)' }}>
          <div className="example-label">▶ Contoh Kalimat</div>
          <div className="example-sentence">"Saya makan roti."</div>
        </div>
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
    id: 2,
    title: 'Subjek (S)',
    emoji: '🟡',
    bgClass: 'bg-slide-s',
    desc: 'Subjek adalah pelaku – siapa yang melakukan kegiatan.',
    content: (
      <div className="materi-body">
        <div className="spo-box s" style={{ marginBottom: '12px', padding: '12px' }}>
          <div className="spo-label">S = Subjek</div>
          <div className="spo-name" style={{ fontSize: '.9rem', marginTop: '4px' }}>Siapa yang melakukan kegiatan?</div>
        </div>
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
    )
  },
  {
    id: 3,
    title: 'Predikat (P)',
    emoji: '🟢',
    bgClass: 'bg-slide-p',
    desc: 'Predikat adalah kegiatan atau tindakan yang dilakukan.',
    content: (
      <div className="materi-body">
        <div className="spo-box p" style={{ marginBottom: '12px', padding: '12px' }}>
          <div className="spo-label">P = Predikat</div>
          <div className="spo-name" style={{ fontSize: '.9rem', marginTop: '4px' }}>Apa yang sedang dilakukan?</div>
        </div>
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
    )
  },
  {
    id: 4,
    title: 'Objek (O)',
    emoji: '🔵',
    bgClass: 'bg-slide-o',
    desc: 'Objek adalah benda yang dikenai kegiatan.',
    content: (
      <div className="materi-body">
        <div className="spo-box o" style={{ marginBottom: '12px', padding: '12px' }}>
          <div className="spo-label">O = Objek</div>
          <div className="spo-name" style={{ fontSize: '.9rem', marginTop: '4px' }}>Benda yang dikenai kegiatan</div>
        </div>
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
    )
  },
  {
    id: 5,
    title: 'Contoh 1: Ayah mencuci mobil',
    emoji: '🚗',
    bgClass: 'bg-slide-ex1',
    desc: 'Mari lihat struktur kalimat lengkap yang pertama!',
    content: (
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
        <div className="materi-image-row">
          <img src="/images/image16.png" alt="Mencuci" />
          <img src="/images/image25.png" alt="Mobil" />
        </div>
      </div>
    )
  },
  {
    id: 6,
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
    id: 7,
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

  // 18. Sandbox Challenge
  {
    id: 'q_sandbox',
    type: 'sandbox',
    question: 'Tantangan Detektif Kreatif!',
    hint: '💡 Ketik kalimat sederhana buatanmu sendiri yang memiliki susunan Subjek (S), Predikat (P), dan Objek (O) yang benar!',
    explain: '✅ Kalimat kreatifmu berhasil dianalisis dengan susunan SPO yang lengkap!'
  }
];
