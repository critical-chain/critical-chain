import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

import EstimationValue from './EstimationValue';

import {setEstimationsListFilter} from '../actions';

const styles = {
  filterTextField: {
    float: 'right'
  }
}

class EstimationsList extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  goTo(estimation) {
    this.props.router.push('/estimations/' + estimation.get('id'));
  }

  setFilter() {
    if (this.refs.filter) {
      var filter = this.refs.filter;
      var currentValue = filter.getValue();
      setTimeout(() => {
        if (currentValue === filter.getValue()) {
          this.props.dispatch(setEstimationsListFilter(currentValue));
        }
      }, 250);
    }
  }

  render() {
    return <Paper>
      <List>
        <Subheader >Your estimations
          <TextField hintText="Filter..." style={styles.filterTextField} ref="filter"
                     onChange={(event) => this.setFilter()}/>
        </Subheader>
        {
          this.props.estimations.filter(estimation =>
            estimation.get('title').toLowerCase().includes(this.props.filter)
          ).map(estimation =>
            <ListItem primaryText={estimation.get('title')} key={estimation.get('id')}
                      secondaryText={<div className="end-xs"><EstimationValue estimation={estimation}/></div>}
                      onTouchTap={() => this.goTo(estimation)}/>
          )
        }
      </List>
    </Paper>
  }
}

export default connect()(withRouter(EstimationsList));
