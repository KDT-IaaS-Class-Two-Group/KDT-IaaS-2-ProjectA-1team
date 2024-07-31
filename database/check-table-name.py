import sqlite3

def get_all_table_names_excluding_sequence(db_name):
    try:
        # 데이터베이스 연결
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # 모든 테이블 이름 조회
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name!='sqlite_sequence'")
        tables = cursor.fetchall()
        
        if tables:
            print("테이블 이름 목록:")
            for table in tables:
                print(table[0])
        else:
            print("데이터베이스에 테이블이 없습니다.")
    except sqlite3.Error as e:
        print(f"SQLite 오류: {e}")
    finally:
        if conn:
            conn.close()

# 예시 사용법
db_name = '테스트.db'
get_all_table_names_excluding_sequence(db_name)
