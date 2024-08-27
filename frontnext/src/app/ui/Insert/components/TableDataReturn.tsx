import React from 'react';
import TotalStyles from '../../styles/TotalStyles';

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
          <thead className={TotalStyles.MainContentThead}>
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={TotalStyles.MainContentTh}
                  onMouseEnter={() => setHoveredHeader(index)}
                  onMouseLeave={() => setHoveredHeader(null)}
                >
                  <input
                    ref={(el) => (headerRefs.current[index] = el)}
                    type="text"
                    value={editableHeaders[index]}
                    className={getInputClassName(index)}
                    onChange={(e) => onHeaderChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 0, index, true)}
                  />
                  {hoveredHeader === index && (
                    <button
                      className={TotalStyles.MainContentDeleteColumnButton}
                      onClick={() => onDeleteColumn(index)}
                    >
                      -
                    </button>
                  )}
                  {headerErrors[index] && (
                    <div className={TotalStyles.MainContentErrorText}>
                      {headerErrors[index]}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={TotalStyles.MainContentTbody}>
            {tableData.map((row, rowIndex) => (
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
                      onKeyDown={(e) =>
                        handleKeyDown(e, rowIndex, colIndex, false)
                      }
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDataReturn;
