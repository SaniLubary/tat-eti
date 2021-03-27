import React, { ReactElement } from 'react';
import PropTypes, { InferProps } from "prop-types";
import '../css/Square.css';

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.any.isRequired
}

function Square({ value, onClick }: InferProps<typeof Square.propTypes> ): ReactElement 
{
  return (<button onClick={ onClick } className="square">
    { value }
  </button>)
}

export default Square
