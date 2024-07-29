import { join } from 'path';

/**
 * * 어트리뷰트 설정 함수
 * @param tag 태그이름
 * @param attrType 어트리뷰트 타입 | id, class 등
 * @param attrContent 어트리뷰트의 이름
 * @returns 어튜리뷰트를 설정하는 명령어
 */
export const Attribute = (
  tag: Element,
  attrType: string,
  attrContent: string,
): any => {
  return tag.setAttribute(attrType, attrContent);
};
