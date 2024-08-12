import React from 'react';
import styles from '../../styles/styles';
import { useLanguage } from '../../SettingMoules/LanguageContext';

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
      tableLabel: '테이블',
      searchPlaceholder: '검색',
      submitButton: '제출',
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
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <label htmlFor="table-select" className={styles.label}>
          {texts[language].tableLabel}
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
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={texts[language].searchPlaceholder}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          {texts[language].submitButton}
        </button>
      </div>
    </form>
  );
};

export default Form;
