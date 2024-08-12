import React from 'react';
import TotalStyles from '../styles/TotalStyles';

const ToggleButton = ({
  isOpen,
  toggleSidebar,
}: {
  isOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <div
      className={`${TotalStyles.SettingToggleButton} ${isOpen ? TotalStyles.SettingToggleButtonOpen : TotalStyles.SettingToggleButtonClosed}`}
      onClick={toggleSidebar}
    >
      {isOpen ? '◀' : '▶'}
    </div>
  );
};

export default ToggleButton;
