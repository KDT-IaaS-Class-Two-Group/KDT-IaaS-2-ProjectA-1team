import sqlite3

def initialize_db():
    conn = sqlite3.connect('테스트.db')
    cursor = conn.cursor()
    
    # 테이블 생성
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER
        )
    ''')
    
    # 샘플 데이터 삽입
    cursor.execute('INSERT INTO users (name, age) VALUES (?, ?)', ("Alice", 30))
    cursor.execute('INSERT INTO users (name, age) VALUES (?, ?)', ("Bob", 25))
    
    conn.commit()
    conn.close()

if __name__ == "__main__":
    initialize_db()





