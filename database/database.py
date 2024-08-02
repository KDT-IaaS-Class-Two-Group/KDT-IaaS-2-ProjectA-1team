import sqlite3
from typing import List, Dict

def connect_db():
    conn = sqlite3.connect('정호연.db')
    conn.row_factory = sqlite3.Row
    return conn

def search_users_by_name(name: str) -> List[Dict]:
    conn = connect_db()
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM 유저 WHERE 이름 = ?", (name,))
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()

def get_table_names(db_name: str) -> List[str]:
    try:
        conn = sqlite3.connect(db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';")
        tables = cursor.fetchall()
        return [table[0] for table in tables]
    except sqlite3.Error as e:
        print(f"SQLite 오류: {e}")
        return []
    finally:
        if conn:
            conn.close()

def search_data_by_table_and_value(table: str, value: str = None) -> List[Dict]:
    conn = connect_db()
    try:
        cursor = conn.cursor()

        # 테이블의 컬럼 이름들을 조회한다
        cursor.execute(f"PRAGMA table_info({table})")
        columns_info = cursor.fetchall()
        column_names = [col['name'] for col in columns_info]

        if value:
            # 모든 컬럼을 검색하는 쿼리 생성
            query_parts = [f"{col} LIKE ?" for col in column_names]
            query = f"SELECT * FROM {table} WHERE {' OR '.join(query_parts)}"
            cursor.execute(query, [f"%{value}%"] * len(column_names))
        else:
            # 값이 없으면 모든 데이터를 조회한다
            query = f"SELECT * FROM {table}"
            cursor.execute(query)

        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()
