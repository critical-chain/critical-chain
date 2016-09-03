import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';

import {ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import {startEstimationItemEditing, stopEstimationItemsEditing,
  updateEstimationItem, deleteEstimationItem, notifyAboutEstimationItemDeletion} from '../actions';


const styles = {
  titleEditor: {
    width: 'calc(100% - 9em - 60px)'
  },
  valueEditor: {
    maxWidth: '4em',
  },
  quantityEditor: {
    maxWidth: '3em'
  }
};

class EstimationStep extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }


  startEditing() {
    this.props.dispatch(
      startEstimationItemEditing(this.props.estimationId, this.props.step.get('id'))
    );
  }

  stopEditing() {
    this.props.dispatch(
      stopEstimationItemsEditing(this.props.estimationId)
    );
    var autoInput = document.querySelector('input[autofocus]');
    if (autoInput) {
      autoInput.focus();
    }
  }

  submitChanges() {
    this.props.dispatch(
      updateEstimationItem(this.props.estimationId, this.props.step.get('id'),
        {
          title: this.refs.titleEditor.getValue(),
          value: parseFloat(this.refs.valueEditor.getValue()),
          quantity: parseInt(this.refs.quantityEditor.getValue())
        })
    )
  }

  deleteItem() {
    var {position, estimationItem} = this.props.dispatch(
      deleteEstimationItem(this.props.estimationId, this.props.step.get('id'))
    );
    this.props.dispatch(notifyAboutEstimationItemDeletion(this.props.estimationId, position, estimationItem));
  }

  keyDownHandler(event) {
    if (event.key === 'Enter') {
      this.submitChanges();
      this.stopEditing()
    } else if (event.key === 'Escape') {
      this.stopEditing();
    }
  }

  blurHandler() {
    setTimeout(() => {
        if (this.refs.titleEditor && this.refs.valueEditor && this.refs.quantityEditor &&
          this.refs.titleEditor.input !== document.activeElement &&
          this.refs.valueEditor.input !== document.activeElement &&
          this.refs.quantityEditor.input !== document.activeElement) {
          this.submitChanges();
          this.stopEditing()
        }
      }, 100
    );
  }

  autoselect() {
    this.refs.valueEditor.input.select();
  }

  quantityIndicator(quantity, value) {
    if (quantity > 1) {
      return <span>{quantity}×<strong>{value}</strong>={quantity*value}</span>;
    } else {
      return <span><strong>{value}</strong></span>;
    }
  }

  render() {
    var id = this.props.step.get('id');
    var title = this.props.step.get('title', '');
    var value = this.props.step.get('value', 0);
    var quantity = this.props.step.get('quantity', 1);

    if (this.props.step.get('isEdited', false)) {
      setTimeout(() => {
        if (this.props.step.get('isEdited', true)) {
          this.refs.valueEditor.input.focus()
        }
      }, 50);
      return <ListItem primaryText={
          <TextField defaultValue={title} style={styles.titleEditor} className="titleEditor"
                     ref="titleEditor" id={"titleEditor" + id}
                     onKeyDown={(event) => this.keyDownHandler(event)}
                     onBlur={() => this.blurHandler()}/>
        } secondaryText={
          <span>
            <TextField defaultValue={quantity} style={styles.quantityEditor} className="quantityEditor"
                       ref="quantityEditor" type="number" id={"quantityEditor" + id}
                       onKeyDown={(event) => this.keyDownHandler(event)}
                       onBlur={() => this.blurHandler()} />
            <span>×</span>
            <TextField defaultValue={value} style={styles.valueEditor} className="valueEditor"
                       ref="valueEditor" type="number" id={"valueEditor" + id}
                       onKeyDown={(event) => this.keyDownHandler(event)}
                       onFocus={() => this.autoselect()}
                       onBlur={() => this.blurHandler()}/>
          </span>
        } rightIconButton={
          <IconButton children={<ActionDelete />} tooltip={<span>Delete</span>}
                      onTouchTap={(event) => {
                        this.deleteItem();
                        event.stopPropagation();
                      }}/>
        }
      />;
    } else {
      return <ListItem onTouchTap={() => this.startEditing()} secondaryText={this.quantityIndicator(quantity, value)} primaryText={title} />
    }
  }
}

export default connect()(EstimationStep);
