import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import promise from 'redux-promise-middleware';

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_PENDING": {
      return {
        ...state,
        fetching: true
      };
      break;
    }
    case "FETCH_USERS_REJECTED": {
      return {
        ...state,
        fetching: false,
        error: action.payload
      };
      break;
    }
    case "FETCH_USERS_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
      break;
    }
  }
  return state;
}

let middleware = applyMiddleware(promise(), thunk, logger());

const store = createStore(reducer, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

// type is required, payload variable name can be changed
store.dispatch({
  type: "FETCH_USERS",
  payload: axios.get("http://rest.learncode.academy/api/wstern/users")
});
