import React from 'react';
import {withRouter} from 'react-router';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';


class EstimationsList extends React.Component {
  goTo(estimation) {
    this.props.router.push('/estimations/' + estimation.id);
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
                      rightIcon={this.calculateValue(estimation)} onTouchTap={() => this.goTo(estimation)}/>
          )
        }
      </List>
    </Paper>
  }
}

export default withRouter(EstimationsList);
