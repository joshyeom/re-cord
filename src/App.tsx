import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { supabase } from './supabase'

// Memo 타입 정의
// Supabase 테이블 구조: id, title, content, created_at
// id는 string 또는 number일 수 있으나 string으로 통일
// created_at은 string

type Memo = {
  id: string
  title: string
  content: string
  created_at: string
}

function App() {
  const [activeTab, setActiveTab] = useState<'ideas' | 'emotion'>('ideas')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [ideasMemos, setIdeasMemos] = useState<Memo[]>([])
  const [emotionMemos, setEmotionMemos] = useState<Memo[]>([])
  const [loading, setLoading] = useState(true)
  const [saveLoading, setSaveLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 페이지 로드 시 각 테이블의 메모 목록 불러오기
  useEffect(() => {
    fetchIdeas()
    fetchEmotions()
  }, [])

  // ideas 테이블에서 메모 목록 불러오기
  const fetchIdeas = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('ideas').select('*').order('created_at', { ascending: false })
      if (error) throw error
      if (data) setIdeasMemos(data as Memo[])
    } catch {
      setError('아이디어를 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // emotion 테이블에서 메모 목록 불러오기
  const fetchEmotions = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from('emotion').select('*').order('created_at', { ascending: false })
      if (error) throw error
      if (data) setEmotionMemos(data as Memo[])
    } catch {
      setError('감정을 불러오는 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  // ideas 저장 함수
  const handleSaveIdeas = async () => {
    if (!content) return
    try {
      setSaveLoading(true)
      const { data, error } = await supabase
        .from('ideas')
        .insert([{ title, content }])
        .select()
      if (error) throw error
      if (data) {
        setIdeasMemos([...(data as Memo[]), ...ideasMemos])
        setTitle('')
        setContent('')
      }
    } catch {
      setError('아이디어 저장 중 오류가 발생했습니다.')
    } finally {
      setSaveLoading(false)
    }
  }

  // emotion 저장 함수
  const handleSaveEmotion = async () => {
    if (!content) return
    try {
      setSaveLoading(true)
      const { data, error } = await supabase
        .from('emotion')
        .insert([{ title, content }])
        .select()
      if (error) throw error
      if (data) {
        setEmotionMemos([...(data as Memo[]), ...emotionMemos])
        setTitle('')
        setContent('')
      }
    } catch{
      setError('감정 저장 중 오류가 발생했습니다.')
    } finally {
      setSaveLoading(false)
    }
  }

  // 탭별 저장 함수 분기
  const handleSave = activeTab === 'ideas' ? handleSaveIdeas : handleSaveEmotion

  // 탭별 메모 리스트 분기
  const memos: Memo[] = activeTab === 'ideas' ? ideasMemos : emotionMemos

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-white/85 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md">
      <h1 className="font-serif font-semibold text-center mb-8 text-gray-800 tracking-wide text-3xl">순간의 기록</h1>
      {error && <div className="text-red-500 mb-4 text-sm font-medium">{error}</div>}

      {/* 탭 UI */}
      <div className="flex gap-2 mb-4">
        <button
          className={twMerge(
            clsx(
              'flex-1 py-2 rounded-lg font-semibold transition-colors',
              activeTab === 'ideas'
                ? 'bg-purple-200 text-purple-900 shadow'
                : 'bg-gray-100 text-gray-500 hover:bg-purple-50',
              saveLoading && 'opacity-60 cursor-not-allowed'
            )
          )}
          onClick={() => setActiveTab('ideas')}
          disabled={saveLoading}
        >
          아이디어
        </button>
        <button
          className={twMerge(
            clsx(
              'flex-1 py-2 rounded-lg font-semibold transition-colors',
              activeTab === 'emotion'
                ? 'bg-pink-200 text-pink-900 shadow'
                : 'bg-gray-100 text-gray-500 hover:bg-pink-50',
              saveLoading && 'opacity-60 cursor-not-allowed'
            )
          )}
          onClick={() => setActiveTab('emotion')}
          disabled={saveLoading}
        >
          감정
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-10">
        <input
          type="text"
          placeholder={activeTab === 'ideas' ? '아이디어 제목을 남겨보세요...' : '감정의 제목을 남겨보세요...'}
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={saveLoading}
          className="px-4 py-3 border border-gray-200 rounded-xl text-base font-serif bg-white/90 shadow-inner focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all"
        />
        <textarea
          placeholder={activeTab === 'ideas'
            ? '떠오르는 아이디어, 영감, 혹은 창의적인 생각을 적어보세요...'
            : '순간의 감정, 마음속 작은 울림, 혹은 느낌을 적어보세요...'}
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={4}
          disabled={saveLoading}
          className="px-4 py-3 min-h-[120px] border border-gray-200 rounded-xl text-base font-serif bg-white/90 shadow-inner focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all resize-y"
        />
        <button
          onClick={handleSave}
          disabled={saveLoading || !content}
          className={twMerge(
            clsx(
              'py-3 px-4 bg-purple-400 text-white rounded-xl font-serif font-medium text-base shadow-md transition-all',
              'hover:bg-purple-500 hover:-translate-y-0.5 hover:shadow-lg',
              saveLoading || !content ? 'opacity-60 cursor-not-allowed' : ''
            )
          )}
        >
          {saveLoading ? '저장 중...' : '기억하기'}
        </button>
      </div>

      <div className="flex flex-col gap-5">
        {loading ? (
          <p className="italic text-gray-400 text-center py-8 font-light">메모를 불러오는 중입니다...</p>
        ) : memos.length === 0 ? (
          <p className="italic text-gray-400 text-center py-8 font-light">아직 기록된 순간이 없습니다. 첫 번째 기록을 남겨보세요.</p>
        ) : (
          memos.map((memo: Memo) => (
            <div key={memo.id} className="bg-white/70 rounded-xl p-6 shadow transition-all border border-white/60 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex justify-between items-center mb-3 border-b border-purple-100 pb-2">
                <strong className="text-purple-900 text-lg font-semibold font-serif">{memo.title || '무제'}</strong>
                <span className="text-gray-400 text-sm italic">{new Date(memo.created_at).toLocaleString()}</span>
              </div>
              <div className="text-gray-700 text-base font-light whitespace-pre-wrap font-serif">{memo.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App