// Express 모듈을 불러옵니다.
const express = require('express');

// HTTP 요청의 본문을 해석할 수 있게 해주는 body-parser 모듈을 불러옵니다.
const bodyParser = require('body-parser');

// axios 모듈을 불러옵니다.
const axios = require('axios');

// Express 애플리케이션을 생성합니다.
const app = express();

// 서버가 수신할 포트를 설정합니다.
const port = 8000;

// Express 애플리케이션에서 body-parser 미들웨어를 사용하도록 설정합니다.
// 이 설정을 통해 JSON 형식의 요청 본문을 해석할 수 있게 됩니다.
app.use(bodyParser.json());

// POST 요청을 처리하는 "/authenticate" 경로를 설정합니다.
app.post('/authenticate', async (req, res) => {
  // 요청 본문에서 id와 password를 추출합니다.
  console.log(req.body);
  const { id, password } = req.body;

  try {
    // id와 password를 dbServer.js로 전달하여 검증을 요청합니다.
    console.log(id, password);
    console.log({ id, password });
    const response = await axios.post('http://localhost:8080/godbserver', { id, password });
    // console.log(response);

    // dbServer.js에서 반환된 응답을 클라이언트에 그대로 전달합니다.
    res.json(response.data);
  } catch (error) {
    // 에러가 발생하면 콘솔에 에러를 출력하고 500 상태 코드와 함께 "Internal Server Error" 메시지를 클라이언트에 보냅니다.
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Express 애플리케이션이 설정된 포트에서 요청을 수신하기 시작합니다.
app.listen(port, () => {
  // 서버가 정상적으로 실행 중임을 나타내는 메시지를 콘솔에 출력합니다.
  console.log(`Main server running at http://localhost:${port}`);
});
