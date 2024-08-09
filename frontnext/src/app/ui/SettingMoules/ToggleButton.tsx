import React from 'react';
import { SettingStyles } from '../styles/styles-ys';

const ToggleButton = ({ isOpen, toggleSidebar }: { isOpen: boolean, toggleSidebar: () => void }) => {
  return (
    <div
      className={`${SettingStyles.toggleButton}`}
      style={{ right: isOpen ? '87.5rem' : '103.5rem' }} // 사이드바 열림 상태에 따라 위치 조정
      onClick={toggleSidebar}
    >
      {isOpen ? '◀' : '▶'}
    </div>
  );
};

export default ToggleButton;
