# Detektif Kalimat – Interactive Quiz

Quiz interaktif web untuk belajar Kalimat SPO (Subjek, Predikat, Objek) dengan tema detektif yang menyenangkan untuk anak-anak.

## Fitur
- 📚 5 slide materi interaktif (Kalimat SPO, Subjek, Predikat, Objek, Contoh)
- 🎯 6 soal latihan dengan 3 tipe:
  - Pilihan ganda (4 opsi)
  - Drag & Drop (kelompokkan kata ke S/P/O)
  - Ketik jawaban
- 🏆 Layar hasil dengan skor, bintang, dan review jawaban
- 🎉 Animasi dan feedback interaktif
- 📱 Responsive untuk mobile & desktop

## Deploy ke Vercel

Pastikan Vercel CLI sudah terinstal:
```bash
npm install -g vercel
```

Deploy:
```bash
vercel --prod
```

## Struktur File
```
sentence-quiz/
├── index.html        ← Struktur HTML utama
├── style.css         ← Styling lengkap
├── app.js            ← Logic quiz & materi
├── vercel.json       ← Konfigurasi Vercel
└── public/
    └── images/       ← Gambar dari PPTX
```
