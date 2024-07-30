import sqlite3

def create_table():
    conn = sqlite3.connect('test.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS your_table_name (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            your_column_name TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

create_table()
