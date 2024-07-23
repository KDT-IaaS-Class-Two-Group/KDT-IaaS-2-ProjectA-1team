// HTTP 모듈을 불러옵니다.
const http = require('http');
// dbServer 모듈을 불러옵니다.
const dbServer = require('./testmodule');

// 서버를 생성합니다.
const server = http.createServer((req, res) => {
  // 요청이 POST 메서드이고, URL이 /login인 경우 처리합니다.
  if (req.method === 'POST' && req.url === '/godbserver') {
    let body = '';

    // 요청 본문을 수신합니다.
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // 요청 본문 수신이 완료되면 처리합니다.
    req.on('end', () => {
      // 요청 본문을 JSON으로 파싱합니다.
      const { id, password } = JSON.parse(body);
      console.log(id, password);

      // 아이디와 비밀번호를 확인합니다.
      dbServer.checkUserCredentials(id, password, (err, isValid) => {
        if (err) {
          // 에러가 발생하면 500 상태 코드와 에러 메시지를 응답합니다.
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              success: false,
              message: 'Internal Server Error',
            }),
          );
          return;
        }

        // 200 상태 코드와 함께 인증 결과를 응답합니다.
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: isValid }));
      });
    });
  } else {
    // 다른 요청에 대해서는 404 상태 코드와 'Not Found' 메시지를 응답합니다.
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// 서버를 8080 포트에서 실행합니다.
const PORT = 8080;
server.listen(PORT, () => {
  // 서버가 실행되면 콘솔에 메시지를 출력합니다.
  console.log(`Server is running on port ${PORT}`);
});
