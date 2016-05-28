import React from 'react';


import Header from './Header';
import EstimationsList from './EstimationsList';
import AddEstimation from './AddEstimation'


export default class CriticalChain extends React.Component {
  getEstimations() {
    return this.props.estimations || [];
  }
  render() {
    return <div id="applicationRoot">
      <Header estimations={this.getEstimations()} />
      <main className="column" >
        <EstimationsList estimations={this.getEstimations()} />
        <AddEstimation />
      </main>
    </div>
  }
};
