from typing import List

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from services.rag_service import search_documents
from services.llm_stream_service import stream_llm_response

router = APIRouter()


class AnalyzeStreamRequest(BaseModel):
    major: str
    skills: List[str]
    job_type: str


@router.post("/analyze/stream", tags=["Analyze"])
def analyze_career_stream(request: AnalyzeStreamRequest):
    query = (
        f"전공: {request.major}, "
        f"보유 스킬: {', '.join(request.skills)}, "
        f"관심 직무: {request.job_type}"
    )

    context_docs = search_documents(query, n_results=3)

    return StreamingResponse(
        stream_llm_response(query=query, context_docs=context_docs),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )