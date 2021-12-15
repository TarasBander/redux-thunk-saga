import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {store, ConnectedApp} from './App';
import {store2, ConnectedApp2} from './App2';
import { Provider } from 'react-redux';

// Container component
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
    <Provider store={store2}>
      <ConnectedApp2 />
    </Provider>,
  </Provider>,
  document.getElementById('root')
);