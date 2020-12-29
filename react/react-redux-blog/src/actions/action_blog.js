import axios from 'axios';
import {FETCH_BLOGS, POST_BLOG, FILTER_BLOGS, ROOT_URL} from '../constants';

export const fetchBlogs = page => {
    let url = ROOT_URL + '/list';
    url = page ? url += '?page=' + page : url;

    return (dispatch, getstate) => {
        const cache = sessionStorage.getItem(url);
        if (cache) {
            console.log('fromcache');
            dispatch(receiveBlogs(JSON.parse(cache)));
        } else {
            console.log('fromfetch');
            axios.get(url)
                .then(res => {
                    dispatch(receiveBlogs(res.data));
                    sessionStorage.setItem(url, JSON.stringify(res.data));
                });
        }
    }

}

export const receiveBlogs = blogs => {
    return {
        type: FETCH_BLOGS,
        blogs,
    }
}

export const filterBlogs = filter => ({
    type: FILTER_BLOGS,
    filter,
})

export const createBlog = blog => {
    let url = ROOT_URL + '/blog/save';
    return dispatch => {
        axios.post(url, blog).then(res => {
            dispatch(handlePost(res.data));
        });
    }
}

const handlePost = blog => ({
    type: POST_BLOG,
    blog,
}) 