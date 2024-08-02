'use client';

import React, { FormEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { callApi } from '@/app/lib/AJAX';

import ConDiv from '../Header/headerComponent/createConDiv';

import LoginForm from './loginComponent/createLoginForm';

import ButtonClick from '../Header/headerComponent/createBtn';

import InputValueTag from './loginComponent/createInputTag';

import LoginLabelTag from './loginComponent/createLabelTag';

import { FormSectionstyles } from './loginComponent/loginFormStyles';

import { LoginFormText } from './loginComponent/loginFormLiteral';

import LoginCheckModal from '../modal/modalLoginCheck';

const LoginFormSection = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isResText, setIsResText] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const router = useRouter();

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const useData = { id, password };
    const response = await callApi(
      LoginFormText.AJAXReq.url,
      LoginFormText.AJAXReq.method,
      useData,
    );

    if (response) {
      setIsResText(true);
    } else {
      setIsResText(false);
      setIsLoginModal(true);
    }
  };

  const handleLoginModal = () => {
    setIsLoginModal(false);
  };

  useEffect(() => {
    if (isResText) {
      router.push(LoginFormText.route);
    }
  }, [isResText]);

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
              htmlFor={LoginFormText.form.nameI}
              value={LoginFormText.form.valueID}
            />
            <InputValueTag
              className={FormSectionstyles.input}
              type={LoginFormText.form.inputTypeT}
              name={LoginFormText.form.nameI}
              value={id}
              placeholder={LoginFormText.form.placeholders.id}
              onChangeFunc={(e) => setId(e.target.value)}
            />
          </ConDiv>
          <ConDiv className={FormSectionstyles.labelInputContainer}>
            <LoginLabelTag
              className={FormSectionstyles.label}
              htmlFor={LoginFormText.form.password}
              value={LoginFormText.form.valuePassword}
            />
            <InputValueTag
              className={FormSectionstyles.input}
              type={LoginFormText.form.inputTypeP}
              name={LoginFormText.form.password}
              value={password}
              placeholder={LoginFormText.form.placeholders.password}
              onChangeFunc={(e) => setPassword(e.target.value)}
            />
          </ConDiv>
          <ConDiv className={FormSectionstyles.messageContainer}>
            <ButtonClick
              className={FormSectionstyles.button}
              type={LoginFormText.form.buttonType}
              textNode={LoginFormText.form.submitButton}
            />
          </ConDiv>
        </LoginForm>

        {isLoginModal && (
          <LoginCheckModal
            clickFunc={handleLoginModal}
            btnType={LoginFormText.modal.modalBtnType}
            BtnLiteral={LoginFormText.modal.modalBtnText}
            Message={LoginFormText.modal.pMessage}
          />
        )}
      </ConDiv>
    </>
  );
};

export default LoginFormSection;
