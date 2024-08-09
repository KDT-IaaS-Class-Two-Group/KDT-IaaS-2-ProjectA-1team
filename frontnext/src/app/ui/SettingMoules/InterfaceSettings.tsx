import React from 'react';
import { SettingStyles } from '../styles/styles-ys';

const InterfaceSettings = () => {
  return (
    <div className={SettingStyles.contentStyle}>
      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>테마 변경 (다크 모드, 라이트 모드)</button>
        <button className={SettingStyles.button}>인터페이스 언어 설정</button>
      </div>
    </div>
  );
};

export default InterfaceSettings;
