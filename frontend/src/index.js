import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
// import { Provider } from 'react-redux'
import { App } from './RootCmps';
import { store } from "./store/store.js";
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import './assets/styles/main.scss';

ReactDOM.render(
  // <Provider store={store}>
  <Router>
    <App />
  </Router>,
  // </Provider >,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
