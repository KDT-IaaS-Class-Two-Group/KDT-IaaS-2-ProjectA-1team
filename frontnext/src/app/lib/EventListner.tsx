
const root = document.getElementById('root') as HTMLElement;
root.innerHTML = 'hello world';

const addBut = document.createElement('button');
const delBut = document.createElement('button');
// console.log(root);

addBut.textContent = '추가'
delBut.textContent = "삭제"

root.appendChild(addBut);
root.appendChild(delBut);

const tagMaker = (tagName:string) :Element => {
 return document.createElement(tagName);
};

addBut.addEventListener('click', () => {
  // root.style.color = 'blue'
  const inputAdd = tagMaker('input')
  root.appendChild(inputAdd)
});

delBut.addEventListener('click', () => {
  const lastInput = root.lastElementChild as HTMLElement;
  root.removeChild(lastInput);
});