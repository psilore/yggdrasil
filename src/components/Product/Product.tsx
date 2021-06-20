import React, { FunctionComponent } from 'react';
import { css, Styled } from 'react-css-in-js';


type Props = {
  image_url: string
  title: string
  amount: string
}

export const Product: FunctionComponent<Props> = (props) => 
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
    .product-price {
      margin-top: auto;
      color: white;
      font-weight: bold;
      text-align: right;
    }
  `}
  <div className="product">
    <div className="product-image-group">
      <img className="product-image" src={'http://localhost:8181' + props.image_url} />
    </div>
    <div className="product-title">{ props.title }</div>
    <div className="product-price">SEK { props.amount }</div>
  </div>
</Styled>
