import os
import sqlite3
from datetime import datetime

def backup_database(backup_data):
    try:
        # 데이터베이스 파일 이름 및 경로 설정
        db_name = datetime.now().strftime("%Y%m%d") + ".db"
        db_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../backup")
        
        # backup 디렉토리 존재 여부 확인 및 생성
        if not os.path.exists(db_path):
            os.makedirs(db_path)
        
        db_path = os.path.join(db_path, db_name)
        
        # 데이터베이스 연결 및 커서 생성
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        for table_name, table_data in backup_data.items():
            # 테이블 스키마 생성
            schema = table_data['schema']
            columns = [f"{col[1]} {col[2]}" for col in schema]
            create_table_query = f"CREATE TABLE {table_name} ({', '.join(columns)});"
            cursor.execute(create_table_query)
            
            # 테이블 데이터 삽입
            rows = table_data['data']
            placeholders = ', '.join(['?'] * len(schema))
            insert_query = f"INSERT INTO {table_name} VALUES ({placeholders});"
            cursor.executemany(insert_query, rows)
        
        # 변경사항 저장 및 연결 종료
        conn.commit()
        conn.close()
        
        return {"message": "Backup successful", "db_name": db_name}
    
    except sqlite3.DatabaseError as e:
        raise Exception(f"Database operation failed: {str(e)}")
    except Exception as e:
        raise Exception(f"Backup failed: {str(e)}")
