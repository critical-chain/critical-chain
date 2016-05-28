import React from 'react';
import {hashHistory} from 'react-router';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


export default class EstimationsList extends React.Component {
  goto(estimation) {
    hashHistory.push('/estimations/' + estimation.id);
  }

  calculateValue(estimation) {
    return <span>{estimation.value}</span>
  }

  render() {
    return <Paper>
      <List>
        <Subheader>Your estimations</Subheader>
        {
          this.props.estimations.map(estimation =>
            <ListItem primaryText={estimation.title} key={estimation.id}
                      rightIcon={this.calculateValue(estimation)} onTouchTap={() => this.goto(estimation)}/>
          )
        }
      </List>
    </Paper>
  }
}
