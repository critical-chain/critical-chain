import React from 'react';

import EstimationsList from '../../components/EstimationsList';
import AddEstimation from '../../components/AddEstimation'


export default class EstimationsIndex extends React.Component {
  render() {
    return <main className="row center-md">
      <div className="col-md-3 col-xs-12 start-md">
        <EstimationsList estimations={this.props.estimations}/>
        <AddEstimation />
      </div>
    </main>
  }
};
