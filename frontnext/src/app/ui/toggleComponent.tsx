// frontnext/src/app/ui/toggleComponent.tsx
import React from 'react';

interface ToggleProps {
  isVisible: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ isVisible }) => {
  return (
    <div>
      <button onClick={isVisible} className="px-4 py-2 text-black rounded mt-4">
        ▼
      </button>
    </div>
  );
};
