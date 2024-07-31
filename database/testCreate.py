import sqlite3

conn = sqlite3.connect("test.db")  # 데이터베이스 연결
cursor = conn.cursor()  # 커서 생성

try:
    # 데이터 삽입
    cursor.execute("INSERT INTO `users-input` (테이블명, 날짜) VALUES (?, ?)", ("HRIM1", "2024-07-31"))
    cursor.execute("INSERT INTO `users-input` (테이블명, 날짜) VALUES (?, ?)", ("HRIM2", "2024-07-31"))
    cursor.execute("INSERT INTO `users-input` (테이블명, 날짜) VALUES (?, ?)", ("HRIM3", "2024-07-31"))
    
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
