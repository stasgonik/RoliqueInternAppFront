import reducer from './reducers/reducer'
import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";

export const store = createStore(reducer, applyMiddleware(thunk));

// export * from './action-creators';
// export * from './action-types';
export * from './reducers';
