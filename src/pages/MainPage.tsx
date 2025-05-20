import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../shared/supabase'

export const MainPage = () => {
  const [content, setContent] = useState('')
  const [saveLoading, setSaveLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [canAnalyze, setCanAnalyze] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkTime = () => {
      const now = new Date()
      setCanAnalyze(now.getHours() >= 22)
    }
    checkTime()
    const timer = setInterval(checkTime, 60 * 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSaveEntry = async () => {
    if (!content) return
    try {
      setSaveLoading(true)
      setError(null)
      const { error } = await supabase
        .from('entries')
        .insert([{ content }])
      if (error) throw error
      setContent('')
      console.log('성공적으로 저장되었습니다!')
    } catch {
      setError('저장 중 오류가 발생했습니다.')
    } finally {
      setSaveLoading(false)
    }
  }

  const handleAnalyze = () => {
    // if (!canAnalyze) return
    navigate('/analyzing')
  }

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white/85 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md">
      <h1 className="font-serif font-semibold text-center mb-8 text-gray-800 tracking-wide text-3xl">오늘의 기록</h1>
      {error && <div className="text-red-500 mb-4 text-sm font-medium">{error}</div>}
        <div className="flex flex-col gap-6">
          <textarea
            placeholder="오늘 하루를 자유롭게 기록해보세요..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={6}
            disabled={saveLoading}
            className="px-4 py-3 min-h-[120px] border border-gray-200 rounded-xl text-base font-serif bg-white/90 shadow-inner focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all resize-y"
          />
          <div className="flex gap-3">
            <button
              onClick={handleSaveEntry}
              disabled={saveLoading || !content}
              className="flex-1 py-3 px-4 bg-purple-400 text-white rounded-xl font-serif font-medium text-base shadow-md transition-all hover:bg-purple-500 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saveLoading ? '저장 중...' : '저장하기'}
            </button>
            <button
              onClick={handleAnalyze}
              // disabled={!canAnalyze}
              className={`flex-1 py-3 px-4 rounded-xl font-serif font-medium text-base shadow-md transition-all ${canAnalyze ? 'bg-pink-400 text-white hover:bg-pink-500 hover:-translate-y-0.5 hover:shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              오늘을 분석
            </button>
          </div>
        </div>
    </div>
  )
}