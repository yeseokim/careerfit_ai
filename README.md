# CareerFit AI

> 취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치

## 프로젝트 개요

CareerFit AI는 취업과 공모전을 준비하는 사용자가 자신의 전공, 보유 스킬, 관심 직무를 입력하면 맞춤형 커리어 조언을 제공하는 AI 기반 포트폴리오 코치 서비스입니다.

많은 학생들이 어떤 직무를 목표로 해야 하는지, 어떤 역량을 추가로 준비해야 하는지, 어떤 프로젝트를 포트폴리오에 넣어야 하는지 판단하기 어려워합니다.

이 프로젝트는 채용 공고와 공모전 데이터를 기반으로 사용자에게 필요한 역량을 분석하고, Gemini API와 RAG 구조를 활용하여 개인화된 준비 방향과 추천 프로젝트를 제안하는 것을 목표로 합니다.

---

## 기술 스택

| 영역 | 기술 |
|---|---|
| 백엔드 | Python, FastAPI |
| AI API | Gemini 2.5 Flash-Lite |
| 데이터 | Pandas, SQLite, ChromaDB |
| 프론트엔드 | React, Vite, Tailwind CSS |
| 실행 환경 | Docker |

---

## 주요 기능

- [x] 사용자 전공, 보유 스킬, 관심 직무 입력
- [x] 채용 공고 데이터 전처리
- [x] 결측치 확인 및 처리
- [x] 중복 공고 제거
- [x] 스킬 키워드 표준화
- [x] SQLite 데이터베이스 저장
- [x] RAG 검색용 JSON 문서 생성
- [x] ChromaDB 기반 문서 검색
- [x] Gemini API 기반 커리어 조언 생성
- [x] RAG 기반 AI 분석 결과 카드
- [x] 출처 공고 카드 표시

---

## 데이터 파이프라인

`backend/data/preprocess.py`에서 채용 공고 데이터를 전처리합니다.

### 처리 과정

1. `jobs.csv` 파일 읽기
2. 결측치 확인
3. 필수 컬럼 결측치 제거
4. 중복 공고 제거
5. 스킬 키워드 표준화
6. SQLite 데이터베이스 저장
7. RAG 검색용 JSON 문서 생성

### 생성 파일

| 파일 | 설명 |
|---|---|
| `careerfit.db` | 전처리된 채용 공고가 저장된 SQLite 데이터베이스 |
| `rag_documents.json` | RAG 검색에 사용할 자연어 문서 데이터 |

---

## 백엔드 실행 방법

### 1. 백엔드 폴더로 이동

```bash
cd backend
```

### 2. 가상환경 활성화

Windows PowerShell 기준:

```bash
.\venv\Scripts\activate
```

### 3. 패키지 설치

```bash
pip install -r requirements.txt
```

### 4. FastAPI 서버 실행

```bash
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

백엔드 API 문서: http://localhost:8000/docs

---

## 프론트엔드 실행 방법

### 1. 프론트엔드 폴더로 이동

```bash
cd frontend
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

프론트엔드: http://localhost:5173

---

## 프론트엔드 구성

```text
frontend/src/
├─ App.jsx
├─ index.css
└─ components/
   ├─ InputForm.jsx
   ├─ ResultCard.jsx
   └─ SourceCard.jsx
```

### 컴포넌트 역할

- `App.jsx`: 최상위 컴포넌트, 상태 관리, API 요청
- `InputForm.jsx`: 전공·스킬·관심 직무 입력 폼
- `ResultCard.jsx`: AI 분석 답변 출력
- `SourceCard.jsx`: 출처 공고 목록 출력

---

## API

### POST `/analyze`

사용자의 전공, 보유 스킬, 관심 직무를 입력받아 RAG 기반 커리어 분석 결과를 반환합니다.

요청 예시:

```json
{
  "major": "통계학과",
  "skills": ["Python", "SQL", "R"],
  "job_type": "데이터 분석"
}
```

응답 예시:

```json
{
  "answer": "AI 분석 결과입니다.",
  "sources": [
    {
      "company": "예시 기업",
      "title": "데이터 분석 인턴",
      "job_type": "데이터 분석",
      "deadline": "2026-09-30",
      "distance": 0.1234
    }
  ]
}
```

---

## 진행 현황

- [x] 1일차: 기획 및 개발 환경 세팅
- [x] 2일차: FastAPI + Gemini API 연결
- [x] 3일차: 데이터 파이프라인 구축
- [x] 4일차: RAG 기반 서비스 + React UI 구현
- [ ] 5일차: Docker + 포트폴리오 완성

---

## 주의 사항

- 실제 API Key는 `.env`에만 저장합니다.
- `.env` 파일은 GitHub에 업로드하지 않습니다.
- 프론트엔드에서는 Gemini API를 직접 호출하지 않습니다.
- 모든 AI 요청은 FastAPI 백엔드를 통해 처리합니다.