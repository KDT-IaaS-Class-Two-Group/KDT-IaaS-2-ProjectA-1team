from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from typing import List, Optional

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용, 보안을 위해 필요한 도메인만 추가
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite 데이터베이스 연결
def get_db_connection():
    conn = sqlite3.connect('test.db')
    conn.row_factory = sqlite3.Row
    print("Database 연결 확인")  # 데이터베이스 연결 확인 메시지 출력
    return conn

# 검색 API 엔드포인트
@app.get("/search")
def search(query:str):
    if not query:
        print("Query parameter is missing")  # 쿼리 매개변수 확인 메시지 출력
        raise HTTPException(status_code=400, detail="Query parameter is required")
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        query = query.lower()  # 검색어를 소문자로 변환
        cursor.execute("SELECT name, age FROM users WHERE LOWER(name) OR age LIKE ?", (f'%{query}%',))
        rows = cursor.fetchall()
        results = [{"name": row["name"], "age": row["age"]} for row in rows]
        print(f"Search results for query '{query}': {results}")  # 검색 결과 확인 메시지 출력
    except sqlite3.Error as e:
        print(f"Database query failed: {e}")  # 데이터베이스 오류 메시지 출력
        raise HTTPException(status_code=500, detail="Database query failed")
    finally:
        cursor.close()
        conn.close()
        print("Database 연결 종료")  # 데이터베이스 연결 종료 확인 메시지 출력
    
    return {"results": results}

# 서버 시작
if __name__ == "__main__":
    import uvicorn
    print("Starting server on http://localhost:3001")  # 서버 시작 메시지 출력
    uvicorn.run(app, host="0.0.0.0", port=3001)










