import * as React from 'react';
import { css, Styled } from 'react-css-in-js';
import Product from '../Product/Product'

interface Props {
  products: string[],
  cart: string[]
  quantity: number
}

/* const Product = ({ title }:any) => (
  <div className="card">
    <p>{title}</p>
  </div>
); */

export default class Products extends React.Component<any,Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      products: [],
      cart: [],
      quantity: 0,
    };

    this.getProducts = this.getProducts.bind(this);
    this.postItem = this.postItem.bind(this);
    this.countTotalItemsInCart = this.countTotalItemsInCart.bind(this);
  }

  countTotalItemsInCart() {
    const cart = this.state.cart;
    const total = cart.length.toString()
    
  }

  async getProducts() {
    const res = await fetch(`http://localhost:8181/products`);
    const data = await res.json();
    return data;
  }

  async componentDidMount() {
    const products = await this.getProducts();
    this.setState({ products });  
  }

  async postItem(id,quantity) {
    const endpoint = 'http://localhost:8181/cart/' + id + '?quantity=' + quantity;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    if (res.ok) {
      this.setState({ 
          cart: [...this.state.cart, data] 
      })
      const cart = this.state.cart;
      /* this.props.setCart(cart); */
      const total = cart.length.toString()
      this.props.setTotal(total);
    }
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
                addToCart={this.postItem.bind(this)}
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