import React, { useState } from 'react';
import { AddSets } from './addSets';
import RecommendTemp from '../../recommendTemp/recommendTemp';

export const CreateTableForm = () => {
  const [isRecommend, setIsRecommend] = useState(false);

  const handleRecommend = (): void => {
    setIsRecommend((prevState) => !prevState);
  };

  return (
    <div className="p-4">
      {!isRecommend ? (
        <form action="/createTable" method="post" className="mt-4">
          <input
            type="text"
            placeholder="테이블 이름을 입력하세요."
            className="border rounded-lg p-2 w-full mb-4"
          />
          <AddSets />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full mt-4"
            onClick={handleRecommend}
          >
            추천 템플릿
          </button>
        </form>
      ) : (
        <RecommendTemp
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full mb-4"
          onClose={handleRecommend}
        />
      )}
    </div>
  );
};
