// import 문으로 익스트랙 함수 불러오기
import extractNumbers from './replaceInt';

// 숫자를 가격 형식으로 변환하는 함수
const formatPrice = (value: number): string => {
  return value.toLocaleString('ko-KR') + ' 원';
};

// 배열에서 가격을 합산하고 포맷화하는 함수
const sumFromArray = (array: string[]): string => {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += extractNumbers(array[i]);
  }

  return formatPrice(sum);
};

// 함수 익스포트
export { sumFromArray };
