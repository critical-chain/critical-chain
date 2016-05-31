import React from 'react';
import {withRouter} from 'react-router';

import Paper from 'material-ui/Paper';
import List from 'material-ui/List';

import EstimationValue from '../../components/EstimationValue';
import EstimationStep from '../../components/EstimationStep';


class EstimationsShow extends React.Component {
  getEstimation() {
    return this.props.estimations.find((e) => {
      return e.id == this.props.params.id;
    })
  }

  render() {
    var estimation = this.getEstimation();
    console.log(estimation);
    if (estimation === undefined) {
      this.props.router.replace('/');
      return <div/>;
    }

    return <main className="row">
      <div className="col-xs-12 col-md-6 col-md-offset-2">
        <h2>{estimation.title}</h2>
        <Paper>
          <List>
            {
              estimation.steps.map((step => {
                return <EstimationStep step={step}/>
              }))
            }
          </List>
        </Paper>
      </div>
      <div className="col-xs-12 col-md-3 col-md-offset-1">
        <h1>
          <EstimationValue estimation={estimation}/>
        </h1>
      </div>
    </main>
  }
}

export default withRouter(EstimationsShow);
