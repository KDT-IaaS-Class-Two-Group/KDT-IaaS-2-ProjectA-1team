import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import LanguageModal from './LanguageModal';
import { SettingStyles } from '../styles/styles-ys';

const InterfaceSettings = () => {
  const { language } = useLanguage();
  const [isModalOpen, setModalOpen] = useState(false);

  const texts = {
    ko: '인터페이스 설정',
    en: 'Interface Settings',
    jp: 'インターフェース設定',
    cn: '界面设置',
    vn: 'Cài đặt giao diện',
    th: 'การตั้งค่าการเชื่อมต่อ',
  };

  return (
    <div className={SettingStyles.contentStyle}>
      <h1>{texts[language]}</h1>
      <button
        onClick={() => setModalOpen(true)}
        className={SettingStyles.button}
      >
        {language === 'ko' ? '언어 변경' : 'Change Language'}
      </button>
      {isModalOpen && <LanguageModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default InterfaceSettings;
