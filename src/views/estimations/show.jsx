import React from 'react';
import {withRouter} from 'react-router';
import Immutable from 'immutable';

import Paper from 'material-ui/Paper';
import List from 'material-ui/List';

import EstimationValue from '../../components/EstimationValue';
import EstimationStep from '../../components/EstimationStep';
import AddSomething from '../../components/AddSomething';

class EstimationsShow extends React.Component {
  addEstimation(value) {
    this.props.callbacks.addEstimationItem(this.props.params.id, value);
  }

  getEstimation() {
    var currentId = this.props.params.id;
    return this.props.estimations.find((e) => {
        return e.get('id') == currentId;
      }) || Immutable.Map({});
  }


  componentWillMount() {
    if (this.getEstimation() === undefined) {
      this.props.router.replace('/');
      return <div/>;
    }
  }

  render() {
    var estimation = this.getEstimation();
    return <main className="row">
      <div className="col-xs-12 col-md-3 col-md-offset-1 last-md">
        <h1>
          <EstimationValue estimation={estimation}/>
        </h1>
      </div>

      <div className="col-xs-12 col-md-6 col-md-offset-2">
        <h2>{estimation.get('title')}</h2>
        <Paper>
          <List>
            {
              estimation.get('steps', Immutable.List([]))
                .map(step => <EstimationStep step={step} key={"step-" + step.get('id')}/>)
            }
          </List>
        </Paper>
        <AddSomething thing="item" callback={(value) => this.addEstimation(value)}/>
      </div>
    </main>
  }
}

export default withRouter(EstimationsShow);
