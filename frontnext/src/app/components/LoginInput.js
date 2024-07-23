const root = document.getElementById('root');

const LoginInput = (type, id, name) => {
  let content = `<input type="${type}" id="${id}" name="${name}">`;
  root.innerHTML = content;
};

export default LoginInput;
