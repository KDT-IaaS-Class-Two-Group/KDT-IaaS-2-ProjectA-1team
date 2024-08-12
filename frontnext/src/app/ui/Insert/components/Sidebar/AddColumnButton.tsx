import React from 'react';
import SidebarStyles from '../../styles/SidebarStyles';
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
      className={`${SidebarStyles.button} ${SidebarStyles.addColumnButton}`}
      onClick={onAddColumn}
    >
      {texts[language]}
    </button>
  );
};

export default AddColumnButton;
