require("../node_modules/foundation-apps/dist/css/foundation-apps.min.css");

import React from 'react';
import ReactDOM from 'react-dom';
import {List, Map} from 'immutable';

import CriticalChain from './components/CriticalChain';

const todos = List.of(
  Map({id: 1, text: 'React', status: 'active', editing: false}),
  Map({id: 2, text: 'Redux', status: 'active', editing: false}),
  Map({id: 3, text: 'Immutable', status: 'completed', editing: false})
);

ReactDOM.render(
  <CriticalChain todos={todos} />,
  document.getElementById('app')
);
