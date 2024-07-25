import React from 'react';
import { AddInput } from './addInput';
import { AddBut } from './addBut';

export const Form = () => {
  return (
    <div>
      <AddBut />
      <form action="/createTable" method="post"></form>
    </div>
  );
};
