const buttonStyles = {
  // 공통 스타일
  base: 'px-4 py-2 rounded-lg text-white', // 기본적인 버튼 스타일
  hoverEffect: 'hover:bg-opacity-75', // 모든 버튼에 적용할 호버 효과
  roundedFull: 'rounded-full',
  roundedLrage: 'rounded-full',
  shadowEffect: 'shadow-sm',

  // 여백 스타일
  px: 'px-4',
  py: 'py-4',
  mb: 'mb-4',

  // 색상 스타일
  blue: 'bg-blue-500 hover:bg-blue-600',
  gray: 'bg-gray-500 hover:bg-gray-600',
  red: 'bg-red-500 hover:bg-red-600',
  green: 'bg-green-500 hover:bg-green-600',

  // 글자 스타일
  fontGray: 'text-gray-500',
  fontBlack: 'text-black',
  fontWhite: 'text-white',

  // Modal 버튼 스타일
  ModalCloseButton: 'absolute top-2 right-2 ',
  ModalButton: 'text-center',

  // Confirm 버튼 스타일
  ConfirmButton:
    'bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded-lg text-white',

  // 테이블 생성 버튼 스타일
  CreateTableButton: 'px-4 py-2 text-white rounded-lg hover:bg-blue-600',
  CreateTableAddButton: 'bg-gray-600 hover:bg-gray-500',
  CreateTableCreateButton: 'bg-blue-600 hover:bg-blue-500',
  CreateTableRecommendButton:
    'px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500',
  CreateTableButtonRow: 'flex justify-between items-center w-full mt-4',

  // 로그인 카드 버튼 스타일
  LoginCardButton:
    'bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',

  // 로그인 버튼 스타일
  LoginButton:
    'w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',

  // 사이드바 버튼 스타일
  SidebarButton: 'px-4 py-2 rounded-lg text-white hover:bg-blue-500',
  SidebarAddColumnButton: 'bg-orange-500 hover:bg-orange-600',
  SidebarSaveButton:
    'bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded-full text-white',

  // 메인 컨텐츠 삭제 버튼 스타일
  MainContentDeleteColumnButton:
    'absolute top-1/2 right-1 transform -translate-y-1/2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600',
  MainContentDeleteRowButton:
    'absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600',

  // 헤더 버튼 스타일
  HeaderButton:
    'px-4 py-2 w-36 h-16 bg-gray-100 text-gray-700 cursor-pointer hover:bg-gray-200',

  // 설정 탭 토글 버튼 스타일
  SettingToggleButton:
    'fixed right-4 top-15 text-black p-2 rounded cursor-pointer z-50 transition-all duration-300 text-xl',

  // 설정 버튼 스타일
  SettingButton:
    'w-full px-4 py-2 rounded-lg hover:bg-gray-700 active:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 cursor-pointer text-center mb-4',

  // 비밀번호 변경 버튼 스타일
  PasswordButton:
    'w-full py-2 px-4 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 mt-2 bg-transparent border border-gray-800 hover:bg-red-500 hover:text-white hover:border-transparent',
  PasswordSubmitButton:
    'w-full py-2 px-4 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mt-4',

  // 토글 버튼 스타일
  ToggleButton: 'self-end mt-4 text-gray-800 font-bold py-2 px-4 rounded',
  ToggleSubmit:
    'bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300',
};
