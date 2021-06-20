import * as React from 'react';
import { css, Styled } from 'react-css-in-js';
import { Product } from '../Product/Product'

interface Props {
  products: []
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
      products: []
    };

    this.getProducts = this.getProducts.bind(this);
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

  render() {
    return (
      <div>
        {this.state.products.map((product: any) => (
          <Product
            title= {product.title}
            key={product.id}
          />
        ))}
      </div>
    );
  }
}