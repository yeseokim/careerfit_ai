\# Render 프론트엔드 배포 가이드



\## 1. 로컬 실행 방법



\### 백엔드 실행



```bash

cd backend

python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000

