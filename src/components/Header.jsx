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

  navigateToEstimation(estimationId) {
    this.props.router.push('/estimations/' + estimationId);
  }

  render() {
    return <header>
      <Toolbar>
        <ToolbarGroup className="toolbar">
          <IndexLink to="/" className="row middle-xs" activeClassName="disabled">
            <ActionAssignment />
            <ToolbarTitle text="Critical chain" className="hide-on-sm" />
          </IndexLink>

          { this.getCurrentEstimationId() ?
            <DropDownMenu value={this.getCurrentEstimationId()}
                          onChange={(_a,_b,estimationId) => this.navigateToEstimation(estimationId)}>
            {
              this.getEstimations().map(estimation =>
                <MenuItem value={estimation.get('id')} key={'header-menu-' + estimation.get('id')}
                          primaryText={estimation.get('title')}/>
              )
            }
            </DropDownMenu> : undefined
          }
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton disabled={true} label={<span className="hide-on-sm">Log in to enable sync</span>}
                      icon={<ActionAccountCircle />}/>
        </ToolbarGroup>
      </Toolbar>
    </header>
  }
}

export default withRouter(Header);
