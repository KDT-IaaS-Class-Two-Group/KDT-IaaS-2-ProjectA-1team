import React from 'react';
import TotalStyles from '../styles/TotalStyles';

const DataImportExport = () => {
  return (
    <div className={TotalStyles.SettingContentStyle}>
      <div className={TotalStyles.SettingButtonContainer}>
        <button className={TotalStyles.SettingButton}>
          재고 데이터 임포트 (CSV)
        </button>
        <button className={TotalStyles.SettingButton}>
          재고 데이터 익스포트 (CSV)
        </button>
        <button className={TotalStyles.SettingButton}>
          재고 데이터 임포트 (Excel)
        </button>
        <button className={TotalStyles.SettingButton}>
          재고 데이터 익스포트 (Excel)
        </button>
      </div>
    </div>
  );
};

export default DataImportExport;
