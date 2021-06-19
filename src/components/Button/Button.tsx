import * as React from 'react';

interface Props {
  onClick: () => void;
}

const Button: React.FC<Props> = ({
    children,
    onClick
  }) => { 
  return (
    <button 
      onClick={onClick}
    >
    {children}
    </button>
  );
}

export default Button;