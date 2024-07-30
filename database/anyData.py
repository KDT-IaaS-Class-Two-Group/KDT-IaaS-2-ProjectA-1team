from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Data(BaseModel):
    putid: str
    putpas: str

@app.post("/database")
async def receive_data(data: Data):
    print(f"Data received at /database: {data}")
    transformed_data = "확인완료"
    return {"message": transformed_data}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)


# front <-> main <-> database 서버 간의 데이터 전송을 확인하기 위한 코드