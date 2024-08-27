import React from 'react';
import TotalStyles from '@/app/ui/styles/TotalStyles';

interface TableRowProps {
  row: any;
  rowIndex: number;
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

const TableRow: React.FC<TableRowProps> = ({
  row,
  rowIndex,
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
    <tr
      key={rowIndex}
      className={TotalStyles.MainContentTr}
      onMouseEnter={() => setHoveredRow(rowIndex)}
      onMouseLeave={() => setHoveredRow(null)}
    >
      {headers.map((header, colIndex) => (
        <td key={colIndex} className={TotalStyles.MainContentTd}>
          <input
            ref={(el) => {
              if (!inputRefs.current[rowIndex]) {
                inputRefs.current[rowIndex] = [];
              }
              inputRefs.current[rowIndex][colIndex] = el;
            }}
            type="text"
            value={row[header] || ''}
            className={getInputClassName(colIndex)}
            onChange={(e) =>
              handleInputChange(rowIndex, header, e.target.value)
            }
            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex, false)}
          />
          {hoveredRow === rowIndex && colIndex === 0 && (
            <button
              className={TotalStyles.MainContentDeleteRowButton}
              onClick={() => onDeleteRow(rowIndex)}
            >
              -
            </button>
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableRow;
