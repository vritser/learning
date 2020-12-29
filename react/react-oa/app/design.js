require("../public/stylesheets/design.css");

import React from 'react';
import thunk from 'redux-thunk';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers';
import FormDesign from './components/FormDesign/FormDesign';

const store = createStore(
    reducers,
    applyMiddleware(thunk)
)

render(
    <Provider store={store}>
        <FormDesign />
    </Provider>,
    document.body
);