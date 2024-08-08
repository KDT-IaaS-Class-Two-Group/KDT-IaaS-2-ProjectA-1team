import React from 'react';

interface Table {
  name: string;
}

interface TableListProps {
  tables: Table[];
  setSelectedTable: (tableName: string) => void;
}

const TableList: React.FC<TableListProps> = ({ tables, setSelectedTable }) => {
  return (
    <div style={{ width: '200px', padding: '10px', borderRight: '1px solid #ddd' }}>
      <h3>Tables</h3>
      <ul>
        {tables.map((table, index) => (
          <li key={index} onClick={() => setSelectedTable(table.name)} style={{ cursor: 'pointer' }}>
            {table.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
