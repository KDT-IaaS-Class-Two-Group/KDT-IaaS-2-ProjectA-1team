import React from 'react';
import { Button } from './button';
import { AddInput } from './addInput';

export const Form = () => {
  return (
    <div>
      <form action="/createTable" method="post">
        <AddInput />
      </form>
    </div>
  );
};
