import React from 'react';
import { Route, IndexRoute} from 'react-router';
import App from './components/App';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import BlogList from './components/BlogList';
import Post from './components/Post';

export default (
    <Route path = '/' component= { App} >
        <IndexRoute component= { BlogList} />
        <Route path = '/user'>
            <Route path = 'signup' component= { SignUp} />
            <Route path = 'signin' component= { SignIn} />
        </Route>
        <Route path ='/post' >
            <Route path = 'new' component = { Post } />
        </Route>
    </Route>

)