import * as React from 'react';
import Button from './components/Button/Button';
import Products from './components/Products/Products';

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
          `}
          <div>
            <header>
              <nav>
                <Button 
                  onClick={() => console.log("Button clicked!")}
                  children= "Ok"
                />
              </nav>
            </header>
            <main>
              <Products />
            </main>
            <footer>

            </footer>
          </div>
        </Styled>
    }
}