import sqlite3

def create_database(db_name):
    try:
        # 데이터베이스 연결 (새 데이터베이스 파일 생성)
        conn = sqlite3.connect(db_name)
        print(f"데이터베이스 '{db_name}'이(가) 성공적으로 생성되었습니다.")
    except sqlite3.Error as e:
        print(f"SQLite 오류: {e}")
    finally:
        if conn:
            conn.close()

# 예시 사용법
db_name = 'example.db'
create_database(db_name)
