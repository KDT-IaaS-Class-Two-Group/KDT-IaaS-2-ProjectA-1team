from fastapi import FastAPI

app = FastAPI();


@app.get('/')
def helloThere():
    man = "world"
    print(f"hello there my name is {man}")

if __name__ == "__main__" :
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=3300, reload=True)