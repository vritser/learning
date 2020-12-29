import { combineReducers } from 'redux';
import user from './reducer_user';
import msg from './reducer_msg';
import contact from './reducer_contact';
import work from './reducer_work';
import form from './reducer_form';

const reducers = combineReducers({
    user,
    msg,
    contact,
    work,
    form,
});

export default reducers;