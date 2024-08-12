const TotalStyles = {
  // Modal Styles
  ModalOverlay:
    'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50',
  ModalContent: 'bg-white p-6 rounded-lg relative max-w-lg w-full mx-4',
  ModalCloseButton: 'absolute top-2 right-2 text-gray-500 hover:text-gray-700',
  ModalButton: 'px-4 py-2 rounded-lg text-white', // 버튼 스타일 추가
  ModalCancelButton: 'bg-gray-500 hover:bg-gray-600', // 취소 버튼 스타일
  ModalConfirmButton: 'bg-blue-500 hover:bg-blue-600', // 확인 버튼 스타일

  // Create Table Styles
  CreateTableContainer: 'flex flex-col items-start mb-2.5 w-full',
  CreateTableInput: 'border rounded-lg p-2 w-full',
  CreateTableErrorText: 'text-red-500 text-sm mt-1',
  CreateTableButtonContainer: 'space-x-10',
  CreateTableButton: 'px-4 py-2 text-white rounded-lg hover:bg-blue-600',
  CreateTableAddButton: 'bg-blue-500',
  CreateTableCreateButton: 'bg-green-500 hover:bg-green-600',
  CreateTableInputError: 'border-red-500',
  CreateTableRecommendButton:
    'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full mb-4',

  // Login Card Styles
  LoginCardContainer:
    'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50', // z-index 추가
  LoginCardContent:
    'flex items-center justify-center flex-col bg-white p-6 rounded-lg relative max-w-lg w-full mx-4',
  LoginCardHeader: 'text-lg font-semibold text-gray-900 mb-4',
  LoginCardBody: 'text-gray-700 text-base mb-4',
  LoginCardFooter: 'flex justify-end mt-4',
  LoginCardButton:
    'bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  LoginCardImage: 'w-full h-48 object-cover rounded-t-lg mb-4',
  LoginCardTitle: 'text-xl font-bold text-gray-800',
  LoginCardSubtitle: 'text-sm text-gray-500',
  LoginCardLink: 'text-blue-600 hover:text-blue-700 underline',
};

export default TotalStyles;
