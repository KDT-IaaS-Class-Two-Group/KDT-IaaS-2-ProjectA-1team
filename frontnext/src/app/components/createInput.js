/**
 * @param {*} parent 부모요소 id
 * @param {*} type input type
 * @param {*} id input id
 * @param {*} name input name
 * @returns
 */
const createInput = (parent, type, id, name) => {
  const a = document.getElementById(`${parent}`);
  let content = `<input type="${type}" id="${id}" name="${name}">`;
  a.innerHTML = content;
};

export default createInput;
