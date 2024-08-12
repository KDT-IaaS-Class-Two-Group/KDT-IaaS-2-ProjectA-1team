import os
import sqlite3


def backup_export_data(db_name:str):
    backup_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)),'../backup')
    db_path = os.path.join(backup_folder, f"{db_name}.db")

    backup = {}

    # SQLite3 데이터베이스 연결
    conn = None
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # 모든 테이블 이름 가져오기
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        for table in tables:
            table_name = table[0]
            
            # 테이블 스키마 가져오기
            cursor.execute(f"PRAGMA table_info({table_name});")
            schema = cursor.fetchall()
            
            # 테이블 데이터 가져오기
            cursor.execute(f"SELECT * FROM {table_name};")
            rows = cursor.fetchall()
            
            backup[table_name] = {
                'schema': schema,
                'data': rows
            }
        
        return backup
    except sqlite3.DatabaseError as e:
        raise Exception(f"Database operation failed: {str(e)}")
    except Exception as e:
        raise Exception(f"Backup failed: {str(e)}")
    finally : 
        conn.close()
