import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ShoppingCart from './ShoppingCart';
import { css, Style } from 'react-css-in-js';

ReactDOM.render(
 <React.StrictMode>
  <Style>
    {css`
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 200;
        src: local(''),
            url('./poppins-v15-latin-200.woff2') format('woff2'),
            url('./poppins-v15-latin-200.woff') format('woff');
      }
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local(''),
            url('./poppins-v15-latin-regular.woff2') format('woff2'),
            url('./poppins-v15-latin-regular.woff') format('woff');
      }
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: local(''),
            url('./poppins-v15-latin-600.woff2') format('woff2'),
            url('./poppins-v15-latin-600.woff') format('woff');
      }
      @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: local(''),
            url('./poppins-v15-latin-800.woff2') format('woff2'),
            url('./poppins-v15-latin-800.woff') format('woff');
      }
      html {
        background-color: rgb(9, 23, 43);
      }
      body {
        margin: 0;
        font-family: Poppins,Helvetica Neue,Helvetica,Segoe UI,Tahoma,Arial,sans-serif;
        font-weight: 400;
        color: white;
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
      p {
        color: #799bce;
      }
    `}
  </Style>
  <ShoppingCart />
  </React.StrictMode>,
  document.getElementById("root")
);
