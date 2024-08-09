import React from 'react';
import { SettingStyles } from '../styles/styles-ys';

const LogAct = () => {
  return (
    <div className={SettingStyles.contentStyle}>
    
      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>사용자 활동 로그 조회</button>
        <button className={SettingStyles.button}>로그 파일 저장 및 다운로드</button>
      </div>
    </div>
  );
};

export default LogAct;
