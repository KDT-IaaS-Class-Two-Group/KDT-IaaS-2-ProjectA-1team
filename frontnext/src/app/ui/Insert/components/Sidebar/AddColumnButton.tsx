import React from 'react';
import TotalStyles from '@/app/ui/styles/TotalStyles';
import { useLanguage } from '../../../SettingMoules/LanguageContext';

interface AddColumnButtonProps {
  onAddColumn: () => void;
}

const AddColumnButton: React.FC<AddColumnButtonProps> = ({ onAddColumn }) => {
  const { language } = useLanguage();
  const texts = {
    ko: '열 추가',
    en: 'Add Column',
    jp: '列を追加',
    cn: '添加列',
    vn: 'Thêm cột',
    th: 'เพิ่มคอลัมน์',
  };

  return (
    <button
      className={`${TotalStyles.SidebarButton} ${TotalStyles.SidebarAddColumnButton}`}
      onClick={onAddColumn}
    >
      {texts[language]}
    </button>
  );
};

export default AddColumnButton;
