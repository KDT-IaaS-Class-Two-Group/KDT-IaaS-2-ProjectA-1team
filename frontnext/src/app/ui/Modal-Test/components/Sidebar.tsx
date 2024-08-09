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
    <div className={SidebarStyles.sidebar}>
      {/* 테이블 생성 버튼 및 모달 */}
      <TableModal />

      {/* 열 추가 및 행 추가 버튼 */}
      <div className={SidebarStyles.buttonContainer}>
        <AddColumnButton onAddColumn={onAddColumn} />
        <AddRowButton onAddRow={onAddRow} />
      </div>

      {/* 테이블 목록 */}
      <TableList onTableClick={onTableClick} />
    </div>
  );
};

export default Sidebar;
