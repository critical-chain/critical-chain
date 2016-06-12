import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import Immutable from 'immutable';

import Paper from 'material-ui/Paper';
import List from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';

import EstimationValue from '../../components/EstimationValue';
import EstimationStep from '../../components/EstimationStep';
import AddSomething from '../../components/AddSomething';

import {addEstimationItem, startEstimationItemEditing,
  restoreEstimationItem, clearEstimationItemNotification} from '../../actions';


class EstimationsShow extends React.Component {
  addEstimationItem(value) {
    var itemId = this.props.dispatch(addEstimationItem(this.props.params.id, value));
    this.props.dispatch(startEstimationItemEditing(this.props.params.id, itemId));
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

  clearEstimationItemNotification() {
    this.props.dispatch(clearEstimationItemNotification());
  }

  restoreEstimationItem() {
    this.props.dispatch(
      restoreEstimationItem(this.props.itemToRestore.get('estimationId'),
        this.props.itemToRestore.get('position'),
        this.props.itemToRestore.get('estimationItem')
      ));
    this.clearEstimationItemNotification();
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
      <Snackbar open={!!this.props.itemToRestore}
                autoHideDuration={4000} action="undo"
                message={this.props.itemToRestore &&
                  this.props.itemToRestore.get('estimationItem').get('title') + " has been removed" || ""}
                onActionTouchTap={() => this.restoreEstimationItem()}
                onRequestClose={() => this.clearEstimationItemNotification()}
      />
    </main>
  }
}

function _mapStateToProps(state) {
  return {
    estimations: state.estimations || Immutable.List([]),
    itemToRestore: state.notifications.get('estimationItem')
  };
}
export default connect(_mapStateToProps)(withRouter(EstimationsShow));
