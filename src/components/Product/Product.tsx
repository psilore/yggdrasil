
import React, { FunctionComponent } from 'react';
import { css, Styled } from 'react-css-in-js';


type Props = {
  title: string
}

export const Product: FunctionComponent<Props> = (props) => 
<Styled>
  {css`
    background: red
  `}
  <div>
    <h2>{ props.title }</h2>
  </div>
</Styled>
