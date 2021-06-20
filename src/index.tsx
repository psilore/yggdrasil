import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ShoppingCart from './ShoppingCart';
import { css, Style } from 'react-css-in-js';

ReactDOM.render(
 <React.StrictMode>
  <Style>
    {css`
      html {
        background-color: rgb(13, 31, 58);
      }
      body {
        margin: 0;
        font-family: Poppins,Helvetica Neue,Helvetica,Segoe UI,Tahoma,Arial,sans-serif;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-font-smoothing: antialiased;
      }
      header {
        grid-area: header;
      }
      main {
        flex: 1;
        grid-area: main;
      }
      footer {
        grid-area: footer;
      }
    `}
  </Style>
  <ShoppingCart />
 </React.StrictMode>,
 document.getElementById("root")

);
