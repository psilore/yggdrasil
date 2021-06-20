import * as React from 'react';
import { css, Styled } from 'react-css-in-js';

interface Props {
  onClick: () => void;
}

const color = 'white';

const Button: React.FC<Props> = ({
    children,
    onClick
  }) => { 
  return (
      <Styled>
        {css`
          padding: 32px;
          color: black;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: ${color};
          }
        `}
        <button onClick={onClick}>
          {children}
        </button>
      </Styled>
  );
}

export default Button;