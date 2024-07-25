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
    // 중간 서버가 있을 경우
    if (intermediateUrls && intermediateUrls.length > 0) {
      // 중간 서버를 순차적으로 거치기 위한 초기 데이터 설정
      let intermediateData = data;

      // 중간 서버를 순차적으로 거치면서 데이터 전송
      for (const intermediateUrl of intermediateUrls) {
        const response = await fetch(intermediateUrl, {
          method: 'POST', // POST 메소드 사용
          headers: {
            'Content-Type': 'application/json', // JSON 형식의 데이터 전송
          },
          body: JSON.stringify(intermediateData), // 데이터를 JSON 문자열로 변환하여 전송
        });

        // 응답 결과 확인
        if (!response.ok) {
          throw new Error(`Intermediate server error: ${response.statusText}`);
        }

        // 중간 서버에서 반환된 데이터를 다음 서버로 전달하기 위해 저장
        intermediateData = await response.json();
      }

      // 마지막 최종 서버로 데이터 전송
      const finalResponse = await fetch(url, {
        method: 'POST', // POST 메소드 사용
        headers: {
          'Content-Type': 'application/json', // JSON 형식의 데이터 전송
        },
        body: JSON.stringify(intermediateData), // 최종 데이터를 JSON 문자열로 변환하여 전송
      });

      // 최종 응답 결과 확인
      if (!finalResponse.ok) {
        throw new Error(`Final server error: ${finalResponse.statusText}`);
      }

      // 최종 서버에서 반환된 데이터를 반환
      return await finalResponse.json();
    } else {
      // 중간 서버가 없을 경우 바로 최종 서버로 데이터 전송
      const response = await fetch(url, {
        method: 'POST', // POST 메소드 사용
        headers: {
          'Content-Type': 'application/json', // JSON 형식의 데이터 전송
        },
        body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
      });

      // 응답 결과 확인
      if (!response.ok) {
        throw new Error(`Final server error: ${response.statusText}`);
      }

      // 최종 서버에서 반환된 데이터를 반환
      return await response.json();
    }
  } catch (error) {
    // 에러 발생 시 콘솔에 에러 메시지 출력
    console.error('Error during data transmission:', error);
    throw error;
  }
}

// 함수를 외부에서 사용할 수 있도록 export
export default sendData;
