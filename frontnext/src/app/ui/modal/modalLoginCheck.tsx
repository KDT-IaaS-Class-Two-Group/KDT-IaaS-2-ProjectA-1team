'use client';

import React from 'react';

import ConDiv from '../Header/headerComponent/createConDiv';

import { ModalStyles } from './modalStyle';

import ButtonClick from '../Header/headerComponent/createBtn';

import ModalPTag from './components/createPTag';

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
      <ConDiv className={ModalStyles.modalOverlay}>
        <ConDiv className={ModalStyles.modalContent}>
          <ModalPTag
            textNode={Message}
            className={ModalStyles.messageContainer}
          />
          <ButtonClick
            type={btnType}
            textNode={BtnLiteral}
            clickFunc={clickFunc}
            className={ModalStyles.closeButton}
          />
        </ConDiv>
      </ConDiv>
    </>
  );
};

export default LoginCheckModal;
