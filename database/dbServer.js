const http = require('http');
const sqlite3 = require('sqlite3').verbose();
const { parse } = require('querystring');

const PORT = 8000;
const db = new sqlite3.Database('./test.db');

// 데이터베이스 초기화 및 테이블 생성
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS user (name TEXT)');
});

// 서버 생성
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const postData = JSON.parse(body);
      const userName = postData.data;

      // 데이터 삽입
      db.serialize(() => {
        const stmt = db.prepare('INSERT INTO user (name) VALUES (?)');
        stmt.run(userName, (err) => {
          if (err) {
            console.error('Error inserting data:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
            return;
          }
          console.log('Data inserted successfully');
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Data saved to database');
        });
        stmt.finalize();
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// 서버 실행
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
