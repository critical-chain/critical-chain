import React from 'react';
import {withRouter} from 'react-router';

import EstimationValue from '../../components/EstimationValue';


class EstimationsShow extends React.Component {
  getEstimation() {
    return this.props.estimations.find((e) => {
      return e.id == this.props.params.id;
    })
  }
  render() {
    var estimation = this.getEstimation();
    console.log(estimation);
    if(estimation === undefined) {
      this.props.router.replace('/');
      return <div/>;
    }

    return <main className="row">
        <div className="col-xs-12 col-md-6 col-md-offset-2">
          <h1>Hello from estimation {estimation.id}</h1>
          <h2>{estimation.title}</h2>
        </div>
        <div className="col-xs-12 col-md-3 col-md-offset-1">
          <EstimationValue estimation={estimation} />
        </div>
    </main>
  }
}

export default withRouter(EstimationsShow);
