from fastapi import FastAPI, HTTPException
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

@app.get("/tables/")
def read_tables():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
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

@app.post("/{table_name}/")
def create_data(table_name: str, data: Dict):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    placeholders = ', '.join(['?' for _ in data])
    columns = ', '.join(data.keys())
    sql = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
    
    cursor.execute(sql, tuple(data.values()))
    conn.commit()
    conn.close()
    return {"message": "Data added successfully"}

@app.put("/{table_name}/{data_id}")
def update_data(table_name: str, data_id: int, data: Dict):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    placeholders = ', '.join([f"{key} = ?" for key in data])
    sql = f"UPDATE {table_name} SET {placeholders} WHERE id = ?"
    
    cursor.execute(sql, tuple(data.values()) + (data_id,))
    conn.commit()
    conn.close()
    return {"message": "Data updated successfully"}

@app.delete("/{table_name}/{data_id}")
def delete_data(table_name: str, data_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(f"DELETE FROM {table_name} WHERE id = ?", (data_id,))
    conn.commit()
    conn.close()
    return {"message": "Data deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
