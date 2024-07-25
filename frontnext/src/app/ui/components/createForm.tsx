import React from 'react';

/**
 *
 * @param parent 부모 요소의 ID
 * @param action 폼의 action URL
 * @param method 폼의 메서드 (GET, POST 등)
 */
const createForm = (parent: string, action: string, method: string) => {
  const a = document.getElementById(parent);
  const forms = `<form action="${action}" method="${method}">`;
  if (a) {
    a.innerHTML = forms;
  }
};

export default createForm;
