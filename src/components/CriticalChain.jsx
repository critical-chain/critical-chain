import React from 'react';

export default class CriticalChain extends React.Component {
  getItems() {
    this.props.todos || [];
  }
  render() {
    return <div className="grid-frame">
      <div className="grid-block">One</div>
      <div className="grid-block">Two</div>
    </div>;
  }
}
