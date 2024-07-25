/**
 *
 * @param url string - 데이터를 전송할 최종 URL
 * @param data T - 전송할 데이터 객체 (제네릭 타입 사용)
 * @param intermediateUrls string[] - 중간 서버를 거쳐 갈 경우 중간 서버들의 URL 목록
 * @returns
 */
async function sendData<T>(
  url: string,
  data: T,
  intermediateUrls?: string[],
): Promise<T> {
  try {
    // 만약 중간 서버들이 있으면
    if (intermediateUrls && intermediateUrls.length > 0) {
      // 처음엔 보내려는 데이터를 그대로 사용
      let intermediateData = data;

      // 모든 중간 서버들을 순서대로 거쳐가며 데이터 전송
      for (const intermediateUrl of intermediateUrls) {
        // 중간 서버로 데이터를 보내기 위해 fetch 함수 사용
        const response = await fetch(intermediateUrl, {
          method: 'POST', // 데이터를 보낼 때는 POST 방식 사용
          headers: {
            'Content-Type': 'application/json', // 데이터가 JSON 형식임을 서버에 알려줌
          },
          body: JSON.stringify(intermediateData), // 데이터를 JSON 문자열로 변환해서 보냄
        });

        // 서버 응답이 성공적인지 확인
        if (!response.ok) {
          throw new Error(`Intermediate server error: ${response.statusText}`);
        }

        // 중간 서버에서 받은 응답 데이터를 다음 서버로 보낼 데이터로 업데이트
        intermediateData = await response.json();
      }

      // 마지막 최종 서버로 데이터 전송
      const finalResponse = await fetch(url, {
        method: 'POST', // 데이터를 보낼 때는 POST 방식 사용
        headers: {
          'Content-Type': 'application/json', // 데이터가 JSON 형식임을 서버에 알려줌
        },
        body: JSON.stringify(intermediateData), // 최종 데이터를 JSON 문자열로 변환해서 보냄
      });

      // 최종 서버 응답이 성공적인지 확인
      if (!finalResponse.ok) {
        throw new Error(`Final server error: ${finalResponse.statusText}`);
      }

      // 최종 서버에서 받은 데이터를 반환
      return await finalResponse.json();
    } else {
      // 중간 서버가 없으면 바로 최종 서버로 데이터 전송
      const response = await fetch(url, {
        method: 'POST', // 데이터를 보낼 때는 POST 방식 사용
        headers: {
          'Content-Type': 'application/json', // 데이터가 JSON 형식임을 서버에 알려줌
        },
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환해서 보냄
      });

      // 서버 응답이 성공적인지 확인
      if (!response.ok) {
        throw new Error(`Final server error: ${response.statusText}`);
      }

      // 최종 서버에서 받은 데이터를 반환
      return await response.json();
    }
  } catch (error) {
    // 에러 발생 시 콘솔에 에러 메시지 출력
    console.error('데이터 전송 중 에러 발생:', error);
    throw error;
  }
}

// 함수를 외부에서 사용할 수 있도록 export
export default sendData;

// 예제 사용 방법

// 중간 서버가 있는 경우
// const intermediateUrls = [
//   "http://localhost:3000/api/step1"
// ];

// 중간 서버가 없는 경우
// const noIntermediateUrls: string[] = [];

// const finalUrl = "http://localhost:3001/final";

// const data = {
//   id: "user123",
//   password: "securepassword"
// };

// 데이터를 중간 서버를 거쳐 전송하는 예제
// sendData(finalUrl, data, intermediateUrls)
//   .then(response => {
//       console.log('최종 응답:', response);
//   })
//   .catch(error => {
//       console.error('에러 발생:', error);
//   });

// 데이터를 중간 서버 없이 바로 전송하는 예제
// sendData(finalUrl, data, noIntermediateUrls)
//   .then(response => {
//       console.log('최종 응답:', response);
//   })
//   .catch(error => {
//       console.error('에러 발생:', error);
//   });
