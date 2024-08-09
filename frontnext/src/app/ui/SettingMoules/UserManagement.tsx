import React from 'react';
import { useLanguage } from './LanguageContext';
import { SettingStyles } from '../styles/styles-ys';
import PasswordChangeForm from './PWChangeForm';

const UserManagement = () => {
  const { language } = useLanguage();

  const texts = {
    ko: {
      createDeleteAccount: '사용자 계정 생성 및 삭제',
      setPermissions: '사용자 권한 설정',
      changePassword: '비밀번호 변경',
      setNotifications: '알림 설정',
      backupRestore: '백업 및 복구',
    },
    en: {
      createDeleteAccount: 'Create and Delete User Accounts',
      setPermissions: 'Set User Permissions',
      changePassword: 'Change Password',
      setNotifications: 'Set Notifications',
      backupRestore: 'Backup and Restore',
    },
    jp: {
      createDeleteAccount: 'ユーザーアカウントの作成と削除',
      setPermissions: 'ユーザー権限の設定',
      changePassword: 'パスワードを変更する',
      setNotifications: '通知設定',
      backupRestore: 'バックアップと復元',
    },
    cn: {
      createDeleteAccount: '创建和删除用户帐户',
      setPermissions: '设置用户权限',
      changePassword: '更改密码',
      setNotifications: '设置通知',
      backupRestore: '备份和恢复',
    },
    vn: {
      createDeleteAccount: 'Tạo và xóa tài khoản người dùng',
      setPermissions: 'Thiết lập quyền người dùng',
      changePassword: 'Đổi mật khẩu',
      setNotifications: 'Cài đặt thông báo',
      backupRestore: 'Sao lưu và khôi phục',
    },
    th: {
      createDeleteAccount: 'สร้างและลบบัญชีผู้ใช้',
      setPermissions: 'ตั้งค่าสิทธิ์ของผู้ใช้',
      changePassword: 'เปลี่ยนรหัสผ่าน',
      setNotifications: 'ตั้งค่าการแจ้งเตือน',
      backupRestore: 'การสำรองข้อมูลและการกู้คืน',
    },
  };

  return (
    <div className={SettingStyles.contentStyle}>
      <div className="flex flex-col space-y-4">
        <button className={SettingStyles.button}>
          {texts[language].createDeleteAccount}
        </button>
        <button className={SettingStyles.button}>
          {texts[language].setPermissions}
        </button>
        <PasswordChangeForm />
        <button className={SettingStyles.button}>
          {texts[language].setNotifications}
        </button>
        <button className={SettingStyles.button}>
          {texts[language].backupRestore}
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
