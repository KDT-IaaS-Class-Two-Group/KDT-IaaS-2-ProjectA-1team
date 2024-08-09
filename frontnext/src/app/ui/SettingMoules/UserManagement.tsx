import React from 'react';
import { SettingStyles } from '../styles/styles-ys';
import PasswordChangeForm from './PWChangeForm';

const UserManagement = () => {
  return (
    <div className={SettingStyles.contentStyle}>
      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>사용자 계정 생성 및 삭제</button>
        <button className={SettingStyles.button}>사용자 권한 설정</button>
        <PasswordChangeForm />
        <button className={SettingStyles.button}>알림 설정</button>
        <button className={SettingStyles.button}>백업 및 복구</button>
        
      </div>
    </div>
  );
};

export default UserManagement;
