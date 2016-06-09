import React from 'react';

import EstimationsList from '../../components/EstimationsList';
import AddSomething from '../../components/AddSomething'


export default class EstimationsIndex extends React.Component {
  addEstimation(value) {
    this.props.callbacks.addEstimation(value);
  }

  render() {
    return <main className="row center-md">
      <div className="col-md-3 col-xs-12 start-md">
        <EstimationsList estimations={this.props.estimations}/>
        <AddSomething thing="estimation" callback={(value) => this.addEstimation(value)}/>
      </div>
    </main>
  }
};
