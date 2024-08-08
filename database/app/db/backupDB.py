import sqlite3
import json

def backup_database(DBPATH):
    # 데이터베이스에 연결부터 후에 폴더 정리후 교체 예정.
    conn = sqlite3.connect(DBPATH)
    cursor = conn.cursor()

    # 데이터 베이스에 있는 모든 테이블 정보를 받아오는 구문.
    # ;을 넣는 이유는 SQL문을 처리할때 ;으로 구문을 구분하기 때문. python을 사용할 경우 작성할 필요가없다.
    # SQL문을 사용할 때는 사용한다고 하니 넣어 두었습니다.
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print(tables)

    # backup 데이터를 담을 곳을 미리 초기화
    backup = {}

    # tables는 현재 테이블 정보가 담겨있는 객체 for... in문으로 객체를 순회.
    # table_name = table[0]에 담기는 정보는 table[0]에 담겨있는 정보가 SELECT name으로 받아온 정보이기 때문
    for table in tables : 
        table_name = table[0]

        # table_info에 대한 설명은 notion에 정리해두겠습니다. 테이블 이름을 변수로 그 테이블의 schema정보를 가져옵니다.
        cursor.execute(f"PRAGMA table_info ({table_name});")
        schema = cursor.fetchall()

        # 각 행의 정보를 받아와야 합니다.
        cursor.execute(f"SELECT * form {table_name}")
        rows = cursor.fetchall()

        # 테이블
        backup[table_name] = {
            "schema" : schema,
            "data" : rows
        }
    
    conn.close()