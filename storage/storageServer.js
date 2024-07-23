// http 모듈을 불러옵니다.
const http = require('http');

// 서버 포트를 설정합니다.
const PORT = 3300;

// 서버를 생성합니다.
const server = http.createServer((req, res) => {
  // 요청 메소드가 GET이고, 요청 URL이 '/'인 경우
  if (req.method === 'GET' && req.url === '/') {
    console.log('serverConnect');

    // 300번 상태 코드를 설정합니다.
    res.writeHead(300, { 'Content-Type': 'text/plain' });

    // 응답 본문을 설정합니다.
    res.end();
  } else {
    // 다른 요청에 대해서는 404 상태 코드를 반환합니다.
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found\n');
  }
});

// 서버를 지정된 포트에서 시작합니다.
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
