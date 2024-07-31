from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# CORS 설정
origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ColumnAction(BaseModel):
    column_name: str

DATABASE = 'login.db'

def execute_db_query(query: str, parameters: tuple = ()):
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute(query, parameters)
            conn.commit()
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.post("/add-column/")
def add_column(action: ColumnAction):
    if not action.column_name:
        raise HTTPException(status_code=400, detail="Column name must be provided.")
    try:
        query = f"ALTER TABLE users ADD COLUMN {action.column_name} TEXT"
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute(query)
            conn.commit()
        return {"message": f"Column {action.column_name} added."}
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e).lower():
            raise HTTPException(status_code=400, detail="Column already exists.")
        raise HTTPException(status_code=500, detail=f"Operational error: {e}")
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.post("/delete-column/")
def delete_column(action: ColumnAction):
    if not action.column_name:
        raise HTTPException(status_code=400, detail="Column name must be provided.")
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            # 1. 테이블의 기존 구조를 가져옴
            cursor.execute(f"PRAGMA table_info(users);")
            columns_info = cursor.fetchall()
            columns = [col[1] for col in columns_info]

            if action.column_name not in columns:
                raise HTTPException(status_code=400, detail="Column does not exist.")

            # 2. 새로운 테이블 생성 (삭제할 열을 제외한)
            columns.remove(action.column_name)
            columns_str = ", ".join(columns)
            cursor.execute(f"CREATE TABLE new_users AS SELECT {columns_str} FROM users;")
            # 3. 기존 테이블 삭제
            cursor.execute("DROP TABLE users;")
            # 4. 새로운 테이블 이름 변경
            cursor.execute("ALTER TABLE new_users RENAME TO users;")
            conn.commit()

        return {"message": f"Column {action.column_name} deleted."}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
