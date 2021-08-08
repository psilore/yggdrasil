
import React, { FunctionComponent } from 'react';
import Icons from '../../public/images/sprites.svg';

type Props = {
  name: string,
  width: number,
  height: number
}

export const Flag: FunctionComponent<Props> = (props) => 
<svg className={`icon ${props.name}`} width={props.width} height={props.height}>
  <use xlinkHref={`${Icons}#${props.name}`} />
</svg>

export default Flag;