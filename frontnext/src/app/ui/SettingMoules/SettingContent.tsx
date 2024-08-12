import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { SettingStyles } from '../styles/styles-ys';
import UserManagement from './UserManagement';
import LogAct from './LogAct';
import InterfaceSettings from './InterfaceSettings';
import DataImportExport from './DataImportExport';
import ReportSettings from './ReportSettings';
import CustomerSupportSettings from './CustomerSupportSettings'; // CustomerSupportSettings 컴포넌트 불러오기

const MainContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case 'userManagement':
        return <UserManagement />;
      case 'logAct':
        return <LogAct />;
      case 'interfaceSettings':
        return <InterfaceSettings />;
      case 'dataImportExport':
        return <DataImportExport />;
      case 'reportSettings':
        return <ReportSettings />;
      case 'customerSupportSettings':
        return <CustomerSupportSettings />; // 고객 지원 설정 선택 시 컴포넌트 렌더링
      default:
        return;
    }
  };

  return (
    <div className={SettingStyles.containerStyle}>
      <Sidebar isOpen={isSidebarOpen} setSelectedMenu={setSelectedMenu} />
      <div className={SettingStyles.contentStyle}>{renderContent()}</div>
    </div>
  );
};

export default MainContent;
