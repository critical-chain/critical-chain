import React from 'react';
import Estimation from './Estimation'
import AddEstimation from './AddEstimation'

export default class CriticalChain extends React.Component {
  getItems() {
    return this.props.todos || [];
  }
  render() {
    return <div className="grid-frame vertical">
      <div className="grid-block shrink">
        <div className="grid-content">
          <div className="title-bar dark">
            <span className="title left">
              Critical Chain
            </span>
            <span className="right">
              <a href="#">Logout</a>
            </span>
          </div>
        </div>
      </div>

      <div className="grid-block">
        <div className="grid-container medium-3">
          <h3 className="subheader">Your estimations</h3>
          <section className="block-list">
            <ul>
              {
                this.getItems().map(item =>
                  <Estimation item={item} key={item.get('id')} />
                )
              }
            </ul>
          </section>
          <AddEstimation />
        </div>
      </div>
    </div>;
  }
};
