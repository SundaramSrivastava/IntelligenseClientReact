/**
 * @Title : Root-Reducer
 * @dev : add your new state files here
 */

import { combineReducers } from "redux";

// Import your reducers below this line
// eg. import egReducer from './eg/eg.reducer;
import userReducer from "./User/user.reducer";
import headerReducer from "./Header/header.reducer";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer,
    header: headerReducer
});

export default persistReducer( persistConfig, rootReducer );