import TagMaker from '@/app/ui/components/TagMaker';
/**
 * * input 태그 생성 및 세팅
 */
export const InputSet = (id: number) => {
  const input = TagMaker('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', `item-${id}`);
  input.setAttribute('placeholder', '내용을 입려하세요.');
  // console.log(input);
  return input;
};
