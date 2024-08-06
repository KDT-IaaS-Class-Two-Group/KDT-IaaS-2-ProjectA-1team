// deleteButton.tsx
import { handleDelete } from '../ui/Modal-Test/utils/utils';

import TagMaker from '@/app/ui/components/TagMaker';

export const ButtonSet = (
  id: any,
  handleDelete: any,
  containerRef: any,
  setCount: any,
) => {
  const button = TagMaker('button');
  button.textContent = '항목 삭제';
  button.id = `item-${id}`;
  button.onclick = () => handleDelete(id, containerRef, setCount);
  // console.log(button);
  return button;
};
