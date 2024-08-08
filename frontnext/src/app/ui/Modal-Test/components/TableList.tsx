import React, { useEffect, useState } from 'react';
import { fetchTables } from '@/app/lib/fetchDataTest';

interface TableListProps {
  onTableClick: (tableName: string) => void;
}

const TableList: React.FC<TableListProps> = ({ onTableClick }) => {
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    const getTables = async () => {
      const tables = await fetchTables();
      setTables(tables);
    };

    getTables();
  }, []);

  return (
    <div>
      <div className="text-xl font-bold mb-4">테이블 목록</div>
      <ul>
        {tables.map((table, index) => (
          <li
            key={index}
            className="py-2 px-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => onTableClick(table)}
          >
            {table}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableList;
