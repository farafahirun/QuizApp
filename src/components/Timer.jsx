import { useEffect, useState } from "react"

function Timer({ duration, onTimeUp, onTimeUpdate }) {
  const [time, setTime] = useState(duration)

  useEffect(() => {
    setTime(duration)
  }, [duration])

  useEffect(() => {
    if (time <= 0) {
      onTimeUp()
      return
    }

    const interval = setInterval(() => {
      setTime((prev) => {
        const newTime = prev - 1
        if (onTimeUpdate) {
          onTimeUpdate(newTime)
        }
        return newTime
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [time, onTimeUp, onTimeUpdate])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getTimerClass = () => {
    if (time <= 30) return 'timer critical'
    if (time <= 60) return 'timer warning'
    return 'timer'
  }

  const percentage = (time / duration) * 100

  return (
    <div className={getTimerClass()}>
      <div className="timer-icon">⏱️</div>
      <div className="timer-content">
        <div className="timer-label">Waktu Tersisa</div>
        <div className="timer-value">{formatTime(time)}</div>
        <div className="timer-bar">
          <div 
            className="timer-bar-fill" 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Timer