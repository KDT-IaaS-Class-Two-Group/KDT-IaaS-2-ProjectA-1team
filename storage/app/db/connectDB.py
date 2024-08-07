from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "sqlite:///./backup/backupstorage.db"

engine = create_engine(DATABASE_URL)
SessionLocal= sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)

def connect_db():
    db = SessionLocal()
    try : 
        Base.metadata.create_all(bind=engine)
        yield db
    finally:
        print('Database created')
        db.close()