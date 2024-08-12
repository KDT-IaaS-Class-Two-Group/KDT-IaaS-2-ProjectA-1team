from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from typing import List, Dict, Any

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

DATABASE = '테스트.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

class ColumnAction(BaseModel):
    table_name: str
    column_name: str

class UpdateRowsAction(BaseModel):
    tableName: str
    data: List[Dict[str, Any]]

class TableAction(BaseModel):
    table_name: str

@app.get("/tables/{table_name}/columns")
def read_columns(table_name: str) -> List[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns_info = cursor.fetchall()
    return [dict(row) for row in columns_info]

@app.get("/tables/{table_name}/rows")
def read_rows(table_name: str) -> List[Dict[str, Any]]:
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
    return [dict(row) for row in rows]

@app.post("/add-column/")
def add_column(action: ColumnAction):
    if not action.table_name or not action.column_name:
        raise HTTPException(status_code=400, detail="Table name and column name must be provided.")
    try:
        query = f"ALTER TABLE {action.table_name} ADD COLUMN {action.column_name} TEXT"
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute(query)
            conn.commit()
        return {"message": f"Column {action.column_name} added to {action.table_name}."}
    except sqlite3.OperationalError as e:
        if "duplicate column name" in str(e).lower():
            raise HTTPException(status_code=400, detail="Column already exists.")
        raise HTTPException(status_code=500, detail=f"Operational error: {e}")
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.post("/delete-column/")
def delete_column(action: ColumnAction):
    if not action.table_name or not action.column_name:
        raise HTTPException(status_code=400, detail="Table name and column name must be provided.")
    try:
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute(f"PRAGMA table_info({action.table_name})")
            columns_info = cursor.fetchall()
            columns = [col[1] for col in columns_info]

            if action.column_name not in columns:
                raise HTTPException(status_code=400, detail="Column does not exist.")

            # 새 테이블 생성 (삭제할 열 제외)
            columns.remove(action.column_name)
            columns_str = ", ".join(columns)
            cursor.execute(f"CREATE TABLE new_{action.table_name} AS SELECT {columns_str} FROM {action.table_name};")
            cursor.execute(f"DROP TABLE {action.table_name};")
            cursor.execute(f"ALTER TABLE new_{action.table_name} RENAME TO {action.table_name};")
            conn.commit()

        return {"message": f"Column {action.column_name} deleted from {action.table_name}."}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.post("/update-rows/")
def update_rows(action: UpdateRowsAction):
    if not action.tableName or not action.data:
        raise HTTPException(status_code=400, detail="Table name and data must be provided.")
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            for row in action.data:
                # id 열을 업데이트 가능하게 하도록 쿼리 수정
                placeholders = ", ".join([f"{k} = ?" for k in row.keys()])
                values = list(row.values())
                query = f"UPDATE {action.tableName} SET {placeholders} WHERE id = ?"
                cursor.execute(query, values + [row['id']])
            conn.commit()
        return {"message": f"Rows in {action.tableName} updated successfully."}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.post("/add-row")
def add_row(action: TableAction):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"INSERT INTO {action.table_name} (name, age) VALUES (NULL, NULL)")
            conn.commit()
        return {"message": f"Row added to {action.table_name}."}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

@app.post("/delete-row")
def delete_row(action: TableAction):
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(f"DELETE FROM {action.table_name} WHERE id = (SELECT id FROM {action.table_name} ORDER BY id DESC LIMIT 1)")
            conn.commit()
        return {"message": f"Row deleted from {action.table_name}."}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
