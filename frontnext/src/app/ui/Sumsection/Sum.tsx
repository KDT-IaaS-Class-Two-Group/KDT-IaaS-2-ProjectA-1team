// Sum.tsx

import React, { useState, useEffect } from 'react';
import { sumFromArray } from '@/app/lib/addIntAll';
import sumTotalStyles from '../styles/TotalStyles';

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
    <div className={sumTotalStyles.SumContainer}>
      <hr className={sumTotalStyles.SumDivider} />
      <div className={sumTotalStyles.SumInnerContainer}>
        <label htmlFor="sumtable" className={sumTotalStyles.SumTextCommon}>
          합계
        </label>
        <select
          id="sumtable"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className={`${sumTotalStyles.SumTextCommon} ${sumTotalStyles.SumSelect}`}
        >
          {columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
        <span className={sumTotalStyles.SumTextCommon}>
          {sum ? `${sum}` : ''}
        </span>
      </div>
    </div>
  );
};

export default SumComponent;
