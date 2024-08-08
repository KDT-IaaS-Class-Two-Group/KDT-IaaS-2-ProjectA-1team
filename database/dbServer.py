from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
from routers import table_router, data_router, create_table_router
from pwCheange import router as pwCheange_router  # pwCheange 라우터를 임포트
from typing import List
from createToCopy import copy_table_structure

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 허용할 오리진을 설정합니다.
    allow_credentials=True,
    allow_methods=["*"],  # 모든 HTTP 메서드를 허용합니다.
    allow_headers=["*"],  # 모든 HTTP 헤더를 허용합니다.
)

class VerifyRequest(BaseModel):
    id: str
    password: str

class UpdateTableRequest(BaseModel):
    table: str
    data: List[dict]

@app.post("/login")
def verify_user(request: VerifyRequest):
    print('login')
    DATABASE = 'login.db'
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id FROM adminData WHERE id = ? AND password = ?",
        (request.id, request.password)
    )
    row = cursor.fetchone()
    conn.close()

    if row:
        return True
    else:
        return False

@app.post("/updateTable")
def update_table(request: UpdateTableRequest):
    try:
        conn = sqlite3.connect('정호연.db')
        cursor = conn.cursor()

        # Clear existing data
        cursor.execute(f'DELETE FROM "{request.table}"')

        # Insert updated data
        columns = ', '.join(request.data[0].keys())
        placeholders = ', '.join(['?' for _ in request.data[0].keys()])
        for row in request.data:
            values = tuple(row.values())
            cursor.execute(f'INSERT INTO "{request.table}" ({columns}) VALUES ({placeholders})', values)

        conn.commit()
        conn.close()
        return {"message": "테이블이 정상적으로 업데이트 되었습니다"}
    except sqlite3.Error as e:
        raise HTTPException(status_code=500, detail=f"테이블 업데이트 중 오류 발생: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"알 수 없는 오류 발생: {str(e)}")

app.include_router(table_router)  # table_router를 추가한다.
app.include_router(data_router)  # data_router를 추가한다.
app.include_router(create_table_router)  # create_table_router를 추가한다.
app.include_router(pwCheange_router)  # pwCheange 라우터를 추가

class Recommend(BaseModel):
    table: str

@app.post('/createRecommend')
def create_recommend(request: Recommend):
    print('createRecommend')
    copy_table_structure(request.table)

    print(bool(request.table))
    # JSON 응답으로 반환
    return {"success": bool(request.table)}

if __name__ == "__dbServer__":
    import uvicorn
    uvicorn.run("dbServer:app", host="0.0.0.0", port=8080, reload=True)
