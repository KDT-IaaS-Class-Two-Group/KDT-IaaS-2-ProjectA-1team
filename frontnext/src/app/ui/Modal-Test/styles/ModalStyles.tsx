// modalStyle.ts
export const ModalStyles = {
  modalOverlay:
    'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50', // z-index 추가
  modalContent: 'bg-white p-6 rounded-lg relative max-w-lg w-full mx-4 z-50', // z-index 추가
  closeButton: 'absolute top-2 right-2 text-gray-500 hover:text-gray-700',
};

export const LoginCheckCardStyles = {
  cardContainer:
    'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50', // z-index 추가
  cardContent:
    'flex items-center justify-center flex-col bg-white p-6 rounded-lg relative max-w-lg w-full mx-4',
  cardHeader: 'text-lg font-semibold text-gray-900 mb-4',
  cardBody: 'text-gray-700 text-base mb-4',
  cardFooter: 'flex justify-end mt-4',
  cardButton:
    'bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  cardImage: 'w-full h-48 object-cover rounded-t-lg mb-4',
  cardTitle: 'text-xl font-bold text-gray-800',
  cardSubtitle: 'text-sm text-gray-500',
  cardLink: 'text-blue-600 hover:text-blue-700 underline',
};

const CreateTableStyle = {
  container: 'flex flex-col items-start mb-2.5 w-full',
  input: 'border rounded-lg p-2 w-full',
  errorText: 'text-red-500 text-sm mt-1',
  buttonContainer: 'space-x-10',
  button: 'px-4 py-2 text-white rounded-lg hover:bg-blue-600',
  addButton: 'bg-blue-500',
  createButton: 'bg-green-500 hover:bg-green-600',
  inputError: 'border-red-500',
  recommendButton:
    'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full mb-4',
};

export default CreateTableStyle;
