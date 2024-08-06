from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from YSDB import get_db_connection
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict

app = FastAPI()

origins = [
    "http://localhost:3000",  # Next.js 기본 포트
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    name: str
    price: str

class Order(BaseModel):
    item_name: str
    quantity: str

class ColumnOperation(BaseModel):
    column_name: str

@app.get("/tables/")
def read_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY rowid ASC;")
    tables = cursor.fetchall()
    conn.close()
    return [dict(table) for table in tables]



@app.get("/{table_name}/")
def read_table_data(table_name: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
    items = cursor.fetchall()
    conn.close()
    return [dict(item) for item in items]

@app.put("/{table_name}/{item_id}")
async def update_item(table_name: str, item_id: int, request: Request):
    data = await request.json()
    columns = ', '.join([f"{key} = ?" for key in data.keys()])
    values = list(data.values())
    values.append(item_id)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"UPDATE {table_name} SET {columns} WHERE id = ?", values)
    conn.commit()
    conn.close()
    return {"message": "Item updated successfully"}

@app.post("/{table_name}/add_column")
def add_column(table_name: str, column: ColumnOperation):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"ALTER TABLE {table_name} ADD COLUMN {column.column_name} TEXT")
    conn.commit()
    conn.close()
    return {"message": f"Column {column.column_name} added successfully"}

@app.post("/{table_name}/delete_column")
def delete_column(table_name: str, column: ColumnOperation):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        # 외래 키 제약 조건 해제
        cursor.execute(f"PRAGMA foreign_keys=off;")

        # 기존 테이블 정보 가져오기
        cursor.execute(f"PRAGMA table_info({table_name});")
        columns = cursor.fetchall()
        columns = [col['name'] for col in columns if col['name'] != column.column_name]

        if not columns:
            raise HTTPException(status_code=400, detail="Cannot delete the only column in the table")

        columns_str = ", ".join(columns)

        # 임시 테이블 생성
        cursor.execute(f"CREATE TABLE IF NOT EXISTS temp_table AS SELECT {columns_str} FROM {table_name} WHERE 1=0;")

        # 임시 테이블에 데이터 복사
        cursor.execute(f"INSERT INTO temp_table SELECT {columns_str} FROM {table_name};")

        # 기존 테이블 삭제 및 임시 테이블 이름 변경
        cursor.execute(f"DROP TABLE {table_name};")
        cursor.execute(f"ALTER TABLE temp_table RENAME TO {table_name};")

        # 외래 키 제약 조건 설정
        cursor.execute(f"PRAGMA foreign_keys=on;")

        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.execute("DROP TABLE IF EXISTS temp_table;")
        conn.close()

    return {"message": f"Column {column.column_name} deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
