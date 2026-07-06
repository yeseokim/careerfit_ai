function ResultCard({
  answer,
  matchedSkills = [],
  missingSkills = [],
  recommendedProjects = [],
  confidence,
}) {
  const hasExtraData =
    matchedSkills.length > 0 ||
    missingSkills.length > 0 ||
    recommendedProjects.length > 0 ||
    confidence !== undefined;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="border-l-4 border-emerald-500 p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-emerald-600 mb-1">
              AI 분석 결과
            </p>

            <h2 className="text-lg font-semibold text-slate-700">
              맞춤형 커리어 분석
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              입력한 전공, 스킬, 관심 직무와 채용 데이터를 바탕으로 분석한 결과입니다.
            </p>
          </div>

          {confidence !== undefined && (
            <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 border border-emerald-100">
              신뢰도 {confidence}%
            </span>
          )}
        </div>

        {hasExtraData && (
          <div className="grid gap-3 mb-5">
            {matchedSkills.length > 0 && (
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">
                  잘 맞는 역량
                </h3>

                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 border border-emerald-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {missingSkills.length > 0 && (
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">
                  보완하면 좋은 역량
                </h3>

                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 border border-blue-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {recommendedProjects.length > 0 && (
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
                <h3 className="text-sm font-semibold text-slate-700 mb-2">
                  추천 프로젝트
                </h3>

                <ul className="space-y-2">
                  {recommendedProjects.map((project, index) => (
                    <li
                      key={`${project}-${index}`}
                      className="text-sm text-slate-600 leading-relaxed"
                    >
                      • {project}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="rounded-lg bg-slate-50 border border-slate-200 p-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">
            상세 분석
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
            {answer || "아직 분석 결과가 없습니다."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;