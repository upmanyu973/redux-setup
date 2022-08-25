import { combineReducers } from 'redux';
import { errorReducer } from './ErrorReducer';
import { statusReducer } from './statusReducer';
import { userReducer } from './UserReducer';

export const rootReducer = combineReducers({
    error: errorReducer,
    status: statusReducer,
    user:userReducer
});