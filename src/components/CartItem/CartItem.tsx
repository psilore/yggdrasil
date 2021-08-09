import * as React from 'react';
import { css, Styled } from 'react-css-in-js';
import Button from '../Button/Button';
import Plus from '../Icons/Plus';
import Minus from '../Icons/Minus';
import Delete from '../Icons/Delete';

interface Props {
  baseUrl: any,
  path: any,
  cart: any,
  myCart: any
}

export default class CartItem extends React.Component<any,Props>  {

  constructor(props: any) {
    super(props);

    this.state = {
      baseUrl: 'http://localhost:8181/',
      path: 'cart/',
      cart: [],
      myCart: []
    };

  }

  async addItem() {
    let id = this.props.id

    let cart = this.props.cart
    let result = cart.filter(data => data.product.id === id)
    let currentQuantity = result[0].quantity
    const quantity = currentQuantity + 1
    const endpoint = this.state.baseUrl + this.state.path + id + '?quantity=' + quantity;

    await fetch(endpoint, {
      method: 'PUT',
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

      this.props.setSubTotal(sum)

      this.updateCart(this.state.cart)

      this.props.setTotalItems(this.getTotalItems(json.items));

    })
    .catch(err => console.log('Request Failed', err));

  }

  async removeItem() {
    let id = this.props.id

    let cart = this.props.cart
    let result = cart.filter(data => data.product.id === id)
    let currentQuantity = result[0].quantity
    if(currentQuantity >= 2) {
      const quantity = currentQuantity - 1
      const endpoint = this.state.baseUrl + this.state.path + id + '?quantity=' + quantity;

      await fetch(endpoint, {
        method: 'PUT',
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

        this.props.setSubTotal(sum)

        this.updateCart(this.state.cart) 
        
        this.props.setTotalItems(this.getTotalItems(json.items));

      })
      .catch(err => console.log('Request Failed', err));    
    }

  }

  async deleteItem() {
    let id = this.props.id
    const endpoint = this.state.baseUrl + this.state.path + id;

    await fetch(endpoint, {
      method: 'DELETE',
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

      this.props.setSubTotal(sum)

      this.updateCart(this.state.cart) 

      this.props.setTotalItems(this.getTotalItems(json.items));


    })
    .catch(err => console.log('Request Failed', err));
  }


  updateCart(array) {
    this.setState({ 
      cart: [] 
    })
    this.props.setMyCart(array);
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
          .cart-item-title {
            width: auto;
            margin-right: 16px;
            color: rgb(155, 181, 220);
          }
          .cart-item-img {
            width: 48px;
            height: 48px;
            margin-right: 16px;
          }
          .cart-item-quantity {
            width: 110px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-right: 16px;
          }  
          .cart-item-quantity button {
            background-color: rgb(15 32 56);
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
          }  
          .cart-remove-item button{
            background-color: transparent;
            border: none;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
          }  
          .cart-item-price {
            max-width: 200px;
            display: flex;
            justify-content: flex-end;
            width: 96px;
            margin-right: 16px;
          }  
          .cart-item-price span {
            margin-right: 4px;
          }  
          .cart-item-total {
            max-width: 100px;
          }
        `}
        <div className="cart-item">
          <div className="cart-item-group">
            <img className="cart-item-img" src={'http://localhost:8181' + this.props.imageUrl} alt="" />
            <div className="cart-item-title">{ this.props.title }</div>
          </div>
          <div className="cart-item-quantity">
            <Button 
              onClick={ () => this.addItem() }
              children= { <Plus name="plus" color="white" size={12} /> }
            />
            <div className="cart-item-total">{ this.props.quantity }</div>
            <Button 
              onClick={ () => this.removeItem() }
              children= { <Minus name="minus" color="white" size={12} /> }
            />
          </div>
          <div className="cart-item-price">
            <span>{ this.props.price }</span>
            <span>{ this.props.currency }</span>
          </div>
          <div className="cart-remove-item">
            <Button 
              onClick={ () => this.deleteItem() }
              children= { <Delete name="delete" color="white" size={16} /> }
            />
          </div>
        </div>
      </Styled>
    )
  }
}