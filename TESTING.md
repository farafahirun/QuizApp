# 🧪 Panduan Testing Aplikasi Kuis

## Testing Manual

### 1. Testing Fitur Login

#### Test Case 1.1: Login Berhasil
**Langkah:**
1. Buka aplikasi di http://localhost:5175
2. Masukkan username: "TestUser"
3. Klik tombol "Mulai Kuis"

**Expected Result:**
- Redirect ke halaman `/quiz`
- Username tersimpan di localStorage
- Soal mulai dimuat

#### Test Case 1.2: Login dengan Username Kosong
**Langkah:**
1. Buka halaman login
2. Jangan isi username
3. Klik tombol "Mulai Kuis"

**Expected Result:**
- Muncul alert: "Masukkan username!"
- Tetap di halaman login

#### Test Case 1.3: Login dengan Username Spasi Saja
**Langkah:**
1. Buka halaman login
2. Isi username dengan spasi: "   "
3. Klik tombol "Mulai Kuis"

**Expected Result:**
- Muncul alert: "Masukkan username!"
- Tetap di halaman login

---

### 2. Testing Fitur Quiz

#### Test Case 2.1: Load Soal dari API
**Langkah:**
1. Login dengan username valid
2. Tunggu loading

**Expected Result:**
- Loading indicator muncul
- Setelah beberapa detik, soal pertama muncul
- Total soal: 15 soal
- Timer mulai countdown dari 5:00

#### Test Case 2.2: Jawab Soal Benar
**Langkah:**
1. Pilih jawaban yang benar (jika tahu jawabannya)
2. Perhatikan feedback visual

**Expected Result:**
- Background tombol berubah hijau
- Delay 0.5 detik
- Pindah ke soal berikutnya
- Skor bertambah 1
- "Sudah Dijawab" bertambah 1

#### Test Case 2.3: Jawab Soal Salah
**Langkah:**
1. Pilih jawaban yang salah
2. Perhatikan feedback visual

**Expected Result:**
- Background tombol berubah merah
- Delay 0.5 detik
- Pindah ke soal berikutnya
- Skor tetap
- "Sudah Dijawab" bertambah 1

#### Test Case 2.4: Progress Bar
**Langkah:**
1. Perhatikan progress bar di bawah "Soal X dari 15"
2. Jawab beberapa soal

**Expected Result:**
- Progress bar bertambah setiap soal dijawab
- Lebar progress bar = (current + 1) / total * 100%

#### Test Case 2.5: Informasi Statistik
**Langkah:**
1. Perhatikan header kuis
2. Jawab beberapa soal

**Expected Result:**
- "Total Soal" tetap 15
- "Sudah Dijawab" update setiap soal dijawab
- "Sisa Soal" berkurang setiap soal dijawab

---

### 3. Testing Timer

#### Test Case 3.1: Timer Countdown
**Langkah:**
1. Mulai kuis
2. Perhatikan timer

**Expected Result:**
- Timer mulai dari 5:00
- Countdown setiap detik: 4:59, 4:58, ...
- Format: MM:SS

#### Test Case 3.2: Timer Warning (Yellow)
**Langkah:**
1. Tunggu hingga timer ≤ 1:00
2. Perhatikan perubahan visual

**Expected Result:**
- Background timer berubah kuning
- Border kuning muncul
- Timer bar berubah warna kuning

#### Test Case 3.3: Timer Critical (Red)
**Langkah:**
1. Tunggu hingga timer ≤ 0:30
2. Perhatikan perubahan visual

**Expected Result:**
- Background timer berubah merah
- Border merah muncul
- Timer bar berubah warna merah
- Animasi pulse muncul

#### Test Case 3.4: Timer Habis
**Langkah:**
1. Tunggu hingga timer 0:00
2. Atau bisa ubah duration di code jadi 10 detik untuk testing cepat

**Expected Result:**
- Auto-submit ke halaman result
- Data kuis terhapus dari localStorage
- Tampil hasil dengan soal yang dijawab vs total soal

---

### 4. Testing Satu Soal Per Halaman

#### Test Case 4.1: Hanya Satu Soal Ditampilkan
**Langkah:**
1. Perhatikan halaman kuis
2. Hitung berapa soal yang terlihat

**Expected Result:**
- Hanya 1 soal terlihat
- 1 pertanyaan
- Beberapa pilihan jawaban

#### Test Case 4.2: Auto-Next Setelah Jawab
**Langkah:**
1. Pilih jawaban
2. Jangan klik apa-apa

**Expected Result:**
- Delay 0.5 detik
- Otomatis pindah ke soal berikutnya
- Nomor soal bertambah

#### Test Case 4.3: Prevent Double Click
**Langkah:**
1. Klik jawaban pertama
2. Segera klik jawaban kedua sebelum delay selesai

**Expected Result:**
- Hanya jawaban pertama yang dihitung
- Jawaban kedua tidak berpengaruh
- Tombol disabled setelah pilih jawaban

#### Test Case 4.4: Soal Terakhir
**Langkah:**
1. Jawab soal sampai soal ke-15
2. Pilih jawaban untuk soal terakhir

**Expected Result:**
- Tidak ada soal berikutnya
- Otomatis redirect ke halaman result

---

### 5. Testing Result Page

#### Test Case 5.1: Tampilan Hasil
**Langkah:**
1. Selesaikan kuis (jawab semua soal atau tunggu timer habis)
2. Perhatikan halaman result

**Expected Result:**
- Username ditampilkan
- Jumlah benar ditampilkan
- Jumlah salah ditampilkan
- Total dijawab ditampilkan
- Persentase dihitung: (benar / total) * 100%
- Grade ditampilkan (A/B/C/D/E)
- Emoji sesuai grade
- Pesan motivasi

#### Test Case 5.2: Grade Calculation
**Skenario:**
- Benar 15/15 (100%) → Grade A 🏆
- Benar 13/15 (86.7%) → Grade B 🌟
- Benar 11/15 (73.3%) → Grade C 👍
- Benar 9/15 (60%) → Grade D 😊
- Benar 7/15 (46.7%) → Grade E 💪

#### Test Case 5.3: Tombol Main Lagi
**Langkah:**
1. Di halaman result
2. Klik "Main Lagi"

**Expected Result:**
- Redirect ke `/quiz`
- Soal baru dimuat dari API
- Timer reset ke 5:00
- Skor reset ke 0

#### Test Case 5.4: Tombol Logout
**Langkah:**
1. Di halaman result
2. Klik "Logout"

**Expected Result:**
- Username dihapus dari localStorage
- Quiz state dihapus
- Redirect ke halaman login

---

### 6. Testing LocalStorage Resume

#### Test Case 6.1: Auto-Save State
**Langkah:**
1. Buka Developer Tools (F12)
2. Tab Application → Local Storage
3. Mulai kuis dan jawab beberapa soal
4. Perhatikan localStorage

**Expected Result:**
- Key "quizState" ada
- Value berisi:
  - questions: array soal
  - current: index soal aktif
  - score: skor terkini
  - answered: jumlah dijawab
  - timeLeft: waktu tersisa
- Data update setiap ada perubahan

#### Test Case 6.2: Resume Setelah Close Browser
**Langkah:**
1. Login sebagai "User1"
2. Jawab 5 soal pertama
3. Catat waktu tersisa (misal: 3:45)
4. Tutup browser/tab
5. Buka browser lagi
6. Buka aplikasi

**Expected Result:**
- Dialog muncul: "Hai User1! Ada kuis yang belum selesai. Lanjutkan kuis?"
- Klik OK
- Langsung ke halaman kuis
- Soal dimulai dari soal ke-6 (soal yang belum dijawab)
- Timer dari 3:45
- Skor tetap 3 (atau berapa yang sudah didapat)
- "Sudah Dijawab" = 5

#### Test Case 6.3: Resume Setelah Refresh
**Langkah:**
1. Sedang di halaman kuis
2. Jawab beberapa soal
3. Tekan F5 atau refresh

**Expected Result:**
- State tidak hilang
- Langsung load dari state terakhir
- Tidak perlu fetch API lagi
- Waktu, skor, dan posisi soal tetap

#### Test Case 6.4: Tolak Resume (Mulai Baru)
**Langkah:**
1. Ada kuis yang belum selesai
2. Login lagi
3. Dialog muncul
4. Klik Cancel

**Expected Result:**
- Data kuis lama terhapus dari localStorage
- Tetap di halaman login
- Bisa login lagi untuk mulai kuis baru

#### Test Case 6.5: Clear State Setelah Selesai
**Langkah:**
1. Selesaikan kuis
2. Masuk halaman result
3. Cek localStorage

**Expected Result:**
- Key "quizState" terhapus
- Hanya key "user" yang tersisa
- Tidak ada dialog resume jika login lagi

---

### 7. Testing Edge Cases

#### Test Case 7.1: API Gagal Load
**Langkah:**
1. Matikan internet
2. Login dan mulai kuis

**Expected Result:**
- Loading tetap muncul
- Setelah timeout, muncul alert "Terjadi kesalahan"
- Redirect ke halaman login

#### Test Case 7.2: Akses Quiz Tanpa Login
**Langkah:**
1. Hapus localStorage
2. Langsung akses `/quiz` di URL

**Expected Result:**
- Auto-redirect ke halaman login
- Tidak bisa akses kuis tanpa login

#### Test Case 7.3: Akses Result Tanpa Data
**Langkah:**
1. Langsung akses `/result` tanpa kuis

**Expected Result:**
- Tampil pesan: "Tidak ada data hasil kuis"
- Ada tombol "Kembali ke Login"

#### Test Case 7.4: Shuffle Options
**Langkah:**
1. Mulai kuis baru beberapa kali
2. Perhatikan urutan pilihan jawaban untuk soal yang sama

**Expected Result:**
- Urutan pilihan jawaban di-shuffle
- Jawaban benar tidak selalu di posisi yang sama

---

## Testing Responsiveness

### Desktop (1920x1080)
- Layout lebar
- Card terpusat
- Semua elemen terlihat sempurna

### Tablet (768x1024)
- Layout menyesuaikan
- Stats mungkin vertical
- Tetap readable

### Mobile (375x667)
- Stats vertical
- Font size menyesuaikan
- Touch-friendly buttons
- Scroll jika perlu

---

## Performance Testing

### Metrics to Check:
1. **Initial Load Time**
   - Target: < 2 detik

2. **API Response Time**
   - OpenTDB API biasanya < 1 detik

3. **Transition Smoothness**
   - Animasi 60fps
   - Tidak ada lag saat pindah soal

4. **LocalStorage Write Speed**
   - Instant, tidak terasa delay

---

## Quick Test Script

Untuk testing cepat, ubah durasi timer menjadi 10 detik:

```javascript
// Di src/pages/Quiz.jsx, line 11
const [timeLeft, setTimeLeft] = useState(10) // 10 detik untuk testing
```

Dan jumlah soal menjadi 3:

```javascript
// Di src/pages/Quiz.jsx, line 37
fetch("https://opentdb.com/api.php?amount=3&category=9&difficulty=medium")
```

Ini memudahkan testing tanpa harus menunggu lama.

---

## Automated Testing (Future)

Untuk testing otomatis, bisa gunakan:
- **Vitest**: Unit testing React components
- **React Testing Library**: Component testing
- **Cypress**: E2E testing
- **Playwright**: Browser automation

---

## Bug Report Template

Jika menemukan bug, gunakan format ini:

**Bug Title:** [Deskripsi singkat]

**Steps to Reproduce:**
1. ...
2. ...
3. ...

**Expected Result:**
- ...

**Actual Result:**
- ...

**Screenshot:**
- (jika ada)

**Environment:**
- Browser: Chrome 120
- OS: Windows 11
- Screen: 1920x1080
