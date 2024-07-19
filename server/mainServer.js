const http = require('http');
const PORT = 8000;

// 서버 생성
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/authenticate') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { id, password } = JSON.parse(body);

      // 간단한 인증 로직 (id와 password가 'admin'일 때 성공)
      const success = id === 'admin' && password === 'admin';

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Main server running at http://localhost:${PORT}/`);
});
