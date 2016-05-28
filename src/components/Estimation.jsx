import React from 'react';

export default class Estimation extends React.Component {
  render() {
    return <li>
      <a href="#">
         {this.props.item.get('text')}
      </a>

    </li>
  }
};

