// deleteButton.tsx
import TagMaker from '@/app/ui/components/TagMaker';

export const DeleteBut = (id: number) => {
  const button = TagMaker('button');
  button.textContent = '항목 삭제';
  button.setAttribute('id', `item-${id}`);
  console.log(button);
  return button;
};
