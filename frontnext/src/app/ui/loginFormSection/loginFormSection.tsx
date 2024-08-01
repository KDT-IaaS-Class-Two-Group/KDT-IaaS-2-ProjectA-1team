'use client';

import React, { FormEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

import { callApi } from '@/app/lib/AJAX';

import ConDiv from '../Header/headerComponent/createConDiv';

import LoginForm from './loginComponent/createLoginForm';

import ButtonClick from '../Header/headerComponent/createBtn';

import InputValueTag from './loginComponent/createInputTag';

import LoginLabelTag from './loginComponent/createLabelTag';

import { FormSectionstyles } from './loginComponent/loginFormStyles';

const LoginFormSection = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const useData = { id, password };
    const response = await callApi('8000/searchData/login', 'POST', useData);

    if (response) {
      router.push('/viewRef');
    } else {
    }
  };

  return (
    <>
      <ConDiv className={FormSectionstyles.container}>
        <LoginForm
          className={FormSectionstyles.form}
          onSubmitFunc={handleOnSubmit}
        >
          <ConDiv className={FormSectionstyles.labelInputContainer}>
            <LoginLabelTag
              className={FormSectionstyles.label}
              htmlFor={'id'}
              value={'아이디'}
            />
            <InputValueTag
              className={FormSectionstyles.input}
              type={'text'}
              name={'id'}
              value={id}
              placeholder={'ID를 입력하세요'}
              onChangeFunc={(e) => {
                setId(e.target.value);
              }}
            />
          </ConDiv>
          <ConDiv className={FormSectionstyles.labelInputContainer}>
            <LoginLabelTag
              className={FormSectionstyles.label}
              htmlFor={'password'}
              value={'비밀번호'}
            />
            <InputValueTag
              className={FormSectionstyles.input}
              type={'password'}
              name={'password'}
              value={password}
              placeholder={'password를 입력하세요'}
              onChangeFunc={(e) => {
                setPassword(e.target.value);
              }}
            />
          </ConDiv>
          <ConDiv className={FormSectionstyles.messageContainer}>
            <ButtonClick
              className={FormSectionstyles.button}
              type={'submit'}
              textNode="로그인"
            />
          </ConDiv>
        </LoginForm>
      </ConDiv>
    </>
  );
};

export default LoginFormSection;
