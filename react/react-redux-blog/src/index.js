import 'babel-polyfill';
import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, browserHistory } from 'react-router';

import reducers from './reducers'
import routes from './route';
let createLogger = require('redux-logger')

const logger = createLogger({
  level: 'info',
  logger: console,
  collapsed: true
})

const store = createStore(
  reducers,
  applyMiddleware(thunk,logger)
);

// store.subscribe(()=> console.log(store.getState()));


render(
  <Provider store={store}>
    <Router history = {browserHistory} routes = {routes} />
  </Provider>,
  document.getElementById('root')
);
