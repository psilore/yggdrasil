import * as React from 'react';
import AddToCartButton from '../AddToCartButton/AddToCartButton';
import { css, Styled } from 'react-css-in-js';
import { useState } from 'react';

interface Props {
  image_url: string
  title: string
  amount: string
  currency: string
  id: number
  count: number
}
export default class Product extends React.Component<any,Props>  {
  constructor(props: any) {
    super(props);

    this.state = {
      image_url: "",
      title: "",
      amount: "",
      currency: "",
      id: 1,
      count: 1
    };
  }

  render() {
    const addToCart = this.props.addToCart;
    
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
        <div className="product">
          <div className="product-image-group">
            <img className="product-image" src={'http://localhost:8181' + this.props.image_url} />
          </div>
          <div className="product-title">{ this.props.title }</div>
          <div className="product-meta-group">
            <AddToCartButton 
              onClick={() => addToCart(this.props.id, 1)}
              children= "Add to cart"
            />
            <div className="product-price">{ this.props.amount } { this.props.currency }</div>
          </div>
        </div>
      </Styled>
    )
  }
}