// SumComponent.tsx
import React from 'react';

const SumComponent = ({ selectedTableData, columns }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4">
      <div className="flex justify-end items-center w-full pr-10">
        <span className="text-lg font-bold mr-2">합계</span>
        <select className="mx-2">
          {columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
        <span className="text-lg font-bold">{selectedTableData}</span>
      </div>
    </div>
  );
};

export default SumComponent;
