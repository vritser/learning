import { FRIEND_RECEIVED, MEMBERS_RECEIVED } from '../constants';

const initState = {
    friends: [],
    approver: {
        his: []
    },
}

const contact = (state = initState, action) => {
    switch (action.type) {
        case FRIEND_RECEIVED:
            return {...state, friends: action.friends }
        case MEMBERS_RECEIVED:
            let i = state.approver.his.indexOf(action.curr);
            if (i != -1) {
                state.approver.his.splice(i, state.approver.his.length - i);
            }
            let his = [...new Set([...state.approver.his, action.curr])];
            let approver = {
                his,
                members: action.members.members,
                childSector: action.members.childSector
            }
            return {...state, approver }
        default:
            return state;
    }
}

export default contact;