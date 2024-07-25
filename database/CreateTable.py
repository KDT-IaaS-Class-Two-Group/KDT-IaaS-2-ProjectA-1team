import sqlite3

def create_table(conn, table_name, columns):
    try:
        cursor = conn.cursor()

        # 테이블 존재 여부 확인
        cursor.execute(f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}';")
        if cursor.fetchone():
            print("테이블중복")
        else:
            # 테이블 생성 SQL 구문 생성
            column_defs = ", ".join([f"{col} TEXT" for col in columns])
            create_table_sql = f"CREATE TABLE {table_name} (id INTEGER PRIMARY KEY AUTOINCREMENT, {column_defs});"
            cursor.execute(create_table_sql)
            conn.commit()
            print(f"테이블 '{table_name}'이(가) 성공적으로 생성되었습니다.")
    except sqlite3.Error as e:
        print(f"SQLite 오류: {e}")

# 예시 사용법
db_name = 'example.db'
table_name = 'my_table'
columns = ['key1', 'key2', 'key3', 'key4']

# 데이터베이스 연결
conn = sqlite3.connect(db_name)

# 테이블 생성 호출
create_table(conn, table_name, columns)

# 연결 닫기
conn.close()
