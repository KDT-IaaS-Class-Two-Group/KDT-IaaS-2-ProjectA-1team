import sqlite3

def InsertDummy():
    try:
        conn = sqlite3.connect('recommendTable.db')
        cursor = conn.cursor()
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS 인력부 (
            업무날짜 TEXT NOT NULL,
            이름 TEXT NOT NULL,
            작업 TEXT NOT NULL,
            단가 INTEGER NOT NULL,
            횟수 REAL NOT NULL,
            출금입금금액 INTEGER NOT NULL
        )
        ''')
        
        wage_dummy_data = [
            ('2024-08-01', '홍길동', '공구리', 200000, 1.5, 300000),
            ('2024-08-01', '김철수', '철거', 180000, 0.5, 90000),
            ('2024-08-01', '이영희', '전기설비', 250000, 1.0, 250000)
        ]
        
        cursor.executemany('''
        INSERT INTO 인력부 (업무날짜, 이름, 작업, 단가, 횟수, 출금입금금액)
        VALUES (?, ?, ?, ?, ?, ?)
        ''', wage_dummy_data)
        
        conn.commit()
        
    except sqlite3.Error as e:
        print(f"Error occurred: {e}")
        
    finally:
        if conn:
            conn.close()

InsertDummy()
