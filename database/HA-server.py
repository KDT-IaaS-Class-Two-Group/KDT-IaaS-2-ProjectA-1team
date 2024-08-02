from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from pydantic import BaseModel
from typing import List

app = FastAPI()

# CORS 설정: 모든 도메인에서 접근 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 도메인 허용, 보안을 위해 필요한 도메인만 추가
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# SQLite 데이터베이스 연결 함수
def get_db_connection():
    print("DB 연결 시작.")  # 데이터베이스 연결 시작 메시지
    conn = sqlite3.connect('UserInput.db')  # 데이터베이스 연결
    conn.row_factory = sqlite3.Row  # 쿼리 결과를 딕셔너리 형태로 반환
    print("DB 연결 완료")  # 데이터베이스 연결 완료 메시지
    return conn

# 테이블 컬럼 정보 모델
class ColumnInfo(BaseModel):
    name: str  # 컬럼 이름
    type: str  # 컬럼 데이터 타입

# 테이블 정보 모델
class TableInfo(BaseModel):
    table_name: str  # 테이블 이름
    columns: List[ColumnInfo]  # 컬럼 리스트

# 테이블 생성 API 엔드포인트
@app.post("/create_table")
def create_table(table_info: TableInfo):
    print(f"Received request to create table: {table_info.table_name}")  # 테이블 생성 요청 수신 메시지
    conn = get_db_connection()  # 데이터베이스 연결
    cursor = conn.cursor()  # 커서 객체 생성

    try:
        # SQL 쿼리 동적 생성
        columns = ", ".join([f"{col.name} {col.type}" for col in table_info.columns])  # 컬럼 정의 문자열 생성
        create_table_query = f"CREATE TABLE IF NOT EXISTS {table_info.table_name} ({columns})"  # 테이블 생성 쿼리
        print(f"쿼리 샐행: {create_table_query}")  # 쿼리 실행 메시지
        cursor.execute(create_table_query)  # 테이블 생성 쿼리 실행
        conn.commit()  # 변경사항 커밋
        print(f"Table '{table_info.table_name}' created successfully.")  # 테이블 생성 성공 메시지
        return {"message": f"Table '{table_info.table_name}' created successfully."}
    except sqlite3.Error as e:
        print(f"Database error: {e}")  # 데이터베이스 오류 메시지
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()  # 데이터베이스 연결 종료
        print("DB 연결 종료")  # 연결 종료 메시지

# 테이블 목록 반환 API 엔드포인트
@app.get("/tables")
def get_tables():
    print("테이블 목록 요펑 수신")  # 테이블 목록 요청 수신 메시지
    conn = get_db_connection()  # 데이터베이스 연결
    try:
        cursor = conn.cursor()  # 커서 객체 생성
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")  # 테이블 목록 쿼리 실행
        tables = cursor.fetchall()  # 결과 가져오기
        table_names = [table["name"] for table in tables]  # 테이블 이름 리스트 생성
        print(f"Tables found: {table_names}")  # 테이블 목록 출력
        return {"tables": table_names}
    except sqlite3.Error as e:
        print(f"Database query 실패: {e}")  # 데이터베이스 쿼리 실패 메시지
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        conn.close()  # 데이터베이스 연결 종료
        print("DB 연결 종료")  # 연결 종료 메시지

# 데이터 삽입 API 엔드포인트
class InsertData(BaseModel):
    table_name: str  # 삽입할 테이블 이름
    data: dict  # 삽입할 데이터 (컬럼-값 쌍)

@app.post("/insert_data")
def insert_data(insert_data: InsertData):
    print(f"Received request to insert data into table: {insert_data.table_name}")  # 데이터 삽입 요청 수신 메시지
    conn = get_db_connection()  # 데이터베이스 연결
    cursor = conn.cursor()  # 커서 객체 생성

    try:
        columns = ", ".join(insert_data.data.keys())  # 컬럼 이름 문자열 생성
        placeholders = ", ".join(['?' for _ in insert_data.data.values()])  # 값 자리 표시자 문자열 생성
        values = tuple(insert_data.data.values())  # 값 튜플 생성
        insert_query = f"INSERT INTO {insert_data.table_name} ({columns}) VALUES ({placeholders})"  # 삽입 쿼리
        print(f"Executing query: {insert_query}")  # 쿼리 실행 메시지
        cursor.execute(insert_query, values)  # 데이터 삽입 쿼리 실행
        conn.commit()  # 변경사항 커밋
        print("Data inserted successfully")  # 데이터 삽입 성공 메시지
        return {"message": "Data inserted successfully"}
    except sqlite3.Error as e:
        print(f"Database error: {e}")  # 데이터베이스 오류 메시지
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        conn.close()  # 데이터베이스 연결 종료
        print("데이터베이스 연결 종료")  # 연결 종료 메시지

# 데이터 검색 API 엔드포인트
@app.get("/search")
def search(table_name: str, query: str):
    print(f"Received search request in table: {table_name} for query: {query}")  # 검색 요청 수신 메시지
    conn = get_db_connection()  # 데이터베이스 연결
    try:
        cursor = conn.cursor()  # 커서 객체 생성
        search_query = f"SELECT * FROM {table_name} WHERE LOWER(name) LIKE ? OR CAST(age AS TEXT) LIKE ?"  # 검색 쿼리
        print(f"Executing query: {search_query}")  # 쿼리 실행 메시지
        cursor.execute(search_query, (f'%{query}%', f'%{query}%'))  # 검색 쿼리 실행
        rows = cursor.fetchall()  # 결과 가져오기
        results = [{key: row[key] for key in row.keys()} for row in rows]  # 결과를 딕셔너리 형태로 변환
        print(f"Search results: {results}")  # 검색 결과 출력
        return {"results": results}
    except sqlite3.Error as e:
        print(f"Database query failed: {e}")  # 데이터베이스 쿼리 실패 메시지
        raise HTTPException(status_code=500, detail=f"Database query failed: {e}")
    finally:
        conn.close()  # 데이터베이스 연결 종료
        print("데이터베이스 연결 종료")  # 연결 종료 메시지

