import React from 'react';
import TotalStyles from '../../styles/TotalStyles';

interface DataTableProps {
  data: { [key: string]: string | number }[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className={TotalStyles.ToggleTableContainer}>
      {data.length > 0 && (
        <table className={TotalStyles.ToggleTable}>
          <thead className={TotalStyles.ToggleTableHead}>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className={TotalStyles.ToggleTableHeaderCell}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={TotalStyles.ToggleTableBody}>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <td key={key} className={TotalStyles.ToggleTableDataCell}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DataTable;
