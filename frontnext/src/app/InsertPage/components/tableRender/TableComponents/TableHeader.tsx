import React from 'react';
import TotalStyles from '@/app/ui/styles/TotalStyles';

interface TableHeaderProps {
  headers: string[];
  editableHeaders: string[];
  headerErrors: string[];
  hoveredHeader: number | null;
  headerRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  setHoveredHeader: (index: number | null) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLInputElement>,
    rowIndex: number,
    colIndex: number,
    isHeader: boolean,
  ) => void;
  getInputClassName: (index: number) => string;
  onHeaderChange: (index: number, value: string) => void;
  onDeleteColumn: (index: number) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  headers,
  editableHeaders,
  headerErrors,
  hoveredHeader,
  headerRefs,
  setHoveredHeader,
  handleKeyDown,
  getInputClassName,
  onHeaderChange,
  onDeleteColumn,
}) => {
  return (
    <thead className={TotalStyles.MainContentThead}>
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            className={TotalStyles.MainContentTh}
            onMouseEnter={() => setHoveredHeader(index)}
            onMouseLeave={() => setHoveredHeader(null)}
          >
            <input
              ref={(el) => (headerRefs.current[index] = el)}
              type="text"
              value={editableHeaders[index]}
              className={getInputClassName(index)}
              onChange={(e) => onHeaderChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 0, index, true)}
            />
            {hoveredHeader === index && (
              <button
                className={TotalStyles.MainContentDeleteColumnButton}
                onClick={() => onDeleteColumn(index)}
              >
                -
              </button>
            )}
            {headerErrors[index] && (
              <div className={TotalStyles.MainContentErrorText}>
                {headerErrors[index]}
              </div>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
