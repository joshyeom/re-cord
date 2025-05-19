import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () =>{
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    if (!email) {
      setError('이메일을 입력하세요.')
      setLoading(false)
      return
    }
    // 실제로는 supabase 인증을 사용해야 하지만, 일단 localStorage에 저장
    localStorage.setItem('user_email', email)
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="max-w-sm mx-auto my-32 p-8 bg-white/90 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">로그인</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl text-base font-serif bg-white/90 shadow-inner focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="py-3 px-4 bg-purple-400 text-white rounded-xl font-serif font-medium text-base shadow-md transition-all hover:bg-purple-500 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? '로그인 중...' : '로그인'}
        </button>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      </form>
    </div>
  )
} 