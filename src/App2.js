import './App.css';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import {put, call, takeEvery} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

// Reducer
const initialState = {
  url: '',
  loading: false,
  error: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REQUESTED_IMAGE':
      return {
        url: '',
        loading: true,
        error: false,
      };
    case 'REQUESTED_IMAGE_SUCCEEDED':
      return {
        url: action.url,
        loading: false,
        error: false,
      };
    case 'REQUESTED_IMAGE_FAILED':
      return {
        url: '',
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

// Action Creators
const requestImage = () => {
  return { type: 'REQUESTED_IMAGE' }
};

const requestImageSuccess = (data) => {
  return { type: 'REQUESTED_IMAGE_SUCCEEDED', url: data.message }
};

const requestImageError = () => {
  return { type: 'REQUESTED_IMAGE_FAILED' }
};

const fetchImage = () => {
  return { type: 'FETCHED_IMAGE' }
};

// Sagas
function* watchFetchImage() {
  yield takeEvery('FETCHED_IMAGE', fetchImageAsync);
}

function* fetchImageAsync() {
  try {
    yield put(requestImage());
    const data = yield call(() => {
      return fetch('https://dog.ceo/api/breeds/image/random')
              .then(res => res.json())
      }
    );
    yield put(requestImageSuccess(data));
  } catch (error) {
    yield put(requestImageError());
  }
}

// Component
export class App2 extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchImage())}>Show Image2</button>
          {this.props.loading 
            ? <p>Loading...</p> 
            : this.props.error
                ? <p>Error, try again</p>
                : <p><img alt="test2" src={this.props.url}/></p>}
      </div>
    )
  }
}

// Store
const sagaMiddleware = createSagaMiddleware();
export const store2 = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(watchFetchImage);

export const ConnectedApp2 = connect((state) => {
  console.log(state);
  return state;
})(App2);
