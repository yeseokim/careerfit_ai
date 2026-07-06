function SourceCard({ sources = [] }) {
  if (!sources || sources.length === 0) {
    return null;
  }

  function getSourceValue(source, key, fallback = "") {
    return source?.[key] ?? source?.metadata?.[key] ?? fallback;
  }

  function formatDistance(distance) {
    if (distance === undefined || distance === null || distance === "") {
      return "정보 없음";
    }

    const numberDistance = Number(distance);

    if (Number.isNaN(numberDistance)) {
      return distance;
    }

    return numberDistance.toFixed(4);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="mb-4">
        <p className="text-sm font-medium text-blue-500 mb-1">
          RAG Sources
        </p>

        <h2 className="text-lg font-semibold text-slate-700">
          참고한 공고
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          AI가 답변을 생성할 때 참고한 채용·공모전 데이터입니다.
        </p>
      </div>

      <div className="space-y-3">
        {sources.map((source, index) => {
          const company = getSourceValue(source, "company", "회사명 없음");
          const title = getSourceValue(source, "title", "공고명 없음");
          const jobType = getSourceValue(source, "job_type", "직무 유형 없음");
          const deadline = getSourceValue(source, "deadline", "마감일 정보 없음");
          const requiredSkills = getSourceValue(source, "required_skills", "");
          const distance = getSourceValue(source, "distance", "");

          return (
            <div
              key={`${company}-${title}-${index}`}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">
                    {company}
                  </p>

                  <h3 className="text-sm font-semibold text-slate-800">
                    {title}
                  </h3>
                </div>

                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 border border-slate-200">
                  #{index + 1}
                </span>
              </div>

              <div className="grid gap-2 text-xs text-slate-600">
                <div className="flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
                  <span className="text-slate-500">직무 유형</span>
                  <span className="font-medium text-slate-700 text-right">
                    {jobType}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">마감일</span>
                  <span className="font-medium text-slate-700 text-right">
                    {deadline || "마감일 정보 없음"}
                  </span>
                </div>

                {requiredSkills && (
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-slate-500 shrink-0">필요 역량</span>
                    <span className="font-medium text-slate-700 text-right">
                      {requiredSkills}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3">
                  <span className="text-slate-500">검색 거리</span>
                  <span className="font-medium text-slate-700 text-right">
                    {formatDistance(distance)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-slate-500 mt-4">
        검색 거리는 ChromaDB 유사도 검색 결과값이며, 값이 낮을수록 입력 내용과 더 가깝게 검색된 공고입니다.
      </p>
    </div>
  );
}

export default SourceCard;