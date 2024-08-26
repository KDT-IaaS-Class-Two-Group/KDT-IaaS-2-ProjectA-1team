import React from 'react';
import TotalStyles from '../../../ui/styles/TotalStyles';

interface TableHeaderProps {
  keys: string[];
  isScrollable: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({ keys, isScrollable }) => {
  return (
    <thead className={TotalStyles.ToggleTableHead}>
      <tr>
        {keys.map((key) => (
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
  );
};

export default TableHeader;
