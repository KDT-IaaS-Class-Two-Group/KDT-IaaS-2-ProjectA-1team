import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';

interface DataTableProps {
  data: { [key: string]: string | number }[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const columnCount = Object.keys(data[0] || {}).length;
  const isScrollable = columnCount >= 8; // 열 개수가 8개 이상인지 확인

  return (
    <div className={TotalStyles.ToggleTableContainer}>
      {data.length > 0 && (
        <div
          className={
            data.length > 15 ? TotalStyles.ToggleTableScrollWrapper : ''
          }
        >
          <table
            className={TotalStyles.ToggleTable}
            style={isScrollable ? { minWidth: columnCount * 150 } : {}}
          >
            <thead className={TotalStyles.ToggleTableHead}>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th
                    key={key}
                    className={TotalStyles.ToggleTableHeaderCell}
                    style={isScrollable ? { minWidth: '250px' } : {}}
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={TotalStyles.ToggleTableBody}>
              {data.map((item, index) => (
                <tr key={index}>
                  {Object.entries(item).map(([key, value]) => (
                    <td
                      key={key}
                      className={TotalStyles.ToggleTableDataCell}
                      style={isScrollable ? { minWidth: '250px' } : {}}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
