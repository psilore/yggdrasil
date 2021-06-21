import * as React from 'react';
import Button from './components/Button/Button';
import Products from './components/Products/Products';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Cart from './components/Icons/Cart'

import { css, Styled } from 'react-css-in-js';

interface Props {
  active: boolean,
  id: number,
  total: string,
  cart: []
}

export default class App extends React.Component<any,Props> {

  constructor(props: any) {
    super(props);

    this.state = {
      active: false,
      id: 0,
      total: "0",
      cart: []
    };

    this.toggleCart = this.toggleCart.bind(this)
    this.closeCart = this.closeCart.bind(this);
  }

  setCart = (childData) => {
    this.setState({
      cart: childData
    })
  }

  setTotal = (childData) => {
    this.setState({
      total: childData
    })
  }

  closeCart(){
    this.toggleCart();
  }

  toggleCart() {
    this.setState(prevState => ({ active: !prevState.active }));
  }

  render() {

    const { active } = this.state;

    return <Styled>
      {css`
        height: 100vh;
        display: grid;
        grid-template-columns: 100%;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
          'header'
          'main'
          'footer';
        @media only screen and (min-width: 992px) {
          grid-template-columns: 1fr;
        }
        img {
          width: 100%;
          height: auto;
        }
        header {
          padding: 1em 0;
        }
        nav {
          margin: 0 1em;
          display: flex;
          flex-flow: row nowrap;
        }
        main {
          margin: 0 1em;
        }
      `}
      <div>
        <header>
          <nav>
            <Button 
              total={ this.state.total }
              onClick={ this.toggleCart }
              children= { <Cart name="cart" color="white" size={24} /> }
            />
          </nav>
        </header>
        <main>
          <h2>Electronics & Computer peripherals </h2>
          <p>A diverse collection of the most awesome products on this side of the hemisphere.</p>
          <h4>Products</h4>
          <Products setTotal={ this.setTotal } setCart={ this.setCart }/>
        </main>
        <ShoppingCart active={active} closeCart={this.closeCart.bind(this)} cart={ this.state.cart }/>
        <footer>

        </footer>
      </div>
    </Styled>
  }
}