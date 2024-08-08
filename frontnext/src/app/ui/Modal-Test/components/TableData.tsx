import React, { useState, useEffect } from 'react';

interface TableDataProps {
  data: any[];
  onDataChange: (data: any[]) => void;
  headers: string[];
  onHeaderChange: (index: number, value: string) => void;
  onDeleteRow: (rowIndex: number) => void;
}

const TableData: React.FC<TableDataProps> = ({
  data,
  onDataChange,
  headers,
  onHeaderChange,
  onDeleteRow,
}) => {
  const [tableData, setTableData] = useState(data);
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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                <input
                  type="text"
                  value={header}
                  className="w-full px-2 py-1 border rounded"
                  onChange={(e) => onHeaderChange(index, e.target.value)}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-100"
              onMouseEnter={() => setHoveredRow(rowIndex)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {headers.map((header, colIndex) => (
                <td
                  key={header}
                  className="relative px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
                >
                  <input
                    type="text"
                    value={row[header] || ''}
                    className="w-full px-2 py-1 border rounded"
                    onChange={(e) =>
                      handleInputChange(rowIndex, header, e.target.value)
                    }
                  />
                  {hoveredRow === rowIndex && colIndex === 0 && (
                    <button
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 mx-1 px-2 bg-red-500 text-white text-sm rounded"
                      style={{ height: '0.8em', width: '0.8em' }}
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
