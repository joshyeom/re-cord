import { useLocation, useNavigate } from "react-router-dom";

export const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="max-w-xl mx-auto my-32 p-10 bg-white/90 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-red-700">
          분석 결과가 없습니다
        </h2>
        <button
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
          onClick={() => navigate(-1)}
        >
          돌아가기
        </button>
      </div>
    );
  }

  let parsedResult = result;
  if (typeof result === "string") {
    try {
      parsedResult = JSON.parse(result);
    } catch {
      parsedResult = [];
    }
  }

  return (
    <div className="max-w-xl mx-auto my-32 p-10 bg-white/90 rounded-2xl shadow-xl border border-white/30 backdrop-blur-md">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">
        오늘의 AI 분석 결과
      </h2>
      <div className="space-y-6">
        {Array.isArray(parsedResult) && parsedResult.length > 0 ? (
          parsedResult.map((item, idx) => (
            <div key={idx} className="p-6 bg-purple-50 rounded-xl shadow">
              <div className="font-semibold text-lg mb-2">
                {item["표면감정"]}
              </div>
              <div className="text-gray-700 mb-1">
                <b>근거:</b> {item["근거"]}
              </div>
              <div className="text-gray-700 mb-1">
                <b>근원원인:</b> {item["근원원인"]}
              </div>
              <div className="text-gray-700 mb-1">
                <b>자아연결:</b> {item["자아연결"]}
              </div>
              <div className="text-gray-700">
                <b>조언:</b> {item["조언"]}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">분석 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};
