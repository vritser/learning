import { combineReducers } from 'redux';
import loginUser from './reducer_user'
import home from './reducer_blog';

const reducers = combineReducers({
    home,
    loginUser,
});

export default reducers;