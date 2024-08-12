from pydantic import BaseModel
from typing import List, Dict, Union, Optional

# 테이블 스키마를 정의하는 모델
class TableSchema(BaseModel):
    cid: int
    name: str
    type: str
    notnull: int
    dflt_value: Optional[Union[str, int]] = None
    pk: int

# 테이블 데이터를 정의하는 모델
class TableData(BaseModel):
    schema: List[TableSchema]
    data: List[List[Union[str, int, float, None]]]

# 전체 백업 데이터를 정의하는 모델
class SaveData(BaseModel):
    backup_data: Dict[str, TableData]
