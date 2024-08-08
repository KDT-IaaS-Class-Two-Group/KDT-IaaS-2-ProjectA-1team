from fastapi import FastAPI
from db.connectDB import connect_db

app = FastAPI();


@app.get('/')
def helloThere():
    DBPATH = "./app/backup/backupstorage.db"
    man = "world"
    print(f"hello there my name is {man}")
    conn = connect_db(DBPATH)
    try : 
        cursor = conn.cursor()
        cursor.execute("CREATE TABLE IF NOT EXISTS eest (id INTEGER, name TEXT)")
        cursor.execute("INSERT INTO test (id, name) VALUES (?, ?)",("1","TEST"))
        conn.commit()
    finally : 
        conn.close()

if __name__ == "__main__" :
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=3300, reload=True)