// createSet.ts
export const createSet = (id, handleDelete, containerRef, setCount) => {
  const newSet = document.createElement('div');
  newSet.id = `set-${id}`;
  newSet.style.display = 'flex';
  newSet.style.alignItems = 'center';
  newSet.style.marginBottom = '10px';

  const label = document.createElement('span');
  label.textContent = `항목 ${id}`;
  newSet.appendChild(label);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '내용을 입력하세요.';
  input.id = `item-${id}`;
  newSet.appendChild(input);

  const button = document.createElement('button');
  button.textContent = '항목 삭제';
  button.onclick = () => handleDelete(id, containerRef, setCount);
  newSet.appendChild(button);

  return newSet;
};
