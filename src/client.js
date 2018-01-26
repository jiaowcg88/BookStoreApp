"use strict"
//React
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//React-router
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
// import Menu from './components/menu';
// import Footer from './components/footer';

// applyMiddleware, logger is for building middleware
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';


//import combined reduces
import reducers from './reducers/index';

//IMPORT Actions
import {addToCart} from './actions/cartActions';


//STEP 1 create the createStore
const middleware = applyMiddleware(thunk, logger());
// we will pass initial state from Server
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

import routes from './routes';

const Routes =(
  <Provider store={store}>
    {routes}
  </Provider>
)

render(
  Routes, document.getElementById('app')
);
