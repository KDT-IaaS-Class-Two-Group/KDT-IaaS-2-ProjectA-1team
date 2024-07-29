import TagMaker from '@/app/ui/components/TagMaker';
import { AttrId } from './attributeId';
/**
 * * input 태그 생성 및 세팅
 */
export const InputSet = () => {
  const input = TagMaker('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', `item-${AttrId}`);
  input.setAttribute('placeholder', '내용을 입려하세요.');
  console.log(input);
};
