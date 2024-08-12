import React from 'react';
import TotalStyles from '../styles/TotalStyles';
import { useLanguage } from './LanguageContext';

const LogAct = () => {
  const { language } = useLanguage();

  const texts = {
    ko: {
      viewLogs: '사용자 활동 로그 조회',
      saveLogs: '로그 파일 저장 및 다운로드',
    },
    en: {
      viewLogs: 'View User Activity Logs',
      saveLogs: 'Save and Download Log Files',
    },
    jp: {
      viewLogs: 'ユーザー活動ログを表示',
      saveLogs: 'ログファイルを保存およびダウンロード',
    },
    cn: {
      viewLogs: '查看用户活动日志',
      saveLogs: '保存并下载日志文件',
    },
    vn: {
      viewLogs: 'Xem nhật ký hoạt động của người dùng',
      saveLogs: 'Lưu và tải xuống tệp nhật ký',
    },
    th: {
      viewLogs: 'ดูบันทึกกิจกรรมของผู้ใช้',
      saveLogs: 'บันทึกและดาวน์โหลดไฟล์บันทึก',
    },
  };

  return (
    <div className={TotalStyles.SettingContentStyle}>
      <div className={TotalStyles.SettingButtonContainer}>
        <button className={TotalStyles.SettingButton}>
          {texts[language].viewLogs}
        </button>
        <button className={TotalStyles.SettingButton}>
          {texts[language].saveLogs}
        </button>
      </div>
    </div>
  );
};

export default LogAct;
