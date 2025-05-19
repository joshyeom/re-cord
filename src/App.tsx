import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const email = localStorage.getItem('user_email')
    if (!email) {
      navigate('/login', { replace: true })
    }
  }, [navigate])

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white/85 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md">
      <h1 className="font-serif font-semibold text-center mb-8 text-gray-800 tracking-wide text-3xl">오늘의 기록</h1>
      {/* 기존 메인 페이지 UI를 여기에 추가 */}
    </div>
  )
} 