from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from YSDB import get_db_connection
from fastapi.middleware.cors import CORSMiddleware

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
    price: float

class Order(BaseModel):
    item_name: str
    quantity: int

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

@app.post("/items/")
def create_item(item: Item):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO items (name, price) VALUES (?, ?)", (item.name, item.price))
    conn.commit()
    conn.close()
    return {"message": "Item added successfully"}

@app.post("/orders/")
def create_order(order: Order):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO orders (item_name, quantity) VALUES (?, ?)", (order.item_name, order.quantity))
    conn.commit()
    conn.close()
    return {"message": "Order added successfully"}

@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM items WHERE id = ?", (item_id,))
    conn.commit()
    conn.close()
    return {"message": "Item deleted successfully"}

@app.delete("/orders/{order_id}")
def delete_order(order_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM orders WHERE id = ?", (order_id,))
    conn.commit()
    conn.close()
    return {"message": "Order deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
