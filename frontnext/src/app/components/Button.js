// 버튼 안에 내용을 동적으로 적용
const Butt = document.createElement('button');

const button = (buttonText) => {
  Butt.innerText = `${buttonText}`;
  return Butt;
};

export default button;
