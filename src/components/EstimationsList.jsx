import React from 'react';
import {withRouter} from 'react-router';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import EstimationValue from './EstimationValue';


class EstimationsList extends React.Component {
  goTo(estimation) {
    this.props.router.push('/estimations/' + estimation.id);
  }

  render() {
    return <Paper>
      <List>
        <Subheader>Your estimations</Subheader>
        {
          this.props.estimations.map(estimation =>
            <ListItem primaryText={estimation.title} key={estimation.id}
                      secondaryText={<EstimationValue estimation={estimation}/>} onTouchTap={() => this.goTo(estimation)}/>
          )
        }
      </List>
    </Paper>
  }
}

export default withRouter(EstimationsList);
