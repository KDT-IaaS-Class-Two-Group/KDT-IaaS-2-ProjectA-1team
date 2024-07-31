import { Attribute } from './attribute';
import React from 'react'; //html + js -> reqct hook
import ReactDOM from 'react';

const root = document.getElementById('root') as HTMLElement;
const addBut = document.createElement('button');

addBut.textContent = '추가';

root.appendChild(addBut);

const tagMaker = (tagName: string): Element => {
  return document.createElement(tagName);
};

addBut.addEventListener('click', () => {
  const div = tagMaker('div');
  const label = tagMaker('label');
  const inputAdd = tagMaker('input');
  const inputDel = tagMaker('button');
  inputDel.textContent = '삭제';

  const divCount = root.childElementCount;

  div.id = `item-${divCount}`;
  inputDel.id = `item-${divCount}`;
  label.innerHTML = `항목 ${divCount}`;

  if (inputDel.id === div.id) {
    inputDel.addEventListener('click', () => {
      div.remove();
    });
  }

  div.appendChild(label);
  div.appendChild(inputAdd);
  div.appendChild(inputDel);
  root.appendChild(div);
});
