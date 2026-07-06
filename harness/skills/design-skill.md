# harness/skills/design-skill.md — CareerFit AI UI 디자인 규칙

## 컬러 팔레트

CareerFit AI는 취업·공모전 포트폴리오 코치 서비스이므로, 신뢰감과 성장 이미지를 주는 차분한 색상을 사용한다.

- primary: `#3B82F6`  
  - Tailwind: `blue-500`
  - 의미: 신뢰, 전문성
  - 사용 위치: 주요 버튼, 포커스 링, 핵심 액션

- secondary: `#10B981`  
  - Tailwind: `emerald-500`
  - 의미: 성장, 추천, 긍정적 결과
  - 사용 위치: AI 분석 결과 강조, 추천 카드 강조

- background: `#F8FAFC`  
  - Tailwind: `slate-50`
  - 사용 위치: 전체 페이지 배경

- text-primary: `#1E293B`  
  - Tailwind: `slate-800`
  - 사용 위치: 페이지 제목, 주요 텍스트

- text-muted: `#64748B`  
  - Tailwind: `slate-500`
  - 사용 위치: 설명 문구, 보조 정보

- border: `#E2E8F0`  
  - Tailwind: `slate-200`
  - 사용 위치: 카드 테두리, 구분선

- error: `#EF4444`  
  - Tailwind: `red-500`
  - 사용 위치: 오류 메시지, 서버 연결 실패 안내

---

## 타이포그래피

CareerFit AI의 텍스트는 대학생 사용자가 쉽게 이해할 수 있도록 명확하고 친근하게 구성한다.

- 제목: `text-2xl font-bold text-slate-800`
- 소제목: `text-lg font-semibold text-slate-700`
- 본문: `text-base text-slate-600`
- 설명: `text-sm text-slate-500`

### 사용 규칙

- 페이지 제목은 굵고 명확하게 표시한다.
- 본문은 너무 작지 않게 `text-base`를 기본으로 사용한다.
- 설명 문구나 부가 정보는 `text-sm text-slate-500`을 사용한다.
- AI 분석 답변은 줄바꿈이 유지되도록 `whitespace-pre-line`을 사용한다.

---

## 컴포넌트 구조

CareerFit AI의 React UI는 다음 컴포넌트 구조를 따른다.

```text
App.jsx
├─ InputForm.jsx
├─ ResultCard.jsx
└─ SourceCard.jsx
App.jsx

역할:

최상위 컴포넌트
전체 상태 관리
FastAPI /analyze API 요청
로딩 상태 관리
오류 상태 관리
분석 결과 상태 관리
InputForm.jsx

역할:

전공 입력
보유 스킬 입력
관심 직무 입력
사용자가 입력한 데이터를 App으로 전달

입력 항목:

전공
스킬
직무
ResultCard.jsx

역할:

AI 분석 답변 출력
분석 결과를 카드 형태로 표시
초록색 왼쪽 테두리로 결과 영역 강조

기본 스타일:

border-l-4 border-emerald-500
SourceCard.jsx

역할:

RAG 검색에 사용된 출처 공고 목록 출력
회사명, 공고명, 직무 유형, 마감일, 거리값 표시
AI 답변의 근거를 사용자에게 보여줌
레이아웃 규칙

CareerFit AI는 단일 컬럼 카드형 레이아웃을 사용한다.

최대 너비: max-w-2xl mx-auto
카드 내부 여백: p-6
컴포넌트 간격: gap-4, space-y-4
카드 모서리: rounded-xl
버튼 모서리: rounded-lg
전체 배경: bg-slate-50
카드 배경: bg-white
기본 페이지 구조
<div className="min-h-screen bg-slate-50 py-10 px-4">
  <div className="max-w-2xl mx-auto space-y-4">
    ...
  </div>
</div>
기본 카드 스타일
className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
기본 버튼 스타일
className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
금지 사항

다음 사항은 금지한다.

API Key를 화면에 표시하지 않는다.
API Key를 localStorage에 저장하지 않는다.
API Key를 React 코드에 직접 작성하지 않는다.
실제 API Key를 GitHub에 업로드하지 않는다.
다크 배경에 흰 텍스트를 기본 디자인으로 사용하지 않는다.
가독성을 해치는 강한 대비나 과한 색상 사용을 피한다.
아이콘만 있는 버튼을 사용하지 않는다.
버튼에는 반드시 텍스트 레이블을 포함한다.
RAG 출처 공고를 숨기지 않는다.
서버 오류 발생 시 빈 화면만 보여주지 않는다.