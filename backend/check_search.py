# backend/data/check_search.py

from services.rag_service import search_documents

tests = [
    "Python과 SQL이 필요한 데이터 분석 공고",
    "경영학과 학생이 지원할 수 있는 직무",
    "오늘 점심 뭐 먹을까"
]

for query in tests:
    print(f"\n질문: {query}")

    results = search_documents(query, n_results=2)

    for r in results:
        company = r["metadata"].get("company")
        title = r["metadata"].get("title")
        distance = r["distance"]

        print(f"  → {company} | {title} | 거리: {distance}")