import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';
import { useLanguage } from '../../ui/SettingMoules/LanguageContext';

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
  const { language } = useLanguage();

  const texts = {
    ko: {
      tableLabel: '분류',
      searchPlaceholder: '검색',
      submitButton: '조회',
    },
    en: {
      tableLabel: 'Table',
      searchPlaceholder: 'Search',
      submitButton: 'Submit',
    },
    jp: {
      tableLabel: 'テーブル',
      searchPlaceholder: '検索',
      submitButton: '提出する',
    },
    cn: {
      tableLabel: '表',
      searchPlaceholder: '搜索',
      submitButton: '提交',
    },
    vn: {
      tableLabel: 'Bảng',
      searchPlaceholder: 'Tìm kiếm',
      submitButton: 'Gửi',
    },
    th: {
      tableLabel: 'ตาราง',
      searchPlaceholder: 'ค้นหา',
      submitButton: 'ส่ง',
    },
  };

  return (
    <form onSubmit={handleSubmit} className={TotalStyles.ToggleForm}>
      <div className={TotalStyles.ToggleFormRow}>
        <label htmlFor="table-select" className={TotalStyles.ToggleLabel}>
          {texts[language].tableLabel}
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
        <button type="submit" className={TotalStyles.ToggleSubmit}>
          {texts[language].submitButton}
        </button>
      </div>
    </form>
  );
};

export default Form;
