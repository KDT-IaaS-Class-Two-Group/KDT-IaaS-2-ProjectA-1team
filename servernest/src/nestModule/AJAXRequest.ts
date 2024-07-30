// fetchUndefine.ts

export interface FetchUndefineOptions {
  method: string;
  url: string;
  data?: string; // JSON 데이터를 문자열로 전달받을 때의 타입
}

export async function fetchUndefine({
  method,
  url,
  data,
}: FetchUndefineOptions): Promise<any> {
  try {
    // 요청 옵션 구성
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // POST 요청일 경우 데이터 추가
    if (method.toUpperCase() === 'POST' && data) {
      options.body = data; // 문자열로 된 JSON 데이터
    }

    // fetch를 사용하여 비동기 요청 수행
    const response = await fetch(url, options);

    // 응답이 성공적인지 확인
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 응답 데이터를 JSON으로 파싱
    const responseData = await response.json();

    // 파싱한 데이터 반환
    return responseData;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Failed to fetch data from external API');
  }
}
