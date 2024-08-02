import sqlite3

def create_table(db_name, table_name, name, id, price):
    try:
        # 데이터베이스 연결
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        
        # 테이블 생성
        cursor.execute(f'''
        CREATE TABLE IF NOT EXISTS {table_name} (
            {name} TEXT NOT NULL,
            {price} INTEGER NOT NULL
        )
        ''')
        print(f"테이블 '{table_name}'가 성공적으로 생성되었습니다.")
        
        # 데이터 삽입
        cursor.execute(f'''
        INSERT INTO {table_name} ({name}, {price})
        VALUES ('튀김소보로', 1700),
               ('튀소구마', 1700),
               ('판타롱부추빵', 2000),
               ('오보름달', 2800),
               ('참쌀방망이', 4500)
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
db_name = '정호연.db'
table_name = '성심당'
name = '제품명'
# id = '아이디'
price = '가격'
create_table(db_name, table_name, name, id, price)
