import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username, setUsername] = useState("")
  const [categories, setCategories] = useState([])
  const [settings, setSettings] = useState({
    amount: 15,
    category: "",
    difficulty: "",
    type: "",
    duration: 300 // 5 menit default
  })
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch kategori dari OpenTDB
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => {
        if (data.trivia_categories) {
          setCategories(data.trivia_categories)
        }
      })
      .catch(error => console.error("Error fetching categories:", error))
  }, [])

  useEffect(() => {
    // Cek apakah ada kuis yang sedang berlangsung
    const savedQuizState = localStorage.getItem("quizState")
    const savedUser = localStorage.getItem("user")
    
    if (savedQuizState && savedUser) {
      const resume = window.confirm(
        `Hai ${savedUser}! Ada kuis yang belum selesai. Lanjutkan kuis?`
      )
      if (resume) {
        navigate("/quiz")
      } else {
        // Hapus data kuis lama jika user tidak ingin melanjutkan
        localStorage.removeItem("quizState")
      }
    }
  }, [navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    if (!username.trim()) return alert("Masukkan username!")

    localStorage.setItem("user", username)
    localStorage.setItem("quizSettings", JSON.stringify(settings))
    navigate("/quiz")
  }

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <div className="login-container">
      <div className="bg-pattern"></div>
      <div className="login-content">
        <div className="login-card">
          <div className="login-header">
            <h1>Kuis Master</h1>
            <p className="subtitle">Uji pengetahuan Anda dengan kuis interaktif</p>
          </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group full-width">
              <label htmlFor="username">Nama Pengguna</label>
              <input
                id="username"
                type="text"
                placeholder="Masukkan nama Anda"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login-input"
                autoFocus
              />
            </div>

            <div className="settings-section">
              <h3>Pengaturan Kuis</h3>
              
              <div className="settings-grid">
                <div className="input-group">
                  <label htmlFor="amount">Jumlah Soal</label>
                  <select
                    id="amount"
                    value={settings.amount}
                    onChange={(e) => handleSettingChange("amount", e.target.value)}
                    className="login-input"
                  >
                    <option value="5">5 Soal</option>
                    <option value="10">10 Soal</option>
                    <option value="15">15 Soal</option>
                    <option value="20">20 Soal</option>
                    <option value="25">25 Soal</option>
                    <option value="30">30 Soal</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="duration">Durasi Waktu</label>
                  <select
                    id="duration"
                    value={settings.duration}
                    onChange={(e) => handleSettingChange("duration", parseInt(e.target.value))}
                    className="login-input"
                  >
                    <option value="180">3 Menit</option>
                    <option value="300">5 Menit</option>
                    <option value="600">10 Menit</option>
                    <option value="900">15 Menit</option>
                    <option value="1200">20 Menit</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="difficulty">Tingkat Kesulitan</label>
                  <select
                    id="difficulty"
                    value={settings.difficulty}
                    onChange={(e) => handleSettingChange("difficulty", e.target.value)}
                    className="login-input"
                  >
                    <option value="">Semua Level</option>
                    <option value="easy">Mudah</option>
                    <option value="medium">Sedang</option>
                    <option value="hard">Sulit</option>
                  </select>
                </div>

                <div className="input-group">
                  <label htmlFor="type">Tipe Soal</label>
                  <select
                    id="type"
                    value={settings.type}
                    onChange={(e) => handleSettingChange("type", e.target.value)}
                    className="login-input"
                  >
                    <option value="">Semua Tipe</option>
                    <option value="multiple">Pilihan Ganda</option>
                    <option value="boolean">Benar/Salah</option>
                  </select>
                </div>

                <div className="input-group full-width">
                  <label htmlFor="category">Kategori Soal</label>
                  <select
                    id="category"
                    value={settings.category}
                    onChange={(e) => handleSettingChange("category", e.target.value)}
                    className="login-input"
                  >
                    <option value="">Semua Kategori</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <button type="submit" className="login-button">
              <span>Mulai Kuis</span>
              <span className="arrow">→</span>
            </button>
          </form>
        </div>

        <div className="decorative-elements">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
        </div>
      </div>
    </div>
  )
}

export default Login