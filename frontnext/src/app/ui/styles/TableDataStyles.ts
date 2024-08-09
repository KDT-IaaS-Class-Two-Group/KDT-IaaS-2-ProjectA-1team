const TableStyles = {
  tableContainer: 'overflow-x-auto',
  table: 'min-w-full bg-white',
  thead: '',
  th: 'relative px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600',
  headerInput: 'w-full px-2 py-1 border rounded',
  deleteColumnButton:
    'absolute top-1/2 right-1 transform -translate-y-1/2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600', // 정사각형으로 설정
  tbody: '',
  tr: 'hover:bg-gray-100',
  td: 'relative px-4 py-2 border-b border-gray-200 text-sm text-gray-700',
  rowInput: 'w-full px-2 py-1 border rounded',
  deleteRowButton:
    'absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600', // 정사각형으로 설정
  errorText: 'text-red-500 text-xs mt-1', // 오류 메시지 스타일
  tableWrapper: 'min-w-full overflow-x-auto', // 테이블 영역에 가로 스크롤 처리
  inputWide: 'w-32 px-2 py-1 border rounded', // 8개 이상일 때 적용할 넓은 인풋 너비
};

export default TableStyles;
