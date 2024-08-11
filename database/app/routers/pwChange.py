# pwCheange.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3

router = APIRouter()

DATABASE = './data/logIn.db'

class PasswordCheck(BaseModel):
    current_password: str
    new_password: str = None

def get_password_from_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute("SELECT password FROM adminData WHERE id = 'admin'")
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None

@router.post("/check-password")
async def check_password(data: PasswordCheck):
    stored_password = get_password_from_db()
    if stored_password and stored_password == data.current_password:
        return {"match": True}
    else:
        return {"match": False}

@router.put("/change-password")
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
