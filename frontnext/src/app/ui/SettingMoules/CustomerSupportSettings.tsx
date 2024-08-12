import React from 'react';
import { useLanguage } from './LanguageContext';
import { SettingStyles } from '../styles/styles-ys';

const CustomerSupportSettings = () => {
  const { language } = useLanguage();

  const texts = {
    ko: '고객 지원',
    en: 'Customer Support',
    jp: 'カスタマーサポート',
    cn: '客户支持',
    vn: 'Hỗ trợ khách hàng',
    th: 'สนับสนุนลูกค้า',
  };

  const contacts = {
    ko: '개발 관리팀',
    en: 'Development Management Team',
    jp: '開発管理チーム',
    cn: '开发管理团队',
    vn: 'Đội quản lý phát triển',
    th: 'ทีมบริหารการพัฒนา',
  };

  return (
    <div className={SettingStyles.contentStyle}>
      <h1>{texts[language]}</h1>
      <div className="space-y-4">
        <p>
          {contacts[language]} 구하림 :{' '}
          <a href="mailto:hrimkoo@gmail.com" className="text-blue-500">
            hrimkoo@gmail.com
          </a>
        </p>
        <p>
          {contacts[language]} 김정수 :{' '}
          <a href="mailto:kjs20151240@gmail.com" className="text-blue-500">
            kjs20151240@gmail.com
          </a>
        </p>
        <p>
          {contacts[language]} 송이현 :{' '}
          <a href="mailto:songehyun00@gmail.com" className="text-blue-500">
            songehyun00@gmail.com
          </a>
        </p>
        <p>
          {contacts[language]} 정호연 :{' '}
          <a href="mailto:jea7730@gmail.com" className="text-blue-500">
            jea7730@gmail.com
          </a>
        </p>
        <p>
          {contacts[language]} 이연승 :{' '}
          <a href="mailto:leeys951006@gmail.com" className="text-blue-500">
            leeys951006@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default CustomerSupportSettings;
