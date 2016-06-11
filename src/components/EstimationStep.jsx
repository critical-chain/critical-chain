import React from 'react';
import {connect} from 'react-redux';

import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';

import {startEstimationItemEditing, stopEstimationItemsEditing, updateEstimationItem} from '../actions';


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
  startEditing() {
    this.props.dispatch(
      startEstimationItemEditing(this.props.estimationId, this.props.step.get('id'))
    );
  }
  stopEditing(){
    this.props.dispatch(
      stopEstimationItemsEditing(this.props.estimationId)
    );
  }
  submitChanges() {
    this.props.dispatch(
      updateEstimationItem(this.props.estimationId, this.props.step.get('id'),
                           {
                             title: this.refs.titleEditor.getValue(),
                             value: parseFloat(this.refs.valueEditor.getValue())
                           })
    )
  }

  keyDownHandler(event) {
    if(event.key==='Enter') {
      this.submitChanges();
      this.stopEditing()
    } else if(event.key==='Escape') {
      this.stopEditing();
    }
  }


  blurHandler() {
    setTimeout(() => {
        if (this.refs.titleEditor && this.refs.valueEditor &&
            this.refs.titleEditor.input !== document.activeElement &&
            this.refs.valueEditor.input !== document.activeElement) {
          this.submitChanges();
          this.stopEditing()
        }
      }, 100
    );
  }

  render() {
    var id = this.props.step.get('id');
    var title = this.props.step.get('title', '');
    var value = this.props.step.get('value', 0);

    if (this.props.step.get('isEdited', false)) {
      setTimeout(() => {
        if(this.props.step.get('isEdited', true)) {
          this.refs.valueEditor.input.focus()
        }
      }, 50);
      return <ListItem>
        <TextField defaultValue={title} style={styles.titleEditor} className="titleEditor"
                   ref="titleEditor" id={"titleEditor" + id}
                   onKeyDown={(event) => this.keyDownHandler(event)}
                   onBlur={() => this.blurHandler()}/>
        <TextField defaultValue={value} style={styles.valueEditor} className="valueEditor"
                   ref="valueEditor" type="number" id={"valueEditor" + id}
                   onKeyDown={(event) => this.keyDownHandler(event)}
                   onBlur={() => this.blurHandler()}/>

      </ListItem>
    } else {
      return <ListItem onTouchTap={() => this.startEditing()} rightIcon={<span>{value}</span>}>{title}</ListItem>
    }
  }
}

export default connect()(EstimationStep);
