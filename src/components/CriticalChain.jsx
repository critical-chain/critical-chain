import React from 'react';
import EstimationItem from './EstimationItem'

export default class CriticalChain extends React.Component {
  getItems() {
    return this.props.todos || [];
  }
  render() {
    return <div className="grid-frame">
      <div className="grid-block">
        <div className="grid-container medium-4">
          {
            this.getItems().map(item =>
              <EstimationItem item={item} key={item.get('id')} />
            )
          }
        </div>
      </div>
    </div>;
  }
};
