// SQLite3 모듈을 불러옵니다.
const sqlite3 = require('sqlite3').verbose();

// login.db 데이터베이스 파일을 엽니다. 파일이 없으면 새로 만듭니다.
const db = new sqlite3.Database('./database/login.db');

// 데이터베이스 초기화
db.serialize(() => {
  // users 테이블을 만듭니다. 이미 존재하면 아무 작업도 하지 않습니다.
  db.run(
    'CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, password TEXT)',
  );
  // 예제 사용자 데이터를 삽입합니다. 중복된 id 값이 있으면 무시됩니다.
  db.run(
    "INSERT OR IGNORE INTO users (id, password) VALUES ('user1', 'password123')",
  );
  db.run(
    "INSERT OR IGNORE INTO users (id, password) VALUES ('user2', 'password456')",
  );
});

// 사용자의 아이디와 비밀번호를 확인하는 함수
function checkUserCredentials(id, password, callback) {
  // 데이터베이스에서 id와 password가 일치하는 사용자를 찾습니다.
  db.get(
    'SELECT * FROM adminData WHERE id = ? AND password = ?',
    [id, password],
    (err, row) => {
      if (err) {
        // 에러가 발생하면 콜백 함수에 에러를 전달합니다.
        callback(err, null);
        return;
      }
      // row가 있으면 true, 없으면 false를 반환합니다.
      callback(null, !!row);
    },
  );
}

// checkUserCredentials 함수를 모듈로 내보냅니다.
module.exports = { checkUserCredentials };
