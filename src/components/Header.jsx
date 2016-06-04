import React from 'react';
import {IndexLink, withRouter} from 'react-router'

import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';


class Header extends React.Component {
  getEstimations() {
    return this.props.estimations || [];
  }

  getCurrentEstimationId() {
    return parseInt(this.props.params.id);
  }

  navigateToEstimation(_event, _index, estimationId) {
    console.log(this);
    this.props.router.transitionTo('/estimations/' + estimationId);
  }

  render() {
    return <header>
      <Toolbar>
        <ToolbarGroup className="toolbar">
          <IndexLink to="/" activeClassName="disabled">
            <ActionAssignment />
            <ToolbarTitle text="Critical chain"/>
          </IndexLink>

          { this.getCurrentEstimationId() ?
            <DropDownMenu value={this.getCurrentEstimationId()} onChange={this.navigateToEstimation}>
            {
              this.getEstimations().map(estimation =>
                <MenuItem value={estimation.id} key={'header-menu-' + estimation.id}
                          primaryText={estimation.title}/>
              )
            }
            </DropDownMenu> : undefined
          }
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton label="Log in to enable sync" icon={<ActionAccountCircle />}/>
        </ToolbarGroup>
      </Toolbar>
    </header>
  }
}

export default withRouter(Header);
