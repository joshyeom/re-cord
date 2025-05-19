export const AnalyzingPage = () => {
  return (
    <div className="max-w-xl mx-auto my-32 p-10 bg-white/90 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">오늘을 분석 중...</h2>
      <p className="text-gray-500 text-lg mb-6">AI가 당신의 하루를 분석하고 있어요.<br/>잠시만 기다려주세요.</p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400 border-solid"></div>
    </div>
  )
} 