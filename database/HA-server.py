
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pydantic import BaseModel
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

# SQLite 데이터베이스 연결
def get_db_connection():
    conn = sqlite3.connect('UserInput.db')
    conn.row_factory = sqlite3.Row
    return conn

# 테이블 컬럼 정보 모델
class ColumnInfo(BaseModel):
    name: str
    type: str

# 테이블 정보 모델
class TableInfo(BaseModel):
    table_name: str
    columns: List[ColumnInfo]

# 테이블 생성 API 엔드포인트
@app.post("/create_table")
def create_table(table_info: TableInfo):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # SQL 쿼리 동적 생성
        columns = ", ".join([f"{col.name} {col.type}" for col in table_info.columns])
        create_table_query = f"CREATE TABLE IF NOT EXISTS {table_info.table_name} ({columns})"
        cursor.execute(create_table_query)
        conn.commit()
        return {"message": f"Table '{table_info.table_name}' created successfully."}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

# 테이블 목록 반환 API 엔드포인트
@app.get("/tables")
def get_tables():
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = cursor.fetchall()
        table_names = [table["name"] for table in tables]
        return {"tables": table_names}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        conn.close()

# 데이터 삽입 API 엔드포인트
class InsertData(BaseModel):
    table_name: str
    data: dict

@app.post("/insert_data")
def insert_data(insert_data: InsertData):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        columns = ", ".join(insert_data.data.keys())
        placeholders = ", ".join(['?' for _ in insert_data.data.values()])
        values = tuple(insert_data.data.values())
        insert_query = f"INSERT INTO {insert_data.table_name} ({columns}) VALUES ({placeholders})"
        cursor.execute(insert_query, values)
        conn.commit()
        return {"message": "Data inserted successfully"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()

# 데이터 검색 API 엔드포인트
@app.get("/search")
def search(table_name: str, query: str):
    conn = get_db_connection()
    try:
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM {table_name} WHERE LOWER(name) LIKE ? OR CAST(age AS TEXT) LIKE ?", (f'%{query}%', f'%{query}%'))
        rows = cursor.fetchall()
        results = [{key: row[key] for key in row.keys()} for row in rows]
        return {"results": results}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        conn.close()


   