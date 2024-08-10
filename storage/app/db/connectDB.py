import sqlite3

def connect_db(storage):
    conn = sqlite3.connect(storage)
    conn.row_factory = sqlite3.Row
    return conn