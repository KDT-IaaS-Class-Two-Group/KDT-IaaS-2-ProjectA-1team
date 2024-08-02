from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용, 보안을 위해 필요한 도메인만 추가
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite 데이터베이스 연결 함수
def get_db_connection():
    conn = sqlite3.connect('세탁소.db')
    return conn

# 테이블 컬럼 정보 모델
class ColumnInfo(BaseModel):
    name: str
    type: str

# 테이블 정보 모델
class TableInfo(BaseModel):
    table_name: str
    columns: List[ColumnInfo]

# 사용자가 입력한 데이터 모델
class UserInput(BaseModel):
    name: str
    item: str
    quantity: int
    phone: str

# 테이블 생성 API 엔드포인트
@app.post("/create_table")
def create_table(table_info: TableInfo):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # SQL 쿼리 동적 생성
        columns = ", ".join([f"{col.name} {col.type}" for col in table_info.columns])
        create_table_query = f"CREATE TABLE IF NOT EXISTS {table_info.table_name} ({columns})"
        print(f"Executing query: {create_table_query}")  # 쿼리 확인 메시지 출력
        cursor.execute(create_table_query)
        conn.commit()
        return {"message": f"Table '{table_info.table_name}' created successfully."}
    except sqlite3.Error as e:
        print(f"Database error: {e}")  # 오류 메시지 출력
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()
        print("DB 종료")  # 데이터베이스 연결 종료 확인 메시지 출력

# 데이터 저장 API 엔드포인트
@app.post("/save_data")
def save_data(user_input: UserInput):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        insert_query = """
        INSERT INTO 세탁소 (이름, 품목, 수량, 전화번호, 금액) 
        VALUES (?, ?, ?, ?, ?)
        """
        cursor.execute(insert_query, (user_input.name, user_input.item, user_input.quantity, user_input.phone))
        conn.commit()
        return {"message": "Data saved successfully."}
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()
        print("Database connection closed")

# 서버 시작
if __name__ == "__main__":
    import uvicorn
    print("Starting server on http://0.0.0.0:3001")  # 서버 시작 메시지 출력
    uvicorn.run(app, host="0.0.0.0", port=3001)
