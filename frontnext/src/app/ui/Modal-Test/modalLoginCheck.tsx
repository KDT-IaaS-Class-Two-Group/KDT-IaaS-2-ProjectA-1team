'use client';

import React from 'react';

import ConDiv from '../Header/headerComponent/createConDiv';

import TotalStyles from '../styles/TotalStyles';

import ButtonClick from '../Header/headerComponent/createBtn';

import ModalPTag from './components/createTag';

interface LoginCheckProps {
  clickFunc: () => void;
  btnType: 'button';
  Message: string;
  BtnLiteral: string;
}

const LoginCheckModal: React.FC<LoginCheckProps> = ({
  clickFunc,
  btnType,
  Message,
  BtnLiteral,
}) => {
  return (
    <>
      <ConDiv className={TotalStyles.LoginCardContainer}>
        <ConDiv className={TotalStyles.LoginCardContent}>
          <ModalPTag textNode={Message} className={TotalStyles.LoginCardBody} />
          <ButtonClick
            type={btnType}
            textNode={BtnLiteral}
            clickFunc={clickFunc}
            className={TotalStyles.LoginCardButton}
          />
        </ConDiv>
      </ConDiv>
    </>
  );
};

export default LoginCheckModal;
