import React from 'react';
import { Button } from './button';
import { AddInput } from './addInput';
import { AddBut } from './addBut';

export const Form = () => {
  return (
    <div>
      <AddBut />
      <form action="/createTable" method="post">
        <AddInput />
      </form>
    </div>
  );
};
