import React, { useState, useEffect, useRef } from 'react';
import TableStyles from '../../styles/TableDataStyles';

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
  const headerRefs = useRef<Array<HTMLInputElement | null>>([]);
  const inputRefs = useRef<Array<Array<HTMLInputElement | null>>>([]);

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
        if (inputRefs.current[rowIndex + 1]) {
          inputRefs.current[rowIndex + 1][colIndex]?.focus();
        } else if (headerRefs.current[colIndex + 1]) {
          headerRefs.current[colIndex + 1]?.focus();
        }
      }
    }
  };

  if (!tableData || tableData.length === 0) {
    return <div className="text-gray-500">데이터가 없습니다.</div>;
  }

  return (
    <div className={TableStyles.tableContainer}>
      <table className={TableStyles.table}>
        <thead className={TableStyles.thead}>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className={TableStyles.th}
                onMouseEnter={() => setHoveredHeader(index)}
                onMouseLeave={() => setHoveredHeader(null)}
              >
                <input
                  ref={(el) => (headerRefs.current[index] = el)}
                  type="text"
                  value={editableHeaders[index]}
                  className={TableStyles.headerInput}
                  onChange={(e) => onHeaderChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, 0, index, true)}
                />
                {hoveredHeader === index && (
                  <button
                    className={TableStyles.deleteColumnButton}
                    onClick={() => onDeleteColumn(index)}
                  >
                    -
                  </button>
                )}
                {headerErrors[index] && (
                  <div className={TableStyles.errorText}>
                    {headerErrors[index]}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={TableStyles.tbody}>
          {tableData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={TableStyles.tr}
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {headers.map((header, colIndex) => (
                <td key={header} className={TableStyles.td}>
                  <input
                    ref={(el) => {
                      if (!inputRefs.current[rowIndex]) {
                        inputRefs.current[rowIndex] = [];
                      }
                      inputRefs.current[rowIndex][colIndex] = el;
                    }}
                    type="text"
                    value={row[header] || ''}
                    className={TableStyles.rowInput}
                    onChange={(e) =>
                      handleInputChange(rowIndex, header, e.target.value)
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(e, rowIndex, colIndex, false)
                    }
                  />
                  {hoveredRow === rowIndex && colIndex === 0 && (
                    <button
                      className={TableStyles.deleteRowButton}
                      onClick={() => onDeleteRow(rowIndex)}
                    >
                      -
                    </button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableData;
