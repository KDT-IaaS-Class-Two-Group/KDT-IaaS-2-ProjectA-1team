const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = 3000;
const axios = require('axios');

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
  } else if (req.method === 'POST' && req.url === '/test') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log('Received data:', body);
      // app2.js 서버로 데이터 전송
      axios
        .post('http://localhost:8000/save', { data: body })
        .then((response) => {
          console.log('Data sent to app2.js and processed');
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Data received and processed');
        })
        .catch((error) => {
          console.error('Error sending data to app2.js:', error);
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
