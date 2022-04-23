import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../redux';
import thunkMiddleware from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
// import { createStore } from 'redux';
// import rootReducer from '../redux';

// // initialState
// const initialState = {}

// // Create store
// const store = createStore(rootReducer, initialState);
// export default store