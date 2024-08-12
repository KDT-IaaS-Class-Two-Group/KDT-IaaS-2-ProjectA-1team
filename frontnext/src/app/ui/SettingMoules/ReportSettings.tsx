import React from 'react';
import { useLanguage } from './LanguageContext';
import { SettingStyles } from '../styles/styles-ys';

const ReportSettings = () => {
  const { language } = useLanguage();

  const texts = {
    ko: {
      reportFormat: '재고 보고서 형식 설정',
      statsDisplay: '통계 데이터 표시 방법 설정',
      autoSchedule: '보고서 자동 생성 및 스케줄링',
    },
    en: {
      reportFormat: 'Set Inventory Report Format',
      statsDisplay: 'Set Statistical Data Display',
      autoSchedule: 'Automate Report Generation and Scheduling',
    },
    jp: {
      reportFormat: '在庫報告書の形式を設定',
      statsDisplay: '統計データ表示方法の設定',
      autoSchedule: 'レポートの自動生成とスケジュール設定',
    },
    cn: {
      reportFormat: '设置库存报告格式',
      statsDisplay: '设置统计数据显示方式',
      autoSchedule: '自动生成和调度报告',
    },
    vn: {
      reportFormat: 'Đặt định dạng báo cáo hàng tồn kho',
      statsDisplay: 'Đặt phương thức hiển thị dữ liệu thống kê',
      autoSchedule: 'Tự động hóa tạo báo cáo và lên lịch',
    },
    th: {
      reportFormat: 'ตั้งค่ารูปแบบรายงานสินค้าคงคลัง',
      statsDisplay: 'ตั้งค่าวิธีการแสดงข้อมูลสถิติ',
      autoSchedule: 'การสร้างและจัดตารางรายงานอัตโนมัติ',
    },
  };

  return (
    <div className={SettingStyles.contentStyle}>
      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>
          {texts[language].reportFormat}
        </button>
        <button className={SettingStyles.button}>
          {texts[language].statsDisplay}
        </button>
        <button className={SettingStyles.button}>
          {texts[language].autoSchedule}
        </button>
      </div>
    </div>
  );
};

export default ReportSettings;
