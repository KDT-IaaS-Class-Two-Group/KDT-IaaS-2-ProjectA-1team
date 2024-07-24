const root = document.getElementById('root');
/**
 * @param {*} textNode div안에 내용
 */

const createDiv = (textNode) => {
  let Divs = `<div>"${textNode}"</div>`;
  root.innerHTML = Divs;
};

export default createDiv;
