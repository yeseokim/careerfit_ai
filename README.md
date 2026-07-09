# CareerFit AI

> 취업·공모전 데이터 기반 맞춤형 AI 포트폴리오 코치

## 📌 프로젝트 개요

CareerFit AI는 취업과 공모전을 준비하는 대학생이 자신의 전공, 보유 스킬, 관심 직무를 입력하면 맞춤형 커리어 조언을 제공하는 AI 기반 포트폴리오 코치 서비스입니다.

많은 학생들이 어떤 직무를 목표로 해야 하는지, 어떤 역량을 추가로 준비해야 하는지, 어떤 프로젝트를 포트폴리오에 넣어야 하는지 판단하기 어려워합니다.

이 프로젝트는 채용 공고 데이터를 전처리한 뒤 SQLite와 ChromaDB에 저장하고, RAG 구조를 통해 사용자 입력과 관련 있는 공고를 검색합니다. 이후 Gemini API를 활용해 근거 기반의 개인화된 역량 분석과 포트폴리오 준비 방향을 제안합니다.

---

## 🛠 기술 스택

| 영역 | 기술 |
|---|---|
| 백엔드 | Python 3.11, FastAPI |
| AI API | Gemini 2.5 Flash-Lite |
| 데이터 | Pandas, SQLite, ChromaDB |
| 프론트엔드 | React, Vite, Tailwind CSS |
| 실행 환경 | Docker |
| 배포 | Render |

---

## 🏗 아키텍처

```text
사용자
  ↓
React/Vite Frontend
  ↓ fetch
FastAPI Backend
  ↓
RAG Service
  ↓
ChromaDB 벡터 검색
  ↓
Gemini API
  ↓
AI 분석 결과 + 참고 공고 sources 반환
```

데이터 저장 구조:

```text
jobs.csv
  ↓
Pandas 전처리
  ↓
SQLite 저장
  ↓
RAG 문서 변환
  ↓
ChromaDB 벡터 저장
```

---

## 🚀 실행 방법

### Docker로 백엔드 실행

```bash
# 1. 이미지 빌드
docker build -t careerfit-ai ./backend

# 2. 컨테이너 실행
docker run -p 8000:8000 --env-file backend/.env careerfit-ai
```

API 문서:

```text
http://localhost:8000/docs
```

---

### 로컬 백엔드 실행

```bash
cd backend

# Windows PowerShell
.\venv\Scripts\activate

# 패키지 설치
pip install -r requirements.txt

# FastAPI 실행
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

백엔드 API 문서:

```text
http://localhost:8000/docs
```

---

### 로컬 프론트엔드 실행

```bash
cd frontend
npm install
npm run dev
```

프론트엔드 주소:

```text
http://localhost:5173
```

---

## ⚙️ 환경변수

### backend/.env 예시

실제 `.env` 파일은 GitHub에 업로드하지 않습니다.

```env
GEMINI_API_KEY=your_gemini_api_key_here
MOCK_MODE=false
LLM_MODEL=gemini-2.5-flash-lite
FRONTEND_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### frontend/.env 예시

```env
VITE_API_BASE_URL=http://localhost:8000
```

Render 배포 시에는 `VITE_API_BASE_URL` 값을 Render 백엔드 주소로 설정합니다.

```env
VITE_API_BASE_URL=https://your-backend-service.onrender.com
```

---

## 📊 데이터 파이프라인

`backend/data/preprocess.py`에서 채용 공고 데이터를 전처리합니다.

### 처리 과정

1. `jobs.csv` 파일 읽기
2. 결측치 확인
3. 필수 컬럼 결측치 제거
4. 중복 공고 제거
5. 스킬 키워드 표준화
6. SQLite 데이터베이스 저장
7. RAG 검색용 JSON 문서 생성
8. ChromaDB 벡터 저장

### 생성 파일

| 파일 | 설명 |
|---|---|
| `careerfit.db` | 전처리된 채용 공고가 저장된 SQLite 데이터베이스 |
| `rag_documents.json` | RAG 검색에 사용할 자연어 문서 데이터 |
| `chroma_db/` | ChromaDB 벡터 데이터 저장 폴더 |

전처리 실행:

```bash
cd backend
python data/preprocess.py
```

---

## ✨ 주요 기능

- 사용자 전공, 보유 스킬, 관심 직무 입력
- 채용 공고 데이터 전처리
- 결측치 확인 및 처리
- 중복 공고 제거
- 스킬 키워드 표준화
- SQLite 기반 구조화 데이터 저장
- ChromaDB 기반 벡터 검색
- RAG 기반 역량 분석
- Gemini API 기반 커리어 조언 생성
- AI 분석 결과 카드 출력
- 참고한 공고 sources 표시
- Mock Mode 지원
- Docker 기반 백엔드 실행

---

## 🔌 API

### GET `/health`

백엔드 서버 상태를 확인합니다.

응답 예시:

```json
{
  "status": "ok"
}
```

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

## 📁 프로젝트 구조

```text
careerfit_ai/
├── backend/
│   ├── main.py
│   ├── routers/
│   ├── services/
│   ├── data/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── InputForm.jsx
│   │       ├── ResultCard.jsx
│   │       └── SourceCard.jsx
│   ├── Dockerfile
│   └── package.json
├── docs/
│   ├── EVAL_QUESTIONS.md
│   ├── CHECKLIST.md
│   └── render-frontend-deploy.md
├── harness/
├── README.md
└── .gitignore
```

---

## 🔮 향후 개선

- [ ] 이력서 PDF 업로드 후 자동 역량 추출
- [ ] 사용자의 프로젝트 경험 기반 포트폴리오 개선 제안
- [ ] 공모전 마감일 알림 기능
- [ ] RAG 검색 품질 평가 지표 추가
- [ ] 실제 채용 공고 데이터 자동 수집
- [ ] SSE 기반 실시간 타이핑 응답 안정화
- [ ] 프론트엔드 배포 자동화

---

## 📝 개발 과정

이번 프로젝트에서 가장 어려웠던 부분은 백엔드, ChromaDB, Gemini API, React 프론트엔드를 하나의 흐름으로 연결하는 과정이었습니다.

특히 FastAPI 서버와 React 개발 서버가 서로 다른 포트에서 실행되기 때문에 API 주소와 CORS 설정을 맞추는 부분에서 시행착오가 있었습니다. 이를 해결하기 위해 프론트엔드는 `VITE_API_BASE_URL`, 백엔드는 `FRONTEND_ORIGINS` 환경변수를 사용하도록 정리했습니다.

또한 Docker를 사용해 백엔드 실행 환경을 컨테이너화하면서, 로컬 환경에 의존하지 않고 동일한 방식으로 서비스를 실행할 수 있도록 구성했습니다.

---

## Demo

- Backend API Docs: http://localhost:8000/docs
- Frontend Local Demo: http://localhost:5173
- Live Demo: Render 배포 URL 추가 예정

---

## Developer

- Name: 김예서
- Role: Backend / AI Service / Frontend Integration
- GitHub: yeseokim
- Email: yeseo7170@gmail.com