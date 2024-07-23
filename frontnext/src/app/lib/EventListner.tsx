const root = document.getElementById('root');

const addBut = document.createElement('button');
const delBut = document.createElement('button');

addBut.textContent = '추가'
delBut.textContent = "삭제"

root?.appendChild(addBut);
root?.appendChild(delBut);