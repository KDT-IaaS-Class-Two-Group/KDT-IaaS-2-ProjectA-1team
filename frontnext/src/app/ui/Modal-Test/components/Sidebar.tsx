import React from 'react';
import TableModal from './CreateTableModal';
import TableList from './TableList';
import SidebarStyles from '../styles/SidebarStyles';

interface SidebarProps {
  onTableClick: (tableName: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTableClick }) => {
  return (
    <>
      <TableModal />
      <div className={SidebarStyles.sidebar}>
        <TableList onTableClick={onTableClick} />
      </div>
    </>
  );
};

export default Sidebar;
