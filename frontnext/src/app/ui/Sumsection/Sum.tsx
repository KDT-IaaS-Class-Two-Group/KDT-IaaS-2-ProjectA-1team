// Sum.tsx

import React, { useState, useEffect } from 'react';
import { sumFromArray } from '@/app/lib/addIntAll';
import sumstyles from '../styles/styles-seh';

interface Props {
  columns: string[];
  selectedTableData: Array<Record<string, any>>;
}

const SumComponent = ({ columns, selectedTableData }: Props) => {
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [sum, setSum] = useState<string>('');

  useEffect(() => {
    if (selectedColumn) {
      const values = selectedTableData.map(
        (row) => row[selectedColumn]?.toString() || '',
      );
      let totalSum = sumFromArray(values);
      if (isNaN(parseInt(totalSum.replace(/,/g, ''), 10)) || totalSum === '0') {
        totalSum = '';
      }
      setSum(totalSum);
    } else {
      setSum('');
    }
  }, [selectedColumn, selectedTableData]);

  return (
    <div className={sumstyles.container}>
      <hr className={sumstyles.divider} />
      <div className={sumstyles.innerContainer}>
        <label htmlFor="sumtable" className={sumstyles.textCommon}>
          합계
        </label>
        <select
          id="sumtable"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className={`${sumstyles.textCommon} ${sumstyles.select}`}
        >
          {columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
        <span className={sumstyles.textCommon}>{sum ? `${sum}` : ''}</span>
      </div>
    </div>
  );
};

export default SumComponent;
