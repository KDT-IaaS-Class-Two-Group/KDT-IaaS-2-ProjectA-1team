import React from 'react';
import TotalStyles from '../../styles/TotalStyles';

interface FormProps {
  handleSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (name: string) => void;
  selectedTable: string;
  setSelectedTable: (table: string) => void;
  tables: string[];
}

const Form: React.FC<FormProps> = ({
  handleSubmit,
  name,
  setName,
  selectedTable,
  setSelectedTable,
  tables,
}) => {
  return (
    <form onSubmit={handleSubmit} className={TotalStyles.ToggleForm}>
      <div className={TotalStyles.ToggleFormRow}>
        <label htmlFor="table-select" className={TotalStyles.ToggleLabel}>
          Table
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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search"
          className={TotalStyles.ToggleInput}
        />
        <button type="submit" className={TotalStyles.ToggleToggleButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
