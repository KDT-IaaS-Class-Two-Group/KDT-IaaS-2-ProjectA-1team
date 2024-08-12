import React from 'react';
import TotalStyles from '../styles/TotalStyles';

const InterfaceSettings = () => {
  return (
    <div className={TotalStyles.SettingContentStyle}>
      <div className={TotalStyles.SettingButtonContainer}>
        <button className={TotalStyles.SettingButton}>
          테마 변경 (다크 모드, 라이트 모드)
        </button>
        <button className={TotalStyles.SettingButton}>
          인터페이스 언어 설정
        </button>
      </div>
    </div>
  );
};

export default InterfaceSettings;
