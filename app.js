// ============================================================
// DETEKTIF KALIMAT – Interactive Quiz App
// Data based on "DETEKTIF KALIMAT.pptx"
// ============================================================

// ===== MATERI SLIDES =====
const materiSlides = [
  {
    id: 0,
    title: 'Apa Itu Kalimat SPO?',
    emoji: '📜',
    desc: 'Kalimat adalah kumpulan kata yang memiliki arti.',
    content: () => `
      <div class="materi-body">
        <div class="example-box">
          <div class="example-label">▶ Contoh Kalimat</div>
          <div class="example-sentence">"Saya makan roti."</div>
        </div>
        <div class="spo-grid" style="margin-top:20px;">
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
        <div class="sentence-strip" style="margin-top:20px;">
          <div class="sentence-word s-word">Saya</div>
          <div class="sentence-word plus">+</div>
          <div class="sentence-word p-word">makan</div>
          <div class="sentence-word plus">+</div>
          <div class="sentence-word o-word">roti</div>
        </div>
      </div>
    `
  },
  {
    id: 1,
    title: 'Subjek (S)',
    emoji: '🟡',
    desc: 'Subjek adalah pelaku – siapa yang melakukan kegiatan.',
    content: () => `
      <div class="materi-body">
        <div class="spo-box s" style="margin-bottom:16px; padding: 18px;">
          <div class="spo-label">S = Subjek</div>
          <div class="spo-name" style="font-size:.95rem; margin-top:6px;">Siapa yang melakukan kegiatan?</div>
        </div>
        <div class="example-box">
          <div class="example-label">▶ Contoh</div>
          <div class="example-sentence">
            "<span class="highlight-s">Budi</span> bermain bola"
          </div>
          <div class="example-analysis">Subjek = <strong style="color:#f4a100">Budi</strong> (yang bermain)</div>
        </div>
        <div class="example-box" style="margin-top:10px; background:linear-gradient(135deg,#fff3e0,#ffe0b2); border-left-color:#ff9800;">
          <div class="example-label" style="color:#e65100;">💡 Trik Menemukan Subjek</div>
          <div class="example-sentence" style="font-size:1rem;">Tanya: <em>"Siapa yang...?"</em></div>
        </div>
        <img src="images/image17.png" alt="contoh subjek" class="materi-image" />
      </div>
    `
  },
  {
    id: 2,
    title: 'Predikat (P)',
    emoji: '🟢',
    desc: 'Predikat adalah kegiatan atau tindakan yang dilakukan.',
    content: () => `
      <div class="materi-body">
        <div class="spo-box p" style="margin-bottom:16px; padding:18px;">
          <div class="spo-label">P = Predikat</div>
          <div class="spo-name" style="font-size:.95rem; margin-top:6px;">Apa yang sedang dilakukan?</div>
        </div>
        <div class="example-box">
          <div class="example-label">▶ Contoh</div>
          <div class="example-sentence">
            "Kakak <span class="highlight-p">membaca</span> buku"
          </div>
          <div class="example-analysis">Predikat = <strong style="color:#2e7d32">membaca</strong> (kegiatan yang dilakukan)</div>
        </div>
        <div class="example-box" style="margin-top:10px; background:linear-gradient(135deg,#e8f5e9,#c8e6c9); border-left-color:#4caf50;">
          <div class="example-label" style="color:#1b5e20;">💡 Trik Menemukan Predikat</div>
          <div class="example-sentence" style="font-size:1rem;">Tanya: <em>"Sedang apa?"</em></div>
        </div>
        <img src="images/image20.png" alt="contoh predikat" class="materi-image" />
      </div>
    `
  },
  {
    id: 3,
    title: 'Objek (O)',
    emoji: '🔵',
    desc: 'Objek adalah benda yang dikenai kegiatan.',
    content: () => `
      <div class="materi-body">
        <div class="spo-box o" style="margin-bottom:16px; padding:18px;">
          <div class="spo-label">O = Objek</div>
          <div class="spo-name" style="font-size:.95rem; margin-top:6px;">Benda yang dikenai kegiatan</div>
        </div>
        <div class="example-box">
          <div class="example-label">▶ Contoh</div>
          <div class="example-sentence">
            "Ibu memasak <span class="highlight-o">nasi</span>"
          </div>
          <div class="example-analysis">Objek = <strong style="color:#1565c0">nasi</strong> (yang dimasak)</div>
        </div>
        <div class="example-box" style="margin-top:10px; background:linear-gradient(135deg,#e3f2fd,#bbdefb); border-left-color:#2196f3;">
          <div class="example-label" style="color:#0d47a1;">💡 Trik Menemukan Objek</div>
          <div class="example-sentence" style="font-size:1rem;">Tanya: <em>"Apa yang di-...?"</em></div>
        </div>
        <img src="images/image23.png" alt="contoh objek" class="materi-image" />
      </div>
    `
  },
  {
    id: 4,
    title: 'Contoh Lengkap SPO',
    emoji: '✅',
    desc: 'Mari lihat kalimat SPO secara lengkap!',
    content: () => `
      <div class="materi-body">
        <div class="example-box" style="margin-bottom:14px;">
          <div class="example-label">▶ Kalimat 1</div>
          <div class="example-sentence">
            "<span class="highlight-s">Ayah</span> <span class="highlight-p">mencuci</span> <span class="highlight-o">mobil</span>"
          </div>
          <div class="example-analysis">
            S = <strong style="color:#f4a100">Ayah</strong> &nbsp;|&nbsp;
            P = <strong style="color:#2e7d32">mencuci</strong> &nbsp;|&nbsp;
            O = <strong style="color:#1565c0">mobil</strong>
          </div>
        </div>
        <div class="example-box">
          <div class="example-label">▶ Kalimat 2</div>
          <div class="example-sentence">
            "<span class="highlight-s">Rina</span> <span class="highlight-p">minum</span> <span class="highlight-o">susu</span>"
          </div>
          <div class="example-analysis">
            S = <strong style="color:#f4a100">Rina</strong> &nbsp;|&nbsp;
            P = <strong style="color:#2e7d32">minum</strong> &nbsp;|&nbsp;
            O = <strong style="color:#1565c0">susu</strong>
          </div>
        </div>
        <div class="example-box" style="margin-top:14px;">
          <div class="example-label">▶ Kalimat 3</div>
          <div class="example-sentence">
            "<span class="highlight-s">Dia</span> <span class="highlight-p">menulis</span> <span class="highlight-o">surat</span>"
          </div>
          <div class="example-analysis">
            S = <strong style="color:#f4a100">Dia</strong> &nbsp;|&nbsp;
            P = <strong style="color:#2e7d32">menulis</strong> &nbsp;|&nbsp;
            O = <strong style="color:#1565c0">surat</strong>
          </div>
        </div>
        <div class="sentence-strip" style="margin-top:20px;">
          <div class="sentence-word s-word">Subjek</div>
          <div class="sentence-word plus">+</div>
          <div class="sentence-word p-word">Predikat</div>
          <div class="sentence-word plus">+</div>
          <div class="sentence-word o-word">Objek</div>
        </div>
      </div>
    `
  }
];

// ===== QUIZ QUESTIONS =====
const allQuestions = [
  // Q1 – Pilihan ganda: cari subjek
  {
    id: 'q1',
    type: 'pilihan',
    sentence: 'Rina minum susu',
    image: 'images/image27.png',
    question: 'Tentukan SUBJEK dari kalimat ini!',
    hint: '💡 Tanya: "Siapa yang minum?"',
    options: ['Rina', 'minum', 'susu', 'air'],
    answer: 'Rina',
    explain: '✅ <strong>Rina</strong> adalah subjek karena dia yang melakukan kegiatan (minum).',
    cols: 2
  },
  // Q2 – Pilihan ganda: cari predikat
  {
    id: 'q2',
    type: 'pilihan',
    sentence: 'Ayah mencuci mobil',
    image: 'images/image16.png',
    question: 'Tentukan PREDIKAT dari kalimat ini!',
    hint: '💡 Tanya: "Sedang apa Ayah?"',
    options: ['Ayah', 'mencuci', 'mobil', 'bersih'],
    answer: 'mencuci',
    explain: '✅ <strong>mencuci</strong> adalah predikat karena merupakan kegiatan yang dilakukan Ayah.',
    cols: 2
  },
  // Q3 – Pilihan ganda: cari objek
  {
    id: 'q3',
    type: 'pilihan',
    sentence: 'Kakak membaca buku',
    image: 'images/image21.png',
    question: 'Tentukan OBJEK dari kalimat ini!',
    hint: '💡 Tanya: "Apa yang dibaca Kakak?"',
    options: ['Kakak', 'membaca', 'buku', 'cerita'],
    answer: 'buku',
    explain: '✅ <strong>buku</strong> adalah objek karena merupakan benda yang dikenai kegiatan membaca.',
    cols: 2
  },
  // Q4 – Drag & Drop: susun SPO
  {
    id: 'q4',
    type: 'drag',
    sentence: 'Ibu memasak nasi',
    image: 'images/image24.png',
    question: 'Kelompokkan kata-kata ini ke dalam S, P, O!',
    hint: '💡 Klik kata lalu pilih kotak yang sesuai',
    words: ['Ibu', 'memasak', 'nasi'],
    answer: { S: 'Ibu', P: 'memasak', O: 'nasi' },
    explain: '✅ <strong>Ibu</strong> = Subjek, <strong>memasak</strong> = Predikat, <strong>nasi</strong> = Objek.'
  },
  // Q5 – Pilihan ganda: kalimat mana yang benar
  {
    id: 'q5',
    type: 'pilihan',
    sentence: null,
    image: null,
    question: 'Kalimat manakah yang memiliki susunan SPO yang benar?',
    hint: '💡 Ingat: Subjek + Predikat + Objek',
    options: [
      'Bola Budi bermain',
      'Budi bermain bola',
      'Bermain bola Budi',
      'Budi bola bermain'
    ],
    answer: 'Budi bermain bola',
    explain: '✅ <strong>"Budi bermain bola"</strong> – Budi (S) + bermain (P) + bola (O). Susunan SPO yang benar!',
    cols: 1
  },
  // Q6 – Input: tulis ulang subjek
  {
    id: 'q6',
    type: 'input',
    sentence: 'Dia menulis surat',
    image: 'images/image28.png',
    question: 'Tuliskan SUBJEK dari kalimat berikut!',
    hint: '💡 Siapa yang menulis surat?',
    answer: 'Dia',
    explain: '✅ <strong>Dia</strong> adalah subjek – orang yang melakukan kegiatan menulis surat.'
  }
];

// ============================================================
// STATE
// ============================================================
let currentMateri = 0;
let quizQuestions = [];
let currentQuestion = 0;
let score = 0;
let answers = [];
let dragState = { selected: null, placements: { S: null, P: null, O: null } };
let feedbackTimeout = null;

// ============================================================
// SCREEN TRANSITIONS
// ============================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    if (id === 'screen-materi-intro') initMateri();
    if (id === 'screen-quiz') initQuiz();
  }
}

function confirmBackToMenu() {
  if (confirm('Kembali ke menu? Progress quiz akan hilang.')) {
    showScreen('screen-menu');
  }
}

// ============================================================
// MATERI
// ============================================================
function initMateri() {
  currentMateri = 0;
  renderMateri();
  renderDots();
}

function renderMateri() {
  const slide = materiSlides[currentMateri];
  const container = document.getElementById('materi-content');
  container.innerHTML = `
    <div class="materi-slide fade-in">
      <div class="materi-slide-header" style="background:linear-gradient(135deg,#fff8e1,#fdf3d0);">
        <span class="slide-emoji">${slide.emoji}</span>
        <h2>${slide.title}</h2>
        <p>${slide.desc}</p>
      </div>
      ${slide.content()}
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
    currentMateri++;
    renderMateri();
  }
}

function prevMateri() {
  if (currentMateri > 0) {
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
  currentMateri = idx;
  renderMateri();
}

// ============================================================
// QUIZ
// ============================================================
function initQuiz() {
  quizQuestions = shuffle([...allQuestions]);
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

  let html = `
    <div class="quiz-card">
      <div class="quiz-num">Soal ${currentQuestion + 1} dari ${total}</div>
      <div class="quiz-question">${q.question}</div>
  `;

  if (q.sentence) {
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

  if (q.type === 'pilihan') {
    html += `<div class="options-grid ${q.cols === 1 ? 'cols-1' : 'cols-2'}" id="options-wrap">`;
    q.options.forEach(opt => {
      html += `<button class="option-btn" onclick="checkPilihan('${escHtml(opt)}')" data-opt="${escHtml(opt)}">${opt}</button>`;
    });
    html += `</div>`;
  } else if (q.type === 'drag') {
    dragState = { selected: null, placements: { S: null, P: null, O: null } };
    html += renderDragSection(q);
  } else if (q.type === 'input') {
    html += `
      <div class="quiz-input-wrap">
        <input type="text" class="quiz-input" id="quiz-input" placeholder="Tulis jawabanmu di sini..." autocomplete="off" />
      </div>
      <button class="btn-check" id="btn-check-input" onclick="checkInput()">✅ Periksa Jawaban</button>
    `;
  }

  html += `</div>`; // close quiz-card
  body.innerHTML = html;

  // Focus input if needed
  if (q.type === 'input') {
    setTimeout(() => document.getElementById('quiz-input')?.focus(), 100);
  }
}

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
  // Deselect previous
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

  // If zone already has a word, return it to bank
  const existing = dragState.placements[zone];
  if (existing) {
    returnToBank(existing);
  }

  // Move selected word to zone
  const word = dragState.selected;
  dragState.placements[zone] = word;
  dragState.selected = null;

  // Hide chip from bank
  const chip = document.getElementById('chip-' + word);
  if (chip) chip.style.display = 'none';

  // Show in drop zone
  const dzWord = document.getElementById('dz-' + zone + '-word');
  if (dzWord) {
    dzWord.textContent = word;
    dzWord.style.fontFamily = "'Fredoka One', cursive";
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

  processAnswer(correct, q.explain);
}

function checkPilihan(selected) {
  const q = quizQuestions[currentQuestion];
  const correct = selected === q.answer;

  // Highlight all options
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.opt === q.answer) btn.classList.add('correct');
    else if (btn.dataset.opt === selected && !correct) btn.classList.add('wrong');
  });

  processAnswer(correct, q.explain);
}

function checkInput() {
  const q = quizQuestions[currentQuestion];
  const input = document.getElementById('quiz-input');
  if (!input) return;

  const val = input.value.trim();
  const correct = val.toLowerCase() === q.answer.toLowerCase();

  input.disabled = true;
  input.classList.add(correct ? 'correct-input' : 'wrong-input');

  const btn = document.getElementById('btn-check-input');
  if (btn) btn.disabled = true;

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
  explainEl.innerHTML = explain + (correct ? '' : `<br><br>Jawaban: <strong>${quizQuestions[currentQuestion].answer}</strong>`);
  overlay.classList.add('show');

  clearTimeout(feedbackTimeout);
  feedbackTimeout = setTimeout(() => {
    overlay.classList.remove('show');
    nextQuestion();
  }, 2200);

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

// ============================================================
// HASIL
// ============================================================
function showResult() {
  showScreen('screen-hasil');
  const total = quizQuestions.length;

  // Title & subtitle
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

  // Animate score circle
  const circle = document.getElementById('score-circle');
  const pct = score / total;
  circle.style.background = pct >= 0.7
    ? 'linear-gradient(135deg, #4caf50, #2e7d32)'
    : pct >= 0.4
    ? 'linear-gradient(135deg, #f9c74f, #f4a100)'
    : 'linear-gradient(135deg, #f44336, #c62828)';

  // Review list
  const reviewEl = document.getElementById('review-list');
  reviewEl.innerHTML = answers.map((a, i) => `
    <div class="review-item ${a.correct ? 'ok' : 'bad'}">
      <span class="review-icon">${a.correct ? '✅' : '❌'}</span>
      <span>Soal ${i + 1}: <em>${a.question.sentence || a.question.question.substring(0, 40) + '...'}</em></span>
    </div>
  `).join('');

  // Fireworks for good scores
  if (score >= total * 0.6) launchFireworks();
}

function launchFireworks() {
  const container = document.getElementById('fireworks');
  if (!container) return;
  const emojis = ['🎉', '🌟', '✨', '🎊', '🎈', '⭐', '🏆'];
  for (let i = 0; i < 18; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'firework';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 80 + 10 + '%';
      el.style.setProperty('--fx', (Math.random() - .5) * 120 + 'px');
      el.style.setProperty('--fy', (Math.random() - .5) * 80 + 'px');
      el.style.animationDelay = Math.random() * .5 + 's';
      container.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }, i * 80);
  }
}

function restartQuiz() {
  showScreen('screen-quiz');
}

// ============================================================
// UTILS
// ============================================================
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

// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  // Ensure cover is shown
  document.getElementById('screen-cover').classList.add('active');
});
