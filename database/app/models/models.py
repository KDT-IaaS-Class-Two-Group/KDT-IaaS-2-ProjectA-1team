from pydantic import BaseModel
from typing import List, Optional

class SearchRequest(BaseModel):
    name: str  # name 필드는 문자열 타입이다.

class UserDTO(BaseModel):
    이름: str  # 이름 필드는 문자열 타입이다.
    아이디: str  # 아이디 필드는 문자열 타입이다.
    비밀번호: int  # 비밀번호 필드는 정수 타입이다.

class TableRequest(BaseModel):
    table: str  # table 필드는 문자열 타입이다.
    name: Optional[str] = None  # name 필드는 선택적 문자열 타입이다.

class CreateTableRequest(BaseModel):
    tableName: str
    sets: List[str]

class UpdateTableRequest(BaseModel):
    table: str
    data: List[dict]
