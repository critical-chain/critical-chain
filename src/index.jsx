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


const DEFAULT_STATE = Immutable.fromJS([
  {
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
  }
]);

const store = createStore(
  combineReducers({routing: routerReducer, estimations: estimationReducers}),
  {routing: {}, estimations: DEFAULT_STATE},
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
