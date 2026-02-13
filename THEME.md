# 🎨 Theme System - Aplikasi Kuis

## Fitur Baru: Dark Mode & Light Mode

Aplikasi kuis sekarang memiliki **dua mode tampilan** yang dapat di-toggle:

### 🌞 Light Mode (Default)
- Background: `#E0E5E9` (Abu-abu terang)
- Card: `#FFFFFF` (Putih)
- Text Primary: `#121212` (Hitam)
- Text Secondary: `#004E64` (Biru tua)
- Accent: `#1DAAB8` (Cyan)

### 🌙 Dark Mode
- Background: `#121212` (Hitam)
- Card: `#1F1F1F` (Abu-abu gelap)
- Text Primary: `#E0E5E9` (Abu-abu terang)
- Text Secondary: `#1DAAB8` (Cyan)
- Accent: `#1DAAB8` (Cyan)

## 🎯 Cara Menggunakan

1. **Toggle Theme Button** berada di **kanan atas** setiap halaman
2. Klik tombol untuk beralih antara Light dan Dark mode
3. Pilihan theme tersimpan di **localStorage**
4. Theme akan tetap sama meskipun browser ditutup

## 🎨 Design Philosophy

### Simple & Modern
- **Minimalist**: Tidak ada gradient berlebihan
- **Clean**: Fokus pada konten, bukan dekorasi
- **Readable**: Kontras warna yang optimal
- **Professional**: Cocok untuk aplikasi serius

### Not AI-like
- Tidak menggunakan gradient purple/blue yang umum
- Warna natural dan profesional
- Tipografi jelas dan mudah dibaca
- Spacing yang breathable

## 🔧 Implementasi Teknis

### CSS Variables
Menggunakan CSS Custom Properties untuk dynamic theming:

```css
:root {
  --bg-primary: #E0E5E9;
  --bg-secondary: #ffffff;
  --text-primary: #121212;
  --accent-primary: #1DAAB8;
  /* ... */
}

:root[data-theme="dark"] {
  --bg-primary: #121212;
  --bg-secondary: #1a1a1a;
  --text-primary: #E0E5E9;
  /* ... */
}
```

### React Component
`ThemeToggle.jsx` - Komponen untuk toggle theme:
- State management dengan `useState`
- Persistence dengan `localStorage`
- Auto-apply dengan `useEffect`

### Integration
Theme toggle ditambahkan di `App.jsx` sebagai global component.

## 🎨 Color Palette

### Base Colors
- `#E0E5E9` - Light gray background
- `#004E64` - Deep blue (secondary text & accents)
- `#121212` - Pure black (dark mode bg & light mode text)
- `#1DAAB8` - Cyan (primary accent)

### Derived Colors
- Borders: rgba with opacity
- Shadows: rgba with opacity
- Hover states: Slightly darker/lighter versions

## 📱 Responsive Behavior

Theme toggle tetap accessible di semua ukuran layar:
- Desktop: Top-right fixed position
- Mobile: Tetap terlihat, tidak mengganggu konten

## ✨ Features

1. **Smooth Transitions**: 0.3s ease untuk semua transisi warna
2. **Persistent**: Theme tersimpan di localStorage
3. **Accessible**: Button dengan aria-label
4. **Visual Feedback**: Hover effect pada toggle button
5. **Consistent**: Semua komponen menggunakan CSS variables

## 🔮 Future Enhancements

- [ ] System preference detection (prefers-color-scheme)
- [ ] More color themes (not just light/dark)
- [ ] Transition animation saat toggle
- [ ] Theme preview before applying

---

**Updated**: February 13, 2026
**Version**: 2.0.0 (Theme Update)
