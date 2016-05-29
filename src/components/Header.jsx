import React from 'react';
import { IndexLink, withRouter } from 'react-router'

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import ActionToc from 'material-ui/svg-icons/action/toc'
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';


class Header extends React.Component {
  getEstimations() {
    return this.props.estimations || [];
  }
  navigateTo(estimation) {
    this.props.router.push('/estimations/'+estimation.id);
  }

  render() {
    return <header>
      <Toolbar>
        <ToolbarGroup firstChild={true} className="toolbar" >
          <IconMenu iconButtonElement={<IconButton touch={true}><ActionToc /></IconButton>}>
                    {
                      this.getEstimations().map(estimation =>
                        <MenuItem key={'header-menu-' + estimation.id}
                                  primaryText={estimation.title} onTouchTap={() => this.navigateTo(estimation)}/>
                      )
                    }
          </IconMenu>
          <IndexLink to="/" activeClassName="disabled">
            <ToolbarTitle text="Critical chain" />
          </IndexLink>
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton label="Log in to enable sync" icon={<ActionAccountCircle />}/>
        </ToolbarGroup>
      </Toolbar>
    </header>
  }
}

export default withRouter(Header);
