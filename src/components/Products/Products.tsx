import React, { useEffect, useState } from 'react';
import { css, Styled } from 'react-css-in-js';
import Product from '../Product/Product';


interface Props {
  loading: any,
  baseUrl: any,
  path: any
  cart: any,
  myCart: any,
  products: any
}

export default class Products extends React.Component<any,Props> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: Boolean,
      baseUrl: 'http://localhost:8181/',
      path: 'cart/',
      cart: [],
      myCart: [],
      products: []
    };


    this.postItem = this.postItem.bind(this);
    this.getProducts = this.getProducts.bind(this);

  }


  async getProducts() {
    const res = await fetch(`http://localhost:8181/products`);
    const data = await res.json();
    this.setState({
      products: data
    })
  }

  async postItem(id) {

    const encodedValue = encodeURIComponent(1);

    const endpoint = this.state.baseUrl + this.state.path + id + `?quantity=${encodedValue}`;

    await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {

      const myCartWithTotal = this.getProductsTotal(json.items, this.props.myLanguage)
      
      this.setState({
        cart: [...this.state.myCart, ...myCartWithTotal]
      }) 

      const sum = this.sumNumbers(myCartWithTotal) 

      this.props.setSubTotal(sum);
      this.updateCart(this.state.cart)

      this.props.setTotalItems(this.getTotalItems(json.items));

      this.props.setCurrency(this.getCurrency(json.items));

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

  getAmount(object) {
    let amount = "";
    const language = this.props.myLanguage
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

  getCurrency(object) {
    let currency = "";
    const language = this.props.myLanguage
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

  updateCart(array) {
    this.setState({ 
      cart: [] 
    })
    this.props.setMyCart(array);
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

  render() {
    const language = this.props.myLanguage == "sv_SE"
    
    return (
      <Styled>
        {css`
          display: grid;
          grid-column-gap: 1em;
          grid-row-gap: 2.2em;
          grid-template-columns: 1fr 1fr;
          justify-items: stretch;
          @media only screen and (min-width: 768px) {
            grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
            grid-gap: 1em;
          }
        `}
        {language ? (
          <div>
              {this.props.products.map((product: any) => (
                <Product
                  addToCart= {this.postItem.bind(this.props.id)}
                  image_url= {product.imageUrl}
                  title= {product.title}
                  currency= {product.prices[0].currency}
                  amount= {product.prices[0].amount}
                  id= {product.id}
                  key= {product.id}
                />
              ))}
          </div>
        ) : (
          <div>
              {this.props.products.map((product: any) => (
                <Product
                  addToCart= {this.postItem.bind(this.props.id)}
                  image_url= {product.imageUrl}
                  title= {product.title}
                  currency= {product.prices[1].currency}
                  amount= {product.prices[1].amount}
                  id= {product.id}
                  key= {product.id}
                />
              ))}
          </div>
        )}
      </Styled>
    );
  }
}

