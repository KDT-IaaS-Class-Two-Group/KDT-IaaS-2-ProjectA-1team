import React from 'react';
import TableModal from './CreateTableModal';
import TableList from './TableList';
import AddRowButton from './AddRowButton';
import AddColumnButton from './AddColumnButton';
import SidebarStyles from '../styles/SidebarStyles';

interface SidebarProps {
  onTableClick: (tableName: string) => void;
  onAddRow: () => void;
  onAddColumn: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onTableClick,
  onAddRow,
  onAddColumn,
}) => {
  return (
    <>
      <TableModal />
      <div className={SidebarStyles.sidebar}>
        <TableList onTableClick={onTableClick} />
        <div className={SidebarStyles.buttonContainer}>
          <AddRowButton onAddRow={onAddRow} />
          <AddColumnButton onAddColumn={onAddColumn} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
