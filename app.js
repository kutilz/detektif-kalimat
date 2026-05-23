// ============================================================
// DETEKTIF KALIMAT – Interactive Quiz App
// Data based on "DETEKTIF KALIMAT.pptx" & "SOAL SOAL SPO (1).docx"
// ============================================================

// ===== AUDIO EFFECTS (WEB AUDIO API) =====
let isSoundEnabled = true;
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!isSoundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    const now = audioCtx.currentTime;
    
    if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'correct') {
      // Cheerful major arpeggio
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.06, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.22);
      });
    } else if (type === 'wrong') {
      // Buzz sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.linearRampToValueAtTime(100, now + 0.25);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'victory') {
      // Extended celebration melody
      const notes = [523.25, 659.25, 783.99, 1046.50, 880.00, 1046.50];
      const durations = [0.1, 0.1, 0.1, 0.15, 0.1, 0.3];
      let delay = 0;
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + delay);
        gain.gain.setValueAtTime(0.06, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + durations[idx]);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + durations[idx]);
        delay += durations[idx] - 0.02;
      });
    }
  } catch (e) {
    console.warn("Audio Context failed: ", e);
  }
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  const btn = document.getElementById('btn-sound-toggle');
  if (btn) {
    btn.textContent = isSoundEnabled ? '🔊' : '🔇';
    btn.style.background = isSoundEnabled 
      ? 'linear-gradient(135deg, var(--yellow-deep), var(--yellow))' 
      : '#ccc';
  }
  playSound('click');
}

// ===== MATERI SLIDES =====
const materiSlides = [
  {
    id: 0,
    title: 'Misi Detektif Kalimat',
    emoji: '🔍',
    bgClass: 'bg-slide-intro',
    desc: 'Selamat datang di markas besar detektif kalimat! Ayo kita pecahkan teka-teki kata.',
    content: () => `
      <div class="materi-body" style="text-align: center;">
        <div style="position: relative; height: 160px; margin: 15px auto; display: flex; justify-content: center; align-items: center; gap: 10px;">
          <img src="images/image11.png" alt="Mengenal" style="height: 50px; object-fit: contain; transform: rotate(-5deg); z-index: 2;" />
          <img src="images/image13.png" alt="Detektif Kalimat" style="height: 90px; object-fit: contain; z-index: 3;" />
          <img src="images/image12.png" alt="Bintang" style="position: absolute; right: 15%; top: 10%; height: 35px; animation: floatAnim 2.5s ease-in-out infinite;" />
        </div>
        <div class="example-box" style="margin-top: 10px; background: rgba(255,255,255,0.9); border-left-color: var(--yellow-deep);">
          <div class="example-sentence" style="font-size: 1.15rem; color: var(--brown-dark);">
            🕵️‍♂️ Tugas kita adalah menemukan <strong>Subjek</strong>, <strong>Predikat</strong>, dan <strong>Objek</strong> dalam kalimat!
          </div>
        </div>
      </div>
    `
  },
  {
    id: 1,
    title: 'Apa Itu Kalimat SPO?',
    emoji: '📜',
    bgClass: 'bg-slide-spo',
    desc: 'Kalimat adalah kumpulan kata yang memiliki arti.',
    content: () => `
      <div class="materi-body">
        <div class="example-box" style="background: rgba(255,255,255,0.85);">
          <div class="example-label">▶ Contoh Kalimat</div>
          <div class="example-sentence">"Saya makan roti."</div>
        </div>
        <div class="spo-grid" style="margin-top:16px;">
          <div class="spo-box s">
            <div class="spo-label">S</div>
            <div class="spo-name">Subjek</div>
            <div class="spo-meaning">= siapa?</div>
          </div>
          <div class="spo-box p">
            <div class="spo-label">P</div>
            <div class="spo-name">Predikat</div>
            <div class="spo-meaning">= kegiatan</div>
          </div>
          <div class="spo-box o">
            <div class="spo-label">O</div>
            <div class="spo-name">Objek</div>
            <div class="spo-meaning">= benda</div>
          </div>
        </div>
        <img src="images/image15.png" alt="SPO" class="materi-image" style="max-height: 100px; margin-top: 15px;" />
      </div>
    `
  },
  {
    id: 2,
    title: 'Subjek (S)',
    emoji: '🟡',
    bgClass: 'bg-slide-s',
    desc: 'Subjek adalah pelaku – siapa yang melakukan kegiatan.',
    content: () => `
      <div class="materi-body">
        <div class="spo-box s" style="margin-bottom:12px; padding: 12px;">
          <div class="spo-label">S = Subjek</div>
          <div class="spo-name" style="font-size:.9rem; margin-top:4px;">Siapa yang melakukan kegiatan?</div>
        </div>
        <div class="example-box" style="background: rgba(255,255,255,0.85);">
          <div class="example-label">▶ Contoh</div>
          <div class="example-sentence">
            "<span class="highlight-s">Budi</span> bermain bola"
          </div>
          <div class="example-analysis">Subjek = <strong style="color:#f4a100">Budi</strong> (yang bermain)</div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 12px;">
          <img src="images/image17.png" alt="Budi bermain bola" style="max-height: 90px; object-fit: contain;" />
          <img src="images/image18.png" alt="Subjek" style="max-height: 90px; object-fit: contain;" />
        </div>
      </div>
    `
  },
  {
    id: 3,
    title: 'Predikat (P)',
    emoji: '🟢',
    bgClass: 'bg-slide-p',
    desc: 'Predikat adalah kegiatan atau tindakan yang dilakukan.',
    content: () => `
      <div class="materi-body">
        <div class="spo-box p" style="margin-bottom:12px; padding: 12px;">
          <div class="spo-label">P = Predikat</div>
          <div class="spo-name" style="font-size:.9rem; margin-top:4px;">Apa yang sedang dilakukan?</div>
        </div>
        <div class="example-box" style="background: rgba(255,255,255,0.85); border-left-color: var(--green);">
          <div class="example-label" style="color: var(--green-dark);">▶ Contoh</div>
          <div class="example-sentence">
            "Kakak <span class="highlight-p">membaca</span> buku"
          </div>
          <div class="example-analysis">Predikat = <strong style="color:#2e7d32">membaca</strong> (kegiatan membaca)</div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 12px;">
          <img src="images/image21.png" alt="Membaca" style="max-height: 90px; object-fit: contain;" />
          <img src="images/image20.png" alt="Predikat" style="max-height: 90px; object-fit: contain;" />
        </div>
      </div>
    `
  },
  {
    id: 4,
    title: 'Objek (O)',
    emoji: '🔵',
    bgClass: 'bg-slide-o',
    desc: 'Objek adalah benda yang dikenai kegiatan.',
    content: () => `
      <div class="materi-body">
        <div class="spo-box o" style="margin-bottom:12px; padding:12px;">
          <div class="spo-label">O = Objek</div>
          <div class="spo-name" style="font-size:.9rem; margin-top:4px;">Benda yang dikenai kegiatan</div>
        </div>
        <div class="example-box" style="background: rgba(255,255,255,0.85); border-left-color: var(--blue);">
          <div class="example-label" style="color: var(--blue-dark);">▶ Contoh</div>
          <div class="example-sentence">
            "Ibu memasak <span class="highlight-o">nasi</span>"
          </div>
          <div class="example-analysis">Objek = <strong style="color:#1565c0">nasi</strong> (yang dimasak)</div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 12px;">
          <img src="images/image24.png" alt="Memasak" style="max-height: 90px; object-fit: contain;" />
          <img src="images/image23.png" alt="Objek" style="max-height: 90px; object-fit: contain;" />
        </div>
      </div>
    `
  },
  {
    id: 5,
    title: 'Contoh 1: Ayah mencuci mobil',
    emoji: '🚗',
    bgClass: 'bg-slide-ex1',
    desc: 'Mari lihat struktur kalimat lengkap yang pertama!',
    content: () => `
      <div class="materi-body">
        <div class="example-box" style="background: rgba(255,255,255,0.85);">
          <div class="example-label">▶ Analisis Kalimat</div>
          <div class="example-sentence">
            "<span class="highlight-s">Ayah</span> <span class="highlight-p">mencuci</span> <span class="highlight-o">mobil</span>"
          </div>
          <div class="example-analysis">
            S: <strong>Ayah</strong> | P: <strong>mencuci</strong> | O: <strong>mobil</strong>
          </div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 12px;">
          <img src="images/image16.png" alt="Mencuci" style="max-height: 95px; object-fit: contain;" />
          <img src="images/image25.png" alt="Mobil" style="max-height: 95px; object-fit: contain;" />
        </div>
      </div>
    `
  },
  {
    id: 6,
    title: 'Contoh 2: Rina minum susu',
    emoji: '🥛',
    bgClass: 'bg-slide-ex2',
    desc: 'Mari lihat struktur kalimat lengkap yang kedua!',
    content: () => `
      <div class="materi-body">
        <div class="example-box" style="background: rgba(255,255,255,0.85); border-left-color: var(--green);">
          <div class="example-label" style="color: var(--green-dark);">▶ Analisis Kalimat</div>
          <div class="example-sentence">
            "<span class="highlight-s">Rina</span> <span class="highlight-p">minum</span> <span class="highlight-o">susu</span>"
          </div>
          <div class="example-analysis">
            S: <strong>Rina</strong> | P: <strong>minum</strong> | O: <strong>susu</strong>
          </div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 12px;">
          <img src="images/image27.png" alt="Minum" style="max-height: 95px; object-fit: contain;" />
          <img src="images/image26.png" alt="Susu" style="max-height: 95px; object-fit: contain;" />
        </div>
      </div>
    `
  },
  {
    id: 7,
    title: 'Contoh 3: Dia menulis surat',
    emoji: '✉️',
    bgClass: 'bg-slide-ex3',
    desc: 'Mari lihat struktur kalimat lengkap yang ketiga!',
    content: () => `
      <div class="materi-body">
        <div class="example-box" style="background: rgba(255,255,255,0.85); border-left-color: var(--blue);">
          <div class="example-label" style="color: var(--blue-dark);">▶ Analisis Kalimat</div>
          <div class="example-sentence">
            "<span class="highlight-s">Dia</span> <span class="highlight-p">menulis</span> <span class="highlight-o">surat</span>"
          </div>
          <div class="example-analysis">
            S: <strong>Dia</strong> | P: <strong>menulis</strong> | O: <strong>surat</strong>
          </div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center; margin-top: 12px;">
          <img src="images/image28.png" alt="Menulis" style="max-height: 95px; object-fit: contain;" />
          <img src="images/image26.png" alt="Surat" style="max-height: 95px; object-fit: contain;" />
        </div>
      </div>
    `
  }
];

// ===== QUIZ QUESTIONS Pool (from SOAL SOAL SPO (1).docx) =====
const allQuestions = [
  // 1. Ani baca buku - S
  {
    id: 'q_docx1',
    type: 'token',
    sentence: 'Ani baca buku',
    tokens: ['Ani', 'baca', 'buku'],
    answer: 'Ani',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Tanya: "Siapa yang baca?"',
    explain: '✅ <strong>Ani</strong> adalah subjek karena dia yang melakukan kegiatan membaca.'
  },
  // 2. surat ditulis Aku - S (pasif)
  {
    id: 'q_docx2',
    type: 'token',
    sentence: 'surat ditulis Aku',
    tokens: ['surat', 'ditulis', 'Aku'],
    answer: 'surat',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Pada kalimat pasif, kata benda di depan adalah subjek.',
    explain: '✅ <strong>surat</strong> adalah subjek (S) kalimat pasif ini. Penerima kegiatan diposisikan di depan sebagai subjek.'
  },
  // 3. pohon dipanjat Monyet - S (pasif)
  {
    id: 'q_docx3',
    type: 'token',
    sentence: 'pohon dipanjat Monyet',
    tokens: ['pohon', 'dipanjat', 'Monyet'],
    answer: 'pohon',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Benda di depan kalimat pasif adalah subjek.',
    explain: '✅ <strong>pohon</strong> adalah subjek (S) kalimat pasif ini, sedangkan "Monyet" bertindak sebagai pelaku.'
  },
  // 4. Buku dongeng dibaca Ani - S (pasif)
  {
    id: 'q_docx4',
    type: 'token',
    sentence: 'Buku dongeng dibaca Ani',
    tokens: ['Buku dongeng', 'dibaca', 'Ani'],
    answer: 'Buku dongeng',
    question: 'Tentukan SUBJEK dari kalimat berikut!',
    hint: '💡 Perhatikan gabungan kata di awal kalimat pasif ini.',
    explain: '✅ <strong>Buku dongeng</strong> adalah subjek (S) – frasa benda yang diletakkan di awal kalimat pasif.'
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
    explain: '✅ <strong>Kakak</strong> adalah subjek (S) karena Kakak pelaku tindakan membaca.'
  },
  // 6. Adik manjat pohon - P
  {
    id: 'q_docx6',
    type: 'token',
    sentence: 'Adik manjat pohon',
    tokens: ['Adik', 'manjat', 'pohon'],
    answer: 'manjat',
    question: 'Tentukan PREDIKAT dari kalimat berikut!',
    hint: '💡 Apa kegiatan yang sedang dilakukan Adik?',
    explain: '✅ <strong>manjat</strong> adalah predikat (P) karena menunjukkan tindakan/kegiatan yang dilakukan Adik.'
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
    explain: '✅ <strong>menggambar</strong> adalah predikat (P) – kata kerja yang menggambarkan aktivitas.'
  },
  // 8. pohon dipanjat Adik - P (pasif)
  {
    id: 'q_docx8',
    type: 'token',
    sentence: 'pohon dipanjat Adik',
    tokens: ['pohon', 'dipanjat', 'Adik'],
    answer: 'dipanjat',
    question: 'Tentukan PREDIKAT dari kalimat berikut!',
    hint: '💡 Temukan kata kerja pasif (berawalan di-) yang menjadi kegiatan.',
    explain: '✅ <strong>dipanjat</strong> adalah predikat (P) – kata kerja pasif yang menghubungkan subjek dengan pelaku.'
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
    explain: '✅ <strong>membeli</strong> adalah predikat (P) – tindakan yang dilakukan oleh subjek (Kamu).'
  },
  // 10. sayur dimasak Ibu - P (pasif)
  {
    id: 'q_docx10',
    type: 'token',
    sentence: 'sayur dimasak Ibu',
    tokens: ['sayur', 'dimasak', 'Ibu'],
    answer: 'dimasak',
    question: 'Tentukan PREDIKAT dari kalimat berikut!',
    hint: '💡 Temukan tindakan pasif yang dikenakan pada sayur.',
    explain: '✅ <strong>dimasak</strong> adalah predikat (P) – tindakan yang dilakukan pelaku (Ibu) kepada subjek (sayur).'
  },
  // 11. Tante masak nasi - O
  {
    id: 'q_docx11',
    type: 'token',
    sentence: 'Tante masak nasi',
    tokens: ['Tante', 'masak', 'nasi'],
    answer: 'nasi',
    question: 'Tentukan OBJEK dari kalimat berikut!',
    hint: '💡 Benda apa yang dimasak oleh Tante?',
    explain: '✅ <strong>nasi</strong> adalah objek (O) karena merupakan sasaran benda yang dimasak Tante.'
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
    explain: '✅ <strong>mobil</strong> adalah objek (O) – sasaran yang dikenai tindakan mencuci.'
  },
  // 13. roti Kakak dimakan - O (pasif)
  {
    id: 'q_docx13',
    type: 'token',
    sentence: 'roti Kakak dimakan',
    tokens: ['roti Kakak', 'dimakan'],
    answer: 'roti Kakak',
    question: 'Tentukan OBJEK (penderita/sasaran) dari kalimat berikut!',
    hint: '💡 Benda apa yang dikenai tindakan dimakan?',
    explain: '✅ <strong>roti Kakak</strong> adalah sasaran (pasien) dari tindakan dimakan. Dalam kalimat pasif ini, ia menduduki jabatan subjek.'
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
    explain: '✅ <strong>air</strong> adalah objek (O) – sasaran air yang diminum Kerbau.'
  },
  // 15. Bola dilempar Kakak - O (pasif)
  {
    id: 'q_docx15',
    type: 'token',
    sentence: 'Bola dilempar Kakak',
    tokens: ['Bola', 'dilempar', 'Kakak'],
    answer: 'Bola',
    question: 'Tentukan OBJEK (penderita/sasaran) dari kalimat berikut!',
    hint: '💡 Benda apa yang menjadi sasaran dilempar?',
    explain: '✅ <strong>Bola</strong> adalah sasaran yang dilempar. Pada kalimat pasif, sasaran ini menduduki bagian depan sebagai subjek.'
  },
  // 16. Susun kata: membersihkan – Kami – kelas
  {
    id: 'q_docx16',
    type: 'scramble',
    words: ['membersihkan', 'Kami', 'kelas'],
    answer: ['Kami', 'membersihkan', 'kelas'],
    question: 'Susun kata menjadi kalimat SPO yang benar!',
    hint: '💡 Susun berurutan: Pelaku (S) + Kegiatan (P) + Benda (O).',
    explain: '✅ Susunan benar: <strong>Kami</strong> (S) + <strong>membersihkan</strong> (P) + <strong>kelas</strong> (O).'
  },
  // 17. Susun kata: rumput – Sapi – memakan
  {
    id: 'q_docx17',
    type: 'scramble',
    words: ['rumput', 'Sapi', 'memakan'],
    answer: ['Sapi', 'memakan', 'rumput'],
    question: 'Susun kata menjadi kalimat SPO yang benar!',
    hint: '💡 Mulai dari hewan yang memakan.',
    explain: '✅ Susunan benar: <strong>Sapi</strong> (S) + <strong>memakan</strong> (P) + <strong>rumput</strong> (O).'
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

// Vocabulary for real-time Sandbox parser
const vocabS = ['rina', 'ayah', 'kakak', 'ibu', 'dia', 'budi', 'saya', 'aku', 'kami', 'mereka', 'kalian', 'kamu', 'tante', 'adik', 'monyet', 'sapi', 'kerbau', 'kucing', 'anjing', 'guru', 'murid', 'tante'];
const vocabP = ['minum', 'meminum', 'mencuci', 'cuci', 'membaca', 'baca', 'dibaca', 'memasak', 'masak', 'dimasak', 'menulis', 'tulis', 'ditulis', 'bermain', 'main', 'manjat', 'memanjat', 'dipanjat', 'menggambar', 'gambar', 'membeli', 'beli', 'dimakan', 'makan', 'memakan', 'dilempar', 'lempar', 'membersihkan', 'bersih', 'memukul', 'menendang', 'membawa', 'menaruh'];
const vocabO = ['susu', 'mobil', 'buku', 'nasi', 'surat', 'bola', 'pohon', 'rumah', 'sayur', 'roti', 'air', 'kelas', 'rumput', 'ikan', 'daging', 'sepatu', 'baju', 'sepeda'];

// ===== STATE =====
let currentMateri = 0;
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let answers = [];
let dragState = { selected: null, placements: { S: null, P: null, O: null }, scrambleAnswer: [] };
let feedbackTimeout = null;

// ===== SCREEN TRANSITIONS =====
function showScreen(id) {
  playSound('click');
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    if (id === 'screen-materi-intro') initMateri();
    if (id === 'screen-quiz') initQuiz();
  }
}

function confirmBackToMenu() {
  if (confirm('Kembali ke menu? Progress latihanmu akan hilang.')) {
    showScreen('screen-menu');
  }
}

// ===== MATERI =====
function initMateri() {
  currentMateri = 0;
  renderMateri();
  renderDots();
}

function renderMateri() {
  const slide = materiSlides[currentMateri];
  const container = document.getElementById('materi-content');
  container.innerHTML = `
    <div class="materi-slide fade-in ${slide.bgClass || ''}">
      <div class="materi-slide-glass-overlay">
        <div class="materi-slide-header">
          <span class="slide-emoji">${slide.emoji}</span>
          <h2>${slide.title}</h2>
          <p>${slide.desc}</p>
        </div>
        ${slide.content()}
      </div>
    </div>
  `;
  document.getElementById('materi-counter').textContent = `${currentMateri + 1} / ${materiSlides.length}`;
  document.getElementById('btn-prev-materi').disabled = currentMateri === 0;

  const nextBtn = document.getElementById('btn-next-materi');
  if (currentMateri === materiSlides.length - 1) {
    nextBtn.textContent = '🎯 Mulai Latihan!';
    nextBtn.onclick = () => showScreen('screen-quiz');
  } else {
    nextBtn.textContent = 'Selanjutnya ▶';
    nextBtn.onclick = nextMateri;
  }
  renderDots();
}

function nextMateri() {
  if (currentMateri < materiSlides.length - 1) {
    playSound('click');
    currentMateri++;
    renderMateri();
  }
}

function prevMateri() {
  if (currentMateri > 0) {
    playSound('click');
    currentMateri--;
    renderMateri();
  }
}

function renderDots() {
  const dotsEl = document.getElementById('materi-dots');
  dotsEl.innerHTML = materiSlides.map((_, i) =>
    `<div class="materi-dot ${i === currentMateri ? 'active' : ''}" onclick="goMateri(${i})"></div>`
  ).join('');
}

function goMateri(idx) {
  playSound('click');
  currentMateri = idx;
  renderMateri();
}

// ===== QUIZ =====
function initQuiz() {
  // Filter out sandbox question
  const standardQuestions = allQuestions.filter(q => q.id !== 'q_sandbox');
  // Shuffle standard questions
  const shuffledPool = shuffle([...standardQuestions]);
  // Take 9 random questions
  const selectedQuiz = shuffledPool.slice(0, 9);
  // Always push sandbox as the 10th (final) question
  const sandboxQ = allQuestions.find(q => q.id === 'q_sandbox');
  
  quizQuestions = [...selectedQuiz, sandboxQ];
  currentQuestion = 0;
  score = 0;
  answers = [];
  renderQuestion();
}

function renderQuestion() {
  const q = quizQuestions[currentQuestion];
  const total = quizQuestions.length;
  const progress = ((currentQuestion) / total) * 100;

  document.getElementById('quiz-progress-text').textContent = `${currentQuestion + 1}/${total}`;
  document.getElementById('quiz-progress-fill').style.width = progress + '%';

  const body = document.getElementById('quiz-body');

  let bgClass = 'bg-slide-quiz-intro';
  if (q.id === 'q_sandbox') {
    bgClass = 'bg-slide-intro';
  }

  let html = `
    <div class="quiz-card materi-slide ${bgClass}">
      <div class="materi-slide-glass-overlay">
        <div class="quiz-num">Soal ${currentQuestion + 1} dari ${total}</div>
        <div class="quiz-question">${q.question}</div>
  `;

  if (q.sentence && q.type !== 'token') {
    html += `
      <div class="quiz-sentence-box">
        <div class="quiz-sentence">"${q.sentence}"</div>
        <div class="quiz-sentence-hint">${q.hint}</div>
      </div>
    `;
  } else {
    html += `<div class="quiz-sentence-hint" style="margin:12px 0;">${q.hint}</div>`;
  }

  if (q.image) {
    html += `<div class="quiz-image-wrap"><img src="${q.image}" alt="ilustrasi" class="quiz-image" /></div>`;
  }

  if (q.type === 'token') {
    html += `<div class="token-sentence" id="token-sentence">`;
    q.tokens.forEach(tok => {
      html += `<button class="word-token" onclick="checkToken(this, '${escHtml(tok)}')" data-token="${escHtml(tok)}">${tok}</button>`;
    });
    html += `</div>`;
  } else if (q.type === 'scramble') {
    dragState = { scrambleAnswer: [] };
    html += renderScrambleSection(q);
  } else if (q.type === 'drag') {
    dragState = { selected: null, placements: { S: null, P: null, O: null } };
    html += renderDragSection(q);
  } else if (q.type === 'sandbox') {
    html += `
      <div class="sandbox-container">
        <p class="sandbox-instruction">Tulis kalimatmu di kotak input di bawah.</p>
        <div class="sandbox-input-group">
          <input type="text" class="sandbox-input" id="sandbox-input" placeholder="Tulis kalimat SPO-mu di sini..." oninput="updateSandboxFeedback(this.value)" autocomplete="off" />
        </div>
        <div class="sandbox-feedback-grid">
          <div class="sandbox-part s-part" id="part-S">
            <div class="sandbox-label">Subjek (S)</div>
            <div class="sandbox-val" id="val-S">-</div>
          </div>
          <div class="sandbox-part p-part" id="part-P">
            <div class="sandbox-label">Predikat (P)</div>
            <div class="sandbox-val" id="val-P">-</div>
          </div>
          <div class="sandbox-part o-part" id="part-O">
            <div class="sandbox-label">Objek (O)</div>
            <div class="sandbox-val" id="val-O">-</div>
          </div>
        </div>
        <button class="btn-check" id="btn-check-sandbox" onclick="checkSandbox()" disabled style="margin-top: 20px;">Periksa Kalimat 🔍</button>
      </div>
    `;
  }

  html += `</div></div>`; // close glass-overlay and card
  body.innerHTML = html;

  if (q.type === 'sandbox') {
    setTimeout(() => document.getElementById('sandbox-input')?.focus(), 100);
  }
}

// Scramble Rendering and Handlers
function renderScrambleSection(q) {
  const scrambled = shuffle([...q.words]);
  let html = `
    <div class="scramble-section">
      <div class="scramble-slots" id="scramble-slots"></div>
      <div class="scramble-bank" id="scramble-bank">`;
  scrambled.forEach(w => {
    html += `<button class="scramble-chip" onclick="tapScrambleWord(this, '${escHtml(w)}')" data-word="${escHtml(w)}">${w}</button>`;
  });
  html += `</div>
      <div style="display: flex; gap: 12px; justify-content: center; margin-top: 10px;">
        <button class="btn-back" style="padding: 10px 20px; font-size: 1rem; border-color: var(--yellow-deep);" onclick="resetScramble()">🔄 Reset</button>
        <button class="btn-check" id="btn-check-scramble" onclick="checkScramble()" disabled style="margin: 0; max-width: 140px;">Periksa</button>
      </div>
    </div>
  `;
  return html;
}

function tapScrambleWord(btn, word) {
  if (btn.classList.contains('placed')) return;
  playSound('click');
  btn.classList.add('placed');
  
  dragState.scrambleAnswer.push(word);
  
  const slots = document.getElementById('scramble-slots');
  const chip = document.createElement('span');
  chip.className = 'scramble-chip placed';
  chip.style.margin = '4px';
  chip.textContent = word;
  slots.appendChild(chip);
  
  const q = quizQuestions[currentQuestion];
  const allPlaced = dragState.scrambleAnswer.length === q.words.length;
  const checkBtn = document.getElementById('btn-check-scramble');
  if (checkBtn) checkBtn.disabled = !allPlaced;
}

function resetScramble() {
  playSound('click');
  dragState.scrambleAnswer = [];
  const slots = document.getElementById('scramble-slots');
  if (slots) slots.innerHTML = '';
  document.querySelectorAll('.scramble-chip').forEach(btn => {
    btn.classList.remove('placed');
  });
  const checkBtn = document.getElementById('btn-check-scramble');
  if (checkBtn) checkBtn.disabled = true;
}

function checkScramble() {
  const q = quizQuestions[currentQuestion];
  const correct = dragState.scrambleAnswer.every((w, idx) => w === q.answer[idx]);
  
  playSound(correct ? 'correct' : 'wrong');
  processAnswer(correct, q.explain);
}

// Token Selection Handler
function checkToken(btn, selectedToken) {
  const q = quizQuestions[currentQuestion];
  const correct = selectedToken === q.answer;

  document.querySelectorAll('.word-token').forEach(tokenBtn => {
    tokenBtn.disabled = true;
    tokenBtn.classList.add('disabled');
    if (tokenBtn.dataset.token === q.answer) {
      tokenBtn.classList.add('correct');
    } else if (tokenBtn.dataset.token === selectedToken && !correct) {
      tokenBtn.classList.add('wrong');
    }
  });

  playSound(correct ? 'correct' : 'wrong');
  processAnswer(correct, q.explain);
}

// Sandbox Real-time Feedback Parser
function updateSandboxFeedback(val) {
  const words = val.toLowerCase().replace(/[.,?!]/g, '').split(/\s+/).filter(Boolean);
  
  let foundS = null;
  let foundP = null;
  let foundO = null;
  
  words.forEach(w => {
    if (vocabS.includes(w) && !foundS) {
      foundS = w;
    } else if (vocabP.includes(w) && !foundP) {
      foundP = w;
    } else if (vocabO.includes(w) && !foundO) {
      foundO = w;
    }
  });
  
  // Highlight S
  const partS = document.getElementById('part-S');
  const valS = document.getElementById('val-S');
  if (foundS && partS && valS) {
    partS.classList.add('active');
    valS.textContent = capitalizeFirstLetter(foundS);
  } else if (partS && valS) {
    partS.classList.remove('active');
    valS.textContent = '-';
  }
  
  // Highlight P
  const partP = document.getElementById('part-P');
  const valP = document.getElementById('val-P');
  if (foundP && partP && valP) {
    partP.classList.add('active');
    valP.textContent = capitalizeFirstLetter(foundP);
  } else if (partP && valP) {
    partP.classList.remove('active');
    valP.textContent = '-';
  }
  
  // Highlight O
  const partO = document.getElementById('part-O');
  const valO = document.getElementById('val-O');
  if (foundO && partO && valO) {
    partO.classList.add('active');
    valO.textContent = capitalizeFirstLetter(foundO);
  } else if (partO && valO) {
    partO.classList.remove('active');
    valO.textContent = '-';
  }
  
  const btn = document.getElementById('btn-check-sandbox');
  if (btn) {
    btn.disabled = !(foundS && foundP && foundO);
  }
}

function checkSandbox() {
  const input = document.getElementById('sandbox-input');
  if (!input) return;
  
  const val = input.value;
  playSound('correct');
  
  const sWord = document.getElementById('val-S').textContent;
  const pWord = document.getElementById('val-P').textContent;
  const oWord = document.getElementById('val-O').textContent;
  
  const explain = `🎉 <strong>Luar Biasa Detektif!</strong> Kalimat SPO buatanmu berhasil dianalisis:<br><br>
    - 🟡 Subjek: <strong>${sWord}</strong> (Pelaku)<br>
    - 🟢 Predikat: <strong>${pWord}</strong> (Kegiatan)<br>
    - 🔵 Objek: <strong>${oWord}</strong> (Benda sasaran)`;
    
  processAnswer(true, explain);
}

// Drag Section (Legacy matching style)
function renderDragSection(q) {
  const words = shuffle([...q.words]);
  let html = `<div class="drag-section">
    <p class="drag-instruction">Klik kata → lalu klik kotak (S/P/O) yang sesuai</p>
    <div class="drag-sentence-area" id="word-bank">`;
  words.forEach(w => {
    html += `<div class="word-chip available" id="chip-${w}" onclick="selectWord('${w}')">${w}</div>`;
  });
  html += `</div>
    <div class="drop-zones">
      <div class="drop-zone s-zone" onclick="placeWord('S')" id="dz-S">
        <span class="dz-label">🟡 Subjek</span>
        <span class="dz-word" id="dz-S-word"></span>
      </div>
      <div class="drop-zone p-zone" onclick="placeWord('P')" id="dz-P">
        <span class="dz-label">🟢 Predikat</span>
        <span class="dz-word" id="dz-P-word"></span>
      </div>
      <div class="drop-zone o-zone" onclick="placeWord('O')" id="dz-O">
        <span class="dz-label">🔵 Objek</span>
        <span class="dz-word" id="dz-O-word"></span>
      </div>
    </div>
    <button class="btn-check" id="btn-check-drag" onclick="checkDrag()" disabled>✅ Periksa</button>
  </div>`;
  return html;
}

function selectWord(word) {
  playSound('click');
  document.querySelectorAll('.word-chip.selected').forEach(c => c.classList.remove('selected'));
  dragState.selected = word;
  const chip = document.getElementById('chip-' + word);
  if (chip) {
    chip.style.background = '#f4a100';
    chip.style.color = 'white';
    chip.style.transform = 'scale(1.1)';
  }
}

function placeWord(zone) {
  if (!dragState.selected) return;
  playSound('click');

  const existing = dragState.placements[zone];
  if (existing) {
    returnToBank(existing);
  }

  const word = dragState.selected;
  dragState.placements[zone] = word;
  dragState.selected = null;

  const chip = document.getElementById('chip-' + word);
  if (chip) chip.style.display = 'none';

  const dzWord = document.getElementById('dz-' + zone + '-word');
  if (dzWord) {
    dzWord.textContent = word;
    dzWord.style.fontFamily = "'Fredoka', sans-serif";
    dzWord.style.fontSize = '1.1rem';
    dzWord.onclick = () => returnWordFromZone(zone);
  }

  checkDragComplete();
}

function returnToBank(word) {
  const chip = document.getElementById('chip-' + word);
  if (chip) {
    chip.style.display = '';
    chip.style.background = '';
    chip.style.color = '';
    chip.style.transform = '';
  }
}

function returnWordFromZone(zone) {
  const word = dragState.placements[zone];
  if (!word) return;
  playSound('click');
  dragState.placements[zone] = null;
  returnToBank(word);
  const dzWord = document.getElementById('dz-' + zone + '-word');
  if (dzWord) dzWord.textContent = '';
  checkDragComplete();
}

function checkDragComplete() {
  const allPlaced = Object.values(dragState.placements).every(v => v !== null);
  const btn = document.getElementById('btn-check-drag');
  if (btn) btn.disabled = !allPlaced;
}

function checkDrag() {
  const q = quizQuestions[currentQuestion];
  const correct =
    dragState.placements.S === q.answer.S &&
    dragState.placements.P === q.answer.P &&
    dragState.placements.O === q.answer.O;

  playSound(correct ? 'correct' : 'wrong');
  processAnswer(correct, q.explain);
}

function processAnswer(correct, explain) {
  if (correct) score++;
  answers.push({ question: quizQuestions[currentQuestion], correct });
  showFeedback(correct, explain);
}

function showFeedback(correct, explain) {
  const overlay = document.getElementById('feedback-overlay');
  const icon = document.getElementById('feedback-icon');
  const text = document.getElementById('feedback-text');
  const explainEl = document.getElementById('feedback-explain');

  icon.textContent = correct ? '🎉' : '🤔';
  text.textContent = correct ? 'Luar Biasa!' : 'Hampir Benar!';
  
  let answerStr = '';
  if (!correct) {
    if (typeof quizQuestions[currentQuestion].answer === 'string') {
      answerStr = `<br><br>Jawaban yang benar: <strong>${quizQuestions[currentQuestion].answer}</strong>`;
    } else if (Array.isArray(quizQuestions[currentQuestion].answer)) {
      answerStr = `<br><br>Susunan yang benar: <strong>${quizQuestions[currentQuestion].answer.join(' ')}</strong>`;
    }
  }
  
  explainEl.innerHTML = explain + answerStr;
  overlay.classList.add('show');

  clearTimeout(feedbackTimeout);
  feedbackTimeout = setTimeout(() => {
    overlay.classList.remove('show');
    nextQuestion();
  }, 2600);

  overlay.onclick = () => {
    clearTimeout(feedbackTimeout);
    overlay.classList.remove('show');
    nextQuestion();
  };
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= quizQuestions.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

// ===== HASIL =====
function showResult() {
  showScreen('screen-hasil');
  const total = quizQuestions.length;

  let title, subtitle, stars;
  if (score === total) {
    title = '🏆 Sempurna!'; subtitle = 'Kamu Detektif Kalimat Sejati!'; stars = '⭐⭐⭐';
  } else if (score >= total * 0.7) {
    title = '🎉 Bagus Sekali!'; subtitle = 'Kamu hampir jadi detektif handal!'; stars = '⭐⭐';
  } else {
    title = '💪 Ayo Coba Lagi!'; subtitle = 'Belajar lagi, kamu pasti bisa!'; stars = '⭐';
  }

  document.getElementById('hasil-title').textContent = title;
  document.getElementById('hasil-subtitle').textContent = subtitle;
  document.getElementById('score-num').textContent = score;
  document.getElementById('score-max').textContent = '/' + total;
  document.getElementById('score-stars').textContent = stars;

  const circle = document.getElementById('score-circle');
  const pct = score / total;
  circle.style.background = pct >= 0.7
    ? 'linear-gradient(135deg, #4caf50, #2e7d32)'
    : pct >= 0.4
    ? 'linear-gradient(135deg, #f9c74f, #f4a100)'
    : 'linear-gradient(135deg, #f44336, #c62828)';

  const reviewEl = document.getElementById('review-list');
  reviewEl.innerHTML = answers.map((a, i) => `
    <div class="review-item ${a.correct ? 'ok' : 'bad'}">
      <span class="review-icon">${a.correct ? '✅' : '❌'}</span>
      <span>Soal ${i + 1}: <em>${a.question.sentence || a.question.question}</em></span>
    </div>
  `).join('');

  if (score >= total * 0.6) {
    playSound('victory');
    launchFireworks();
  } else {
    playSound('wrong');
  }
}

function launchFireworks() {
  const container = document.getElementById('fireworks');
  if (!container) return;
  const emojis = ['🎉', '🌟', '✨', '🎊', '🎈', '⭐', '🏆'];
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'firework';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 80 + 10 + '%';
      el.style.setProperty('--fx', (Math.random() - .5) * 150 + 'px');
      el.style.setProperty('--fy', (Math.random() - .5) * 100 + 'px');
      el.style.animationDelay = Math.random() * .5 + 's';
      container.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }, i * 70);
  }
}

function restartQuiz() {
  showScreen('screen-quiz');
}

// ===== UTILS =====
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function escHtml(str) {
  return str.replace(/[&<>"']/g, m => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[m]);
}

function capitalizeFirstLetter(string) {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// ===== INIT =====
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('screen-cover').classList.add('active');
});
