import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import {compose, createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import thunk from 'redux-thunk';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import PouchDB from 'pouchdb';
window.PouchDB = PouchDB; // To make debugging work
import WorkerPouch from 'worker-pouch';

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
import { loadEstimation } from './actions';

PouchDB.adapter('worker', WorkerPouch);
window.estimationsStorage = new PouchDB('ccng', {adapter: 'worker'});

window.estimationsStorage.allDocs({include_docs: true, startkey: 'estimation:', endkey: "estimation:\uffff"}).then(
  function (estimationResults) {
    estimationResults.rows.map(function (estimation) {
      var estimationId = estimation.key.slice(11);
      var estimationItemsKey = 'estimation_item:' + estimationId + ':';
      window.estimationsStorage.allDocs({
        include_docs: true, startkey: estimationItemsKey, endkey: estimationItemsKey + "\uffff"
      }).then(
        function (estimationItemResults) {
          store.dispatch(loadEstimation({
            id: estimationId,
            title: estimation.doc.title,
            steps: estimationItemResults.rows.map(function (estimationItem) {
              return {
                id: estimationItem.key.slice(53),
                title: estimationItem.doc.title,
                value: estimationItem.doc.value
              };
            })
          }));
        }
      );
    });
  }
);

const store = createStore(
  combineReducers({routing: routerReducer, estimations: estimationReducers, notifications: notificationReducers}),
  {routing: {}, estimations: new Immutable.List(), notifications: Immutable.Map({})},
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
