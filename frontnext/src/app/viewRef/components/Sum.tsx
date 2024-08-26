import React, { useState, useEffect } from 'react';
import { sumFromArray } from '@/app/lib/addIntAll';
import TotalStyles from '../../ui/styles/TotalStyles';
import { useLanguage } from '../../ui/SettingMoules/LanguageContext';

interface Props {
  columns: string[];
  selectedTableData: Array<Record<string, any>>;
}

const SumComponent = ({ columns, selectedTableData }: Props) => {
  const { language } = useLanguage();
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [sum, setSum] = useState<string>('');

  const texts = {
    ko: {
      label: '합계',
    },
    en: {
      label: 'Sum',
    },
    jp: {
      label: '合計',
    },
    cn: {
      label: '总和',
    },
    vn: {
      label: 'Tổng',
    },
    th: {
      label: 'รวม',
    },
  };

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
    <div className={TotalStyles.SumContainer}>
      <hr className={TotalStyles.SumDivider} />
      <div className={TotalStyles.SumInnerContainer}>
        <label htmlFor="sumtable" className={TotalStyles.SumTextCommon}>
          {texts[language].label}
        </label>
        <select
          id="sumtable"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className={`${TotalStyles.SumTextCommon} ${TotalStyles.SumSelect}`}
        >
          {columns.map((column, index) => (
            <option key={index} value={column}>
              {column}
            </option>
          ))}
        </select>
        <span className={TotalStyles.SumTextCommon}>{sum ? `${sum}` : ''}</span>
      </div>
    </div>
  );
};

export default SumComponent;
