import axios from 'axios';
import { SIGN_IN, SIGN_UP, SECTOR_RECEIVED } from '../constants';

export const getSector = () => (dispatch, getState) => {
    axios.get('/users/sector/' + getState().user._id)
        .then(res => {
            dispatch(receiveSector(res.data))
        })
}
const receiveSector = sector => ({
    type: SECTOR_RECEIVED,
    sector
})

export const register = user => dispatch => {
    axios.post('/users/signup', user)
        .then(res => {
            dispatch(handleRegister(res.data));
        });
}
const handleRegister = user => ({
    type: SIGN_UP,
    user,
})

export const login = user => dispatch => {
    axios.post('/users/signin', user)
        .then(res => {
            dispatch(handleLogin(res.data))
        })
}
const handleLogin = user => ({
    type: SIGN_IN,
    user
})
