export const handleDelete = (id, containerRef, setCount) => {
  const element = document.getElementById(`set-${id}`);
  if (element) {
    element.remove();
    updateLabels(containerRef, setCount);
  }
};

export const updateLabels = (containerRef, setCount) => {
  const remainingSets = containerRef.current.querySelectorAll('div');
  remainingSets.forEach((set, index) => {
    const label = set.querySelector('span');
    const input = set.querySelector('input');
    const button = set.querySelector('button');
    const newId = index + 1;
    label.textContent = `항목 ${newId}`;
    input.id = `item-${newId}`;
    button.onclick = () => handleDelete(newId, containerRef, setCount);
    set.id = `set-${newId}`;
  });
  setCount(remainingSets.length);
};
