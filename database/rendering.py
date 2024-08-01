# main.py (FastAPI 서버 파일)
from fastapi import FastAPI
import sqlite3
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js의 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메소드 허용
    allow_headers=["*"],  # 모든 HTTP 헤더 허용
)

# SQLite 데이터베이스 연결 함수
def get_db_connection():
    conn = sqlite3.connect('login.db')
    conn.row_factory = sqlite3.Row  # 결과를 딕셔너리 형식으로 반환
    return conn

# Pydantic 모델 정의
class User(BaseModel):
    id: str
    password: str

# /users 엔드포인트 정의
@app.get("/users", response_model=List[User])
def read_users():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, password FROM users")
    users = cursor.fetchall()
    conn.close()
    return [User(id=row["id"], password=row["password"]) for row in users]
