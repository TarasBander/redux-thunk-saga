import './App.css';

import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

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
  return (dispatch) => {
    dispatch(requestImage());
    fetch('https://dog.ceo/api/breeds/image/random')
    // fetch(`https://source.unsplash.com/random/300x200?sig=${Math.random()}`)
      .then(res => res.json())
      .then(
        data => dispatch(requestImageSuccess(data)),
        err => dispatch(requestImageError())
      );
  }
};

// Store
export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

// export default App;
export class App extends React.Component {
  render () {
    return (
      <div>
        <button onClick={() => this.props.dispatch(fetchImage())}>Show Image</button>
          {this.props.loading 
            ? <p>Loading...</p> 
            : this.props.error
                ? <p>Error, try again</p>
                : <p><img alt="test" src={this.props.url}/></p>}
      </div>
    )
  }
}

export const ConnectedApp = connect((state) => {
  console.log(state);
  return state;
})(App);