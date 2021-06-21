import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
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
        color: rgb(181, 194, 214);
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-font-smoothing: antialiased;

        @media only screen and (min-width: 992px) {
          width: 992px;
          margin: 0 auto;
        }
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
      h2 {
        color: white;
        letter-spacing: 0.0323em;
        font-size: 1.7em;
        font-weight: 600;
        line-height: 1.3;
      }
      p {
        color: rgb(155, 181, 220);
        font-size: 1.1em;
        letter-spacing: 0.0323em;
        font-weight: 200;
        line-height: 1.3;
      }
      aside.hidden {
        visibility: hidden;
        opacity: 0;
        transform: translateX(0);
        transition: all .3s ease-in-out;
      }
      aside.hidden .cart {
        transform: translateX(calc(180vw - 100%));
        transition: all .3s ease-in-out;
      }
      button div.hidden {
        visibility: hidden;
        opacity: 0;
        transition: all .3s ease-in-out;
      }
    `}
  </Style>
  <App />
  </React.StrictMode>,
  document.getElementById("root")
);
