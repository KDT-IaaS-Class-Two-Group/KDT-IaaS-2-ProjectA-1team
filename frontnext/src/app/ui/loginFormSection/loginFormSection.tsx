'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { callApi } from '@/app/lib/AJAX';
import ConDiv from '../Header/headerComponent/createConDiv';
import LoginForm from './loginComponent/createLoginForm';
import ButtonClick from '../Header/headerComponent/createBtn';
import InputValueTag from './loginComponent/createInputTag';
import LoginLabelTag from './loginComponent/createLabelTag';
import TotalStyles from '../styles/TotalStyles';
import { LoginFormText } from './loginComponent/loginFormLiteral';
import LoginCheckModal from '../Modal-Test/modalLoginCheck';

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
      <ConDiv className={TotalStyles.LoginContainer}>
        <LoginForm
          className={TotalStyles.LoginForm}
          onSubmitFunc={handleOnSubmit}
        >
          <ConDiv className={TotalStyles.LoginLabelInputContainer}>
            <LoginLabelTag
              className={TotalStyles.LoginLabel}
              htmlFor={LoginFormText.form.nameI}
              value={LoginFormText.form.valueID}
            />
            <InputValueTag
              className={TotalStyles.LoginInput}
              type={LoginFormText.form.inputTypeT}
              name={LoginFormText.form.nameI}
              value={id}
              placeholder={LoginFormText.form.placeholders.id}
              onChangeFunc={(e) => setId(e.target.value)}
            />
          </ConDiv>
          <ConDiv className={TotalStyles.LoginLabelInputContainer}>
            <LoginLabelTag
              className={TotalStyles.LoginLabel}
              htmlFor={LoginFormText.form.password}
              value={LoginFormText.form.valuePassword}
            />
            <InputValueTag
              className={TotalStyles.LoginInput}
              type={LoginFormText.form.inputTypeP}
              name={LoginFormText.form.password}
              value={password}
              placeholder={LoginFormText.form.placeholders.password}
              onChangeFunc={(e) => setPassword(e.target.value)}
            />
          </ConDiv>
          <ConDiv className={TotalStyles.LoginMessageContainer}>
            <ButtonClick
              className={TotalStyles.LoginButton}
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
