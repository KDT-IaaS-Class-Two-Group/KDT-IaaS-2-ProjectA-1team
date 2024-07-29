import TagMaker from '@/app/ui/components/TagMaker';

export const LabelSet = (id: number) => {
  const label = TagMaker('label');
  label.textContent = `항목 ${id}`;
  // console.log(label);
  return label;
};
