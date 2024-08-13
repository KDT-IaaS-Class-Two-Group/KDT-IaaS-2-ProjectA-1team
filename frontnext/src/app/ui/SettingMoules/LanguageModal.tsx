import React from 'react';
import { useLanguage } from './LanguageContext';
import { SettingStyles } from '../styles/styles-ys';

const LanguageModal = ({ onClose }: { onClose: () => void }) => {
  const { setLanguage } = useLanguage();

  const handleLanguageChange = (
    language: 'ko' | 'en' | 'jp' | 'cn' | 'vn' | 'th',
  ) => {
    setLanguage(language);
    onClose(); // 모달창 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl mb-4">언어 선택</h2>
        <div className="flex flex-col space-y-2">
          <button
            className={SettingStyles.button}
            onClick={() => handleLanguageChange('ko')}
          >
            한국어
          </button>
          <button
            className={SettingStyles.button}
            onClick={() => handleLanguageChange('en')}
          >
            English
          </button>
          <button
            className={SettingStyles.button}
            onClick={() => handleLanguageChange('jp')}
          >
            日本語
          </button>
          <button
            className={SettingStyles.button}
            onClick={() => handleLanguageChange('cn')}
          >
            中國語
          </button>
          <button
            className={SettingStyles.button}
            onClick={() => handleLanguageChange('vn')}
          >
            tiếng Việt
          </button>
          <button
            className={SettingStyles.button}
            onClick={() => handleLanguageChange('th')}
          >
            ภาษาไทย
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
