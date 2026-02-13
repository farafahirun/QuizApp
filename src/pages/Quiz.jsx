import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Timer from "../components/Timer"
import { shuffleArray } from "../utils/shuffle"

function Quiz() {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  // Ambil durasi dari settings atau default 5 menit
  const getInitialDuration = () => {
    const settingsData = localStorage.getItem("quizSettings")
    const settings = settingsData ? JSON.parse(settingsData) : { duration: 300 }
    return settings.duration || 300
  }
  
  const [timeLeft, setTimeLeft] = useState(getInitialDuration())

  // Cek user login
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      navigate("/")
    }
  }, [navigate])

  // Load soal dari API atau localStorage
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
      // Ambil pengaturan dari localStorage
      const settingsData = localStorage.getItem("quizSettings")
      const settings = settingsData ? JSON.parse(settingsData) : { amount: 15 }
      
      // Bangun URL API berdasarkan pengaturan
      let apiUrl = `https://opentdb.com/api.php?amount=${settings.amount || 15}`
      if (settings.category) apiUrl += `&category=${settings.category}`
      if (settings.difficulty) apiUrl += `&difficulty=${settings.difficulty}`
      if (settings.type) apiUrl += `&type=${settings.type}`
      
      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          if (data.results && data.results.length > 0) {
            // Shuffle options untuk setiap soal dan simpan
            const questionsWithShuffledOptions = data.results.map(q => ({
              ...q,
              shuffledOptions: shuffleArray([
                ...q.incorrect_answers,
                q.correct_answer
              ])
            }))
            setQuestions(questionsWithShuffledOptions)
            setLoading(false)
          } else {
            alert("Gagal memuat soal. Silakan coba lagi.")
            navigate("/")
          }
        })
        .catch(error => {
          console.error("Error fetching questions:", error)
          alert("Terjadi kesalahan. Silakan coba lagi.")
          navigate("/")
        })
    }
  }, [navigate])

  // Auto-save ke localStorage setiap ada perubahan state
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

  const handleAnswer = (answer) => {
    // Cek jawaban
    const isCorrect = answer === questions[current].correct_answer
    const newScore = isCorrect ? score + 1 : score
    const newAnswered = answered + 1
    
    if (isCorrect) {
      setScore(newScore)
    }

    setAnswered(newAnswered)

    // Langsung pindah ke soal berikutnya tanpa delay
    if (current + 1 < questions.length) {
      setCurrent(current + 1)
    } else {
      // Kirim nilai yang sudah di-update langsung
      finishQuiz(newScore, newAnswered)
    }
  }

  const finishQuiz = (finalScore = score, finalAnswered = answered) => {
    localStorage.removeItem("quizState")
    const user = localStorage.getItem("user")
    navigate("/result", {
      state: {
        score: finalScore,
        total: questions.length,
        answered: finalAnswered,
        username: user
      }
    })
  }

  const handleTimeUpdate = (newTime) => {
    setTimeLeft(newTime)
  }

  if (loading) {
    return (
      <div className="quiz-container">
        <div className="loading">
          <h2>Memuat soal...</h2>
          <div className="loader"></div>
        </div>
      </div>
    )
  }

  if (!questions.length) {
    return (
      <div className="quiz-container">
        <h2>Tidak ada soal tersedia</h2>
        <button onClick={() => navigate("/")}>Kembali</button>
      </div>
    )
  }

  const question = questions[current]
  const options = question.shuffledOptions

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
        <div className="user-info">
          <span>{localStorage.getItem("user")}</span>
        </div>
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
        <Timer 
          duration={timeLeft} 
          onTimeUp={finishQuiz}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      <div className="quiz-content">
        <div className="question-number">
          Soal {current + 1} dari {questions.length}
        </div>
        
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((current + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="question-card">
          <div className="question-category">
            {question.category} | {question.difficulty === 'easy' ? 'Mudah' : question.difficulty === 'medium' ? 'Sedang' : 'Sulit'}
          </div>
          <h2 
            className="question-text"
            dangerouslySetInnerHTML={{ __html: question.question }} 
          />
          
          <div className="options-container">
            {options.map((opt, index) => (
              <button 
                key={index} 
                onClick={() => handleAnswer(opt)}
                className="option-button"
                dangerouslySetInnerHTML={{ __html: opt }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Quiz