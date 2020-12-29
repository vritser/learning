import axios from 'axios';
import { FETCH_CATES, ROOT_URL } from '../constants';

export const fetchCates = () => {
    let url = ROOT_URL + '/category';

    return (dispatch,getState) => {
        axios.get(url).then(res => {
            dispatch(receiveCates(res.data));
        });    
    }
}

export const receiveCates = cates => ({
    type:FETCH_CATES,
        cates,
})