let createStore = require('redux').createStore;
let applyMiddleware = require('redux').applyMiddleware;

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INC":
      return state + action.payload;
      break;
    case "DEC":
      return state - action.payload;
      break;
    case "ERR":
      throw new Error("This is an error message.");
      break;
  }
  return state;
}

const logger = (store) => (next) => (action) => {
  console.log("action fired", action);
  next(action);
}

const error = (store) => (next) => (action) => {
  try {
    next(action);
  } catch (e) {
    console.log("Error", e);
  }
}

let middleware = applyMiddleware(logger, error);

const store = createStore(reducer, 0, middleware);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

// type is required, payload variable name can be changed
store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 3});
store.dispatch({type: "INC", payload: 56});
store.dispatch({type: "DEC", payload: 2});
store.dispatch({type: "DEC", payload: 22});
store.dispatch({type: "ERR"});
store.dispatch({type: "INC", payload: 22});
