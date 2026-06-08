const vocabS = [
  'rina', 'ayah', 'kakak', 'ibu', 'dia', 'budi', 'saya', 'aku', 'kami', 'mereka', 
  'kalian', 'kamu', 'tante', 'adik', 'monyet', 'sapi', 'kerbau', 'kucing', 'anjing', 
  'guru', 'murid', 'kakek', 'nenek', 'paman', 'mama', 'papa', 'dokter', 'polisi', 
  'tentara', 'petani', 'nelayan', 'sopir', 'pilot', 'koki', 'anak', 'orang',
  'siti', 'aldi', 'dodi', 'lani', 'edo', 'rudi', 'roni', 'dika', 'iwan', 'siska', 'ani', 
  'lisa', 'nita', 'wati', 'joko', 'ali', 'ratna', 'tito', 'kiki', 'wawan',
  'kambing', 'domba', 'kelinci', 'gajah', 'singa', 'harimau', 'kuda', 'jerapah', 
  'ayam', 'bebek', 'burung', 'ular', 'tikus', 'semut', 'lebah', 'buaya'
];

const vocabP = [
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
  'dibuka', 'ditutup', 'dipotong', 'disapu', 'dikepel', 'dibuang', 'diambil', 'dibuat',
  'dilihat', 'didengar', 'ditanam', 'disiram', 'dipetik', 'dijaga', 'dibantu', 'dipanggil',
  'dijemput', 'diantar', 'ditangkap', 'dikejar',
  'memeriksa', 'periksa', 'diperiksa'
];

const vocabO = [
  'susu', 'mobil', 'buku', 'nasi', 'surat', 'bola', 'pohon', 'rumah', 'sayur', 
  'roti', 'air', 'kelas', 'rumput', 'ikan', 'daging', 'sepatu', 'baju', 'sepeda',
  'kopi', 'teh', 'buah', 'apel', 'jeruk', 'pisang', 'bakso', 'mie', 'mangga', 
  'semangka', 'melon', 'stroberi', 'tomat', 'wortel', 'kentang', 'jagung',
  'celana', 'topi', 'tas', 'meja', 'kursi', 'piring', 'gelas', 'sendok', 'garpu', 
  'mangkuk', 'wajan', 'panci', 'pensil', 'pulpen', 'kertas', 'papan tulis', 
  'mainan', 'boneka', 'bantal', 'guling', 'selimut', 'sabun', 'sampo', 'sikat gigi',
  'motor', 'pesawat', 'kereta', 'sekolah', 'kamar', 'taman', 'halaman', 'jalan', 'bunga',
  'pasien'
];

function test(inputValue) {
  const words = inputValue
    .toLowerCase()
    .replace(/[.,?!]/g, '')
    .split(/\s+/)
    .filter(Boolean);
  
  let s = null;
  let p = null;
  let o = null;
  
  // 1. Find Predikat first
  for (let i = 0; i < words.length; i++) {
    const w = words[i];
    if (vocabP.includes(w)) {
      p = w;
      break;
    }
  }

  if (!p) {
    const verbPrefixes = ['me', 'di', 'ber', 'ter'];
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      const hasVerbPrefix = verbPrefixes.some(prefix => w.startsWith(prefix) && w.length >= 4);
      if (hasVerbPrefix) {
        p = w;
        break;
      }
    }
  }

  // 2. Find S and O relative to P
  if (p) {
    const pIndex = words.indexOf(p);
    const beforeWords = words.slice(0, pIndex);
    const afterWords = words.slice(pIndex + 1);

    for (const w of beforeWords) {
      if (vocabS.includes(w)) {
        s = w;
        break;
      }
    }
    if (!s && beforeWords.length > 0) {
      s = beforeWords.find(w => !vocabO.includes(w)) || beforeWords[0];
    }

    for (const w of afterWords) {
      if (vocabO.includes(w)) {
        o = w;
        break;
      }
    }
    if (!o) {
      for (const w of afterWords) {
        if (vocabS.includes(w)) {
          o = w;
          break;
        }
      }
    }
    if (!o && afterWords.length > 0) {
      o = afterWords[0];
    }
  }

  // Validate Order & Semantics
  const wordsLower = inputValue
    .toLowerCase()
    .replace(/[.,?!]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const pIndex = wordsLower.indexOf(p);
  
  let sIndex = -1;
  for (let i = 0; i < pIndex; i++) {
    if (wordsLower[i] === s) {
      sIndex = i;
      break;
    }
  }
  if (sIndex === -1) sIndex = wordsLower.indexOf(s);

  let oIndex = -1;
  for (let i = pIndex + 1; i < wordsLower.length; i++) {
    if (wordsLower[i] === o) {
      oIndex = i;
      break;
    }
  }
  if (oIndex === -1) oIndex = wordsLower.indexOf(o);

  const isOrderCorrect = sIndex !== -1 && pIndex !== -1 && oIndex !== -1 && sIndex < pIndex && pIndex < oIndex;

  const isPassive = p && (p.startsWith('di') || [
    'dibaca', 'ditulis', 'dimasak', 'dicuci', 'dimakan', 'diminum', 'dilempar', 'dibeli', 'dibawa',
    'dibuka', 'ditutup', 'dipotong', 'disapu', 'dikepel', 'dibuang', 'diambil', 'dibuat',
    'dilihat', 'didengar', 'ditanam', 'disiram', 'dipetik', 'dijaga', 'dibantu', 'dipanggil',
    'dijemput', 'diantar', 'ditangkap', 'dikejar', 'diperiksa'
  ].includes(p));

  let isSemanticValid = true;
  let semanticErrorMsg = '';

  if (p && s && o) {
    if (isPassive) {
      if (vocabO.includes(o)) {
        isSemanticValid = false;
        semanticErrorMsg = `Benda mati seperti ${o} tidak bisa melakukan kegiatan ${p}!`;
      }
    } else {
      if (vocabO.includes(s)) {
        isSemanticValid = false;
        semanticErrorMsg = `Benda mati seperti ${s} tidak bisa melakukan kegiatan ${p}!`;
      }
    }
  }

  const isComplete = s && p && o;

  console.log({
    input: inputValue,
    detected: { s, p, o },
    isComplete: !!isComplete,
    isOrderCorrect,
    isSemanticValid,
    semanticErrorMsg
  });
}

test("membaca berli buku");
test("berli membaca buku");
