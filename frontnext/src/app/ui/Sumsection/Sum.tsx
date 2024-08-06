import React, { useState, useEffect } from 'react';
import { sumFromArray } from '@/app/lib/addIntAll';
import styles from '../styles/styles';

interface Props {
  columns: string[];
  selectedTableData: Array<Record<string, any>>;
}

const SumComponent = ({ columns, selectedTableData }: Props) => {
  const [selectedColumn, setSelectedColumn] = useState<string>(''); // 선택된 컬럼 상태
  const [sum, setSum] = useState<string>(''); // 합계 상태

  useEffect(() => {
    if (selectedColumn) {
      // 선택된 컬럼의 값들을 문자열 배열로 추출
      const values = selectedTableData.map(
        (row) => row[selectedColumn]?.toString() || '',
      );
      // sumFromArray 함수를 사용하여 합계 계산
      let totalSum = sumFromArray(values);
      // NaN 또는 합계가 0인 경우 빈 문자열로 설정
      if (isNaN(parseInt(totalSum.replace(/,/g, ''), 10)) || totalSum === '0') {
        totalSum = '';
      }
      setSum(totalSum); // 계산된 합계를 상태에 저장
    } else {
      setSum(''); // 기본값 설정
    }
  }, [selectedColumn, selectedTableData]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4">
      <div className="flex justify-end items-center w-full pr-10 gap-2.5">
        <label htmlFor="sumtable" className={styles.label}>
          합계
        </label>
        <select
          id="sumtable"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          {columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
        <span className="text-lg font-bold">{sum ? `${sum}` : ''}</span>{' '}
        {/* 포맷팅된 합계 표시 */}
      </div>
    </div>
  );
};

export default SumComponent;
