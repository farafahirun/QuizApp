# 📋 Penjelasan Fitur Aplikasi Kuis

## Kriteria & Implementasi

### a. ✅ Fitur Login

**Implementasi:**
- File: `src/pages/Login.jsx`
- User memasukkan username
- Username disimpan di `localStorage.setItem("user", username)`
- Redirect otomatis ke halaman kuis setelah login
- Validasi input: username tidak boleh kosong

**Fitur Tambahan:**
- Auto-detect jika ada kuis yang belum selesai
- Dialog konfirmasi untuk resume kuis

---

### b. ✅ API Soal dari OpenTDB

**Implementasi:**
- File: `src/pages/Quiz.jsx`
- URL API: `https://opentdb.com/api.php?amount=15&category=9&difficulty=medium`
- Parameters:
  - `amount=15`: Jumlah soal
  - `category=9`: General Knowledge
  - `difficulty=medium`: Tingkat kesulitan sedang

**Response Data:**
```json
{
  "results": [
    {
      "category": "General Knowledge",
      "type": "multiple",
      "difficulty": "medium",
      "question": "What is...",
      "correct_answer": "Answer",
      "incorrect_answers": ["Wrong1", "Wrong2", "Wrong3"]
    }
  ]
}
```

---

### c. ✅ Jumlah & Type Soal Bebas

**Implementasi:**
- Jumlah soal: **15 soal**
- Type: Campuran (multiple choice dan true/false tergantung dari API)
- Kategori: General Knowledge
- Difficulty: Medium

**Cara Mengubah:**
```javascript
// Ubah jumlah soal
fetch("https://opentdb.com/api.php?amount=20&...")

// Ubah kategori (18 = Science: Computers)
fetch("https://opentdb.com/api.php?...&category=18&...")

// Ubah kesulitan
fetch("https://opentdb.com/api.php?...&difficulty=hard")

// Hanya multiple choice
fetch("https://opentdb.com/api.php?...&type=multiple")

// Hanya true/false
fetch("https://opentdb.com/api.php?...&type=boolean")
```

---

### d. ✅ Total Soal & Jumlah yang Dikerjakan Ditampilkan

**Implementasi:**
- File: `src/pages/Quiz.jsx`
- Ditampilkan di header kuis:

```jsx
<div className="quiz-stats">
  <div className="stat-item">
    <span className="stat-label">Total Soal:</span>
    <span className="stat-value">{questions.length}</span>
  </div>
  <div className="stat-item">
    <span className="stat-label">Sudah Dijawab:</span>
    <span className="stat-value">{answered}</span>
  </div>
  <div className="stat-item">
    <span className="stat-label">Sisa Soal:</span>
    <span className="stat-value">{questions.length - answered}</span>
  </div>
</div>
```

**State yang Digunakan:**
- `questions.length`: Total soal
- `answered`: Jumlah yang sudah dijawab
- `questions.length - answered`: Sisa soal

---

### e. ✅ Timer dengan Waktu Pengerjaan Bebas

**Implementasi:**
- File: `src/components/Timer.jsx`
- Durasi: **5 menit (300 detik)**
- Format display: `MM:SS` (contoh: 5:00, 4:59, ...)

**Fitur Timer:**
1. **Countdown**: Hitung mundur setiap detik
2. **Auto-save**: Waktu tersisa disimpan ke localStorage
3. **Visual Indicator**:
   - Normal (hijau): waktu > 60 detik
   - Warning (kuning): waktu ≤ 60 detik
   - Critical (merah + animasi): waktu ≤ 30 detik
4. **Progress Bar**: Visual progress bar yang mengecil
5. **Auto-submit**: Otomatis submit saat waktu habis

**Cara Mengubah Durasi:**
```javascript
// Di src/pages/Quiz.jsx, line 11
const [timeLeft, setTimeLeft] = useState(300) // 300 detik = 5 menit

// Ubah menjadi 10 menit
const [timeLeft, setTimeLeft] = useState(600) // 600 detik = 10 menit

// Ubah menjadi 3 menit
const [timeLeft, setTimeLeft] = useState(180) // 180 detik = 3 menit
```

---

### f. ✅ Satu Halaman Satu Soal & Auto-Next

**Implementasi:**
- File: `src/pages/Quiz.jsx`
- Setiap render hanya menampilkan 1 soal berdasarkan index `current`

**Flow:**
1. User melihat soal ke-`current`
2. User klik jawaban → `handleAnswer()` dipanggil
3. Jawaban dicek (benar/salah)
4. Feedback visual: 
   - Hijau untuk jawaban benar
   - Merah untuk jawaban salah
5. Delay 0.5 detik
6. Auto-increment `current` ke soal berikutnya
7. Jika sudah soal terakhir → redirect ke halaman result

```javascript
const handleAnswer = (answer) => {
  if (selectedAnswer !== null) return // Prevent double-click
  
  setSelectedAnswer(answer)
  
  // Cek jawaban
  const isCorrect = answer === questions[current].correct_answer
  if (isCorrect) {
    setScore(score + 1)
  }
  
  setAnswered(answered + 1)
  
  // Auto-next dengan delay
  setTimeout(() => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1) // Pindah soal berikutnya
      setSelectedAnswer(null)
    } else {
      finishQuiz() // Selesai
    }
  }, 500) // Delay 0.5 detik
}
```

---

### g. ✅ Timer Habis → Tutup & Tampilkan Hasil

**Implementasi:**
- File: `src/components/Timer.jsx` dan `src/pages/Quiz.jsx`

**Mekanisme:**
1. Timer countdown dari durasi yang ditentukan
2. Setiap detik, waktu berkurang
3. Ketika `time <= 0`:
   - Panggil `onTimeUp()` callback
   - Di Quiz.jsx, callback ini adalah `finishQuiz()`
4. `finishQuiz()`:
   - Hapus `quizState` dari localStorage
   - Redirect ke `/result` dengan data hasil
   - Tampilkan:
     - Jumlah benar
     - Jumlah salah
     - Total dijawab
     - Persentase & grade

```javascript
// Di Timer.jsx
useEffect(() => {
  if (time <= 0) {
    onTimeUp() // Trigger saat waktu habis
    return
  }
  
  const interval = setInterval(() => {
    setTime((prev) => {
      const newTime = prev - 1
      if (onTimeUpdate) {
        onTimeUpdate(newTime) // Update ke parent
      }
      return newTime
    })
  }, 1000)
  
  return () => clearInterval(interval)
}, [time, onTimeUp, onTimeUpdate])

// Di Quiz.jsx
const finishQuiz = () => {
  localStorage.removeItem("quizState")
  navigate("/result", {
    state: {
      score,
      total: questions.length,
      answered,
      username: user
    }
  })
}
```

---

### h. ✅ Mekanisme Resume Kuis dengan LocalStorage

**Implementasi:**
- File: `src/pages/Login.jsx` dan `src/pages/Quiz.jsx`

#### Data yang Disimpan di LocalStorage:

```javascript
// Key: "quizState"
{
  questions: [...],          // Array soal lengkap dengan opsi ter-shuffle
  current: 5,                // Index soal yang sedang dikerjakan
  score: 3,                  // Skor saat ini
  answered: 5,               // Jumlah soal yang sudah dijawab
  timeLeft: 245              // Waktu tersisa dalam detik
}

// Key: "user"
"username123"                // Username user
```

#### Auto-Save Mechanism:

```javascript
// Di Quiz.jsx
useEffect(() => {
  if (questions.length > 0 && !loading) {
    localStorage.setItem("quizState", JSON.stringify({
      questions,
      current,
      score,
      answered,
      timeLeft
    }))
  }
}, [questions, current, score, answered, timeLeft, loading])
```

Setiap kali ada perubahan pada:
- `questions`: Daftar soal
- `current`: Soal yang sedang aktif
- `score`: Skor terkini
- `answered`: Jumlah yang sudah dijawab
- `timeLeft`: Waktu tersisa

Data otomatis di-save ke localStorage.

#### Resume Detection:

```javascript
// Di Login.jsx
useEffect(() => {
  const savedQuizState = localStorage.getItem("quizState")
  const savedUser = localStorage.getItem("user")
  
  if (savedQuizState && savedUser) {
    const resume = window.confirm(
      `Hai ${savedUser}! Ada kuis yang belum selesai. Lanjutkan kuis?`
    )
    if (resume) {
      navigate("/quiz") // Lanjutkan
    } else {
      localStorage.removeItem("quizState") // Hapus data lama
    }
  }
}, [navigate])
```

#### Load Saved State:

```javascript
// Di Quiz.jsx
useEffect(() => {
  const saved = localStorage.getItem("quizState")
  if (saved) {
    const data = JSON.parse(saved)
    setQuestions(data.questions)
    setCurrent(data.current)
    setScore(data.score)
    setAnswered(data.answered)
    setTimeLeft(data.timeLeft)
    setLoading(false)
  } else {
    // Fetch soal baru dari API
    fetch("https://opentdb.com/api.php?amount=15&category=9&difficulty=medium")
      .then(...)
  }
}, [navigate])
```

#### Clear State saat Selesai:

```javascript
// Di Result.jsx
useEffect(() => {
  localStorage.removeItem("quizState") // Hapus saat masuk result
}, [])

// Di Quiz.jsx - finishQuiz()
const finishQuiz = () => {
  localStorage.removeItem("quizState") // Hapus saat kuis selesai
  navigate("/result", { state: { ... } })
}
```

---

## Skenario Penggunaan Resume

### Skenario 1: Browser Ditutup saat Kuis
1. User sedang mengerjakan soal ke-5 dari 15
2. Waktu tersisa: 3:45
3. Skor: 3 benar
4. Browser ditutup
5. Buka browser lagi → masuk halaman login
6. Dialog muncul: "Hai [username]! Ada kuis yang belum selesai. Lanjutkan kuis?"
7. Klik OK → langsung lanjut dari soal ke-5 dengan waktu 3:45

### Skenario 2: Refresh Halaman
1. User sedang di halaman kuis
2. Tekan F5 atau refresh
3. Data tidak hilang, langsung load state terakhir
4. Soal, waktu, dan skor tetap sama

### Skenario 3: Tidak Ingin Resume
1. Dialog muncul saat login
2. Klik Cancel
3. Data kuis lama dihapus
4. Bisa mulai kuis baru

---

## Testing Checklist

- [x] Login dengan username
- [x] Soal dimuat dari API OpenTDB
- [x] Total 15 soal ditampilkan
- [x] Jumlah yang dikerjakan update setiap jawab
- [x] Timer countdown dari 5:00
- [x] Timer berubah warna saat < 60 detik
- [x] Timer animasi pulse saat < 30 detik
- [x] Satu halaman satu soal
- [x] Auto-next setelah pilih jawaban
- [x] Feedback visual (hijau/merah)
- [x] Timer habis → auto-submit
- [x] Halaman result menampilkan:
  - [x] Jumlah benar
  - [x] Jumlah salah
  - [x] Total dijawab
  - [x] Persentase & grade
- [x] Auto-save ke localStorage
- [x] Resume dialog saat login
- [x] Data tersimpan saat browser ditutup
- [x] Bisa lanjutkan dari posisi terakhir
- [x] Bisa pilih mulai baru

---

## Tips Pengembangan Lebih Lanjut

1. **Tambah Kategori Soal**
   - Buat dropdown pilihan kategori di halaman login
   - User bisa pilih kategori sebelum mulai

2. **Leaderboard**
   - Simpan skor ke database/localStorage
   - Tampilkan top 10 skor tertinggi

3. **Multiplayer**
   - Gunakan WebSocket
   - User bisa challenge teman

4. **Review Jawaban**
   - Simpan jawaban user
   - Di halaman result, user bisa review soal yang salah

5. **Difficulty Selection**
   - User pilih tingkat kesulitan
   - Easy/Medium/Hard

6. **Sound Effects**
   - Suara saat jawaban benar/salah
   - Suara alarm saat waktu hampir habis

7. **Achievements/Badges**
   - Badge untuk perfect score
   - Badge untuk speed run
   - Badge untuk consistency
