import React from 'react';
import styles from '../../styles/styles';

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
    <div className={styles.selectContainer}>
      <label htmlFor="table-select" className={styles.label}>
        Select a Table
      </label>
      <select
        id="table-select"
        value={selectedTable}
        onChange={(e) => setSelectedTable(e.target.value)}
        className={styles.select}
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
