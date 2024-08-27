import React from 'react';
import TableModal from '@/app/ui/Modal-Test/components/CreateTableModal';
import TableList from './TableList';
import TotalStyles from '@/app/ui/styles/TotalStyles';
import { SidebarProps } from './components/SidebarProps';

const Sidebar: React.FC<SidebarProps> = ({
  onTableClick,
  onAddRow,
  onAddColumn,
}) => {
  return (
    <div className={`${TotalStyles.sidebar} ${TotalStyles.SidebarHeight}`}>
      {/* 테이블 생성 버튼 및 모달 */}
      <TableModal />

      {/* 열 추가 및 행 추가 버튼 */}
      <div className={TotalStyles.SidebarButtonContainer}>
        <AddColumnButton onClick={onAddColumn} />
        <AddRowButton onClick={onAddRow} />
      </div>

      {/* 테이블 목록 */}
      <TableList onTableClick={onTableClick} />
    </div>
  );
};

export default Sidebar;
