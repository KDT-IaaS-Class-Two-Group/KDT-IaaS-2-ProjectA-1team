import React from 'react';
import TotalStyles from '@/app/ui/styles/TotalStyles';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

interface TableDataReturnProps {
  tableData: any[];
  headers: string[];
  editableHeaders: string[];
  headerErrors: string[];
  hoveredHeader: number | null;
  hoveredRow: number | null;
  headerRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[][]>;
  setHoveredHeader: (index: number | null) => void;
  setHoveredRow: (index: number | null) => void;
  handleInputChange: (rowIndex: number, header: string, value: string) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number,
    isHeader: boolean,
  ) => void;
  getInputClassName: (index: number) => string;
  onHeaderChange: (index: number, value: string) => void;
  onDeleteColumn: (index: number) => void;
  onDeleteRow: (index: number) => void;
}

const TableDataReturn: React.FC<TableDataReturnProps> = ({
  tableData,
  headers,
  editableHeaders,
  headerErrors,
  hoveredHeader,
  hoveredRow,
  headerRefs,
  inputRefs,
  setHoveredHeader,
  setHoveredRow,
  handleInputChange,
  handleKeyDown,
  getInputClassName,
  onHeaderChange,
  onDeleteColumn,
  onDeleteRow,
}) => {
  if (!tableData || tableData.length === 0) {
    return <div className="text-gray-500">데이터가 없습니다.</div>;
  }

  return (
    <div className={TotalStyles.MainContentTableContainer}>
      <div className={TotalStyles.MainContentTableWrapper}>
        <table className={TotalStyles.MainContentTable}>
          <TableHeader
            headers={headers}
            editableHeaders={editableHeaders}
            headerErrors={headerErrors}
            hoveredHeader={hoveredHeader}
            headerRefs={headerRefs}
            setHoveredHeader={setHoveredHeader}
            handleKeyDown={handleKeyDown}
            getInputClassName={getInputClassName}
            onHeaderChange={onHeaderChange}
            onDeleteColumn={onDeleteColumn}
          />
          <TableBody
            tableData={tableData}
            headers={headers}
            hoveredRow={hoveredRow}
            inputRefs={inputRefs}
            setHoveredRow={setHoveredRow}
            handleInputChange={handleInputChange}
            handleKeyDown={handleKeyDown}
            getInputClassName={getInputClassName}
            onDeleteRow={onDeleteRow}
          />
        </table>
      </div>
    </div>
  );
};

export default TableDataReturn;
