import * as React from 'react';
import { css, Styled } from 'react-css-in-js';

interface Props {
  active: boolean
}

export default class Counter extends React.Component<any,Props>  {

  constructor(props: any) {
    super(props);

    this.state = {
      active: false
    };

    this.showCounter = this.showCounter.bind(this);
    this.hideCounter = this.hideCounter.bind(this);

  }

  showCounter() {
    this.setState({ active: true });
  }
  
  hideCounter() {
    this.setState({ active: false });
  }

  async componentDidMount() {
    const total = this.props.total;
    if(total <= 0 || total != undefined) {
      this.hideCounter();
    } 
  }

  componentDidUpdate(prevProps) {
    if (prevProps.total !== this.props.total) {
      if(this.props.total >= 1) {
        this.showCounter();
      } 
    }
  }

  render() {

    return (
      
      <Styled>
        {css`
          visibility: visible;
          opacity: 1;
          transition: all .3s ease-in-out;
          position: absolute;
          top: -8px;
          left: -8px;
          height: 1.2em;
          min-width: 1.2em;
          box-sizing: border-box;
          background-color: rgb(66 176 255);
          border-top-right-radius: 16px;
          border-top-left-radius: 16px;
          border-bottom-right-radius: 16px;
          border-bottom-left-radius: 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          .number {
            font-family: Poppins,Helvetica Neue,Helvetica,Segoe UI,Tahoma,Arial,sans-serif;
            font-size: 0.8em;
            font-weight: 800;
            color: white;
            margin: 0 .4em;
          }
        `}
        <div className={`${this.state.active ? "" : "hidden"}`}>
          <span className="number">{ this.props.total } </span>
        </div>
      </Styled>
    )
  }
}