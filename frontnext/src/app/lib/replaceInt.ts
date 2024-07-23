// 숫자 추출 및 변환 기능을 위한 모듈

// 인터페이스 정의
interface StringToNumberConverter {
    (input: string): number;
}

// 함수 구현
const extractNumbers: StringToNumberConverter = (input: string): number => {
    // 문자열에서 숫자만 추출
    const numbersOnly = input.replace(/\D/g, '');
    // 정수로 변환하여 반환
    return parseInt(numbersOnly, 10);
};

// 함수 익스포트
export default extractNumbers;