import sqlite3

conn = sqlite3.connect("test.db")  # 데이터베이스 연결
cursor = conn.cursor()  # 커서 생성

# 테이블 생성 
cursor.execute("""
              CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  age INTEGER NOT NULL
              )
              """)

try:
    # 데이터 삽입 구문 수정 (열 이름을 'name'과 'age'로 수정)
    cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("HRIM1", 30))
    cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("HRIM2", 25))
    cursor.execute("INSERT INTO users (name, age) VALUES (?, ?)", ("HRIM3", 35))
    
    # 트랜잭션 커밋
    conn.commit()
except Exception as e:
    # 오류 발생 시 롤백
    conn.rollback()
    print(e)
finally:
    # 커서와 연결 닫기
    cursor.close()
    conn.close()

