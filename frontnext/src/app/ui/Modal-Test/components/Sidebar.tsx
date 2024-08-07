import React from 'react';
import SidebarStyles from '../styles/SidebarStyles';

interface SidebarProps {
  toggleModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ toggleModal }) => {
  return (
    <div className={SidebarStyles.sidebar}>
      <button
        className={`${SidebarStyles.button} ${SidebarStyles.createButton}`}
        onClick={toggleModal}
      >
        테이블 생성
      </button>
    </div>
  );
};

export default Sidebar;
