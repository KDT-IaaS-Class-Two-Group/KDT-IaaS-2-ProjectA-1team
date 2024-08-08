import React, { useState, useEffect } from 'react';

interface TableDataProps {
  data: any[];
  onDataChange: (data: any[]) => void;
  initialDataLoaded: boolean;
}

const TableData: React.FC<TableDataProps> = ({
  data,
  onDataChange,
  initialDataLoaded,
}) => {
  const [tableData, setTableData] = useState(data);
  const [headers, setHeaders] = useState<string[]>([]);

  useEffect(() => {
    setTableData(data);
    if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
    }
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
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
                >
                  <input
                    type="text"
                    value={row[header] || ''}
                    className="w-full px-2 py-1 border rounded"
                    onChange={(e) =>
                      handleInputChange(rowIndex, header, e.target.value)
                    }
                    readOnly={!initialDataLoaded}
                  />
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
