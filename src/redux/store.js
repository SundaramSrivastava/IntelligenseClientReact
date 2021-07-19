/**
 * @Title : redux-store
 * @use : This store all the states in the app
 * @dev : There is no need to change or add any default state in here.
 *        If needed please create a new folder in the same directory and connect that to rootreducer.
 */

import {applyMiddleware, createStore} from 'redux';
import rootReducer from './rootReducer';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';

const middlewares = [];

if( process.env.NODE_ENV === 'development') {
    middlewares.push(logger)
}

const store = createStore(
    rootReducer,
    applyMiddleware(...middlewares)
);

const persistor = persistStore(store);

export {store, persistor};