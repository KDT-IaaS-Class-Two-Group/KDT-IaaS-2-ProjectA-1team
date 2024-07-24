const root = document.getElementById('root');

const form = (action, method) => {
  let forms = `<form action="${action}" method="${method}"`;
  root.innerHTML = forms;
};

export default form;
