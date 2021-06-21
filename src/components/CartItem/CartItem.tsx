import * as React from 'react';
import { css, Styled } from 'react-css-in-js';

interface Props {
  title: string
  id: string
}

export default class CartItem extends React.Component<any,Props>  {

  constructor(props: any) {
    super(props);

    this.state = {
      title: "",
      id: ""
    };

  }

  render() {
    return (
      <Styled>
        {css`
          border-radius: .45em;
          display: flex;
          flex-flow: column nowrap;
          .product-image-group {
            background: rgb(7, 16, 29);
            border-radius: .45em;
            overflow: hidden;
            position: relative;
            height: 180px;
          }
          .product-image {
            width: auto;
            height: 7em;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .product-title {  
            color: rgb(155, 181, 220);  
            font-size: 1em;
            letter-spacing: 0.0523em;
            font-weight: 200;
            line-height: 1.2;
            margin-top: .55em;
            margin-bottom: .45em;
          }
          .product-meta-group {
            margin-top: auto;
            text-align: right;
          }
          .product-price {
            color: white;
            font-weight: bold;
          }
        `}
        <div className="cart-item">
          <div className="cart-item-title">{ this.props.title }</div>
        </div>
      </Styled>
    )
  }
}