from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3
import os
import json
from db.backup_act import backup_database
from db.backup_export import backup_export_data
from models.backup_models import SaveData


router = APIRouter()

# 절대 경로로 설정.
backup_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)),'../backup')

@router.post('/save')
async def save(data:SaveData):
    try : 
        result = backup_database(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.post("/load")
async def load(db_name: str):
    try:
        backup_data = backup_export_data(db_name)
        return backup_data 

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")