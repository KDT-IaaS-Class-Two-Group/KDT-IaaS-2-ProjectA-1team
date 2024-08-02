from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List
from routers import table_router, data_router  # user_router, table_router, data_router를 불러온다.

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 허용할 오리진을 설정합니다.
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드를 허용합니다.
    allow_headers=["*"],  # 모든 HTTP 헤더를 허용합니다.
)

class VerifyRequest(BaseModel):
    id: str
    password: str

@app.post("/login")
def verify_user(request: VerifyRequest):
    print('login')
    DATABASE = 'login.db'
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id FROM adminData WHERE id = ? AND password = ?",
        (request.id, request.password)
    )
    row = cursor.fetchone()
    conn.close()

    if row:
        return True
    else:
        return False

app.include_router(table_router)  # table_router를 추가한다.
app.include_router(data_router)  # data_router를 추가한다.