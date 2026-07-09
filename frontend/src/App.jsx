import { apiUrl } from "./lib/api";
import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import SourceCard from "./components/SourceCard";

function App() {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function parseSseBlock(block) {
    const lines = block.split("\n");

    const eventLine = lines.find((line) => line.startsWith("event:"));
    const dataLine = lines.find((line) => line.startsWith("data:"));

    if (!eventLine || !dataLine) {
      return null;
    }

    const eventName = eventLine.replace("event:", "").trim();
    const dataText = dataLine.replace("data:", "").trim();

    try {
      return {
        eventName,
        data: JSON.parse(dataText),
      };
    } catch {
      return null;
    }
  }

  async function handleAnalyze(formData) {
    setIsLoading(true);
    setError(null);
    setResult({
      answer: "",
      sources: [],
    });

    let streamedAnswer = "";

    try {
      const response = await fetch(apiUrl("/analyze/stream"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          major: formData.major,
          skills: formData.skills,
          job_type: formData.jobType,
        }),
      });

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("브라우저가 스트리밍 응답을 지원하지 않습니다.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() || "";

        for (const block of blocks) {
          const parsed = parseSseBlock(block);

          if (!parsed) {
            continue;
          }

          const { eventName, data } = parsed;

          if (eventName === "sources") {
            setResult((prev) => ({
              ...prev,
              sources: data.sources || [],
            }));
          }

          if (eventName === "token") {
            streamedAnswer += data.text || "";

            setResult((prev) => ({
              ...prev,
              answer: streamedAnswer,
            }));
          }

          if (eventName === "error") {
            throw new Error(data.message || "스트리밍 중 오류가 발생했습니다.");
          }

          if (eventName === "done") {
            setIsLoading(false);
          }
        }
      }
    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("FastAPI 서버에 연결할 수 없습니다. 서버가 실행 중인지 확인하세요.");
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <p className="text-sm font-medium text-blue-500 mb-1">
            Portfolio Coach
          </p>

          <h1 className="text-2xl font-bold text-slate-800">
            CareerFit AI
          </h1>

          <p className="text-slate-500 text-sm mt-2">
            취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치
          </p>
        </header>

        <InputForm onSubmit={handleAnalyze} isLoading={isLoading} />

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="mt-6 text-center text-slate-500 text-sm">
            AI가 답변을 생성하는 중입니다...
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-4">
            <ResultCard answer={result.answer} />

            {result.sources && result.sources.length > 0 && (
              <SourceCard sources={result.sources} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;