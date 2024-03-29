/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactDOM from 'react-dom';

import './css/project_layout.css'
import './css/project_style.css'

import ReactReduxFirebaseApp from './redux/ReactReduxFirebaseApp'

ReactDOM.render(
  <ReactReduxFirebaseApp />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();