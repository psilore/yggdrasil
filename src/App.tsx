import * as React from 'react';
import Button from './components/Button/Button';
import Products from './components/Products/Products';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Cart from './components/Icons/Cart';
import Flag from './components/Icons/Flag';

import { css, Styled } from 'react-css-in-js';

interface Props {
  active: boolean,
  baseUrl: any,
  path: any,
  id: any,
  totalItems: any,
  subTotal: any,
  products: any,
  cart: any,
  myCart: any,
  myLanguage: any,
  currency: any,
  amount: any,
  isLoaded: boolean
}

export default class App extends React.Component<any, Props> {

  constructor(props: any) {
    super(props);

    this.state = {
      active: false,
      baseUrl: 'http://localhost:8181/',
      path: 'cart/',
      id: 0,
      totalItems: 0,
      subTotal: 0,
      products: [],
      cart: [],
      myCart: [],
      myLanguage: "sv_SE",
      currency: "",
      amount: "",
      isLoaded: false
    };

    this.toggleCart = this.toggleCart.bind(this);
    this.closeCart = this.closeCart.bind(this);
    this.initilizeCart = this.initilizeCart.bind(this); 
  }

  async componentDidMount() {
      await this.initilizeCart();
  }

  async initilizeCart() {
    const cookie = this.getCookie("cart_id");
    if (cookie == null || cookie.length == 0) {
      console.log("no cookie! WHAT?")
      this.getCart()
      this.getProducts()
    } else {

      const cartId = this.getCookie("cart_id")
      console.log(`Current cart ID: ${cartId}`)

      //TODO Store cart ID for caching cart
      
      this.getCart()
      this.getProducts()
    }
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

  setTotalItems = (childData) => {
    this.setState({
      totalItems: childData
    })
  }

  setSubTotal = (childData) => {
    this.setState({
      subTotal: childData
    })
  }

  setCurrency = (childData) => {
    this.setState({
      currency: childData
    })
  } 

  getCookie(string) {
    const regex = new RegExp(string + "=([^;]+)");
    const value = regex.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }

  async getProducts() {
    const url = this.state.baseUrl + 'products'

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
          isLoaded: true,
          products: json
        })
      })
      .catch(err => console.log('Request Failed', err));

    
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

        const myCartWithTotal = this.getProductsTotal(json.items, this.state.myLanguage)
        
        this.setState({
          myCart: [...this.state.myCart, ...myCartWithTotal]
        })

        const subTotal = this.sumNumbers(myCartWithTotal)

        this.setState({
          subTotal: subTotal
        })

        const currency = this.getCurrency(this.state.myCart)

        this.setState({
          currency: currency
        })
        const amount = this.getAmount(this.state.myCart)

        this.setState({
          amount: amount
        })

        const totalItems = this.getTotalItems(json.items)

        this.setState({
          totalItems: totalItems
        })


      })
      .catch(err => console.log('Request Failed', err));


  }  

  getTotalItems(object) {
    const items = Object.assign(object); 
    let array = [];
    items.forEach(key => {
      array.push(key.quantity)
    })
    const sumItems = array.reduce(function(a, b){
      return a + b;
    }, 0);
    return sumItems
  }

  getCurrency(object) {
    let currency = "";
    const language = this.state.myLanguage
    if(language == "sv_SE" || language == undefined) {
      object.forEach(key => {
        currency = key.product.prices[0].currency
      })
      return currency
    } else {
      object.forEach(key => {
        currency = key.product.prices[1].currency
      })
      return currency
    }  
  }

  getAmount(object) {
    let amount = "";
    const language = this.state.myLanguage
    if(language == "sv_SE" || language == undefined) {
      object.forEach(key => {
        amount = key.product.prices[0].amount
      })
      return amount
    } else {
      object.forEach(key => {
        amount = key.product.prices[1].amount
      })
      return amount
    }  
  }

  getProductsTotal(object, language) {
    if(language == "sv_SE" || language == undefined) {
      let result = object.map(data=>{
        return {...data, sub_total: data.product.prices[0].amount*data.quantity};
      })
      return result
    } else {
      let result = object.map(data=>{
        return {...data, sub_total: data.product.prices[1].amount*data.quantity};
      })
      return result
    }
  }

  sumNumbers(object) {
    let prices = [];
    object.forEach(key => {
      prices.push(key.sub_total)
    })

    if(prices.length != 0){
      const sum = (acc, cur) => acc + cur;
      return Math.round(prices.reduce(sum))
    }
  }

  closeCart() {
    this.toggleCart();
  }

  toggleCart() {
    this.setState(prevState => ({ active: !prevState.active }));
  }

  render() {

    const { active } = this.state;
    const products = this.state.products
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
        nav button:first-child {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
          border: none;
        }
        nav button:last-child {
          margin: 0;
        }
        main {
          margin: 0 1em;
        }
      `}
      <div>
        <header>
          <nav>
            <Button 
              onClick={ () => console.log(this.state.myLanguage) }
              children= { <Flag name="flag" width={24} height={19} /> }
            />
            <Button
              total={this.state.totalItems}
              onClick={this.toggleCart}
              children={<Cart name="cart" color="white" size={24} />}
            />
          </nav>
        </header>
        <main>
          <h2>Electronics & Computer peripherals</h2>
          <p>A diverse collection of the most awesome products on this side of the hemisphere.</p>
          <h4>Products</h4>
          <Products setTotalItems={this.setTotalItems} setSubTotal={this.setSubTotal} setCurrency={this.setCurrency} setProducts={this.setProducts} setMyCart={this.setMyCart} subTotal={this.state.subTotal} myLanguage={this.state.myLanguage} products={this.state.products}/>
        </main>
        <ShoppingCart active={active} closeCart={this.closeCart.bind(this)} setTotalItems={this.setTotalItems} setSubTotal={this.setSubTotal} setMyCart={this.setMyCart} myCart={this.state.myCart} currency={this.state.currency} amount={this.state.amount} myLanguage={this.state.myLanguage} subTotal={this.state.subTotal} />
        <footer>

        </footer>
      </div>
    </Styled>
  }
}