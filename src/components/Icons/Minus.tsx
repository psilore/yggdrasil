
import React, { FunctionComponent } from 'react';
import Icons from '../../public/images/sprites.svg';

type Props = {
  name: string,
  color: string,
  size: number
}

export const Minus: FunctionComponent<Props> = (props) => 
<svg className={`icon ${props.name}`} fill={props.color} width={props.size} height={props.size}>
  <use xlinkHref={`${Icons}#${props.name}`} />
</svg>

export default Minus;