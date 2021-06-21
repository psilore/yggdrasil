import * as React from 'react';
import Counter from '../Counter/Counter'
import { css, Styled } from 'react-css-in-js';

interface Props {
  onClick:(e:any) => void,
  children
}

export default class Button extends React.Component<any,Props>  {
  constructor(props: any) {
    super(props);
  }
  
  render() {
    return (
      <Styled>
        {css`
          position: relative;
          display: inline-flex;
          appearance: none;
          font-weight: 400;
          text-align: center;
          text-decoration: none;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          background-color: transparent;
          border: 1px solid rgb(120, 143, 178);
          padding: .75rem .75rem;
          font-size: 1rem;
          border-radius: .75em;
          margin-left: auto;
          transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        `}
        <button onClick={this.props.onClick}>
          <Counter total={this.props.total}/>
          {this.props.children}
        </button>
      </Styled>
    );
  }
}