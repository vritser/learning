import { SIGN_IN, SIGN_UP, SECTOR_RECEIVED } from '../constants';

const initState = {
    user: {},
    contact: [],
    sector: null,
}

const user = (state = {}, action) => {
    switch (action.type) {
        case SIGN_UP:
            return action.user;
        case SIGN_IN:
            return action.user;
        case SECTOR_RECEIVED:
            return {...state, sector: action.sector }
        default:
            return state;
    }
}

export default user;