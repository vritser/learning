import axios from 'axios';
import { MSG_SEND, MSG_RECEIVED, MSG_DETAIL, MSG_CURR } from '../constants';

export const send = msg => dispatch => {
    axios.post('/msgs', msg)
        .then(res => {
            dispatch(handleSend(res.data));
        });
}

const handleSend = msg => ({
    type: MSG_SEND,
    msg
})

export const showDetail = curr => ({
    type: MSG_CURR,
    curr
})

export const addToList = from => (dispatch, getState) => {
    axios.get(`/msgs/${from}/${getState().user._id}`)
        .then(res => {
            dispatch(handleAddToList(res.data))
        })
}
const handleAddToList = msg => ({
    type: MSG_RECEIVED,
    msg
})

//57fdd3583cd65e74edf5a836
export const fetchMsg = from => (dispatch, getState) => {
    axios.get(`/msgs/detail/${from}/${getState().user._id}`)
        .then(res => {
            dispatch(receiveMsg({ left: from + getState().user._id, right: getState().user._id + from }, res.data));
        })
}

const receiveMsg = (who, msgs) => ({
    type: MSG_DETAIL,
    who,
    msgs
})
