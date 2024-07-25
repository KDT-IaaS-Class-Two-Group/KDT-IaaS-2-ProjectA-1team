// 에러 객체의 타입 정의
export interface ErrorResponse {
  errorCode: number;
  errorMessage: string;
}

// 데이터 요청 함수
export async function searchData(): Promise<string | ErrorResponse> {
  const url: string = 'http://localhost:8000/searchData';

  try {
    // fetch를 사용하여 GET 요청 보내기
    const response: Response = await fetch(url, {
      method: 'GET',
    });

    // 응답 상태 확인
    if (!response.ok) {
      // 응답이 정상적이지 않은 경우 에러 생성
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // JSON 형식의 응답 데이터 가져오기 (문자열로)
    const data: string = await response.text();

    // 콘솔에 데이터 기록
    console.log('Received data:', data);
    console.log(typeof data);

    // 데이터 반환 (JSON 문자열로)
    return data;
  } catch (error: any) {
    // 에러 발생 시 에러 메시지와 코드 반환
    const errorResponse: ErrorResponse = {
      errorCode: error instanceof Error ? 500 : 400,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
    };

    // 콘솔에 에러 기록
    console.error('Error fetching data:', errorResponse);

    // 에러 응답 반환
    return errorResponse;
  }
}
