import React from 'react';
import TotalStyles from '../styles/TotalStyles';

const ReportSettings = () => {
  return (
    <div className={TotalStyles.SettingContentStyle}>
      <div className={TotalStyles.SettingButtonContainer}>
        <button className={TotalStyles.SettingButton}>
          재고 보고서 형식 설정
        </button>
        <button className={TotalStyles.SettingButton}>
          통계 데이터 표시 방법 설정
        </button>
        <button className={TotalStyles.SettingButton}>
          보고서 자동 생성 및 스케줄링
        </button>
      </div>
    </div>
  );
};

export default ReportSettings;
