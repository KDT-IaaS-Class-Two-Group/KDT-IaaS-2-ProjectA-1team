import sqlite3

def InsertDummy():
    try:
        conn = sqlite3.connect('recommendTable.db')
        cursor = conn.cursor()
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS 요식업 (
            재료명 TEXT NOT NULL,
            수량 INTEGER NOT NULL,
            단위 TEXT NOT NULL,
            단가 INTEGER NOT NULL,
            입고가격 INTEGER NOT NULL,
            입고날짜 TEXT NOT NULL,
            소비기한 TEXT NOT NULL
        )
        ''')
        
        dummy_data = [
            ('고추장', 100, '통', 5000, 500000, '2024-08-01', '2025-08-01'),
            ('된장', 200, '통', 6000, 1200000, '2024-07-15', '2025-07-15'),
            ('간장', 150, '병', 12000, 1800000, '2024-07-20', '2025-07-20')
        ]
        
        cursor.executemany('''
        INSERT INTO 요식업 (재료명, 수량, 단위, 단가, 입고가격, 입고날짜, 소비기한)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', dummy_data)
        
        conn.commit()
        
    except sqlite3.Error as e:
        print(f"Error occurred: {e}")
        
    finally:
        if conn:
            conn.close()

InsertDummy()
