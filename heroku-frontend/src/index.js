import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from './RootCmps';
import { store } from './store/store.js';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './assets/styles/main.scss';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
serviceWorkerRegistration.unregister();

