import React from 'react';
import {connect} from 'react-redux';

import Immutable from 'immutable';

import EstimationsList from '../../components/EstimationsList';
import AddSomething from '../../components/AddSomething'

import {addEstimation} from '../../actions';


class EstimationsIndex extends React.Component {
  addEstimation(value) {
    this.props.dispatch(addEstimation(value));
  }

  render() {
    return <main className="row center-md">
      <div className="col-md-3 col-xs-12 start-md">
        <EstimationsList estimations={this.props.estimations}/>
        <AddSomething thing="estimation" callback={(value) => this.addEstimation(value)}/>
      </div>
    </main>
  }
}

function _mapStateToProps(state) {
  return {estimations: state.reducer.get('estimations', Immutable.List([]))};
}
export default connect(_mapStateToProps)(EstimationsIndex);
