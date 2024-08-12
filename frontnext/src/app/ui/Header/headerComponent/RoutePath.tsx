export type Language = 'ko' | 'en' | 'jp' | 'cn' | 'vn' | 'th';

interface TabMenuTexts {
  TABMENUONE: string;
  TABMENUTWO: string;
  TABMENUTHREE: string;
  TABMENUFOUR: string;
}

export const TABROUTES = {
  TAB_ONE: '/viewRef',
  TAB_TWO: '/InsertPage',
  TAB_THREE: '/TabSetting',
  TAB_FOUR: '/',
};

export const TABMENUTEXTS: Record<Language, TabMenuTexts> = {
  ko: {
    TABMENUONE: '조회',
    TABMENUTWO: '입력',
    TABMENUTHREE: '설정',
    TABMENUFOUR: '로그아웃',
  },
  en: {
    TABMENUONE: 'View',
    TABMENUTWO: 'Insert',
    TABMENUTHREE: 'Settings',
    TABMENUFOUR: 'Logout',
  },
  jp: {
    TABMENUONE: '検索',
    TABMENUTWO: '入力',
    TABMENUTHREE: '設定',
    TABMENUFOUR: 'ログアウト',
  },
  cn: {
    TABMENUONE: '查看',
    TABMENUTWO: '输入',
    TABMENUTHREE: '设置',
    TABMENUFOUR: '登出',
  },
  vn: {
    TABMENUONE: 'Xem',
    TABMENUTWO: 'Chèn',
    TABMENUTHREE: 'Cài đặt',
    TABMENUFOUR: 'Đăng xuất',
  },
  th: {
    TABMENUONE: 'ดู',
    TABMENUTWO: 'ใส่',
    TABMENUTHREE: 'การตั้งค่า',
    TABMENUFOUR: 'ออกจากระบบ',
  },
};
