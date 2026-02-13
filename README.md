# 📚 Aplikasi Kuis - Kuis Master

Aplikasi kuis interaktif berbasis React dengan fitur lengkap dan modern.

## ✨ Fitur Lengkap

### ✅ Semua Kriteria Terpenuhi

#### a. **Fitur Login**
- Login dengan nama pengguna
- Validasi input sebelum memulai kuis
- Menyimpan session user di localStorage

#### b. **API Soal dari OpenTDB**
- Integrasi dengan [Open Trivia Database API](https://opentdb.com/)
- Fetch soal secara dinamis berdasarkan pengaturan

#### c. **Kustomisasi Soal (JUMLAH & TYPE BEBAS)**
- **Jumlah Soal**: Pilih 5, 10, 15, 20, 25, atau 30 soal
- **Kategori**: 24+ kategori tersedia (General Knowledge, Science, History, Sports, dll)
- **Tingkat Kesulitan**: Mudah, Sedang, Sulit, atau Campuran
- **Tipe Soal**: Pilihan Ganda, Benar/Salah, atau Campuran
- **Durasi Waktu**: 3, 5, 10, 15, atau 20 menit

#### d. **Statistik Real-time**
- Total soal ditampilkan di header
- Jumlah soal yang sudah dikerjakan
- Sisa soal yang belum dijawab
- Progress bar visual

#### e. **Timer Countdown**
- Timer yang dapat disesuaikan (3-20 menit)
- Visual warning saat waktu hampir habis
- Auto-save waktu tersisa ke localStorage
- Progress bar waktu

#### f. **Auto-Next Question**
- Satu halaman = satu soal
- Otomatis pindah ke soal berikutnya setelah memilih jawaban
- Visual feedback (hijau = benar, merah = salah)
- Smooth transition antar soal

#### g. **Auto-Finish saat Timer Habis**
- Otomatis submit dan tampilkan hasil saat waktu habis
- Menampilkan jumlah benar, salah, dan soal yang dijawab
- Grade system (A-E) berdasarkan persentase
- Statistik lengkap hasil kuis

#### h. **Resume Kuis (localStorage)**
- Auto-save state kuis setiap detik
- Resume otomatis saat browser ditutup/refresh
- Konfirmasi untuk melanjutkan atau mulai baru
- Menyimpan: soal, jawaban, waktu tersisa, progress

## 🚀 Fitur Tambahan

### 🎨 Modern UI/UX
- Dual theme (Light/Dark mode)
- Animasi smooth dan responsif
- Gradient effects dan glassmorphism
- Mobile-friendly responsive design

### 🔧 Teknologi
- **React 19.2.0** dengan Hooks
- **React Router DOM 7.13.0** untuk navigasi
- **Vite 7.3.1** untuk build tool super cepat
- **Fisher-Yates Shuffle** untuk randomisasi jawaban yang lebih baik
- **localStorage** untuk persistence

## 🛠️ Instalasi & Menjalankan

### Install Dependencies
```bash
npm install
```

### Development Mode
```bash
npm run dev
```

### Build Production
```bash
npm run build
```

## 🎮 Cara Penggunaan

1. **Login**: Masukkan nama + pilih pengaturan kuis → Klik "Mulai Kuis"
2. **Mengerjakan Kuis**: Pilih jawaban → Otomatis lanjut → Perhatikan timer
3. **Resume**: Jika browser ditutup → Buka kembali → Pilih lanjutkan/mulai baru
4. **Hasil**: Lihat grade, statistik → Pilih "Main Lagi" atau "Logout"

## 📊 Grade System
- **A (90-100%)**: Luar biasa! Sempurna!
- **B (80-89%)**: Bagus sekali!
- **C (70-79%)**: Cukup baik!
- **D (60-69%)**: Lumayan, terus belajar!
- **E (<60%)**: Jangan menyerah, coba lagi!

---

**Happy Quizzing! 🎉**
