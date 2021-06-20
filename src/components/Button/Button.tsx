import * as React from 'react';
import { css, Styled } from 'react-css-in-js';

interface Props {
  onClick: () => void;
}

const color = 'rgb(24, 42, 68)';

const Button: React.FC<Props> = ({
    children,
    onClick
  }) => { 
  return (
      <Styled>
        {css`
          display: inline-block;
          font-weight: 400;
          text-align: center;
          text-decoration: none;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          background-color: transparent;
          border: 1px solid ${color};
          padding: .75rem .75rem;
          font-size: 1rem;
          border-radius: .45em;
          margin-left:auto;
          transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;&:hover {
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