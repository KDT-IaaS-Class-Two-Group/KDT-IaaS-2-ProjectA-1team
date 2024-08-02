from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import table_router, data_router  # user_router, table_router, data_router를 불러온다.

app = FastAPI()

# CORS 설정 추가
origins = [
    "http://localhost:3001",  # Next.js 애플리케이션의 주소
    "http://127.0.0.1:3001"   # Next.js 애플리케이션의 주소
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(table_router)  # table_router를 추가한다.
app.include_router(data_router)  # data_router를 추가한다.

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
