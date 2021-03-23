import React, { DOMAttributes, useState } from 'react';
import '../css/Square.css';

interface ISquare {
  value?: string | null | undefined
  onClick: any
}

class Square extends React.PureComponent<ISquare>  {  
    render() {
      return (
        <button onClick={ this.props.onClick } className="square">
          {this.props.value}
        </button>
      );
    }
  }
  
export default Square;