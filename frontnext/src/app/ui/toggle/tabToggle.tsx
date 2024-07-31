// frontnext/src/app/ui/index.tsx
import React, { useState } from 'react';
import { Toggle } from './toggleComponent';

export const TabToggle = (children: React.ReactNode) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 탭 박스에 넣을 요소 === {children} */}
      {children}
      {/* 탭 박스 화면 예시 요소 */}
      {isVisible && (
        <div className="p-4 bg-gray-300 rounded flex space-x-4">
          <input type="date" className="p-2 border rounded" />
          <input type="date" className="p-2 border rounded" />
          <select className="p-2 border rounded">
            <option>Table1</option>
            <option>Table2</option>
            <option>Table3</option>
          </select>
          <input
            type="text"
            className="p-2 border rounded"
            placeholder="Enter text"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            조회
          </button>
        </div>
      )}
      <Toggle isVisible={toggleVisibility} />
    </div>
  );
};
