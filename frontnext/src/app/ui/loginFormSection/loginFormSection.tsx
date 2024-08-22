'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { callApi } from '@/app/lib/AJAX';
import LoginForm from './loginComponent/loginFormTag';
import ButtonClick from '../Header/headerComponent/createBtn';
import InputValueTag from './loginComponent/loginInputTag';
import LoginLabelTag from './loginComponent/loginLabelTag';
import TotalStyles from '../styles/TotalStyles';
import { LoginFormText } from './loginComponent/loginFormLiteral';
import LoginCheckModal from './loginCheckModal';

const LoginFormSection = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isResText, setIsResText] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const router = useRouter();

  /**
   * * AJAX요청을 보내는 함수
   * * 유저가 입력한 값을 useState로 받아온다.
   * * callAPi는 lib에 있는 기능을 활용.
   * * 모든 리터럴값은 loginFormLiteral.tsx파일에서 호출
   * @param e // FormEvent
   */
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

  // * 확인 버튼을 클릭하면 Modal창이 사라지는 효과.
  const handleLoginModal = () => {
    setIsLoginModal(false);
  };

  /**
   * * AJAX 요청의 결과에 따라 처리되는 기능
   * * true라면 useRouter의 기능으로, viewRef로 이동
   * * 해당 Literal값은 loginFormLiteral에서 변경 가능.
   */
  useEffect(() => {
    if (isResText) {
      router.push(LoginFormText.route);
    }
  }, [isResText]);

  return (
    <>
      <div className={TotalStyles.LoginContainer}>
        <LoginForm
          className={TotalStyles.LoginForm}
          onSubmitFunc={handleOnSubmit}
        >
          <div className={TotalStyles.LoginLabelInputContainer}>
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
          </div>
          <div className={TotalStyles.LoginLabelInputContainer}>
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
          </div>
          <div className={TotalStyles.LoginMessageContainer}>
            <ButtonClick
              className={TotalStyles.LoginButton}
              type={LoginFormText.form.buttonType}
              textNode={LoginFormText.form.submitButton}
            />
          </div>
        </LoginForm>

        {isLoginModal && (
          <LoginCheckModal
            clickFunc={handleLoginModal}
            btnType={LoginFormText.modal.modalBtnType}
            BtnLiteral={LoginFormText.modal.modalBtnText}
            Message={LoginFormText.modal.pMessage}
          />
        )}
      </div>
    </>
  );
};

export default LoginFormSection;
