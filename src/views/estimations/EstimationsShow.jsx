import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Immutable from 'immutable';

import Paper from 'material-ui/Paper';
import List from 'material-ui/List';

import EstimationValue from '../../components/EstimationValue';
import EstimationStep from '../../components/EstimationStep';
import AddSomething from '../../components/AddSomething';

import {addEstimationItem} from '../../actions';


class EstimationsShow extends React.Component {
  addEstimationItem(value) {
    this.props.dispatch(addEstimationItem(parseInt(this.props.params.id), value));
  }

  getEstimation() {
    var currentId = this.props.params.id;
    return this.props.estimations.find((e) => {
        return e.get('id') == currentId;
      }) || Immutable.Map({});
  }

  hasSteps() {
    return this.getEstimation().get('steps').size > 0;
  }

  redirectIfNoEstimationFound() {
    if (this.getEstimation() === Immutable.Map({})) {
      this.props.router.replace('/');
      return <div/>;
    }
  }

  render() {
    this.redirectIfNoEstimationFound();

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
                .map(step => <EstimationStep step={step} estimationId={estimation.get('id')} key={"step-" + step.get('id')}/>)
            }
          </List>
        </Paper>
        <AddSomething thing="item" callback={(value) => this.addEstimationItem(value)}/>
      </div>
    </main>
  }
}

function _mapStateToProps(state) {
  return {estimations: state.estimations || Immutable.List([])};
}
export default connect(_mapStateToProps)(withRouter(EstimationsShow));
