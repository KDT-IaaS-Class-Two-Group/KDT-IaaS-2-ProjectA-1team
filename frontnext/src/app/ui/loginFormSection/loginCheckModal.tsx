'use client';

import React from 'react';

import TotalStyles from '../styles/TotalStyles';



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
      <div className={TotalStyles.ModalOverlay}>
        <div className={TotalStyles.LoginCardContent}>
          <p className={TotalStyles.LoginCardBody}>{Message}</p>
          <button type={btnType} onClick={clickFunc} className={TotalStyles.LoginCardButton}>{BtnLiteral}</button>
        </div>
      </div>
    </>
  );
};

export default LoginCheckModal;
