import sqlite3

def create_table(db_name):
    try:
        # 데이터베이스 연결
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # 테이블 생성
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS 샌드위치 (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL
        )
        ''')
        print("테이블 '하리보'가 성공적으로 생성되었습니다.")
        
        # 데이터 삽입
        cursor.execute('''
        INSERT INTO 샌드위치 (name, age)
        VALUES ('이연승', 30),
               ('정호연', 27),
               ('겨울이', 4)
        ''')
        print("데이터가 성공적으로 삽입되었습니다.")
        
        # 변경사항 저장
        conn.commit()
    except sqlite3.Error as e:
        print(f"SQLite 오류: {e}")
    finally:
        if conn:
            conn.close()

# 예시 사용법
db_name = '테스트.db'
create_table(db_name)
