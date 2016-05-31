import React from 'react';

import {ListItem} from 'material-ui/List';

export default class EstimationStep extends React.Component {
  render() {
    return <ListItem rightIcon={<span>{this.props.step.value}</span>}>{this.props.step.title}</ListItem>;
  }
}
