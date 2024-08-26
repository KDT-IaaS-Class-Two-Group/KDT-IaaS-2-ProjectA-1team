import React from 'react';
import TotalStyles from '../../../ui/styles/TotalStyles';

interface TableContainerProps {
  isScrollable: boolean;
  columnCount: number;
  children: React.ReactNode;
}

const TableContainer: React.FC<TableContainerProps> = ({
  isScrollable,
  columnCount,
  children,
}) => {
  return (
    <div className={TotalStyles.ToggleTableContainer}>
      <div className={isScrollable ? TotalStyles.ToggleTableScrollWrapper : ''}>
        <table
          className={TotalStyles.ToggleTable}
          style={isScrollable ? { minWidth: columnCount * 150 } : {}}
        >
          {children}
        </table>
      </div>
    </div>
  );
};

export default TableContainer;
