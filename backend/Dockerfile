# backend/Dockerfile

# 1. 베이스 이미지 선택
# Python 3.11 슬림 버전 — 불필요한 것 없이 가벼운 이미지
FROM python:3.11-slim

# 2. 작업 디렉토리 설정
# 컨테이너 안에서 코드를 놓을 폴더
WORKDIR /app

# 3. 패키지 목록 먼저 복사
# requirements.txt가 변경되지 않으면 pip install 단계를 다시 실행하지 않음
COPY requirements.txt .

# 4. 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 5. 나머지 코드 복사
# .env 파일은 .dockerignore에서 제외됨
COPY . .

# 6. 포트 선언
# 컨테이너 내부에서 8000번 포트를 사용
EXPOSE 8000

# 7. 실행 명령
# FastAPI 앱 실행
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]