import React from 'react';
import TotalStyles from '../styles/TotalStyles';
import { useLanguage } from './LanguageContext';

const Sidebar = ({
  isOpen,
  setSelectedMenu,
}: {
  isOpen: boolean;
  setSelectedMenu: (menu: string) => void;
}) => {
  const { language } = useLanguage();

  const texts = {
    ko: {
      userManagement: '사용자 관리',
      logAct: '로그 및 활동 추적',
      interfaceSettings: '인터페이스 설정',
      dataImportExport: '데이터 임포트/익스포트',
      reportSettings: '통계 및 보고서 설정',
      customerSupportSettings: '고객 지원 설정',
    },
    en: {
      userManagement: 'User Management',
      logAct: 'Log and Activity Tracking',
      interfaceSettings: 'Interface Settings',
      dataImportExport: 'Data Import/Export',
      reportSettings: 'Statistics and Report Settings',
      customerSupportSettings: 'Customer Support Settings',
    },
    jp: {
      userManagement: 'ユーザー管理',
      logAct: 'ログおよびアクティビティ追跡',
      interfaceSettings: 'インターフェース設定',
      dataImportExport: 'データのインポート/エクスポート',
      reportSettings: '統計とレポートの設定',
      customerSupportSettings: 'カスタマーサポート設定',
    },
    cn: {
      userManagement: '用户管理',
      logAct: '日志和活动跟踪',
      interfaceSettings: '界面设置',
      dataImportExport: '数据导入/导出',
      reportSettings: '统计和报告设置',
      customerSupportSettings: '客户支持设置',
    },
    vn: {
      userManagement: 'Quản lý người dùng',
      logAct: 'Theo dõi nhật ký và hoạt động',
      interfaceSettings: 'Cài đặt giao diện',
      dataImportExport: 'Nhập/Xuất dữ liệu',
      reportSettings: 'Cài đặt thống kê và báo cáo',
      customerSupportSettings: 'Cài đặt hỗ trợ khách hàng',
    },
    th: {
      userManagement: 'การจัดการผู้ใช้',
      logAct: 'การติดตามบันทึกและกิจกรรม',
      interfaceSettings: 'การตั้งค่าการเชื่อมต่อ',
      dataImportExport: 'การนำเข้า/ส่งออกข้อมูล',
      reportSettings: 'การตั้งค่าสถิติและรายงาน',
      customerSupportSettings: 'การตั้งค่าการสนับสนุนลูกค้า',
    },
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={TotalStyles.SettingSidebar}>
      <ul>
        <li
          className={TotalStyles.SettingButton}
          onClick={() => setSelectedMenu('userManagement')}
        >
          {texts[language].userManagement}
        </li>
        <li
          className={TotalStyles.SettingButton}
          onClick={() => setSelectedMenu('logAct')}
        >
          {texts[language].logAct}
        </li>
        <li
          className={TotalStyles.SettingButton}
          onClick={() => setSelectedMenu('interfaceSettings')}
        >
          {texts[language].interfaceSettings}
        </li>
        <li
          className={TotalStyles.SettingButton}
          onClick={() => setSelectedMenu('dataImportExport')}
        >
          {texts[language].dataImportExport}
        </li>
        <li
          className={TotalStyles.SettingButton}
          onClick={() => setSelectedMenu('reportSettings')}
        >
          {texts[language].reportSettings}
        </li>
        <li
          className={TotalStyles.SettingButton}
          onClick={() => setSelectedMenu('customerSupportSettings')}
        >
          {texts[language].customerSupportSettings}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
