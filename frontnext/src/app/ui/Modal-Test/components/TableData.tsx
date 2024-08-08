import React from 'react';

interface TableDataProps {
  data: any[];
}

const TableData: React.FC<TableDataProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-gray-500">데이터가 없습니다.</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {headers.map((header) => (
                <td
                  key={header}
                  className="px-4 py-2 border-b border-gray-200 text-sm text-gray-700"
                >
                  {row[header]}
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
