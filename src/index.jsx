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
      id: 1, title: 'React', steps: [
        {id: 1, title: 'Раскочегарить', value: 3},
        {id: 2, title: 'Накодить', value: 8},
        {id: 3, title: 'Закомитить', value: 4}
      ]
    },
    {
      id: 2, title: 'Redux', value: 9, steps: [
        {id: 1, title: 'Подключить', value: 3},
        {id: 2, title: 'Использовать', value: 4}
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
    var estimations = this.props.estimations || [];
    return <MuiThemeProvider muiTheme={muiTheme}>
        <div id="applicationRoot">
          <Header estimations={estimations} params={this.props.params} />
          {this.props.children && React.cloneElement(this.props.children, {
            estimations: estimations
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
