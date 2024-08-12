import React from 'react';
import TotalStyles from '../styles/TotalStyles';

const LogAct = () => {
  return (
    <div className={TotalStyles.SettingContentStyle}>
      <div className={TotalStyles.SettingButtonContainer}>
        <button className={TotalStyles.SettingButton}>
          사용자 활동 로그 조회
        </button>
        <button className={TotalStyles.SettingButton}>
          로그 파일 저장 및 다운로드
        </button>
      </div>
    </div>
  );
};

export default LogAct;
