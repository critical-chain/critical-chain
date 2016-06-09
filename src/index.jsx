import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import {compose, createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import Immutable from 'immutable';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import deepOrange500 from 'material-ui/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import EstimationsIndex from './views/estimations/index';
import EstimationsShow from './views/estimations/show';
import Header from './components/Header';
require('./main.css');

import reducer from './reducers';
import actions from './actions';


const DEFAULT_STATE = Immutable.fromJS({
  estimations: [{
    id: 1, title: 'React', steps: [
      {id: 1, title: 'Раскочегарить', value: 3},
      {id: 2, title: 'Накодить', value: 8},
      {id: 3, title: 'Закомитить', value: 4}
    ]
  },
    {
      id: 2, title: 'Redux', steps: [
      {id: 1, title: 'Подключить', value: 3},
      {id: 2, title: 'Использовать', value: 4}
    ]
    }]
});

const createStoreDevTools = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);
const store = createStoreDevTools(
  combineReducers({routing: routerReducer, reducer}),
  {routing: {}, reducer: DEFAULT_STATE}
);
const history = syncHistoryWithStore(hashHistory, store);


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});


const App = React.createClass({
  render() {
    var estimations = this.props.estimations || [];
    var callbacks = {
      addEstimation: this.props.addEstimation,
      addEstimationItem: this.props.addEstimationItem
    };
    return <MuiThemeProvider muiTheme={muiTheme}>
      <div id="applicationRoot">
        <Header estimations={estimations} params={this.props.params}/>
           {this.props.children && React.cloneElement(this.props.children, {
             estimations, callbacks
           })}
      </div>
    </MuiThemeProvider>
  }
});

function _mapStateToProps(state) {
  return {estimations: state.reducer.get('estimations')};
}
export const AppContainer = connect(_mapStateToProps, actions)(App);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={EstimationsIndex}/>
        <Route path="estimations/:id" component={EstimationsShow}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
