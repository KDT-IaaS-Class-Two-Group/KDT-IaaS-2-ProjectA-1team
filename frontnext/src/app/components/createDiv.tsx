/**
 * @param {*} parent 부모 요소 id
 * @param {*} textNode div안에 내용
 */

const createDiv = (parent, textNode) => {
  const a = document.getElementById(`${parent}`);
  let Divs = `<div>"${textNode}"</div>`;
  a.innerHTML = Divs;
};

export default createDiv;
