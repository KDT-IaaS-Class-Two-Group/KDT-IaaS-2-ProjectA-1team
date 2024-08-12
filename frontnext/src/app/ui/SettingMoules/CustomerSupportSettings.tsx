import React from 'react';
import TotalStyles from '../styles/TotalStyles';
const CustomerSupportSettings = () => {
  return (
    <div className={TotalStyles.SettingContentStyle}>
      <h1>고객 지원</h1>
      <div className="space-y-4">
        <p>
          개발 관리팀 구하림 :{' '}
          <a
            href="mailto:hrimkoo@gmail.com"
            className={TotalStyles.SettingEmail}
          >
            hrimkoo@gmail.com
          </a>
        </p>
        <p>
          개발 관리팀 김정수 :{' '}
          <a
            href="mailto:kjs20151240@gmail.com"
            className={TotalStyles.SettingEmail}
          >
            kjs20151240@gmail.com
          </a>
        </p>
        <p>
          개발 관리팀 송이현 :{' '}
          <a
            href="mailto:songehyun00@gmail.com"
            className={TotalStyles.SettingEmail}
          >
            songehyun00@gmail.com
          </a>
        </p>
        <p>
          개발 관리팀 정호연 :{' '}
          <a
            href="mailto:jea7730@gmail.com"
            className={TotalStyles.SettingEmail}
          >
            jea7730@gmail.com
          </a>
        </p>
        <p>
          개발 관리팀 이연승 :{' '}
          <a
            href="mailto:leeys951006@gmail.com"
            className={TotalStyles.SettingEmail}
          >
            leeys951006@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default CustomerSupportSettings;
