from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./backupstorage.db"

engine = create_engine(DATABASE_URL)
SessionLocal= sessionmaker(autocommit=False, autoflush=False, bind=engine)

def connect_db():
    db = SessionLocal()
    try : 
        yield db
    finally:
        db.close()