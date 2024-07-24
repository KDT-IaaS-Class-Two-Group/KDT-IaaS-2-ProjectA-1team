/**
 *
 * @param {*} parent 부모요소 id
 * @param {*} type span 타입
 * @param {*} value span type의 값
 * @param {*} textNode span안에 내용
 */

const createSpan = (parent, type, value, textNode) => {
  const a = document.getElementById(`${parent}`);
  let spans = `<span ${type}="${value}">"${textNode}"</span>`;
  a.innerHTML = spans;
};

export default createSpan;
