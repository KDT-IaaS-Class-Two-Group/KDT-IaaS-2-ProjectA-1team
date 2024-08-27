'use client';

import React from 'react';
import TotalStyles from '@/app/ui/styles/TotalStyles';

interface RecommendProps {
  className?: string;
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const RecommendTemp: React.FC<RecommendProps> = ({ className, onClose }) => {
  return (
    <div className={TotalStyles.CreateTableRecommendButtonContainer}>
      <button type="button" className={className} onClick={onClose}>
        요식업
      </button>
      <button type="button" className={className} onClick={onClose}>
        인력부
      </button>
      <button type="button" className={className} onClick={onClose}>
        돌아가기
      </button>
    </div>
  );
};

export default RecommendTemp;
