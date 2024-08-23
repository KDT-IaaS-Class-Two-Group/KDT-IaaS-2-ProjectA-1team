import React from 'react';
import { useLanguage } from '@/app/ui/SettingMoules/LanguageContext';
import { borderButton } from '@/app/ui/styles/ButtonStyles';
import { AddButtonProps } from '../components/SidebarProps';

const AddRowButton: React.FC<AddButtonProps> = ({ onClick: onAddRow }) => {
  const { language } = useLanguage();
  const texts = {
    ko: '행 추가',
    en: 'Add Row',
    jp: '行を追加',
    cn: '添加行',
    vn: 'Thêm hàng',
    th: 'เพิ่มแถว',
  };

  return (
    <button className={borderButton} onClick={onAddRow}>
      {texts[language]}
    </button>
  );
};

export default AddRowButton;
