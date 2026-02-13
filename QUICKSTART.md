# 🚀 Quick Start Guide

## Instalasi & Menjalankan Aplikasi

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:5173**

### 3. Build untuk Production
```bash
npm run build
```

Output ada di folder: **dist/**

### 4. Preview Production Build
```bash
npm run preview
```

---

## 📝 Workflow Penggunaan

### Sebagai User:

1. **Login**
   - Buka http://localhost:5173
   - Masukkan username
   - Klik "Mulai Kuis"

2. **Kerjakan Kuis**
   - Baca soal
   - Pilih jawaban
   - Otomatis pindah ke soal berikutnya
   - Perhatikan timer

3. **Lihat Hasil**
   - Setelah selesai/timer habis
   - Lihat statistik
   - Klik "Main Lagi" atau "Logout"

### Sebagai Developer:

1. **Development Mode**
   ```bash
   npm run dev
   ```

2. **Check for Errors**
   ```bash
   npm run lint
   ```

3. **Build Production**
   ```bash
   npm run build
   ```

---

## 🔧 Customization Quick Reference

### Ubah Jumlah Soal
File: `src/pages/Quiz.jsx` (line 37)
```javascript
fetch("https://opentdb.com/api.php?amount=20&...")
//                                  ^^^^^^ ubah angka ini
```

### Ubah Durasi Timer
File: `src/pages/Quiz.jsx` (line 11)
```javascript
const [timeLeft, setTimeLeft] = useState(300)
//                                       ^^^ ubah angka ini (dalam detik)
```
- 60 = 1 menit
- 180 = 3 menit
- 300 = 5 menit (default)
- 600 = 10 menit

### Ubah Kategori Soal
File: `src/pages/Quiz.jsx` (line 37)
```javascript
fetch("https://opentdb.com/api.php?amount=15&category=9&difficulty=medium")
//                                            ^^^^^^^^^^
```

**Kategori Populer:**
- 9 = General Knowledge
- 18 = Science: Computers
- 21 = Sports
- 22 = Geography
- 23 = History

[List lengkap kategori](https://opentdb.com/api_category.php)

### Ubah Kesulitan
File: `src/pages/Quiz.jsx` (line 37)
```javascript
fetch("https://opentdb.com/api.php?amount=15&category=9&difficulty=medium")
//                                                        ^^^^^^^^^^^^^^^
```

Options: `easy`, `medium`, `hard`

### Ubah Type Soal
File: `src/pages/Quiz.jsx` (line 37)
```javascript
fetch("https://opentdb.com/api.php?amount=15&category=9&difficulty=medium&type=multiple")
//                                                                         ^^^^^^^^^^^^^^
```

Options:
- `multiple` = Multiple Choice (4 pilihan)
- `boolean` = True/False (2 pilihan)
- Tidak ada = Campuran

---

## 🎨 Customization Styling

### Ubah Warna Tema
File: `src/App.css`

**Gradient Background:**
```css
/* Login & Result page */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/*                                  ^^^^^^        ^^^^^^        */
/*                                  Warna 1       Warna 2       */
```

**Warna Button:**
```css
.login-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

**Timer Warning Colors:**
```css
.timer.warning {
  background: #fff3cd;      /* Kuning */
  border: 2px solid #ffc107;
}

.timer.critical {
  background: #f8d7da;      /* Merah */
  border: 2px solid #dc3545;
}
```

### Ubah Font
File: `src/index.css`
```css
:root {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /*           ^^^^^^ ubah font di sini                       */
}
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Vite akan otomatis mencari port yang available
# 5173 → 5174 → 5175 → dst
```

### API Error / Soal Tidak Muncul
```bash
# Check internet connection
# Check console untuk error message
# Coba refresh halaman
```

### LocalStorage Tidak Berfungsi
```bash
# Check browser privacy settings
# Pastikan LocalStorage tidak di-disable
# Clear browser cache & reload
```

### Build Error
```bash
# Clear node_modules dan install ulang
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📁 Struktur Project

```
react-quiz-app/
├── src/
│   ├── components/
│   │   └── Timer.jsx          # Timer component
│   ├── pages/
│   │   ├── Login.jsx          # Login page
│   │   ├── Quiz.jsx           # Quiz page ⭐
│   │   └── Result.jsx         # Result page
│   ├── utils/
│   │   └── shuffle.js         # Shuffle utility
│   ├── App.jsx                # Main app with routes
│   ├── App.css                # Main styling ⭐
│   ├── index.css              # Global styles
│   └── main.jsx               # Entry point
├── public/
├── index.html
├── package.json               # Dependencies
├── vite.config.js             # Vite config
├── README.md                  # Main documentation
├── FEATURES.md                # Feature details
├── TESTING.md                 # Testing guide
├── SUMMARY.md                 # Project summary
├── DEMO.html                  # Visual demo
└── QUICKSTART.md              # This file
```

⭐ = File yang sering dimodifikasi untuk customization

---

## 🧪 Testing Quick Commands

### Test Login Flow
1. Buka aplikasi
2. Masukkan username "Test"
3. Klik "Mulai Kuis"
4. Verify redirect ke /quiz

### Test Resume Feature
1. Login & mulai kuis
2. Jawab 2-3 soal
3. Close tab/browser
4. Buka lagi aplikasi
5. Verify dialog resume muncul

### Test Timer
1. Ubah timer jadi 10 detik untuk testing cepat:
   ```javascript
   const [timeLeft, setTimeLeft] = useState(10)
   ```
2. Mulai kuis
3. Tunggu timer habis
4. Verify auto-submit ke result

### Test API
1. Check network tab di DevTools
2. Start kuis
3. Verify request ke opentdb.com
4. Check response data

---

## 📊 Performance Tips

### Optimasi Development
```bash
# Use React DevTools extension
# Check component re-renders
# Monitor state updates
```

### Optimasi Production
```bash
# Build dengan minification
npm run build

# Analyze bundle size
npm run build -- --mode production --analyze
```

---

## 🔐 LocalStorage Data Structure

### Key: "user"
```javascript
"username123"
```

### Key: "quizState"
```javascript
{
  "questions": [...],      // Array of question objects
  "current": 5,            // Current question index
  "score": 3,              // Current score
  "answered": 5,           // Number answered
  "timeLeft": 245          // Remaining time in seconds
}
```

### Clear LocalStorage
```javascript
// Via console
localStorage.clear()

// Via code
localStorage.removeItem("quizState")
localStorage.removeItem("user")
```

---

## 📚 Resources

### Documentation
- [README.md](README.md) - Main documentation
- [FEATURES.md](FEATURES.md) - Feature implementation
- [TESTING.md](TESTING.md) - Testing guide
- [SUMMARY.md](SUMMARY.md) - Project summary

### External Resources
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [OpenTDB API](https://opentdb.com/api_config.php)

### API References
- [OpenTDB Categories](https://opentdb.com/api_category.php)
- [OpenTDB API Config](https://opentdb.com/api_config.php)

---

## ⚡ Quick Commands Cheat Sheet

```bash
# Install
npm install

# Dev
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint

# Clean install
rm -rf node_modules package-lock.json && npm install

# Check package updates
npm outdated

# Update packages
npm update
```

---

## 🎯 Common Tasks

### Add New Question Category
1. Edit `src/pages/Quiz.jsx`
2. Change `category=9` to desired category
3. Test API response
4. Verify questions load correctly

### Change Timer Duration
1. Edit `src/pages/Quiz.jsx` line 11
2. Change `useState(300)` to desired seconds
3. Test countdown
4. Verify auto-submit works

### Customize Styling
1. Edit `src/App.css`
2. Modify colors, fonts, spacing
3. Check responsive breakpoints
4. Test on different screen sizes

### Add New Route
1. Edit `src/App.jsx`
2. Add new Route component
3. Create page component
4. Test navigation

---

## 💡 Tips & Tricks

### Fast Testing
- Set timer to 10 seconds: `useState(10)`
- Use 3 questions: `?amount=3`
- Use easy difficulty: `&difficulty=easy`

### Debugging
- Open React DevTools
- Check console for errors
- Monitor Network tab for API calls
- Inspect LocalStorage in Application tab

### Better UX
- Add sound effects
- Add confetti on perfect score
- Add dark mode toggle
- Add multilingual support

---

## 🆘 Need Help?

Check dokumentasi lengkap di:
- **README.md** - Overview
- **FEATURES.md** - Detail fitur
- **TESTING.md** - Panduan testing

---

**Happy Coding! 🚀**
