import React from 'react';
import TotalStyles from '../../ui/styles/TotalStyles';
import { useLanguage } from '../../ui/SettingMoules/LanguageContext';
import Label from '../components/Form/Label';
import Select from '../components/Form/Select';
import Input from '../components/Form/Input';
import Button from '../components/Form/Button';
import FormRow from '../components/Form/FormRow';

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
      <FormRow>
        <Label htmlFor="table-select" text={texts[language].tableLabel} />
        <Select
          id="table-select"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
          options={tables}
        />
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={texts[language].searchPlaceholder}
        />
        <Button text={texts[language].submitButton} />
      </FormRow>
    </form>
  );
};

export default Form;
