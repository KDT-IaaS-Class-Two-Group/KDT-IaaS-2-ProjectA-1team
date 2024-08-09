import React from 'react';
import { SettingStyles } from '../styles/styles-ys';

const Sidebar = ({ isOpen, setSelectedMenu }: { isOpen: boolean, setSelectedMenu: (menu: string) => void }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={SettingStyles.sidebar}>
      <ul>
        <li className={SettingStyles.button} onClick={() => setSelectedMenu('userManagement')}>사용자 관리</li>
        <li className={SettingStyles.button} onClick={() => setSelectedMenu('logAct')}>로그 및 활동 추적</li>
        <li className={SettingStyles.button} onClick={() => setSelectedMenu('interfaceSettings')}>인터페이스 설정</li>
        <li className={SettingStyles.button} onClick={() => setSelectedMenu('dataImportExport')}>데이터 임포트/익스포트</li>
        <li className={SettingStyles.button} onClick={() => setSelectedMenu('reportSettings')}>통계 및 보고서 설정</li>
        <li className={SettingStyles.button} onClick={() => setSelectedMenu('customerSupportSettings')}>고객 지원 설정</li>
      </ul>
    </div>
  );
};

export default Sidebar;
