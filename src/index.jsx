import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import {compose, createStore} from 'redux';
import {Provider, connect} from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import deepOrange500 from 'material-ui/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import EstimationsIndex from './views/estimations/index';
import EstimationsShow from './views/estimations/show';
import Header from './components/Header';
require('./main.css');

import reducer from './reducer';


const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreDevTools(reducer);

store.dispatch({
  type: 'SET_STATE',
  state: {
    estimations: [{
      id: 1, title: 'React', value: 12, steps: [
        {id: 1, title: 'Раскочегарить'},
        {id: 2, title: 'Накодить'},
        {id: 3, title: 'Закомитить'}
      ]
    },
    {
      id: 2, title: 'Redux', value: 9, steps: [
        {id: 1, title: 'Подключить'},
        {id: 2, title: 'Использовать'}
      ]
    }]
  }
});

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});


const App = React.createClass({
  render() {
    return <MuiThemeProvider muiTheme={muiTheme}>
        <div id="applicationRoot">
          <Header estimations={this.props.estimations || []} />
          {this.props.children && React.cloneElement(this.props.children, {
            estimations: this.props.estimations || []
          })}
        </div>
      </MuiThemeProvider>
  }
});

function _mapStateToProps(state) {
  return state;
}
export const AppContainer = connect(_mapStateToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={EstimationsIndex}/>
        <Route path="estimations/:id" component={EstimationsShow}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
