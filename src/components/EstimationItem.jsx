import React from 'react';

export default class EstimationItem extends React.Component {
  render() {
    return <div className="grid-content todo">
      <input type="checkbox"
             className="toggle" />
      <label htmlFor="todo">
             {this.props.item.get('text')}
      </label>
      <button className="destroy alert button" />
    </div>
  }
};

