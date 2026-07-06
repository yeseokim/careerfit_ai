import json
import os
import time
from typing import Generator, List, Dict, Any

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
LLM_MODEL = os.getenv("LLM_MODEL", "gemini-2.5-flash-lite")
MOCK_MODE = os.getenv("MOCK_MODE", "false").lower() == "true"


def make_sse_event(event: str, data: Dict[str, Any]) -> str:
    """
    SSE 형식으로 데이터를 감싸서 반환한다.

    형식:
    event: token
    data: {"text": "안녕"}

    """
    json_data = json.dumps(data, ensure_ascii=False)
    return f"event: {event}\ndata: {json_data}\n\n"


def build_sources(context_docs: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    RAG 검색 결과에서 프론트엔드에 보여줄 sources를 만든다.
    """
    sources = []

    for doc in context_docs:
        metadata = doc.get("metadata", {})

        sources.append(
            {
                "company": metadata.get("company", ""),
                "title": metadata.get("title", ""),
                "job_type": metadata.get("job_type", ""),
                "deadline": metadata.get("deadline", ""),
                "required_skills": metadata.get("required_skills", ""),
                "distance": doc.get("distance", ""),
            }
        )

    return sources


def build_rag_prompt(query: str, context_docs: List[Dict[str, Any]]) -> str:
    """
    사용자 입력과 RAG 검색 결과를 바탕으로 Gemini에 보낼 프롬프트를 만든다.
    """
    context_text = "\n\n".join(
        [
            f"[문서 {index + 1}]\n{doc.get('text', '')}"
            for index, doc in enumerate(context_docs)
        ]
    )

    prompt = f"""
너는 대학생을 위한 취업·공모전 포트폴리오 코치야.

아래 사용자 정보와 참고 공고 데이터를 바탕으로 맞춤형 커리어 조언을 작성해줘.

[사용자 정보]
{query}

[참고 공고 데이터]
{context_text}

[답변 규칙]
- 한국어로 답변해.
- 너무 딱딱하지 않게, 대학생이 이해하기 쉽게 말해.
- 사용자의 현재 강점을 먼저 말해.
- 부족한 역량을 구체적으로 제안해.
- 포트폴리오에 넣으면 좋은 프로젝트 아이디어를 추천해.
- 참고 공고에 없는 회사나 정보를 지어내지 마.
"""
    return prompt.strip()


def stream_llm_response(
    query: str,
    context_docs: List[Dict[str, Any]],
) -> Generator[str, None, None]:
    """
    Gemini 응답을 SSE 형태로 스트리밍한다.
    """
    sources = build_sources(context_docs)

    yield make_sse_event("sources", {"sources": sources})

    if MOCK_MODE:
        mock_answer = (
            "입력한 전공과 보유 스킬을 보면 데이터 분석 직무와 잘 맞습니다.\n\n"
            "현재 Python, SQL 같은 기본 분석 역량이 있다면 채용 공고에서 요구하는 데이터 처리 업무에 지원하기 좋습니다.\n\n"
            "다만 실제 포트폴리오에서는 단순 분석보다 문제 정의, 데이터 전처리, 시각화, 인사이트 도출 과정이 잘 드러나는 프로젝트가 필요합니다.\n\n"
            "추천 프로젝트로는 채용 공고 데이터를 활용한 직무별 요구 역량 분석, 공모전 데이터를 활용한 추천 시스템, 또는 대학생 취업 준비 현황 분석 대시보드를 제안합니다."
        )

        for char in mock_answer:
            yield make_sse_event("token", {"text": char})
            time.sleep(0.02)

        yield make_sse_event("done", {"message": "stream complete"})
        return

    if not GEMINI_API_KEY:
        yield make_sse_event(
            "error",
            {"message": "GEMINI_API_KEY가 설정되지 않았습니다."},
        )
        return

    try:
        model_name = LLM_MODEL

        if not model_name.startswith("gemini"):
            model_name = "gemini-2.5-flash-lite"

        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel(model_name)

        prompt = build_rag_prompt(query, context_docs)

        response = model.generate_content(prompt, stream=True)

        for chunk in response:
            try:
                text = chunk.text
            except Exception:
                text = ""

            if text:
                yield make_sse_event("token", {"text": text})

        yield make_sse_event("done", {"message": "stream complete"})

    except Exception as e:
        yield make_sse_event(
            "error",
            {"message": f"스트리밍 중 오류가 발생했습니다: {str(e)}"},
        )