const root = document.getElementById('root');
/**
 *
 * @param {*} type input type
 * @param {*} id input id
 * @param {*} name input name
 * @returns
 */
const Input = (type, id, name) => {
  let content = `<input type="${type}" id="${id}" name="${name}">`;
  root.innerHTML = content;
};

export default Input;
