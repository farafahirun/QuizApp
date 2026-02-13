import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Quiz from "./pages/Quiz"
import Result from "./pages/Result"
import ThemeToggle from "./components/ThemeToggle"

function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  )
}

export default App
