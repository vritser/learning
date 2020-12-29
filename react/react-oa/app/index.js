require("../public/stylesheets/style.css");
require("../public/stylesheets/work.css");

import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import App from './components/App';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);