// pwChangeModalStyle.ts
export const PwChangeModalStyles = {
  modalOverlay:
    'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50',
  modalContent: 'bg-white rounded-lg relative max-w-md w-full mx-4 p-8', // max-w-md로 줄임   form
  closeButton: 'absolute top-2 right-2 text-gray-500 hover:text-gray-700',

  input:
    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-6',
  button:
    'w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
  label: 'block text-sm font-medium text-gray-700',
  messageContainer: 'text-center',
  successText: 'text-blue-500 text-4xl font-bold',
  failureText: 'text-red-500 text-4xl font-bold',
};
