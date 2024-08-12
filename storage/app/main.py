from fastapi import FastAPI
from routers.backup_router import router as backup_router

app = FastAPI();

app.include_router(backup_router, prefix="/backup")


if __name__ == "__main__" :
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=3300, reload=True)