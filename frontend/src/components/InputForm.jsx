import { useState } from "react";

function InputForm({ onSubmit, isLoading }) {
  const [major, setMajor] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [jobType, setJobType] = useState("");

  const skills = skillsInput
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const isFormValid = major.trim() && skills.length > 0 && jobType.trim();

  function handleSubmit(e) {
    e.preventDefault();

    if (!isFormValid || isLoading) return;

    onSubmit({
      major: major.trim(),
      skills,
      jobType: jobType.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
    >
      <div className="mb-6">
        <p className="text-sm font-medium text-blue-500 mb-1">
          CareerFit AI
        </p>

        <h2 className="text-lg font-semibold text-slate-700">
          내 정보 입력
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          전공, 보유 스킬, 관심 직무를 입력하면 AI가 맞춤형 커리어 방향을 분석합니다.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="major"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            전공
          </label>

          <input
            id="major"
            type="text"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            placeholder="예: 통계학과"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            보유 스킬
          </label>

          <input
            id="skills"
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="예: Python, SQL, R"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <p className="text-xs text-slate-500 mt-1">
            여러 개의 스킬은 쉼표(,)로 구분해서 입력하세요.
          </p>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 border border-blue-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="jobType"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            관심 직무
          </label>

          <input
            id="jobType"
            type="text"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            placeholder="예: 데이터 분석"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
        >
          {isLoading ? "분석 중..." : "역량 분석 요청"}
        </button>
      </div>
    </form>
  );
}

export default InputForm;