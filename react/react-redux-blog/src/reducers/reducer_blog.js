import {FETCH_BLOGS, FETCH_CATES, POST_BLOG, FILTER_BLOGS, ROOT_URL} from '../constants';
//http://skill.phodal.com/
const initState = {
    blogs: [],
    cates: [],
    filter: '',
    hasNew: false
}

const home = (state = initState, action) => {
    switch (action.type) {
        case FETCH_BLOGS:
            return {...state, blogs: action.blogs };
        case FILTER_BLOGS:
            return {...state, filter: action.filter };
        case FETCH_CATES:
            return {...state, cates: action.cates };
        case POST_BLOG:
            const { blog } = action;
            //{...state, blogs: [...blogs, blog] }
            return Object.assign({}, state, { blogs: [...blogs, blog] });
        default:
            return state;
    }
}

export default home; 