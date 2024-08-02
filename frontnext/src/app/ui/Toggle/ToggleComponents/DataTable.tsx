import React from 'react';
import styles from '../../styles/styles';

interface DataTableProps {
  data: { [key: string]: string | number }[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className={styles.tableContainer}>
      {data.length > 0 && (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className={styles.tableHeaderCell}>
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <td key={key} className={styles.tableDataCell}>
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
