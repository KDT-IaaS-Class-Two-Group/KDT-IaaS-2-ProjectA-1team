// SumComponent.tsx
import React, { useState, useEffect } from 'react';
import { sumFromArray } from '@/app/lib/addIntAll';

const SumComponent = ({
  selectedTableData,
}: {
  selectedTableData: string[];
}) => {
  const [sum, setSum] = useState('0');

  useEffect(() => {
    if (selectedTableData.length > 0) {
      const totalSum = sumFromArray(selectedTableData);
      setSum(totalSum);
    }
  }, [selectedTableData]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4">
      <div className="flex justify-between items-center">
        <span>합계</span>
        <span>{sum}</span>
      </div>
    </div>
  );
};

export default SumComponent;
