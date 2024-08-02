import sqlite3

# SQLite 데이터베이스 연결
conn = sqlite3.connect("세탁소.db")
cursor = conn.cursor()

# 테이블 생성 SQL 쿼리
create_table_query = """
CREATE TABLE IF NOT EXISTS 세탁소 (
    아이디 INTEGER PRIMARY KEY AUTOINCREMENT,
    이름 TEXT NOT NULL,
    품목 TEXT NOT NULL,
    수량 INTEGER NOT NULL,
    전화번호 TEXT NOT NULL
)
"""

# 테이블 생성 실행
cursor.execute(create_table_query)

# 커밋하고 연결 종료
conn.commit()
conn.close()

print("테이블이 성공적으로 생성되었습니다.")
