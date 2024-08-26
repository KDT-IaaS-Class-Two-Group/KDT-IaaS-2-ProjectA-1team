import React, { useState, useEffect } from 'react';
import { sumFromArray } from '@/app/lib/addIntAll';
import { useLanguage } from '../../ui/SettingMoules/LanguageContext';
import Label from '../components/Sum/Label';
import Select from '../components/Sum/Select';
import SumDisplay from '../components/Sum/SumDisplay';
import SumContainer from '../components/Sum/SumContainer';

interface Props {
  columns: string[];
  selectedTableData: Array<Record<string, any>>;
}

const SumComponent: React.FC<Props> = ({ columns, selectedTableData }) => {
  const { language } = useLanguage();
  const [selectedColumn, setSelectedColumn] = useState<string>('');
  const [sum, setSum] = useState<string>('');

  const texts = {
    ko: { label: '합계' },
    en: { label: 'Sum' },
    jp: { label: '合計' },
    cn: { label: '总和' },
    vn: { label: 'Tổng' },
    th: { label: 'รวม' },
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
    <SumContainer>
      <Label htmlFor="sumtable" text={texts[language].label} />
      <Select
        id="sumtable"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
        options={columns}
      />
      <SumDisplay sum={sum} />
    </SumContainer>
  );
};

export default SumComponent;
