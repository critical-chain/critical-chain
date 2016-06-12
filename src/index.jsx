import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import Immutable from 'immutable';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import deepOrange500 from 'material-ui/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import EstimationsIndex from './views/estimations/EstimationsIndex';
import EstimationsShow from './views/estimations/EstimationsShow';
import Header from './components/Header';
require('./main.css');

import estimationReducers from './reducers/estimations';
import notificationReducers from './reducers/notifications';


const DEFAULT_STATE = Immutable.fromJS([
  {
    id: '2360a60e-c0ea-4703-b74e-8410f9489210', title: 'React', steps: [
    {id: '1c4a6330-5235-487d-8878-754ec49841f6', title: 'Раскочегарить', value: 3},
    {id: 'da8973a4-a0cd-4d44-bac5-a321ecd43ff2', title: 'Накодить', value: 8},
    {id: 'd6c14112-24bd-4ac7-9fd1-51c974b37fec', title: 'Закомитить', value: 4}
  ]
  },
  {
    id: '5631a649-4d41-4fce-b416-53e66942b0f9', title: 'Redux', steps: [
    {id: 'd0dfae80-4b24-49fc-a56e-a9de3cbda1e9', title: 'Подключить', value: 3},
    {id: 'd495a327-364a-4cd1-9729-3e1fd14c81bc', title: 'Использовать', value: 4}
  ]
  }
]);

const store = createStore(
  combineReducers({routing: routerReducer, estimations: estimationReducers, notifications: notificationReducers}),
  {routing: {}, estimations: DEFAULT_STATE, notifications: Immutable.Map({})},
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
const history = syncHistoryWithStore(hashHistory, store);


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
});


const App = React.createClass({
  render() {
    return <MuiThemeProvider muiTheme={muiTheme}>
      <div id="applicationRoot">
        <Header params={this.props.params}/>
           { this.props.children && React.cloneElement(this.props.children, {params: this.props.params}) }
      </div>
    </MuiThemeProvider>;
  }
});

const AppContainer = connect()(App);

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
