import React from 'react';

import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const styles = {
  container: {
    paddingTop: '32px'
  },
  subheader: {
    marginBottom: '-20px'
  },
  textField: {
    margin: '0 16px',
    width: 'calc(100% - 54px)'
  },
  actionButton: {
    marginLeft: '-24px'
  }
};


export default class AddSomething extends React.Component {
  onSubmit() {
    var value = this.refs.thingTitle.getValue();
    var callback = this.props.callback;
    if (typeof callback === 'function' && value != '') {
      callback(value);
      this.refs.thingTitle.input.value='';
    }
  }
  onKeyDown(event) {
    if(event.key==='Enter'){
      this.onSubmit();
    }
  }

  componentDidMount() {
    this.refs.thingTitle.input.focus();
  }

  render() {
    return <div style={styles.container} >
      <Subheader style={styles.subheader} >Add {this.props.thing}</Subheader>
      <TextField className="addSomethingTextField" style={styles.textField}
                 hintText={"Name your " + this.props.thing} ref="thingTitle"
                 onKeyDown={(event) => this.onKeyDown(event)}

      />
      <FloatingActionButton mini={true} style={styles.actionButton}
                            onMouseUp={() => this.onSubmit()} onTouchStart={() => this.onSubmit()} >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  }
};
