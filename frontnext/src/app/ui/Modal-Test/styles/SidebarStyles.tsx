const SidebarStyles = {
  // 기존 스타일 그대로 유지
  sidebar: 'w-64 bg-gray-800 text-white flex flex-col p-4 space-y-4',
  button: 'px-4 py-2 rounded-lg text-white hover:bg-gray-700',
  createButton: 'bg-blue-500 hover:bg-blue-600',
  saveButton: 'bg-blue-500 hover:bg-blue-600 mt-4 px-4 py-2 rounded-lg',
  addRowButton: 'bg-green-500 hover:bg-green-600',
  addColumnButton: 'bg-orange-500 hover:bg-orange-600',
  title: 'text-xl font-bold mb-4',
  mainTitle: 'text-2xl font-bold',
  tableTitle: 'text-xl font-bold mb-4',
  tableItem: 'py-2 px-4 hover:bg-gray-700 cursor-pointer',
  container: 'flex',
  modalOverlay: 'text-center',

  // 메인 컨텐츠 영역 스타일
  mainContent: 'flex-grow p-4 w-[calc(100%-16rem)] overflow-auto', // 메인 컨텐츠의 고정 너비와 스크롤 처리
  tableWrapper: 'max-w-full overflow-x-auto', // 테이블 영역에만 가로 스크롤 처리
  buttonContainer: 'space-y-2',
  buttonSpacing: 'mt-2',
};

export default SidebarStyles;
