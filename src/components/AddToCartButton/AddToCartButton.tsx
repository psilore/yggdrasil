import * as React from 'react';
import { css, Styled } from 'react-css-in-js';


interface Props {
  onClick:(e:any) => void,
  children
}

export default class AddToCartButton extends React.Component<any,Props>  {
  constructor(props: any) {
    super(props);
  }
  
  render() {
    return (
      <Styled>
        {css`
          font-family: inherit;
          color: rgb(66, 176, 255);
          font-size: 1em;
          font-weight: 800;
          line-height: 1.2;
          text-align: right;
          display: inline-block;
          text-decoration: none;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          background-color: transparent;
          border: 1px solid transparent;
          padding: .3em 0;
          border-radius: .45em;
        `}
        <button onClick={this.props.onClick}>
          {this.props.children}
        </button>
      </Styled>
    );
  }
}
