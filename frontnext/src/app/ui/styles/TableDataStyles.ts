const TableStyles = {
  tableContainer: 'overflow-x-auto',
  table: 'min-w-full bg-white',
  thead: '',
  th: 'relative px-4 py-2 border-b-2 border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600',
  headerInput: 'w-full px-2 py-1 border rounded',
  deleteColumnButton:
    'absolute top-0 right-0 transform -translate-y-1/2 mx-1 px-2 bg-red-500 text-white text-sm rounded',
  tbody: '',
  tr: 'hover:bg-gray-100',
  td: 'relative px-4 py-2 border-b border-gray-200 text-sm text-gray-700',
  rowInput: 'w-full px-2 py-1 border rounded',
  deleteRowButton:
    'absolute left-0 top-1/2 transform -translate-y-1/2 mx-1 px-2 bg-red-500 text-white text-sm rounded',
};

export default TableStyles;
