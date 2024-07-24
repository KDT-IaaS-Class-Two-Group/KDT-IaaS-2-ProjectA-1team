const root = document.getElementById('root') as HTMLElement;
root.innerHTML = 'hello world';

const addBut = document.createElement('button');
// const delBut = document.createElement('button');
// console.log(root);

addBut.textContent = '추가';

root.appendChild(addBut);

const tagMaker = (tagName: string): Element => {
  return document.createElement(tagName);
};

addBut.addEventListener('click', () => {
  const div = tagMaker('div');
  const inputAdd = tagMaker('input');
  const delBut = tagMaker('button');
  delBut.textContent = '삭제';

  const divCount = root.childElementCount;

  for (let i = 0; i < divCount; i++) {
    div.id = `item-${i + 1}`;
    delBut.id = `item-${i + 1}`;
  }

  if (delBut.id === div.id) {
    delBut.addEventListener('click', () => {
      div.remove();
    });
  }

  div.appendChild(inputAdd);
  div.appendChild(delBut);
  root.appendChild(div);

  // delBut.addEventListener('click', () => {
  //   const lastInput = root.lastElementChild as HTMLElement;
  //   root.removeChild(lastInput);
  // });
});
