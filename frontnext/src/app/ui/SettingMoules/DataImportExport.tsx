import React from 'react';
import { SettingStyles } from '../styles/styles-ys';

const DataImportExport = () => {
  return (
    <div className={SettingStyles.contentStyle}>

      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>재고 데이터 임포트 (CSV)</button>
        <button className={SettingStyles.button}>재고 데이터 익스포트 (CSV)</button>
        <button className={SettingStyles.button}>재고 데이터 임포트 (Excel)</button>
        <button className={SettingStyles.button}>재고 데이터 익스포트 (Excel)</button>
      </div>
    </div>
  );
};

export default DataImportExport;
