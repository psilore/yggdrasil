import React, { useEffect, useState } from 'react';
import { css, Styled } from 'react-css-in-js';
import Product from '../Product/Product';
import axios, { AxiosResponse } from 'axios';


interface Props {
  loading: any,
  baseUrl: any,
  path: any,
  products: any,
  cart: any,
  myCart: any,
  count: any
}

export default class Products extends React.Component<any,Props> {

  constructor(props: any) {
    super(props);

    this.state = {
      loading: Boolean,
      baseUrl: 'http://localhost:8181/',
      path: 'cart/',
      products: [],
      cart: [],
      myCart: [],
      count: 1
    };

    this.getProducts = this.getProducts.bind(this);
    this.postItem = this.postItem.bind(this);
    this.getCart = this.getCart.bind(this);

  }

  async componentDidMount() {
    const products = await this.getProducts();
    this.setState({ products });
    this.getTotal()
    this.getCart();
  }

  async getProducts() {
    const res = await fetch(`http://localhost:8181/products`);
    const data = await res.json();
    return data;
  }

  async getCart() {
    const res = await fetch(`http://localhost:8181/cart`);
    const data = await res.json();
    return data;
  }


  async postItem(id) {

    const encodedValue = encodeURIComponent(1);

    const endpoint = this.state.baseUrl + this.state.path + id + `?quantity=${encodedValue}`;

    const res = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => {
      this.setState({ 
          cart: [...this.state.cart, ...json.items] 
      })

      this.updateCart(this.state.cart)

      const items = Object.assign(json.items); 
     
      let array = [];
      items.forEach(key => {
        array.push(key.quantity)
      })

      const sum = array.reduce(function(a, b){
        return a + b;
      }, 0);

      this.setState({ 
          count: sum
      })

      /* this.props.setMyCart(this.state.cart); */
      
      this.setTotalNumberOfItems(this.state.count)
    })
    .catch(err => console.log('Request Failed', err));

  }

  setTotalNumberOfItems(number){
    this.props.setTotal(number);
  }
  
  updateCart(array) {
    this.setState({ 
      cart: [] 
    })
    this.props.setMyCart(array);
  }

  getTotal() {
    const items = Object.assign(this.state.cart);
    let array = [];
    items.forEach(key => {
      array.push(key.quantity)
    })/* 
    console.log(array) */
  }

  render() {
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
        <div>
            {this.state.products.map((product: any) => (
              <Product
                addToCart={this.postItem.bind(this.props.id)}
                image_url= {product.imageUrl}
                title= {product.title}
                currency={product.prices[0].currency}
                amount= {product.prices[0].amount}
                id={product.id}
                key={product.id}
              />
            ))}
        </div>
      </Styled>
    );
  }
}

