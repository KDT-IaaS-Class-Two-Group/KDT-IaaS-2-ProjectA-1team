import React from 'react';
import TotalStyles from '@/app/ui/styles/TotalStyles';
import TableRow from './TableRow';

interface TableBodyProps {
  tableData: any[];
  headers: string[];
  hoveredRow: number | null;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[][]>;
  setHoveredRow: (index: number | null) => void;
  handleInputChange: (rowIndex: number, header: string, value: string) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number,
    isHeader: boolean,
  ) => void;
  getInputClassName: (index: number) => string;
  onDeleteRow: (index: number) => void;
}

const TableBody: React.FC<TableBodyProps> = ({
  tableData,
  headers,
  hoveredRow,
  inputRefs,
  setHoveredRow,
  handleInputChange,
  handleKeyDown,
  getInputClassName,
  onDeleteRow,
}) => {
  return (
    <tbody className={TotalStyles.MainContentTbody}>
      {tableData.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          headers={headers}
          hoveredRow={hoveredRow}
          inputRefs={inputRefs}
          setHoveredRow={setHoveredRow}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          getInputClassName={getInputClassName}
          onDeleteRow={onDeleteRow}
        />
      ))}
    </tbody>
  );
};

export default TableBody;
