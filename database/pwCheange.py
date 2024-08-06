from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import uvicorn  # uvicorn 모듈을 임포트합니다

app = FastAPI()

# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 모든 출처 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE = 'logIn.db'

class PasswordCheck(BaseModel):
    current_password: str
    new_password: str = None  # 비밀번호 변경을 위한 필드 추가

def get_password_from_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM adminData WHERE id = 'admin'")
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None

@app.post("/check-password")
async def check_password(data: PasswordCheck):
    stored_password = get_password_from_db()
    if stored_password and stored_password == data.current_password:
        return {"match": True}
    else:
        return {"match": False}

@app.put("/change-password")
async def change_password(data: PasswordCheck):
    stored_password = get_password_from_db()
    if not (stored_password and stored_password == data.current_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect.")
    
    if not data.new_password:
        raise HTTPException(status_code=400, detail="New password cannot be empty.")
    
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("UPDATE adminData SET password = ? WHERE id = 'admin'", (data.new_password,))
    conn.commit()
    conn.close()
    return {"message": "Password changed successfully"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
