import React from 'react';
import TotalStyles from '../ui/styles/TotalStyles';

interface Table {
  name: string;
}

interface TableListProps {
  tables: Table[];
  setSelectedTable: (tableName: string) => void;
}

const TableList: React.FC<TableListProps> = ({ tables, setSelectedTable }) => {
  return (
    <div className={TotalStyles.TableListContainer}>
      <h3 className={TotalStyles.TableListHeader}>Tables</h3>
      <ul>
        {tables.map((table, index) => (
          <li
            key={index}
            onClick={() => setSelectedTable(table.name)}
            className={TotalStyles.TableListItem}
          >
            {table.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
