// createSet.ts
export const createSet = (id, handleDelete, containerRef, setCount) => {
  const newSet = document.createElement('div');
  newSet.id = `set-${id}`;
  newSet.classList.add('flex', 'items-center', 'mb-2.5');

  const label = document.createElement('span');
  label.textContent = `항목 ${id}`;
  newSet.appendChild(label);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '내용을 입력하세요.';
  input.id = `item-${id}`;
  input.classList.add('ml-2', 'border', 'rounded', 'p-1', 'text-sm');
  newSet.appendChild(input);

  const button = document.createElement('button');
  button.textContent = '항목 삭제';
  button.onclick = () => handleDelete(id, containerRef, setCount);
  button.classList.add(
    'ml-2',
    'bg-red-500',
    'text-white',
    'rounded',
    'px-2',
    'py-1',
    'hover:bg-red-600',
  );
  newSet.appendChild(button);

  return newSet;
};
