/**
 * @param {*} parent 부모요소 id
 * @param {*} action form action
 * @param {*} method 메서드 종류
 */

const createForm = (parent, action, method) => {
  const a = document.getElementById(`${parent}`);
  let forms = `<form action="${action}" method="${method}"`;
  a.innerHTML = forms;
};

export default createForm;
