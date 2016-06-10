import React from 'react';
import {connect} from 'react-redux';

import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

import {startEstimationItemEditing} from '../actions';


const styles = {
  titleEditor: {
    width: 'calc(100% - 5em)'
  },
  valueEditor: {
    float: 'right',
    maxWidth: '4em',
  }
};

class EstimationStep extends React.Component {
  componentDidMount() {
    if (this.props.step.get('isEdited', false)) {
      this.refs.valueEditor.input.focus();
    }
  }

  startEditing() {
    this.props.dispatch(
      startEstimationItemEditing(this.props.estimationId, this.props.step.get('id'))
    );
  }

  render() {
    var id = this.props.step.get('id');
    var title = this.props.step.get('title', '');
    var value = this.props.step.get('value', 0);

    if (this.props.step.get('isEdited', false)) {
      setTimeout(() => this.refs.valueEditor.input.focus(), 100);
      return <ListItem>
        <TextField defaultValue={title} style={styles.titleEditor} className="titleEditor"
                   ref="titleEditor" id={"titleEditor" + id}/>
        <TextField defaultValue={value} style={styles.valueEditor} className="valueEditor"
                   ref="valueEditor" type="number" id={"valueEditor" + id}/>
      </ListItem>
    } else {
      return <ListItem onTouchTap={() => this.startEditing()} rightIcon={<span>{value}</span>}>{title}</ListItem>
    }
  }
}

export default connect()(EstimationStep);
