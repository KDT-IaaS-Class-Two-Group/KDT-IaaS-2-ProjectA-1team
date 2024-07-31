from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import sqlite3
from typing import List, Optional

app = FastAPI()

# SQLite 데이터베이스 연결
def get_db_connection():
    conn = sqlite3.connect('test.db')
    conn.row_factory = sqlite3.Row
    print("Database connected")  # 데이터베이스 연결 확인 메시지 출력
    return conn

# 검색 요청을 위한 모델 정의
class QueryParams(BaseModel):
    query: str

# 검색 API 엔드포인트
@app.get("/search")
def search(query: Optional[str] = None):
    if not query:
        print("Query parameter is missing")  # 쿼리 매개변수 확인 메시지 출력
        raise HTTPException(status_code=400, detail="Query parameter is required")
    
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT name,age FROM users WHERE name LIKE ?", (f'%{query}%',))
        rows = cursor.fetchall()
        results = [row['name','age'] for row in rows]
        print(f"Search results for query '{query}': {results}")  # 검색 결과 확인 메시지 출력
    except sqlite3.Error as e:
        print(f"Database query failed: {e}")  # 데이터베이스 오류 메시지 출력
        raise HTTPException(status_code=500, detail="Database query failed")
    finally:
        conn.close()
        print("Database connection closed")  # 데이터베이스 연결 종료 확인 메시지 출력
    
    return {"results": results}

# 서버 시작
if __name__ == "__main__":
    import uvicorn
    print("Starting server on http://localhost:3001")  # 서버 시작 메시지 출력
    uvicorn.run(app, host="0.0.0.0", port=3001)






