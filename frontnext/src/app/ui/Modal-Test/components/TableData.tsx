import React, { useState, useEffect } from 'react';
import TableStyles from '../../styles/TableDataStyles'; // 스타일 객체 불러오기

interface TableDataProps {
  data: any[];
  onDataChange: (data: any[]) => void;
  headers: string[];
  onHeaderChange: (index: number, value: string) => void;
  onDeleteRow: (rowIndex: number) => void;
  onDeleteColumn: (colIndex: number) => void;
}

const TableData: React.FC<TableDataProps> = ({
  data,
  onDataChange,
  headers,
  onHeaderChange,
  onDeleteRow,
  onDeleteColumn,
}) => {
  const [tableData, setTableData] = useState(data);
  const [hoveredHeader, setHoveredHeader] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

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
    onDataChange(updatedData); // Notify parent component about data changes
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
                  type="text"
                  value={header}
                  className={TableStyles.headerInput}
                  onChange={(e) => onHeaderChange(index, e.target.value)}
                />
                {hoveredHeader === index && (
                  <button
                    className={TableStyles.deleteColumnButton}
                    onClick={() => onDeleteColumn(index)}
                  >
                    -
                  </button>
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
                    type="text"
                    value={row[header] || ''}
                    className={TableStyles.rowInput}
                    onChange={(e) =>
                      handleInputChange(rowIndex, header, e.target.value)
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
