import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Immutable from 'immutable';

import EstimationsList from '../../components/EstimationsList';
import AddSomething from '../../components/AddSomething'

import {addEstimation} from '../../actions';


class EstimationsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  addEstimation(value) {
    var newId = this.props.dispatch(addEstimation(value));
    this.props.router.push('/estimations/' + newId);
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
  return {estimations: state.estimations || Immutable.List([])};
}
export default connect(_mapStateToProps)(withRouter(EstimationsIndex));
