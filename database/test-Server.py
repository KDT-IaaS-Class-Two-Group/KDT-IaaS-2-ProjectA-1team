from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000",  # Next.js 클라이언트가 이 주소에서 실행됩니다.
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터베이스 연결 함수
def get_db_connection():
    conn = sqlite3.connect('test.db')
    conn.row_factory = sqlite3.Row
    return conn

# 데이터 모델 정의
class Query(BaseModel):
    query: str

# 데이터베이스에서 검색 결과를 가져오는 엔드포인트
@app.get("/search")
async def search(query: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT your_column_name FROM your_table_name WHERE your_column_name LIKE ?", (f"%{query}%",))
        rows = cursor.fetchall()
        conn.close()
        return {"results": [row[0] for row in rows]}
    except sqlite3.Error as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)




