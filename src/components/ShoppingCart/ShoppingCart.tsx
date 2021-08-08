import * as React from 'react';
import Button from '../Button/Button';
import Cross from '../Icons/Cross'
import CartItem from '../CartItem/CartItem'
import Counter from '../Counter/Counter'
import { css, Styled } from 'react-css-in-js';
import { useState } from 'react';


interface Props {
  myCart: any,
  total: any
}


export default class ShoppingCart extends React.Component<any,Props>  {
  constructor(props: any) {
    super(props);

    this.state = {
      myCart: [],
      total: 0
    };

  }
  async componentDidMount() {
    /* this.setState({ 
        myCart: this.props.myCart
    })
    this.setState({ 
        total: this.props.total
    })  */
  }

  render() {
    const closeCart = this.props.closeCart;
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
        }
        button {
          border: none;
          margin-left: auto;
        }
      `}
      <aside className={`${this.props.active ? "" : "hidden"}`} >
        <div className="cart">
          <nav>
            <Button 
              total={ this.state.total }
              onClick={ () => closeCart() }
              children= { <Cross name="cross" color="white" size={24} /> }
            />
          </nav>
          <div className="cart-total">
            <h2>My cart</h2>
          </div>
          {this.props.myCart.map((cart) => (
            <CartItem
              imageUrl={cart.product.imageUrl}
              title={cart.product.title}
              quantity={cart.quantity}
              price={cart.product.prices[0].amount}
              currency={cart.product.prices[0].currency}
              key={cart.product.id}
            /> 
          ))}

          <div className="cart-total">
            <div>Total: </div>
            <div></div>
          </div>
        </div>
      </aside>
    </Styled>
  }
}