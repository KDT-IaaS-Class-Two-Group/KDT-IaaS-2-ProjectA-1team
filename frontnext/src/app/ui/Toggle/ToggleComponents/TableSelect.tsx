import React from 'react';
import TotalStyles from '../../styles/TotalStyles';

interface TableSelectProps {
  selectedTable: string;
  setSelectedTable: (table: string) => void;
  tables: string[];
}

const TableSelect: React.FC<TableSelectProps> = ({
  selectedTable,
  setSelectedTable,
  tables,
}) => {
  return (
    <div className={TotalStyles.ToggleSelectContainer}>
      <label htmlFor="table-select" className={TotalStyles.ToggleLabel}>
        Select a Table
      </label>
      <select
        id="table-select"
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
        className={TotalStyles.ToggleSelect}
      >
        {tables.map((table) => (
          <option key={table} value={table}>
            {table}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableSelect;
