import * as React from 'react';
import Button from '../Button/Button';
import Counter from '../Counter/Counter';
import Cross from '../Icons/Cross'
import CartItem from '../CartItem/CartItem'
import { css, Styled } from 'react-css-in-js';


interface Props {
  myCart: any,
  total: any,
  subTotal: any
  currency: any
}


export default class ShoppingCart extends React.Component<any,Props>  {
  constructor(props: any) {
    super(props);

    this.state = {
      myCart: [],
      total: 0,
      subTotal: 0,
      currency: ""
    };

  }

  render() {
    const closeCart = this.props.closeCart;
    const isCartEmpty = this.props.myCart.length == 0;

    return <Styled >
      {css`
        visibility: visible;
        opacity: 1;
        position: fixed;
        top: 0;
        left: 0;
        width: calc(100vw - 10vw);
        height: 100vh;
        background-color: rgba(6, 11, 16, .5);
        transition: all .3s ease-in-out;
        @media only screen and (min-width: 992px) {
          width: 100%;
        }
        .cart {
          position: relative;
          padding: 0 1em;
          box-sizing: border-box;
          background-color: rgb(5, 11, 19);
          height: 100%;
          width: 100%;
          overflow: auto;
          transform: translateX(calc(100vw - 100%));
          transition: all .3s ease-in-out;
          @media only screen and (min-width: 992px) {
            width: 580px;
          }
        }
        nav {
          padding: 1em 0;
          margin: 0;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-end;
        }
        nav button {
          border: none;
          margin-left: auto;
          margin-right: 0;
        }
        .cart-sub-total-group {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: 1.1em;
          font-weight: 800;
          line-height: 1.3;
          height: 56px;
          border-top: 1px solid #131d2d;
          margin-top: 4px;
        }
        .cart-sub-total-title {
          color: rgb(255 255 255);
          margin-right: 8px;
          color: rgb(181 194 214);
        }
        .cart-sub-total {
          display: flex;
          justify-content: flex-end;
          margin-right: 52px;
          color: rgb(255 255 255);
        }
        .cart-sub-total span {
          margin-right: 4px;
        }
      `}
      <aside className={`${this.props.active ? "" : "hidden"}`} >
        <div className="cart">
          <nav>
            <Button 
              total={ this.props.total }
              onClick={ () => closeCart() }
              children= { <Cross name="cross" color="white" size={24} /> }
            />
          </nav>
          <div>
            <h2>My cart</h2>
          </div>
          {this.props.myCart.map((cart) => (
            <CartItem
              id={cart.product.id}
              imageUrl={cart.product.imageUrl}
              title={cart.product.title}
              quantity={cart.quantity}
              price={cart.product.prices[0].amount}
              currency={this.props.currency}
              key={cart.product.id}
              setMyCart={this.props.setMyCart}
              setSubTotal={this.props.setSubTotal}
              setTotalItems={this.props.setTotalItems} 
              setCurrency={this.props.setCurrency} 
              cart={this.props.myCart}
            /> 
          ))}
          {isCartEmpty ? (
            <div className="cart-empty">
              Your shopping cart is empty!
            </div>
          ) : (
            <div className="cart-sub-total-group">
              <div className="cart-sub-total-title">Total: </div>
              <div className="cart-sub-total"><span>{ this.props.subTotal }</span> <span>{ this.props.currency }</span></div>
            </div>
          )}
        </div>
      </aside>
    </Styled>
  }
}