from fastapi import APIRouter, HTTPException
import os
from typing import List
from db.backup_act import backup_database
from db.backup_export import backup_export_data
from models.backup_models import SaveData


router = APIRouter()

# 절대 경로로 설정.
backup_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)),'../backup')

@router.get("/getDBName", response_model=List[str])
async def get_db_names():
    try:
        files = [f for f in os.listdir(backup_folder) if f.endswith('.db')]
        
        return files
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error accessing backup directory: {str(e)}")

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