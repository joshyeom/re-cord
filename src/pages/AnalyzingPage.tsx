import { useEffect } from "react";
import { supabase } from "../shared/supabase";
import { analyzeEntries } from "../features/analyze/api";

export const AnalyzingPage = () => {
  useEffect(() => {
    const fetchAndAnalyze = async () => {
      const kstNow = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
      );
      kstNow.setHours(0, 0, 0, 0);
      const kstTomorrow = new Date(kstNow);
      kstTomorrow.setDate(kstNow.getDate() + 1);
      // 각각을 UTC로 변환
      const startUTC = new Date(kstNow.getTime() - 9 * 60 * 60 * 1000);
      const endUTC = new Date(kstTomorrow.getTime() - 9 * 60 * 60 * 1000);
      // ISO 문자열로 변환
      const startISOString = startUTC.toISOString();
      const endISOString = endUTC.toISOString();

      // 3. 오늘의 entries 조회 (UTC 기준 범위)
      const { data, error } = await supabase
        .from("entries")
        .select("*")
        .gte("created_at", startISOString)
        .lt("created_at", endISOString);

      const contents = data?.map((item) => item.content);

      if (error) {
        // 에러 처리
        console.error("entries 불러오기 실패:", error);
        return;
      }

      // ChatGPT 분석 요청
      try {
        if (!contents) {
          return;
        }
        const result = await analyzeEntries(contents);
        // 결과 처리 (예: analyses 테이블 저장, 결과 페이지 이동 등)
        console.log(result);
      } catch (e) {
        console.error(e);
      }
    };

    fetchAndAnalyze();
  }, []);

  return (
    <div className="max-w-xl mx-auto my-32 p-10 bg-white/90 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-purple-700">
        오늘을 분석 중...
      </h2>
      <p className="text-gray-500 text-lg mb-6">
        AI가 당신의 하루를 분석하고 있어요.
        <br />
        잠시만 기다려주세요.
      </p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-400 border-solid"></div>
    </div>
  );
};
