import React, { useEffect, useState } from 'react';
import { fetchTables } from '@/app/lib/fetchDataTest';
import { useLanguage } from '../../../SettingMoules/LanguageContext';

interface TableListProps {
  onTableClick: (tableName: string) => void;
}

const TableList: React.FC<TableListProps> = ({ onTableClick }) => {
  const [tables, setTables] = useState<string[]>([]);
  const { language } = useLanguage();

  const texts = {
    ko: '테이블 목록',
    en: 'Table List',
    jp: 'テーブル一覧',
    cn: '表格列表',
    vn: 'Danh sách bảng',
    th: 'รายการตาราง',
  };

  useEffect(() => {
    const getTables = async () => {
      const tables = await fetchTables();
      setTables(tables);
    };

    getTables();
  }, []);

  return (
    <div>
      <div className="text-xl font-bold mb-4">{texts[language]}</div>
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
