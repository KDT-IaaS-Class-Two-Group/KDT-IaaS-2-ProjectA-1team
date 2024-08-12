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
};

export default TotalStyles;
