import axios from 'axios';
import { FRIEND_RECEIVED, MEMBERS_RECEIVED } from '../constants';

export const getFriends = () => (dispatch, getState) => {
    axios.get('/users/friends/' + getState().user._id)
        .then(res => {
            dispatch(receiveFirends(res.data));
        })
}
const receiveFirends = friends => ({
    type: FRIEND_RECEIVED,
    friends
})

export const addFriend = friendPhone => (dispatch, getState) => {
    axios.post('/users/friends', { friendPhone, ownPhone: getState().user.phone })
        .then(res => {
            dispatch(handleAddFriend(res.data));
        })
}
const handleAddFriend = friend => ({
    type: '',
    friend
})

export const getMembers = sectorId => dispatch => {
    axios.get(`/users/${sectorId}/members`)
        .then(res => {
            dispatch(receiveMembers(sectorId, res.data))
        })
}
const receiveMembers = (curr, members) => ({
    type: MEMBERS_RECEIVED,
    curr,
    members
})

// export const joinGroup = 