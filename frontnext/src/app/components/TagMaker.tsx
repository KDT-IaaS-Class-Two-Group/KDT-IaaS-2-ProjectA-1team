/**
 *
 * @param {*} tagNames TagName 입력
 * @returns
 */

const TagMaker = (tagNames) => {
  return document.createElement(tagNames);
};

export default TagMaker;
