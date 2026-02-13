import { useLocation, useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem("quizState")
  }, [])

  if (!state) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h2>Tidak ada data hasil kuis</h2>
          <button onClick={() => navigate("/")}>Kembali ke Login</button>
        </div>
      </div>
    )
  }

  const wrong = state.answered - state.score
  const unanswered = state.total - state.answered
  const percentage = ((state.score / state.total) * 100).toFixed(1)

  let grade = ''
  let message = ''
  
  if (percentage >= 90) {
    grade = 'A'
    message = 'Luar biasa! Sempurna!'
  } else if (percentage >= 80) {
    grade = 'B'
    message = 'Bagus sekali!'
  } else if (percentage >= 70) {
    grade = 'C'
    message = 'Cukup baik!'
  } else if (percentage >= 60) {
    grade = 'D'
    message = 'Lumayan, terus belajar!'
  } else {
    grade = 'E'
    message = 'Jangan menyerah, coba lagi!'
  }

  const handlePlayAgain = () => {
    localStorage.removeItem("quizState")
    navigate("/quiz")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("quizState")
    navigate("/")
  }

  return (
    <div className="result-container">
      <div className="result-card">
        <div className="result-header">
          <h1>Hasil Kuis</h1>
          {state.username && <p className="username">{state.username}</p>}
        </div>

        <div className="grade-circle">
          <div className="grade-letter">{grade}</div>
          <div className="grade-percentage">{percentage}%</div>
        </div>

        <p className="result-message">{message}</p>

        <div className="result-stats">
          <div className="stat-box correct">
            <div className="stat-icon">✓</div>
            <div className="stat-label">Jumlah Benar</div>
            <div className="stat-number">{state.score}</div>
          </div>

          <div className="stat-box incorrect">
            <div className="stat-icon">✕</div>
            <div className="stat-label">Jumlah Salah</div>
            <div className="stat-number">{wrong}</div>
          </div>

          <div className="stat-box answered">
            <div className="stat-icon">#</div>
            <div className="stat-label">Total Dijawab</div>
            <div className="stat-number">{state.answered}</div>
          </div>
        </div>

        {unanswered > 0 && (
          <div className="unanswered-warning">
            <p>Ada {unanswered} soal yang tidak dijawab</p>
          </div>
        )}

        <div className="result-actions">
          <button onClick={handlePlayAgain} className="btn-primary">
            Main Lagi
          </button>
          <button onClick={handleLogout} className="btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Result
