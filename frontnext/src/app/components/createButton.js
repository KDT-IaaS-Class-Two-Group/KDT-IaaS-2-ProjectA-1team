// 버튼 안에 내용을 동적으로 적용
/**
 * @param {*} buttonText 버튼 이름
 * @returns
 */
const createButton = (buttonText) => {
  const Butt = document.createElement('button');
  Butt.innerText = `${buttonText}`;
  return Butt;
};

export default createButton;
