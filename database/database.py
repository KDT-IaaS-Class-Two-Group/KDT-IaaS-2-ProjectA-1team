import sqlite3
from typing import List, Dict

def connect_db():
    conn = sqlite3.connect('testCopyTable.db')
    conn.row_factory = sqlite3.Row
    return conn

def search_data_by_table_and_value(table: str, value: str) -> List[Dict]:
    conn = connect_db()
    try:
        cursor = conn.cursor()
        if value:
            query = f'SELECT * FROM "{table}" WHERE ' + ' OR '.join([f'"{col}" LIKE ?' for col in get_column_names(table)])
            cursor.execute(query, [f'%{value}%'] * len(get_column_names(table)))
        else:
            query = f'SELECT * FROM "{table}"'
            cursor.execute(query)
        rows = cursor.fetchall()
        return [dict(row) for row in rows]
    finally:
        conn.close()

def get_column_names(table: str) -> List[str]:
    conn = connect_db()
    try:
        cursor = conn.cursor()
        cursor.execute(f'PRAGMA table_info("{table}")')
        columns = [col[1] for col in cursor.fetchall()]
        return columns
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
