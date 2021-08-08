import * as React from 'react';
import { css, Styled } from 'react-css-in-js';

interface Props {
  title: string,
  id: string,
  imageUrl: string,
  quantity:string,
  price:string,
  currency:string
}

export default class CartItem extends React.Component<any,Props>  {

  constructor(props: any) {
    super(props);

    this.state = {
      title: "",
      id: "",
      imageUrl: "",
      quantity: "",
      price: "",
      currency: ""
    };

  }



  render() {
    return (
      <Styled>
        {css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          .cart-item-group {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            flex: 1;
            height: 56px;
            overflow: auto;
          }
          .cart-item-img {
            width: auto;
            height: 48px;
            margin-right: 16px;
          }
          .cart-item-quantity {
            display: flex;
            flex-direction: row;
            margin: 0 16px;
          }  
          .cart-item-quantity button {
            width: 24px;
            height: 24px;
          } 
          .cart-item-total {
            display: flex;
            justify-content: center;
            width: 24px;
            height: 24px;
            font-weight: bold;
          }    
        `}
        <div className="cart-item">
          <div className="cart-item-group">
            <img className="cart-item-img" src={'http://localhost:8181' + this.props.imageUrl} alt="" />
            <div className="cart-item-title">{ this.props.title }</div>
          </div>
          <div className="cart-item-quantity">
            <button>+</button>
              <div className="cart-item-total">{ this.props.quantity }</div>
            <button>-</button>
          </div>
          <div className="cart-item-price">
            <span>{ this.props.price }</span>
            <span>{ this.props.currency }</span>
          </div>
        </div>
      </Styled>
    )
  }
}