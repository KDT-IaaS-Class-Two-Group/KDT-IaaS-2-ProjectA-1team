import React from 'react';
import { AddSets } from './addSets';

export const CreateTableForm = () => {
  return (
    <div className="p-4">
      <form action="/createTable" method="post" className="mt-4">
        <input
          type="text"
          placeholder="테이블 이름을 입력하세요."
          className="border rounded-lg p-2 w-full mb-4"
        />
        <AddSets />
      </form>
    </div>
  );
};
