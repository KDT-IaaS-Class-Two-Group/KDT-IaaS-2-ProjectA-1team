// Express 모듈을 불러옵니다.
const express = require("express");

// HTTP 요청의 본문을 해석할 수 있게 해주는 body-parser 모듈을 불러옵니다.
const bodyParser = require("body-parser");

// HTTP 요청을 보내기 위해 node-fetch 모듈을 불러옵니다.
const fetch = require("node-fetch");

// Express 애플리케이션을 생성합니다.
const app = express();

// 서버가 수신할 포트를 설정합니다.
const port = 8000;

// Express 애플리케이션에서 body-parser 미들웨어를 사용하도록 설정합니다.
// 이 설정을 통해 JSON 형식의 요청 본문을 해석할 수 있게 됩니다.
app.use(bodyParser.json());

// POST 요청을 처리하는 "/gomainserver" 경로를 설정합니다.
app.post("/gomainserver", async (req, res) => {
  // 요청 본문에서 id와 password를 추출합니다.
  const { id, password } = req.body;

  try {
    // id와 password를 dbServer.js로 전달하여 검증을 요청합니다.
    const response = await fetch("http://localhost:8080/godbserver", {
      method: "POST", // HTTP POST 메서드를 사용합니다.
      headers: { "Content-Type": "application/json" }, // 요청 헤더에 Content-Type을 JSON으로 설정합니다.
      body: JSON.stringify({ id, password }), // 요청 본문에 id와 password를 JSON 형식으로 변환하여 포함시킵니다.
    });

    // dbServer.js에서 반환된 응답을 JSON 형식으로 해석합니다.
    const dbResponse = await response.json();

    // 클라이언트에 dbServer.js의 응답을 그대로 전달합니다.
    res.send(dbResponse);
  } catch (error) {
    // 에러가 발생하면 콘솔에 에러를 출력하고 500 상태 코드와 함께 "Internal Server Error" 메시지를 클라이언트에 보냅니다.
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Express 애플리케이션이 설정된 포트에서 요청을 수신하기 시작합니다.
app.listen(port, () => {
  // 서버가 정상적으로 실행 중임을 나타내는 메시지를 콘솔에 출력합니다.
  console.log(`Main server running at http://localhost:${port}`);
});
