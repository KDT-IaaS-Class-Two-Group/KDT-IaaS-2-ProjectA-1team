type UseDataType = object | string;
type ApiResponseType = boolean | string | object;

export const callApi = async (
  url: string,
  method: string,
  usedata: UseDataType,
): Promise<ApiResponseType> => {
  try {
    const response = await fetch(`http://localhost:${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usedata), // data 객체를 JSON 문자열로 변환하여 요청 본문에 포함시킴
    });
    const result: ApiResponseType = await response.json();
    return result; // 응답 데이터를 반환
  } catch (error) {
    console.error('Error:', error);
    throw error; // 오류 발생 시 예외를 던져서 호출하는 곳에서 처리할 수 있게 함
  }
};

// 사용 예시 login post 요청을 받아서 data를 8000/gomain으로 보내는 것

// app.post("/login", async (req, res) => {
//   const id = req.body.id;
//   const password = req.body.password;

//   const data = { putid: id, putpas: password };
//   console.log(data);

//   try {
//     const result = await callApi("8000/gomain", "POST", data);
//     console.log("Response from gomain:", result);
//     res.send("로그인 시도됨");
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).send("서버 오류");
//   }
// });
