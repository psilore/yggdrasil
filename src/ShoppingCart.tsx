import * as React from 'react';
import Button from './components/Button/Button';
import Products from './components/Products/Products';
import Cart from './components/Icons/Cart'

import { css, Styled } from 'react-css-in-js';

export default class ShoppingCart extends React.Component {

    render() {
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
                  onClick={() => console.log("Button clicked!")}
                  children= { <Cart name="cart" color="white" size={24} /> }
                />
              </nav>
            </header>
            <main>
              <h2>Electonics & Computer peripherals </h2>
              <p>Lorem ipsum</p>
              <Products />
            </main>
            <footer>

            </footer>
          </div>
        </Styled>
    }
}