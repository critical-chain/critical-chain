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
    marginLeft: '16px',
    marginRight: '-24px',
    width: '91%'
  }
};


export default class AddEstimation extends React.Component {
  render() {
    return <div style={styles.container} >
      <Subheader style={styles.subheader} >Add estimation</Subheader>
      <TextField style={styles.textField} hintText="Name your estimation"/>
      <FloatingActionButton mini={true} >
        <ContentAdd />
      </FloatingActionButton>
    </div>
  }
};
