import React from 'react';

import EstimationsList from '../../components/EstimationsList';
import AddEstimation from '../../components/AddEstimation'


export default class EstimationsIndex extends React.Component {
  render() {
    return <main className="column">
      <EstimationsList estimations={this.props.estimations}/>
      <AddEstimation />
    </main>
  }
};
