from fastapi import APIRouter, HTTPException
from typing import List, Dict
from models import TableRequest
from database import get_table_names, search_data_by_table_and_value

table_router = APIRouter()

@table_router.get("/tables", response_model=List[str])
async def get_tables():
    try:
        tables = get_table_names('정호연.db')
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
