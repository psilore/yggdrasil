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
      products: [],
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
      <Styled>
        {css`
          display: grid;
          grid-gap: 1em;
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
                image_url= {product.imageUrl}
                title= {product.title}
                amount= {product.prices[0].amount}
                key={product.id}
              />
            ))}
        </div>
      </Styled>
    );
  }
}