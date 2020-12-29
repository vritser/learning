import { SIGN_UP, SIGN_IN } from '../constants';

const loginUser = (state = {}, action) => {
    switch (action.type) {
        case SIGN_UP:
            return action.user;
        case SIGN_IN:
            return action.user;
        default:
            return state;
    }
}

export default loginUser;