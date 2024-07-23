const root = document.getElementById('root');

const Input = (type, id, name) => {
  let content = `<input type="${type}" id="${id}" name="${name}">`;
  root.innerHTML = content;
};

export default Input;
