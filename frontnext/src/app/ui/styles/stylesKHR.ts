export const PwChangeModalStyles = {
  modalOverlay:
    'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50',

  modalContent: 'bg-white rounded-lg relative max-w-md w-full mx-4 p-8',

  closeButton: 'absolute top-2 right-2 text-gray-500 hover:text-gray-700',

  input:
    'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-6',

  button:
    'w-full py-2 px-4 rounded-lg border border-transparent text-center hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 ',

  submitButton:
    'w-full py-2 px-4 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 mt-4',

  label: 'block text-sm font-medium text-gray-700',

  messageContainer: 'text-center',

  successText: 'text-green-500 text-xl font-semibold text-center mt-4',

  failureText: 'text-red-500 text-xl font-semibold text-center mt-4',
};
