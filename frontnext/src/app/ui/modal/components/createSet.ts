// createSet.ts
export const createSet = (
  id: number,
  handleDelete: (
    id: number,
    containerRef: React.RefObject<HTMLDivElement>,
    setCount: React.Dispatch<React.SetStateAction<number>>,
  ) => void,
  containerRef: React.RefObject<HTMLDivElement>,
  setCount: React.Dispatch<React.SetStateAction<number>>,
) => {
  const newSet = document.createElement('div');
  newSet.id = `set-${id}`;
  newSet.classList.add('flex', 'items-center', 'mb-2.5', 'w-full');

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '항목을 입력하세요.';
  input.id = `item-${id}`;
  input.classList.add(
    'flex-grow',
    'border',
    'rounded-lg',
    'p-2',
    'text-sm',
    'mr-2',
  );
  newSet.appendChild(input);

  const button = document.createElement('button');
  button.textContent = '⏤';
  button.onclick = () => handleDelete(id, containerRef, setCount);
  button.classList.add(
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
