import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import deepOrange500 from 'material-ui/styles/colors'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import {List, Map} from 'immutable';

import CriticalChain from './components/CriticalChain';
require('./main.css');


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const estimations = List.of(
  Map({id: 1, title: 'React', value: 12, steps: List([
    Map({id: 1, title: 'Раскочегарить'}),
    Map({id: 2, title: 'Накодить'}),
    Map({id: 3, title: 'Закомитить'})
  ])}),
  Map({id: 2, title: 'Redux', value: 9, steps: List([
    Map({id: 1, title: 'Подключить'}),
    Map({id: 2, title: 'Использовать'}),
  ])})
);

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <CriticalChain estimations={estimations} />
  </MuiThemeProvider>,
  document.getElementById('app')
);
