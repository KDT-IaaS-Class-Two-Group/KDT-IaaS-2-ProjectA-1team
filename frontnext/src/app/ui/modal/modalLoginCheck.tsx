'use client';

import React from 'react';

import ConDiv from '../Header/headerComponent/createConDiv';

import { LoginCheckCardStyles } from './modalStyle';

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
      <ConDiv className={LoginCheckCardStyles.cardContainer}>
        <ConDiv className={LoginCheckCardStyles.cardContent}>
          <ModalPTag
            textNode={Message}
            className={LoginCheckCardStyles.cardBody}
          />
          <ButtonClick
            type={btnType}
            textNode={BtnLiteral}
            clickFunc={clickFunc}
            className={LoginCheckCardStyles.cardButton}
          />
        </ConDiv>
      </ConDiv>
    </>
  );
};

export default LoginCheckModal;
