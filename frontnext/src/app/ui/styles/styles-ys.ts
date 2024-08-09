export const SettingStyles = {
  sidebar: `
    w-64 
    h-screen 
    bg-gray-800 
    text-white 
    flex 
    flex-col 
    p-4
    relative
  `,

  button: `
    px-4 
    py-2 
    rounded-lg 
    hover:bg-gray-700 
    active:bg-gray-600 
    focus:outline-none 
    focus:ring-2 
    focus:ring-gray-500 
    transition-all 
    duration-200
    cursor-pointer  /* 커서가 포인터로 변경되도록 설정 */
  `,

  containerStyle: `
    flex
    h-screen
    relative
  `,

  contentStyle: `
    flex-grow
    p-6
  `,

  toggleButton: `
    absolute
    top-1
    text-black
    p-2
    rounded
    cursor-pointer
    z-50
    transition-all
    duration-300
    text-xl
  `,
};
