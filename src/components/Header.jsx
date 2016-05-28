import React from 'react';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ActionToc from 'material-ui/svg-icons/action/toc'
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';


export default class Header extends React.Component {
  getEstimations() {
    return this.props.estimations || [];
  }
  render() {
    return <header>
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <IconMenu iconButtonElement={<IconButton touch={true}><ActionToc /></IconButton>}>
            {
              this.getEstimations().map(estimation =>
                <MenuItem key={'header-menu-' + estimation.get('id')} primaryText={estimation.get('title')}/>
              )
            }
          </IconMenu>
          <ToolbarTitle text="Critical Chain"/>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton label="Log in to enable sync" icon={<ActionAccountCircle />} />
        </ToolbarGroup>
      </Toolbar>
    </header>
  }
}
