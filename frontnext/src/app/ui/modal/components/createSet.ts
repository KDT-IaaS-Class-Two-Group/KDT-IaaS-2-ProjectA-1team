// createSet.ts
export const createSet = (id, handleDelete, containerRef, setCount) => {
  const newSet = document.createElement('div');
  newSet.id = `set-${id}`;
  newSet.classList.add('flex', 'items-center', 'mb-2.5');

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '항목을 입력하세요.';
  input.id = `item-${id}`;
  input.classList.add('ml-2', 'border', 'rounded', 'p-1', 'text-sm');
  newSet.appendChild(input);

  const button = document.createElement('button');
  button.textContent = '⏤';
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
