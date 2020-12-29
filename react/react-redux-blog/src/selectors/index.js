import { createSelector } from 'reselect';

const getFilter = state => state.home.filter;
const getBlogs = state => state.home.blogs;

export const getFilterBlogs = createSelector([
    getFilter,
    getBlogs,
],(filter,blogs) =>{
    if(filter){
        return blogs.filter(blog => blog.title.indexOf(filter)!== -1);
    }else {
        return blogs;
    }
});

const getLoginUser = state => state.loginUser;

export const checkLogin = createSelector([
    getLoginUser,
], loginUser => {
    if(loginUser)
        return loginUser;
});
