const SidebarStyles = {
  // 전체 사이드바 스타일
  sidebar: 'w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4 h-screen', // 높이를 전체 화면으로 설정

  // 버튼 스타일
  button: 'px-4 py-2 rounded-lg text-white hover:bg-gray-700',
  createButton: 'bg-blue-500 hover:bg-blue-600', // 호버 색상 통일
  saveButton:
    'bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded-lg text-white', // 저장 버튼 스타일 추가

  // 추가 버튼 스타일
  addRowButton: 'bg-green-500 hover:bg-green-600', // 행 추가 버튼은 녹색 계열
  addColumnButton: 'bg-orange-500 hover:bg-orange-600', // 열 추가 버튼은 주황색 계열

  // 제목 스타일
  mainTitle: 'text-2xl font-bold',
  tableTitle: 'text-xl font-bold mb-4',

  // 테이블 아이템 스타일
  tableItem: 'py-2 px-4 hover:bg-gray-700 cursor-pointer',

  // 컨테이너 스타일
  container: 'flex',

  // 모달 오버레이 스타일
  modalOverlay: 'text-center',

  // 메인 컨텐츠 스타일
  mainContent: 'flex-grow p-4',

  // 버튼 컨테이너 스타일
  buttonContainer: 'space-x-2', // 버튼 간의 간격만 유지
  buttonSpacing: 'mt-2', // 버튼 사이 간격 추가
};

export default SidebarStyles;
