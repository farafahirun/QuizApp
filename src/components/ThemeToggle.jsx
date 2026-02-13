import { useState, useEffect } from 'react'

function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      aria-label="Ubah tema"
    >
      {theme === 'light' ? '🌙' : '☀️'}
      <span className="theme-label">
        {theme === 'light' ? 'Gelap' : 'Terang'}
      </span>
    </button>
  )
}

export default ThemeToggle
