from fastapi import APIRouter, HTTPException
from typing import List, Dict
from models import TableRequest, CreateTableRequest
from database import get_table_names, search_data_by_table_and_value
import sqlite3

table_router = APIRouter()

@table_router.get("/tables", response_model=List[str])
async def get_tables():
    try:
        tables = get_table_names('testCopyTable.db')
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
        conn = sqlite3.connect('정호연.db')
        cursor = conn.cursor()
        
        # 테이블 생성 SQL 동적 생성
        columns = ', '.join([f'"{set_}" TEXT' for set_ in request.sets])
        create_table_sql = f'CREATE TABLE "{request.tableName}" ({columns})'
        
        cursor.execute(create_table_sql)
        conn.commit()

        # 테스트 데이터 삽입
        insert_sql = f'INSERT INTO "{request.tableName}" ({", ".join(f'"{set_}"' for set_ in request.sets)}) VALUES ({", ".join(["?" for _ in request.sets])})'
        cursor.execute(insert_sql, [''] * len(request.sets))
        conn.commit()

        conn.close()
        
        return {"message": "테이블 생성 완료 및 테스트 데이터 삽입 완료"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"테이블 생성 중 오류 발생: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"알 수 없는 오류 발생: {str(e)}")