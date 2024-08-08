import React, { useState, useEffect } from 'react';

interface TableDataProps {
  data: any[];
}

const TableData: React.FC<TableDataProps> = ({ data }) => {
  const [tableData, setTableData] = useState(data);
  const [headers, setHeaders] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setTableData(data);
    if (data.length > 0) {
      setHeaders(Object.keys(data[0]));
      setErrors(Array(Object.keys(data[0]).length).fill(''));
    }
  }, [data]);

  if (!tableData || tableData.length === 0) {
    return <div className="text-gray-500">데이터가 없습니다.</div>;
  }

  const handleHeaderChange = (index: number, value: string) => {
    const updatedHeaders = [...headers];
    const updatedErrors = [...errors];

    // Check for duplicate header names
    if (headers.includes(value) && value !== headers[index]) {
      updatedErrors[index] = `중복된 열 이름입니다: ${value}`;
    } else {
      updatedHeaders[index] = value;
      updatedErrors[index] = '';
    }

    setHeaders(updatedHeaders);
    setErrors(updatedErrors);
  };

  const handleInputChange = (
    rowIndex: number,
    header: string,
    value: string,
  ) => {
    const updatedData = [...tableData];
    updatedData[rowIndex][header] = value;
    setTableData(updatedData);
  };

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
                  onChange={(e) => handleHeaderChange(index, e.target.value)}
                />
                {errors[index] && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors[index]}
                  </div>
                )}
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
                    value={row[header]}
                    className="w-full px-2 py-1 border rounded"
                    onChange={(e) =>
                      handleInputChange(rowIndex, header, e.target.value)
                    }
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
