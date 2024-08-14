from fastapi import APIRouter, HTTPException
from typing import List, Dict
from models.models import TableRequest, CreateTableRequest, UpdateTableRequest
from db.database import get_table_names, search_data_by_table_and_value
import sqlite3

table_router = APIRouter()

@table_router.get("/tables", response_model=List[str])
async def get_tables():
    try:
        tables = get_table_names('./data/정호연.db')
        return tables
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

data_router = APIRouter()

@data_router.post("/data", response_model=List[Dict])
async def get_data(request: TableRequest):
    try:
        rows = search_data_by_table_and_value(request.table, request.name)
        if not rows:
            raise HTTPException(status_code=404, detail="Data not found")
        return rows
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

create_table_router = APIRouter()

@create_table_router.post("/createTable")
async def create_table(request: CreateTableRequest):
    try:
        conn = sqlite3.connect('./data/정호연.db')
        cursor = conn.cursor()

        # 테이블 생성 SQL 동적 생성
        columns = ', '.join([f'"{set_}" TEXT' for set_ in request.sets])
        create_table_sql = f'CREATE TABLE "{request.tableName}" ({columns})'

        print(f"Generated SQL: {create_table_sql}")  # 디버깅을 위한 SQL 출력

        cursor.execute(create_table_sql)
        conn.commit()

        # 테스트 데이터 삽입 - 빈 값은 공란으로 처리
        columns_list = ', '.join([f'"{set_}"' for set_ in request.sets])
        values_placeholders = ', '.join(['?' for _ in request.sets])
        insert_sql = f'INSERT INTO "{request.tableName}" ({columns_list}) VALUES ({values_placeholders})'
        
        cursor.execute(insert_sql, [''] * len(request.sets))
        conn.commit()

        conn.close()
        
        return {"message": "테이블 생성 완료 및 테스트 데이터 삽입 완료"}
    except sqlite3.Error as e:
        print(f'SQLite error: {e}')
        raise HTTPException(status_code=500, detail=f"테이블 생성 중 오류 발생: {str(e)}")
    except Exception as e:
        print(f'Unknown error: {e}')
        raise HTTPException(status_code=500, detail=f"알 수 없는 오류 발생: {str(e)}")

update_table_router = APIRouter()

@update_table_router.post("/updateTable")
async def update_table(request: UpdateTableRequest):
    try:
        conn = sqlite3.connect('./data/정호연.db')
        cursor = conn.cursor()

        # 테이블에 존재하는 컬럼 가져오기
        cursor.execute(f'PRAGMA table_info("{request.table}")')
        existing_columns = {col[1] for col in cursor.fetchall()}

        # 새로운 컬럼이 추가되었는지 확인하고, 추가된 컬럼이 있으면 테이블에 반영
        for column in request.data[0].keys():
            if column not in existing_columns:
                cursor.execute(f'ALTER TABLE "{request.table}" ADD COLUMN "{column}" TEXT')
                print(f'새로운 열 추가됨: {column}')

        # 기존 데이터를 삭제하고 새로운 데이터를 삽입 (빈 값은 공란으로 처리)
        cursor.execute(f'DELETE FROM "{request.table}"')
        columns = ', '.join([f'"{col}"' for col in request.data[0].keys()])
        placeholders = ', '.join(['?' for _ in request.data[0].keys()])
        for row in request.data:
            values = tuple('' if value is None else value for value in row.values())
            cursor.execute(f'INSERT INTO "{request.table}" ({columns}) VALUES ({placeholders})', values)

        conn.commit()
        conn.close()
        return {"message": "테이블이 정상적으로 업데이트 되었습니다"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"테이블 업데이트 중 오류 발생: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"알 수 없는 오류 발생: {str(e)}")
