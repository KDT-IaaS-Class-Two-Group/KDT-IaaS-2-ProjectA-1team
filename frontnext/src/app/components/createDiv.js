const root = document.getElementById('root');
/**
 * @param {*} action form action
 * @param {*} method 메서드 종류
 */

const createDiv = (textNode) => {
  let Divs = `<div>${textNode}</div>`;
  root.innerHTML = Divs;
};

export default createDiv;
