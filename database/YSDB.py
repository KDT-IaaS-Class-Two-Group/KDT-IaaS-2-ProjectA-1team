import sqlite3
from sqlite3 import Connection

def get_db_connection() -> Connection:
    conn = sqlite3.connect('YS.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # items 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price TEXT NOT NULL
        )
    ''')
    # orders 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_name TEXT NOT NULL,
            quantity TEXT NOT NULL
        )
    ''')
    
    # items와 orders 테이블에 테스트 데이터 추가
    cursor.execute("INSERT INTO items (name, price) VALUES ('Item 1', '10.99')")
    cursor.execute("INSERT INTO items (name, price) VALUES ('Item 2', '15.49')")
    cursor.execute("INSERT INTO items (name, price) VALUES ('Item 3', '7.25')")
    cursor.execute("INSERT INTO orders (item_name, quantity) VALUES ('Item 1', '2')")
    cursor.execute("INSERT INTO orders (item_name, quantity) VALUES ('Item 2', '1')")
    cursor.execute("INSERT INTO orders (item_name, quantity) VALUES ('Item 3', '4')")

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
