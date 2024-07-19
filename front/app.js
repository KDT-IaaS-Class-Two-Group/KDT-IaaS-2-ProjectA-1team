const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const PORT = 3000;

// 서버 생성
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  } else if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const parsedBody = new URLSearchParams(body);
      const id = parsedBody.get('id');
      const password = parsedBody.get('password');
      console.log('Received ID:', id);
      console.log('Received Password:', password);

      // mainserver.js로 데이터 전송
      axios
        .post('http://localhost:8000/authenticate', { id, password })
        .then((response) => {
          if (response.data.success) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('show');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('alert');
          }
        })
        .catch((error) => {
          console.error('Error sending data to mainserver.js:', error);
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
        });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
