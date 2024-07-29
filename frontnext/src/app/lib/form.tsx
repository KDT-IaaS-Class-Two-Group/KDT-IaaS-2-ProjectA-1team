import React from 'react';
import { AddSets } from './addSets';

export const CreateTableForm = () => {
  return (
    <div>
      <AddSets />
      <form action="/createTable" method="post">
        <button type="submit">생성</button>
      </form>
    </div>
  );
};
