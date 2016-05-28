import React from 'react';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

export default class EstimationsList extends React.Component {
  getEstimations() {
    return this.props.estimations || [];
  }
  calculateValue(estimation) {
    return <span>{estimation.get('value')}</span>
  }
  render() {
    return <Paper zIndex={1}>
      <List>
      <Subheader>Your estimations</Subheader>
      {
        this.getEstimations().map(estimation =>
          <ListItem primaryText={estimation.get('title')} key={estimation.get('id')} rightIcon={this.calculateValue(estimation)} />
        )
      }
      </List>
    </Paper>
  }
}
