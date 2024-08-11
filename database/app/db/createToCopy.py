import sqlite3

def copy_table_structure(table_name):
    try:
        # A 데이터베이스 연결
        a_conn = sqlite3.connect('./data/recommendTable.db')
        a_cursor = a_conn.cursor()
        
        # B 데이터베이스 연결
        b_conn = sqlite3.connect('./data/정호연.db')
        b_cursor = b_conn.cursor()
        
        # A 데이터베이스에서 테이블 구조 가져오기
        a_cursor.execute(f"PRAGMA table_info({table_name})")
        columns = a_cursor.fetchall()
        
        if not columns:
            print(f"Table '{table_name}' does not exist in the source database.")
            return
        
        # B 데이터베이스에서 테이블 생성
        column_defs = []
        column_names = []
        for column in columns:
            column_name = column[1]
            column_type = column[2]
            is_nullable = 'NULL' if column[3] else 'NOT NULL'
            column_defs.append(f"{column_name} {column_type} {is_nullable}")
            column_names.append(column_name)
        
        create_table_sql = f"CREATE TABLE {table_name} ({', '.join(column_defs)})"
        b_cursor.execute(create_table_sql)

        # 빈 데이터 행 삽입
        column_placeholders = ', '.join(['?' for _ in column_names])  # 각 컬럼에 대해 'NULL' 값 추가
        insert_sql = f"INSERT INTO {table_name} ({', '.join(column_names)}) VALUES ({column_placeholders})"
        b_cursor.execute(insert_sql, [''] * len(column_names))
        
        # 변경사항 저장
        b_conn.commit()
        
        print(f"Table '{table_name}' successfully copied from source to destination database.")
        
    except sqlite3.Error as e:
        print(f"Error occurred: {e}")
        
    finally:
        # 연결 종료
        if a_conn:
            a_conn.close()
        if b_conn:
            b_conn.close()
