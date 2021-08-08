import * as React from 'react';
import Button from './components/Button/Button';
import Products from './components/Products/Products';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Cart from './components/Icons/Cart'

import { css, Styled } from 'react-css-in-js';

interface Props {
  active: boolean,
  baseUrl: any,
  path: any,
  id: any,
  total: any,
  products: any,
  cart: any,
  myCart: any
}

export default class App extends React.Component<any,Props> {

  constructor(props: any) {
    super(props);

    this.state = {
      active: false,
      baseUrl: 'http://localhost:8181/',
      path: 'cart/',
      id: 0,
      total: 0,
      products: [],
      cart: [],
      myCart: [],
    };

    this.toggleCart = this.toggleCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
    this.getCart = this.getCart.bind(this);
  } 

  async componentDidMount() {
    await this.initilizeCart();
  }
  
  async initilizeCart(){
    const cookie = this.getCookie("cart_id");
    if(cookie == null || cookie.length == 0) {
      console.log("no cookie!")
    } else {
      //console.log(this.getCookie("cart_id"))


      this.getCart()
    }
    
    
  }

  getCookie(string) {
      const regex = new RegExp(string + "=([^;]+)");
      const value = regex.exec(document.cookie);
      return (value != null) ? unescape(value[1]) : null;
  }

  setProducts = (childData) => {
    this.setState({
      products: childData
    })
  }

  setMyCart = (childData) => {
    this.setState({
      myCart: childData
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

  async getCart() {
    const url = this.state.baseUrl + this.state.path

    await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {

      this.setState({ 
          myCart: [...this.state.myCart, ...json.items] 
      })
    })
    .catch(err => console.log('Request Failed', err));


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
          <Products setTotal={ this.setTotal } setProducts={ this.setProducts } setMyCart={ this.setMyCart }/>
        </main>
        <ShoppingCart active={active} closeCart={this.closeCart.bind(this)} myCart={ this.state.myCart }/>
        <footer>

        </footer>
      </div>
    </Styled>
  }
}