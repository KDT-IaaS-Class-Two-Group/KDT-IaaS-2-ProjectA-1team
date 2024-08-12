import React from 'react';
import TotalStyles from '../styles/TotalStyles';
import PasswordChangeForm from './PWChangeForm';

const UserManagement = () => {
  return (
    <div className={TotalStyles.SettingContentStyle}>
      <div className="flex flex-col space-y-4">
        <button className={TotalStyles.SettingButton}>
          사용자 계정 생성 및 삭제
        </button>
        <button className={TotalStyles.SettingButton}>사용자 권한 설정</button>
        <PasswordChangeForm />
        <button className={TotalStyles.SettingButton}>알림 설정</button>
        <button className={TotalStyles.SettingButton}>백업 및 복구</button>
      </div>
    </div>
  );
};

export default UserManagement;
