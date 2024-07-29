'use client';

import React, { useState, FormEvent } from 'react';
import Form from './testComponent/MakeFormSection';
import Message from './testComponent/InputMessage';
import { styles } from './testComponent/stylesContent';
import {
  SUCCESS_MESSAGE,
  FAILURE_MESSAGE,
} from './testComponent/labelsContent';
import { fetchData } from '../lib/fetchDataTest';

import { AddBut } from '../lib/client/addSets';
import { CreateTableForm } from '../lib/client/form';

const RenderLoginFormSection: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Assume fetchData is a function that sends data to the server and returns true or false
    const response = await fetchData({ id, password });
    if (response) {
      setMessage(SUCCESS_MESSAGE);
      setIsSuccess(true);
    } else {
      setMessage(FAILURE_MESSAGE);
      setIsSuccess(false);
    }
  };

  return (
    <div id="root">
      <CreateTableForm />
      {/* <div className={styles.container}>
        {message === null ? (
          <Form
            id={id}
            password={password}
            setId={setId}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
          />
        ) : (
          <Message message={message} isSuccess={isSuccess} />
        )}
      </div> */}
    </div>
  );
};

export default RenderLoginFormSection;
