from fastapi import FastAPI, HTTPException, Query
import sqlite3
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/tables")
def get_tables():
    conn = sqlite3.connect('테스트.db')
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    conn.close()
    return {"tables": [table[0] for table in tables]}

@app.get("/search")
def search_data(table: str, query: str = Query(..., min_length=1)):
    conn = sqlite3.connect('테스트.db')  # 파일 이름 변경 (일관성 유지)
    cursor = conn.cursor()
    try:
        # 테이블 메타데이터 가져오기
        cursor.execute(f"PRAGMA table_info({table});")
        columns = [column[1] for column in cursor.fetchall()]

        # 검색할 수 있는 텍스트 필드 찾기 (예시로 name 필드를 사용)
        search_field = "name"
        if search_field not in columns:
            raise HTTPException(status_code=400, detail=f"Table '{table}' does not contain a '{search_field}' field")

        # 검색 쿼리 실행
        cursor.execute(f"SELECT * FROM {table} WHERE {search_field} LIKE ?", ('%' + query + '%',))
        results = cursor.fetchall()
        conn.close()
        
        if not results:
            return {"results": "해당 목록을 찾을 수 없습니다"}
        return {"results": results}
    except sqlite3.Error as e:
        conn.close()
        raise HTTPException(status_code=400, detail=f"SQL error: {str(e)}")
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=400, detail=f"Unexpected error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)