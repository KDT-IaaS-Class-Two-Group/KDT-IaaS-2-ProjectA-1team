import React from 'react';
import TableHeader from '../components/Table/TableHeader';
import TableBody from '../components/Table/TableBody';
import TableContainer from '../components/Table/TableContainer';

interface DataTableProps {
  data: { [key: string]: string | number }[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const columnCount = Object.keys(data[0] || {}).length;
  const isScrollable = columnCount >= 8; // 열 개수가 8개 이상인지 확인

  return (
    <TableContainer isScrollable={isScrollable} columnCount={columnCount}>
      {data.length > 0 && (
        <>
          <TableHeader
            keys={Object.keys(data[0])}
            isScrollable={isScrollable}
          />
          <TableBody data={data} isScrollable={isScrollable} />
        </>
      )}
    </TableContainer>
  );
};

export default DataTable;
