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

// * 정호연이 작업한 모듈
import TableModal from './modal/components/tableModal';
<<<<<<< HEAD
import { TabToggle } from './toggle/tabToggle';
=======
import HeaderSection from './Header/headerSection';
>>>>>>> 219d704 (:white_check_mark: 김정수 : 중간저장)

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

<<<<<<< HEAD
  return (
    <div id="root">
      <TabToggle />
      <div className={styles.container}>
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
      </div>
      <TableModal />
    </div>
  );
=======
  return <HeaderSection />;
>>>>>>> 219d704 (:white_check_mark: 김정수 : 중간저장)
};

export default RenderLoginFormSection;
