import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import LanguageModal from './LanguageModal';
import { SettingStyles } from '../styles/styles-ys';

const InterfaceSettings = () => {
  const { language } = useLanguage();
  const [isModalOpen, setModalOpen] = useState(false);

  const texts = {
    ko: {
      themeChange: '테마 변경 (다크 모드, 라이트 모드)',
      languageSetting: '인터페이스 언어 설정',
    },
    en: {
      themeChange: 'Change Theme (Dark Mode, Light Mode)',
      languageSetting: '인터페이스 언어 설정',
    },
    jp: {
      themeChange: 'テーマの変更（ダークモード、ライトモード）',
      languageSetting: '인터페이스 언어 설정',
    },
    cn: {
      themeChange: '更改主题（深色模式、浅色模式）',
      languageSetting: '인터페이스 언어 설정',
    },
    vn: {
      themeChange: 'Thay đổi giao diện (Chế độ tối, Chế độ sáng)',
      languageSetting: '인터페이스 언어 설정',
    },
    th: {
      themeChange: 'เปลี่ยนธีม (โหมดมืด, โหมดสว่าง)',
      languageSetting: '인터페이스 언어 설정',
    },
  };

  return (
    <div className={SettingStyles.contentStyle}>
      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>
          {texts[language].themeChange}
        </button>
        <button
          className={SettingStyles.button}
          onClick={() => setModalOpen(true)}
        >
          {texts[language].languageSetting}
        </button>
      </div>
      {isModalOpen && <LanguageModal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default InterfaceSettings;
