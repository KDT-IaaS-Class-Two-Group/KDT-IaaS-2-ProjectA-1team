import React from 'react';
import navigateRoute from '@/app/lib/HeaderModule/navigateRoute';

interface ButtonProps {
  textNode: string;
  route: string;
  className?: string;
}

const ButtonClick: React.FC<ButtonProps> = ({ textNode, route, className }) => {
  const navigate = navigateRoute();
  return (
    <button
      onClick={() => {
        navigate(route);
      }}
      className={className}
    >
      {textNode}
    </button>
  );
};

export default ButtonClick;
