import React from 'react';
import TotalStyles from '../../../ui/styles/TotalStyles';

interface TableBodyProps {
  data: { [key: string]: string | number }[];
  isScrollable: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({ data, isScrollable }) => {
  return (
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
  );
};

export default TableBody;
