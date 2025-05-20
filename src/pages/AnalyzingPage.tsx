import { useEffect } from 'react'
import { supabase } from '../shared/supabase'
import { analyzeEntries } from '../features/analyze/api'

export const AnalyzingPage = () => {
  useEffect(() => {
    const fetchAndAnalyze = async () => {
      // 1. 오늘 날짜 범위 계산
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)

      // 3. 오늘의 entries 조회
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .gte('created_at', today.toISOString())
        .lt('created_at', tomorrow.toISOString())

      const contents = data?.map(item => item.content);
      console.log(contents);

      if (error) {
        // 에러 처리
        console.error('entries 불러오기 실패:', error)
        return
      }

      // ChatGPT 분석 요청
      try {
        if(!contents){
          return;
        }
        const result = await analyzeEntries(contents)
        // 결과 처리 (예: analyses 테이블 저장, 결과 페이지 이동 등)
        console.log(result)
      } catch (e) {
        console.error(e)
      }
    }

    fetchAndAnalyze()
  }, [])

  return (
    <div className="max-w-xl mx-auto my-32 p-10 bg-white/90 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">오늘을 분석 중...</h2>
      <p className="text-gray-500 text-lg mb-6">AI가 당신의 하루를 분석하고 있어요.<br/>잠시만 기다려주세요.</p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400 border-solid"></div>
    </div>
  )
} 