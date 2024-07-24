const root = document.getElementById('root');
/**
 * @param {*} action form action
 * @param {*} method 메서드 종류
 */

const createForm = (action, method) => {
  let forms = `<form action="${action}" method="${method}"`;
  root.innerHTML = forms;
};

export default createForm;
