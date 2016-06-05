import React, { Component } from 'react';
import ClassNames from 'classnames';

export default class Square extends Component {
  render() {
    return(
      <div className={ClassNames('square', this.props.color)}></div>
    );
  }
}
