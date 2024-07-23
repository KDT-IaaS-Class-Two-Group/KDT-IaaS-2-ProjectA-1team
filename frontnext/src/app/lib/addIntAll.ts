// import 문으로 익스트랙 함수 불러오기
import extractNumbers from './replaceInt';

// 가격 형식으로 변환하는 함수
const formatPrice = (value: number): string => {
  return value.toLocaleString('ko-KR', { minimumFractionDigits: 0 }) + ' 원';
};

// 객체에서 가격을 합산하고 포맷화하는 함수
interface PriceObject {
  price: string[];
}

const sumFromObject = (obj: PriceObject): string => {
  let sum = 0;
  const priceArray = obj.price;

  for (let i = 0; i < priceArray.length; i++) {
    sum += extractNumbers(priceArray[i]);
  }

  return formatPrice(sum);
};

// 배열에서 가격을 합산하고 포맷화하는 함수
const sumFromArray = (array: string[]): string => {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += extractNumbers(array[i]);
  }

  return formatPrice(sum);
};

// 함수들을 익스포트
export { sumFromObject, sumFromArray };
