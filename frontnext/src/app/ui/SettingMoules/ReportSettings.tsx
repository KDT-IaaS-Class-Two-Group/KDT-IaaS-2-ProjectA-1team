import React from 'react';
import { SettingStyles } from '../styles/styles-ys';

const ReportSettings = () => {
  return (
    <div className={SettingStyles.contentStyle}>
      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>재고 보고서 형식 설정</button>
        <button className={SettingStyles.button}>통계 데이터 표시 방법 설정</button>
        <button className={SettingStyles.button}>보고서 자동 생성 및 스케줄링</button>
      </div>
    </div>
  );
};

export default ReportSettings;
