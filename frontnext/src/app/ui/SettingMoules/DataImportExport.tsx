import React from 'react';
import { useLanguage } from './LanguageContext';
import { SettingStyles } from '../styles/styles-ys';

const DataImportExport = () => {
  const { language } = useLanguage();

  const texts = {
    ko: {
      importCsv: '재고 데이터 임포트 (CSV)',
      exportCsv: '재고 데이터 익스포트 (CSV)',
      importExcel: '재고 데이터 임포트 (Excel)',
      exportExcel: '재고 데이터 익스포트 (Excel)',
    },
    en: {
      importCsv: 'Import Inventory Data (CSV)',
      exportCsv: 'Export Inventory Data (CSV)',
      importExcel: 'Import Inventory Data (Excel)',
      exportExcel: 'Export Inventory Data (Excel)',
    },
    jp: {
      importCsv: '在庫データのインポート (CSV)',
      exportCsv: '在庫データのエクスポート (CSV)',
      importExcel: '在庫データのインポート (Excel)',
      exportExcel: '在庫データのエクスポート (Excel)',
    },
    cn: {
      importCsv: '导入库存数据 (CSV)',
      exportCsv: '导出库存数据 (CSV)',
      importExcel: '导入库存数据 (Excel)',
      exportExcel: '导出库存数据 (Excel)',
    },
    vn: {
      importCsv: 'Nhập dữ liệu hàng tồn kho (CSV)',
      exportCsv: 'Xuất dữ liệu hàng tồn kho (CSV)',
      importExcel: 'Nhập dữ liệu hàng tồn kho (Excel)',
      exportExcel: 'Xuất dữ liệu hàng tồn kho (Excel)',
    },
    th: {
      importCsv: 'นำเข้าข้อมูลสต็อก (CSV)',
      exportCsv: 'ส่งออกข้อมูลสต็อก (CSV)',
      importExcel: 'นำเข้าข้อมูลสต็อก (Excel)',
      exportExcel: 'ส่งออกข้อมูลสต็อก (Excel)',
    },
  };

  return (
    <div className={SettingStyles.contentStyle}>
      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>
          {texts[language].importCsv}
        </button>
        <button className={SettingStyles.button}>
          {texts[language].exportCsv}
        </button>
        <button className={SettingStyles.button}>
          {texts[language].importExcel}
        </button>
        <button className={SettingStyles.button}>
          {texts[language].exportExcel}
        </button>
      </div>
    </div>
  );
};

export default DataImportExport;
