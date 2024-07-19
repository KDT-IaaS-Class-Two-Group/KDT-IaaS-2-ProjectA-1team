// SQLite3 모듈 불러오기
const sqlite3 = require('sqlite3').verbose();

// 데이터베이스 파일 경로 설정
const dbPath = './database/logIn.db';

// 데이터베이스 연결
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to the logIn database.');
});

// 테이블 생성 쿼리
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS adminData (
        id TEXT PRIMARY KEY,
        password TEXT
    )
`;

// 데이터 추가 쿼리
const insertDataQuery = `
    INSERT INTO adminData (id, password)
    VALUES ('admin', '1234')
`;

// 테이블 생성
db.run(createTableQuery, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('adminData table created or already exists.');
  }
});

// 데이터 추가
db.run(insertDataQuery, (err) => {
  if (err) {
    console.error('Error inserting data:', err.message);
  } else {
    console.log('Data inserted into adminData table.');
  }
});

// 데이터베이스 연결 종료
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Disconnected from the logIn database.');
});
