import sqlite3

conn = sqlite3.connect("UserInput.db")  # 데이터베이스 연결
cursor = conn.cursor()  # 커서 생성

# 테이블 생성 
cursor.execute("""
               ( 
                 
               
              )
              """)

try:
   
    
    # 트랜잭션 커밋
    conn.commit()
except Exception as e:
    # 오류 발생 시 롤백
    conn.rollback()
    print(e)
finally:
    # 커서와 연결 닫기
    cursor.close()
    conn.close()

