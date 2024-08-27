import React, { useState, useEffect, useRef } from 'react';
import TableDataReturn from './TableComponents/TableDataReturn';
import TotalStyles from '@/app/ui/styles/TotalStyles';

interface TableDataProps {
  data: any[];
  onDataChange: (data: any[]) => void;
  headers: string[];
  editableHeaders: string[];
  onHeaderChange: (index: number, value: string) => void;
  onDeleteRow: (rowIndex: number) => void;
  onDeleteColumn: (colIndex: number) => void;
  headerErrors: string[];
}

const TableData: React.FC<TableDataProps> = ({
  data,
  onDataChange,
  headers,
  editableHeaders,
  onHeaderChange,
  onDeleteRow,
  onDeleteColumn,
  headerErrors,
}) => {
  const [tableData, setTableData] = useState(data);
  const [hoveredHeader, setHoveredHeader] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const headerRefs = useRef<(HTMLInputElement | null)[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleInputChange = (
    rowIndex: number,
    header: string,
    value: string,
  ) => {
    const updatedData = [...tableData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [header]: value };
    setTableData(updatedData);
    onDataChange(updatedData);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number,
    isHeader: boolean,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (isHeader) {
        if (inputRefs.current[0] && inputRefs.current[0][colIndex]) {
          inputRefs.current[0][colIndex]?.focus();
        }
      } else {
        if (
          inputRefs.current[rowIndex + 1] &&
          inputRefs.current[rowIndex + 1][colIndex]
        ) {
          inputRefs.current[rowIndex + 1][colIndex]?.focus();
        } else if (headerRefs.current[colIndex + 1]) {
          headerRefs.current[colIndex + 1]?.focus();
        }
      }
    }
  };

  const getInputClassName = (index: number) => {
    return headers.length >= 8
      ? TotalStyles.MainContentInputWide
      : TotalStyles.SidebarInput;
  };

  return (
    <TableDataReturn
      tableData={tableData}
      headers={headers}
      editableHeaders={editableHeaders}
      headerErrors={headerErrors}
      hoveredHeader={hoveredHeader}
      hoveredRow={hoveredRow}
      headerRefs={headerRefs}
      inputRefs={inputRefs}
      setHoveredHeader={setHoveredHeader}
      setHoveredRow={setHoveredRow}
      handleInputChange={handleInputChange}
      handleKeyDown={handleKeyDown}
      getInputClassName={getInputClassName}
      onHeaderChange={onHeaderChange}
      onDeleteColumn={onDeleteColumn}
      onDeleteRow={onDeleteRow}
    />
  );
};

export default TableData;
