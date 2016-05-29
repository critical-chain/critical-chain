import React from 'react';

import EstimationsList from '../../components/EstimationsList';
import AddEstimation from '../../components/AddEstimation'


export default class EstimationsIndex extends React.Component {
  render() {
    return <main className="row">
      <div className="col-md-4 col-md-offset-4 col-xs-12">
        <EstimationsList estimations={this.props.estimations}/>
        <AddEstimation />
      </div>
    </main>
  }
};
