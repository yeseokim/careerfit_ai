# backend/routers/jobs.py

from fastapi import APIRouter

from typing import List

router = APIRouter()



# 목업 데이터: 3일차에 실제 CSV 데이터로 교체한다

MOCK_JOBS = [
    {
        "id": 1,
        "company": "한빛에듀테크",
        "title": "AI 사내 교육 강사",
        "required_skills": ["생성형 AI 활용", "Prompt Engineering", "교육 콘텐츠 설계"],
        "preferred_skills": ["Python", "LMS 운영"],
        "description": "임직원을 대상으로 생성형 AI 활용 교육과 프롬프트 실습 과정을 운영합니다. 직무별 AI 활용 사례를 발굴하고 교육 자료를 제작합니다.",
        "deadline": "2026-08-31"
    },
    {
        "id": 2,
        "company": "미래AI솔루션",
        "title": "기업 AI 리터러시 교육 담당자",
        "required_skills": ["AI 리터러시", "ChatGPT 활용", "강의안 작성"],
        "preferred_skills": ["데이터 분석", "업무 자동화"],
        "description": "기업 고객사의 임직원을 대상으로 AI 리터러시와 업무 적용 교육을 진행합니다. 교육 만족도 데이터를 분석해 커리큘럼을 개선합니다.",
        "deadline": "2026-08-31"
    },
    {
        "id": 3,
        "company": "누리HRD",
        "title": "생성형 AI 사내 강사",
        "required_skills": ["생성형 AI", "Python 기초", "교육 프로그램 기획"],
        "preferred_skills": ["Pandas", "프로젝트 기반 학습"],
        "description": "사내 구성원을 대상으로 생성형 AI와 Python 기초 활용 교육을 설계합니다. 실습 중심의 교육 프로그램을 운영하고 학습 결과를 평가합니다.",
        "deadline": "2026-08-31"
    }
]


@router.get("/jobs", tags=["Jobs"])

def get_jobs():

    """

    취업 공고 목록을 반환하는 엔드포인트.

    현재는 목업 데이터를 반환하며, 3일차에 실제 데이터로 교체한다.

    """

    return {

        "count": len(MOCK_JOBS),

        "jobs": MOCK_JOBS

    }



@router.get("/jobs/{job_id}", tags=["Jobs"])

def get_job_by_id(job_id: int):

    """

    특정 공고의 상세 정보를 반환한다.

    """

    for job in MOCK_JOBS:

        if job["id"] == job_id:

            return job

    # 찾지 못한 경우

    from fastapi import HTTPException

    raise HTTPException(status_code=404, detail=f"공고 ID {job_id}를 찾을 수 없습니다.")